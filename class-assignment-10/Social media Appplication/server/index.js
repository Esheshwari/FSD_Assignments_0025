const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs'); // Set EJS as the view engine 

app.get('/',(req,res)=>{
    res.json({
        status:'SUCCESS',
        message:'server runnning successfuly.'
    })
})



app.listen(4000, () => {
   console.log('Server is running on port 4000 at http://localhost:4000');
 });
