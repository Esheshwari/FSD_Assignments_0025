console.log("Server is running on port 3000");

// import the express module

const express = require('express');



//  create an instance of express
const app = express();




app.get('/', (req, res) => {
    res.send('Hello, this is Node.js code running in the Amazon Clone App!');
})


app.get('/user', (req, res) => {
    const users_data = [
        {
      "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg"
    },
    {
      "id": 2,
      "email": "janet.weaver@reqres.in",
      "first_name": "Janet",
      "last_name": "Weaver",
      "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
    {
      "id": 3,
      "email": "emma.wong@reqres.in",
      "first_name": "Emma",
      "last_name": "Wong",
      "avatar": "https://reqres.in/img/faces/3-image.jpg"
    },
    {
      "id": 4,
      "email": "eve.holt@reqres.in",
      "first_name": "Eve",
      "last_name": "Holt",
      "avatar": "https://reqres.in/img/faces/4-image.jpg"
    },
    {
      "id": 5,
      "email": "charles.morris@reqres.in",
      "first_name": "Charles",
      "last_name": "Morris",
      "avatar": "https://reqres.in/img/faces/5-image.jpg"
    },
    {
      "id": 6,
      "email": "tracey.ramos@reqres.in",
      "first_name": "Tracey",
      "last_name": "Ramos",
      "avatar": "https://reqres.in/img/faces/6-image.jpg"
    }
    ];
    res.json(users_data);
})  

app.get('/download-logo', (req, res) => {       
    res.download(__dirname + '/facebook.jpg');
})


app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/About.html');
})


//  Attaching the server to a port


app.listen(3000, () => {
    console.log('Heyyy Server is running on http://localhost:3000');
})

//  run the server

// node index.js

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/register', (req, res) => {

    console.log(req.body);

    res.send(`Thank you for registering, ${req.body.firstName} ${req.body.lastName}!`);

});



/*
HTTP Methods 
GET - to retrieve data from the server
POST - to submit data to the server
DELETE - to delete data from the server
PUT/PATCH - to update data on the server
*/