const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mysql = require("mysql");

const findMatch = require('./routes/register/findMatch');
const register = require('./routes/register/register')
app.use('/register', findMatch);
app.use('/register', register)

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "Nuptials"
// });



// con.connect(function(error){
//     if(!!error){
//       console.log(error);
//     }else{
//       console.log('Connected!:)');
//     }
//   });

app.listen(3004, () => {
    console.log("Listening on 3004");
});