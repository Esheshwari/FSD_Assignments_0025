// what is framework 
//  framework is a set of tools and libraries that help developers to build web applications 
// faster and easier. It provides a structure for the application and helps to organize the code in a better way. 
// It also provides a set of pre-built functionalities that can be used to build the application.

// frameworks in node js are express.js, koa.js, hapi.js, sails.js, nest.js etc.
 
 
 
// introduce free AP 
// i.e https://reqres.in/api/users


   
// first server in Node.js using Express.js framework
// first we need to initialize a new Node.js project by running the following command in the terminal:


// npm init -y

//npm install express


// importing express module
const express = require('express');


// import body-parser module to parse the request body
const bodyParser = require('body-parser');
 

// creating an express app

const app = express();
app.use(bodyParser.json());

// simple GET route 
// app.get('/rvu-data', (req, res) => {
//     const danishData = {
//         name: 'Danish Khan',
//         age: 25,
//         email: 'danish@gmail.com'
//     };
//     res.json(danishData);
//     // res.send('Hello World! This is my first Node.js server.');
// }); 

// '/' is the root route of the server. When a GET request is made to this route, 
// the server responds with 'Hello World! This is my first Node.js server.'  
  
// (req, res) => { ... } is a callback function that takes two parameters: req (the request object) and res (the response object). 
// The res.send() method sends a response back to the client.
// send is the method that sends the response back to the client. 
// It can send a string, an object, or an array as a response. 
// In this case, we are sending a string 'Hello World! This is my first Node.js server.' as a response.


// now  copy data from https://reqres.in/api/users and paste it in the above code and send it back to 
// the client when a GET request is made to the '/rvu-data' route of the server.
//  The data is an object with three properties: name, age, and email.
//  The res.json() method sends the object as a JSON response back to the client.
app.get('/', (req, res) => {
    const danishData = {
        name: 'Danish',
        age: 25,
        email: ' '
    };
    res.json(danishData);
    // res.send('Hello World! This is my first Node.js server.');
})

app.get('/users', (req, res) => {
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
    ]
    res.json(users_data );
    // res.send('Hello World! This is my first Node.js server.');
});


//  create html file to add UI for routes and reder here

// app.get('/about', (req, res) => {
//     res.sendFile(__dirname + '/About.html');
// })   

//__dirname is a global variable in Node.js that returns the directory name of the current module. 
// It is used to get the absolute path of the file. In this case, we are using it to get the absolute
//  path of the index.html file and send it as a response back to the client when a GET request is made to the root route of the server.

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
    ]
app.get('/oddData', (req, res) => {

    const oddUsers = users_data.filter(user => user.id % 2 !== 0);

    res.json(oddUsers);

});
app.get('/evenData', (req, res) => {

    const evenUsers = users_data.filter(user => user.id % 2 === 0);

    res.json(evenUsers);

});


app.get('/download-logo', (req, res) => {
    res.download(__dirname + '/instaLogo.jpg');
           
});



app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});



app.get('/api/register', (req, res) => {
    res.sendFile(__dirname + '/About.html');
});



// here we are posting the value X and Y regard less of the value entered in the input field of the form in register.
// html file. We can get the value entered in the input field by using req.body.firstName and req.body.lastName.
//  But to do that we need to use body-parser middleware. 

// middleware 
app.use(bodyParser.urlencoded({ extended: false }));



app.post('/api/register', (req, res) => {
    // const firstName ='X' , lastName = 'Y';
    // res.send(`Thank you for registering, ${firstName} ${lastName}!`);
    console.log(req.body);
    res.send(`Thank you for registering, ${req.body.firstName} ${req.body.lastName}!`);
}); 

// Attaching the server to a port

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})       


// run the server

// node filename.js


/*
## HTTP Methods: (REST APIs)
- GET: To retrieve data from the server
- POST: To send data to the server
-PUT/PATCH: To update data on the server
- DELETE: To delete data from the server
*/


//  update app.get with some data to send back to the client


// first API which retur  json data to the client when a GET request is made to the root route of the server. The data is an object with three properties: name, age, and email. The res.json() method sends the object as a JSON response back to the client.

// app.get('/data', (req, res) => {
//     const danishData = {
//         name: 'John Doe',
//         age: 25,
//         email: 'danish@gmail.com'
//     };
//     res.json(danishData);
// });
  


// do this and refresh and check it wont wotk then do restart the server and check 
// it will work now because we have added a new route to the server and we need to restart the server to see the changes.
// nodemon 