const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mysql = require("mysql");

const findMatch = require('./routes/register/findMatch');
const register = require('./routes/register/register');
const user = require('./routes/users/login');
app.use('/register', findMatch);
app.use('/register', register)
app.use('/user', user);

app.listen(3004, () => {
    console.log("Listening on 3004");
});