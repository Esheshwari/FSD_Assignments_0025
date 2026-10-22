const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/campus_lost_found';
const SESSION_SECRET = process.env.SESSION_SECRET || 'campus-find-local-development-secret';

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  department: { type: String, required: true, trim: true },
  contactNumber: { type: String, required: true, trim: true },
  passwordHash: { type: String, required: true, select: false }
}, { timestamps: true });

const lostItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  lastSeenLocation: { type: String, required: true, trim: true },
  dateLost: { type: Date, required: true },
  status: { type: String, enum: ['Lost', 'Found'], default: 'Lost' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
}, { timestamps: true });

const foundItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  foundLocation: { type: String, required: true, trim: true },
  dateFound: { type: Date, required: true },
  status: { type: String, enum: ['Available', 'Returned'], default: 'Available' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
}, { timestamps: true });

const claimSchema = new mongoose.Schema({
  foundItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoundItem', required: true },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  reason: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });
claimSchema.index({ foundItemId: 1, claimedBy: 1 }, { unique: true });

const Student = mongoose.model('Student', studentSchema);
const LostItem = mongoose.model('LostItem', lostItemSchema);
const FoundItem = mongoose.model('FoundItem', foundItemSchema);
const Claim = mongoose.model('Claim', claimSchema);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 8 }
}));
app.use((req, res, next) => {
  res.locals.currentStudentId = req.session.studentId || null;
  res.locals.currentStudentName = req.session.studentName || null;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const requiredFieldsPresent = (values) =>
  values.every((value) => typeof value === 'string' && value.trim().length > 0);
const validDate = (value) => typeof value === 'string' && value !== '' && !Number.isNaN(Date.parse(value));

function requireDatabase(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).render('error', {
      message: 'MongoDB is not connected. Start MongoDB and restart the app to use this feature.'
    });
  }
  next();
}

function requireStudent(req, res, next) {
  if (!req.session.studentId) {
    return res.status(401).render('error', { message: 'Please sign in with your student profile first.' });
  }
  next();
}

app.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.render('home', {
      students: [],
      lostCount: 0,
      foundCount: 0,
      databaseConnected: false,
      error: null
    });
  }
  try {
    const [students, lostCount, foundCount] = await Promise.all([
      Student.find().sort({ fullName: 1 }),
      LostItem.countDocuments(),
      FoundItem.countDocuments()
    ]);
    res.render('home', { students, lostCount, foundCount, databaseConnected: true, error: null });
  } catch (error) {
    console.error('Failed to load the home page:', error);
    res.status(500).render('error', { message: 'Could not load the home page. Please try again.' });
  }
});

app.use(['/students', '/lost-items', '/found-items', '/claims'], requireDatabase);

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ fullName: 1 });
    res.render('students', { students });
  } catch (error) {
    console.error('Failed to load students:', error);
    res.status(500).render('error', { message: 'Could not load student profiles.' });
  }
});

app.post('/students', async (req, res) => {
  const { fullName, email, department, contactNumber, password } = req.body;
  if (!requiredFieldsPresent([fullName, email, department, contactNumber, password]) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      !/^\+?[0-9\s().-]{7,30}$/.test(contactNumber.trim()) || password.length < 8) {
    return res.status(400).render('error', {
      message: 'Enter a name, valid email, department and valid phone number. Passwords must be at least 8 characters.'
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const student = await Student.create({ fullName, email, department, contactNumber, passwordHash });
    req.session.regenerate((regenerateError) => {
      if (regenerateError) {
        console.error('Failed to regenerate student session:', regenerateError);
        return res.status(500).render('error', { message: 'Profile created, but sign-in could not be started. Please sign in.' });
      }
      req.session.studentId = student._id.toString();
      req.session.studentName = student.fullName;
      req.session.save((error) => {
        if (error) {
          console.error('Failed to save student session:', error);
          return res.status(500).render('error', { message: 'Profile created, but sign-in could not be saved. Please sign in.' });
        }
        res.redirect(`/students/${student._id}`);
      });
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).render('error', { message: 'A profile already uses that email address.' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).render('error', { message: error.message });
    }
    console.error('Failed to create student profile:', error);
    res.status(500).render('error', { message: 'Could not create the student profile.' });
  }
});

app.post('/auth/login', requireDatabase, async (req, res) => {
  const { email, password } = req.body;
  if (!requiredFieldsPresent([email, password])) {
    return res.status(400).render('error', { message: 'Enter your email and password to sign in.' });
  }
  try {
    const student = await Student.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash');
    if (!student || !(await bcrypt.compare(password, student.passwordHash))) {
      return res.status(401).render('error', { message: 'Email or password is incorrect.' });
    }
    req.session.regenerate((error) => {
      if (error) {
        console.error('Failed to regenerate student session:', error);
        return res.status(500).render('error', { message: 'Could not sign in. Please try again.' });
      }
      req.session.studentId = student._id.toString();
      req.session.studentName = student.fullName;
      req.session.save((saveError) => {
        if (saveError) {
          console.error('Failed to save student session:', saveError);
          return res.status(500).render('error', { message: 'Could not save your sign-in. Please try again.' });
        }
        res.redirect('/');
      });
    });
  } catch (error) {
    console.error('Failed to sign in student:', error);
    res.status(500).render('error', { message: 'Could not sign in. Please try again.' });
  }
});

app.post('/auth/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Failed to end student session:', error);
      return res.status(500).render('error', { message: 'Could not sign out. Please try again.' });
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

app.get('/students/:id', async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).render('not-found', { message: 'That student ID is invalid.' });
  }
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).render('not-found', { message: 'Student profile not found.' });
    }
    const [lostItems, foundItems] = await Promise.all([
      LostItem.find({ reportedBy: student._id }).sort({ createdAt: -1 }),
      FoundItem.find({ reportedBy: student._id }).sort({ createdAt: -1 })
    ]);
    res.render('student', { student, lostItems, foundItems });
  } catch (error) {
    console.error('Failed to load student profile:', error);
    res.status(500).render('error', { message: 'Could not load the student profile.' });
  }
});

app.get('/lost-items', async (req, res) => {
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
  const filter = search ? {
    $or: ['itemName', 'category', 'lastSeenLocation'].map((field) => ({
      [field]: { $regex: escapeRegex(search), $options: 'i' }
    }))
  } : {};
  try {
    const lostItems = await LostItem.find(filter)
      .populate('reportedBy', 'fullName')
      .sort({ createdAt: -1 });
    res.render('lost-items', { lostItems, search });
  } catch (error) {
    console.error('Failed to load lost-item reports:', error);
    res.status(500).render('error', { message: 'Could not load lost-item reports.' });
  }
});

app.post('/lost-items', requireStudent, async (req, res) => {
  const { itemName, category, description, lastSeenLocation, dateLost } = req.body;
  if (!requiredFieldsPresent([itemName, category, description, lastSeenLocation]) ||
      !validDate(dateLost)) {
    return res.status(400).render('error', { message: 'Complete every lost-item field with a valid date.' });
  }
  if (!isValidId(req.session.studentId)) {
    return res.status(401).render('error', { message: 'Please sign in before reporting an item.' });
  }
  try {
    const student = await Student.findById(req.session.studentId);
    if (!student) {
      return res.status(404).render('not-found', { message: 'The selected student profile does not exist.' });
    }
    const item = await LostItem.create({
      itemName, category, description, lastSeenLocation, dateLost, reportedBy: student._id
    });
    res.redirect(`/lost-items/${item._id}`);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).render('error', { message: error.message });
    }
    console.error('Failed to create lost-item report:', error);
    res.status(500).render('error', { message: 'Could not save the lost-item report.' });
  }
});

app.get('/lost-items/:id', async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).render('not-found', { message: 'That lost-item ID is invalid.' });
  }
  try {
    const item = await LostItem.findById(req.params.id).populate('reportedBy', 'fullName email department');
    if (!item) {
      return res.status(404).render('not-found', { message: 'Lost-item report not found.' });
    }
    res.render('lost-item', { item });
  } catch (error) {
    console.error('Failed to load lost-item report:', error);
    res.status(500).render('error', { message: 'Could not load the lost-item report.' });
  }
});

app.get('/found-items', async (req, res) => {
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
  const filter = search ? {
    $or: ['itemName', 'category', 'foundLocation'].map((field) => ({
      [field]: { $regex: escapeRegex(search), $options: 'i' }
    }))
  } : {};
  try {
    const foundItems = await FoundItem.find(filter)
      .populate('reportedBy', 'fullName')
      .sort({ createdAt: -1 });
    res.render('found-items', { foundItems, search });
  } catch (error) {
    console.error('Failed to load found-item reports:', error);
    res.status(500).render('error', { message: 'Could not load found-item reports.' });
  }
});

app.post('/found-items', requireStudent, async (req, res) => {
  const { itemName, category, description, foundLocation, dateFound } = req.body;
  if (!requiredFieldsPresent([itemName, category, description, foundLocation]) ||
      !validDate(dateFound)) {
    return res.status(400).render('error', { message: 'Complete every found-item field with a valid date.' });
  }
  if (!isValidId(req.session.studentId)) {
    return res.status(401).render('error', { message: 'Please sign in before reporting an item.' });
  }
  try {
    const student = await Student.findById(req.session.studentId);
    if (!student) {
      return res.status(404).render('not-found', { message: 'The selected student profile does not exist.' });
    }
    const item = await FoundItem.create({
      itemName, category, description, foundLocation, dateFound, reportedBy: student._id
    });
    res.redirect(`/found-items/${item._id}`);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).render('error', { message: error.message });
    }
    console.error('Failed to create found-item report:', error);
    res.status(500).render('error', { message: 'Could not save the found-item report.' });
  }
});

app.get('/found-items/:id', async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).render('not-found', { message: 'That found-item ID is invalid.' });
  }
  try {
    const foundItem = await FoundItem.findById(req.params.id)
      .populate('reportedBy', 'fullName email department');
    if (!foundItem) {
      return res.status(404).render('not-found', { message: 'Found-item report not found.' });
    }
    const claims = await Claim.find({ foundItemId: foundItem._id })
      .populate('claimedBy', 'fullName email')
      .sort({ createdAt: -1 });
    res.render('found-item', { foundItem, claims });
  } catch (error) {
    console.error('Failed to load found-item report:', error);
    res.status(500).render('error', { message: 'Could not load the found-item report.' });
  }
});

app.post('/found-items/:id/claims', requireStudent, async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  if (!isValidId(id)) {
    return res.status(404).render('not-found', { message: 'That found-item ID is invalid.' });
  }
  if (!requiredFieldsPresent([reason]) || !isValidId(req.session.studentId)) {
    return res.status(400).render('error', { message: 'Sign in and explain why the item belongs to you.' });
  }
  try {
    const [foundItem, student] = await Promise.all([
      FoundItem.findById(id),
      Student.findById(req.session.studentId)
    ]);
    if (!foundItem) {
      return res.status(404).render('not-found', { message: 'Found-item report not found.' });
    }
    if (!student) {
      return res.status(404).render('not-found', { message: 'The selected student profile does not exist.' });
    }
    if (foundItem.status === 'Returned') {
      return res.status(409).render('error', { message: 'This item has already been returned and cannot be claimed.' });
    }
    if (foundItem.reportedBy.equals(student._id)) {
      return res.status(400).render('error', { message: 'The student who found the item cannot claim it.' });
    }
    await Claim.create({ foundItemId: foundItem._id, claimedBy: student._id, reason });
    res.redirect(`/found-items/${foundItem._id}`);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).render('error', { message: 'This student has already submitted a claim for this item.' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).render('error', { message: error.message });
    }
    console.error('Failed to submit item claim:', error);
    res.status(500).render('error', { message: 'Could not submit the claim.' });
  }
});

app.patch('/found-items/:id/status', requireStudent, async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(404).render('not-found', { message: 'That found-item ID is invalid.' });
  }
  if (req.body.status !== 'Returned') {
    return res.status(400).render('error', { message: 'Found items can only be marked Returned.' });
  }
  try {
    const item = await FoundItem.findOneAndUpdate(
      { _id: id, reportedBy: req.session.studentId, status: 'Available' },
      { $set: { status: 'Returned' } },
      { new: true }
    );
    if (!item) {
      const existing = await FoundItem.findById(id);
      if (!existing) {
        return res.status(404).render('not-found', { message: 'Found-item report not found.' });
      }
      if (!existing.reportedBy.equals(req.session.studentId)) {
        return res.status(403).render('error', { message: 'Only the student who reported this item can update it.' });
      }
      return res.status(409).render('error', { message: 'This item has already been returned.' });
    }
    res.redirect(`/found-items/${item._id}`);
  } catch (error) {
    console.error('Failed to update found-item status:', error);
    res.status(500).render('error', { message: 'Could not update the found-item status.' });
  }
});

app.patch('/claims/:id/status', requireStudent, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!isValidId(id)) {
    return res.status(404).render('not-found', { message: 'That claim ID is invalid.' });
  }
  if (!['Approved', 'Rejected'].includes(status) || !isValidId(req.session.studentId)) {
    return res.status(400).render('error', { message: 'Choose a valid claim decision while signed in.' });
  }
  try {
    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).render('not-found', { message: 'Claim not found.' });
    }
    const foundItem = await FoundItem.findById(claim.foundItemId);
    if (!foundItem) {
      return res.status(404).render('not-found', { message: 'The found item for this claim no longer exists.' });
    }
    if (!foundItem.reportedBy.equals(req.session.studentId)) {
      return res.status(403).render('error', { message: 'Only the student who reported this found item can review its claims.' });
    }
    if (claim.status !== 'Pending') {
      return res.status(409).render('error', { message: 'This claim has already been reviewed.' });
    }
    if (status === 'Approved') {
      const updatedItem = await FoundItem.findOneAndUpdate(
        { _id: foundItem._id, reportedBy: req.session.studentId, status: 'Available' },
        { $set: { status: 'Returned' } },
        { new: true }
      );
      if (!updatedItem) {
        return res.status(409).render('error', { message: 'This item has already been returned or is no longer available.' });
      }
    }
    const updatedClaim = await Claim.findOneAndUpdate(
      { _id: claim._id, status: 'Pending' },
      { $set: { status } },
      { new: true }
    );
    if (!updatedClaim) {
      if (status === 'Approved') {
        await FoundItem.updateOne(
          { _id: foundItem._id, reportedBy: req.session.studentId, status: 'Returned' },
          { $set: { status: 'Available' } }
        );
      }
      return res.status(409).render('error', { message: 'This claim was reviewed by another request. Reload and try again.' });
    }
    if (status === 'Approved') {
      await Claim.updateMany(
        { foundItemId: foundItem._id, _id: { $ne: claim._id }, status: 'Pending' },
        { $set: { status: 'Rejected' } }
      );
    }
    res.redirect(`/found-items/${foundItem._id}`);
  } catch (error) {
    console.error('Failed to review claim:', error);
    res.status(500).render('error', { message: 'Could not update the claim status.' });
  }
});

app.use((req, res) => {
  res.status(404).render('not-found', { message: 'The page you requested could not be found.' });
});

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => console.log('Connected to MongoDB.'))
  .catch((error) => {
    console.error('MongoDB is unavailable. The UI is running in preview mode; start MongoDB to enable database features.', error.message);
  });

app.listen(PORT, () => console.log(`Campus Lost & Found running at http://localhost:${PORT}`));
