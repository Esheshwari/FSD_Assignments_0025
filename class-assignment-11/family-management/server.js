require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const User = require('./models/User');
const Child = require('./models/child');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Database Connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Helper: Safely validate ObjectId format to prevent crash on invalid IDs
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ==========================================
// USER ROUTES
// ==========================================

// BONUS: GET /users/search/:name — Search users by first name
app.get('/users/search/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const users = await User.find({
      firstName: { $regex: name,$options: 'i' }
    });
    res.render('users', { users, searchQuery: name, error: null });
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to search users.' });
  }
});

// BONUS: GET /users — Display all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users', { users, searchQuery: null, error: null });
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to fetch users.' });
  }
});

// POST /users — Create a new user
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    
    // Validation
    if (!firstName || !lastName || !email || !phone) {
      const users = await User.find({});
      return res.status(400).render('users', {
        users,
        searchQuery: null,
        error: 'All fields (First Name, Last Name, Email, Phone) are required.'
      });
    }

    const newUser = new User({ firstName, lastName, email, phone });
    await newUser.save();
    res.redirect(`/users/${newUser._id}`);
  } catch (err) {
    res.status(500).render('error', { message: 'Server error while creating user.' });
  }
});

// GET /users/:id — Find user by ID and display profile + children list
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).render('404', { message: 'Invalid User ID format.' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).render('404', { message: 'User ID does not exist.' });
    }

    // Dynamic relationship query using parentId
    const children = await Child.find({ parentId: user._id });

    res.render('profile', { user, children, error: null, success: null });
  } catch (err) {
    res.status(500).render('error', { message: 'Database error fetching profile.' });
  }
});

// BONUS: GET /users/:id/children/count — Return count of children for user
app.get('/users/:id/children/count', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid User ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const count = await Child.countDocuments({ parentId: id });
    res.json({ userId: id, userName: `${user.firstName} ${user.lastName}`, childrenCount: count });
  } catch (err) {
    res.status(500).json({ error: 'Database error counting children.' });
  }
});

// ==========================================
// CHILD ROUTES
// ==========================================

// POST /users/:id/children — Add a child to a specific user
app.post('/users/:id/children', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).render('404', { message: 'Invalid User ID.' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).render('404', { message: 'Cannot add child. User does not exist.' });
    }

    const { firstName, lastName, age, email } = req.body;

    if (!firstName || !lastName || age === undefined || age === '') {
      const children = await Child.find({ parentId: user._id });
      return res.status(400).render('profile', {
        user,
        children,
        error: 'First Name, Last Name, and Age are required fields for a child.',
        success: null
      });
    }

    const newChild = new Child({
      firstName,
      lastName,
      age: Number(age),
      email: email || '',
      parentId: user._id
    });

    await newChild.save();
    res.redirect(`/users/${user._id}`);
  } catch (err) {
    res.status(500).render('error', { message: 'Error adding child.' });
  }
});

// GET /users/:id/children — Display only children belonging to user
app.get('/users/:id/children', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).render('404', { message: 'Invalid User ID.' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).render('404', { message: 'User not found.' });
    }

    const children = await Child.find({ parentId: id });
    res.render('profile', { user, children, error: null, success: null });
  } catch (err) {
    res.status(500).render('error', { message: 'Error fetching children.' });
  }
});

// MAIN THINKING CHALLENGE: GET /users/:id/children/:childId
// Check whether child.parentId matches req.params.id
app.get('/users/:id/children/:childId', async (req, res) => {
  const { id, childId } = req.params;

  if (!isValidObjectId(id) || !isValidObjectId(childId)) {
    return res.status(404).render('404', { message: 'Invalid ID format provided.' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).render('404', { message: 'Parent User Not Found.' });
    }

    const child = await Child.findById(childId);
    if (!child) {
      return res.status(404).render('404', { message: 'Child Not Found.' });
    }

    // Verification check: Does this child belong to THIS user?
    if (child.parentId.toString() !== user._id.toString()) {
      return res.status(403).render('error', {
        message: `Access Denied: Child "${child.firstName}" does not belong to User "${user.firstName} ${user.lastName}".`
      });
    }

    res.render('child-detail', { user, child });
  } catch (err) {
    res.status(500).render('error', { message: 'Database query error.' });
  }
});

// GET /children/:id/edit — Render edit form
app.get('/children/:id/edit', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).render('404', { message: 'Invalid Child ID.' });
  }

  try {
    const child = await Child.findById(id);
    if (!child) {
      return res.status(404).render('404', { message: 'Child Not Found.' });
    }

    res.render('edit-child', { child, error: null });
  } catch (err) {
    res.status(500).render('error', { message: 'Error fetching child details.' });
  }
});

// PATCH /children/:id — Update child info
app.patch('/children/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).render('404', { message: 'Invalid Child ID.' });
  }

  try {
    const { firstName, lastName, age, email } = req.body;

    if (!firstName || !lastName || age === undefined || age === '') {
      const child = await Child.findById(id);
      return res.status(400).render('edit-child', {
        child,
        error: 'First name, last name, and age cannot be empty.'
      });
    }

    const updatedChild = await Child.findByIdAndUpdate(
      id,
      { firstName, lastName, age: Number(age), email },
      { new: true, runValidators: true }
    );

    if (!updatedChild) {
      return res.status(404).render('404', { message: 'Child Not Found.' });
    }

    res.redirect(`/users/${updatedChild.parentId}`);
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to update child details.' });
  }
});

// DELETE /children/:id — Remove a child from MongoDB
app.delete('/children/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).render('404', { message: 'Invalid Child ID.' });
  }

  try {
    const deletedChild = await Child.findByIdAndDelete(id);
    
    if (!deletedChild) {
      return res.status(404).render('404', { message: 'Child Not Found.' });
    }

    res.redirect(`/users/${deletedChild.parentId}`);
  } catch (err) {
    res.status(500).render('error', { message: 'Error deleting child.' });
  }
});

// Home route redirect
app.get('/', (req, res) => res.redirect('/users'));

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page Not Found' });
});

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});