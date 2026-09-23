// const express = require('express');
// const bodyParser = require('body-parser');
// const ejs = require('ejs');
// const mongoose = require('mongoose');


// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// app.set('view engine', 'ejs'); // Set EJS as the view engine    


// mongoose.
//     connect('mongodb+srv://admin:admin%40123@cluster0.p1jxd0c.mongodb.net/?appName=Cluster0').
//     then(() => {
//         console.log('Connected to MongoDB');
//     }).catch((err) => {
//         console.error('Error connecting to MongoDB:', err);
//     });


// app.get('/', (req, res) => {
//     res.json({ message: 'Hello World' });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000 at http://localhost:3000');
// });


// run



// MERN:
// - M: MongoDB
// - E: Express
// - R: React.js
// - N: Node.js

// DB: Database (Permanent Storage)
// - Relational (SQL)
//     - Tables & Rows
//     - This is used when the structure/schema is defined
//     - Eg: MySQL, PostgreSQL, etc
// - Non-Relational (No-SQL)
//     - Collections & Documents
//     - This is used when the structure/schema is unclear
//     - Eg: MongoDB, AWS DynamoDB

// Driver:
// - Mongoose: ODM (Object Data Modeling) for MongoDB

// Example for a Mongoose Schema:
// - User
//     - firstName: String
//     - lastName: String
//     - email: String
//     - phoneNumber: Number

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config()


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs'); // Set EJS as the view engine    


mongoose.
    connect(process.env.MONGODB_URL).
    then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const User= mongoose.model('User', {
    firstName:String,
    lastName:String,
    email:String,
    Phone:Number,
});
const Child= mongoose.model('Child', {
    firstName:String,
    lastName:String,
    email:String,
    Phone:Number,
});
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}  at http://localhost:${PORT}`);
});
