const express = require("express");
const bodyParser = require("body-parser");
const Cors = require('cors');
const app = express();
const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Nuptials"
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(Cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


con.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });

app.post('/register/new', (req, res) => {
  const lookingfor = req.body.lookingfor1;
  const startage = req.body.startage1;
  const endage = req.body.endage1;
  const religion = req.body.religion1;
  const mothertong = req.body.mothertong1;
  
  const insert = "INSERT INTO findmatch (lookingfor, startage, endage, religion, mothertong) VALUES(?, ?, ?, ?, ?);";
  con.query(insert, [lookingfor, startage, endage, religion, mothertong], (err, result) => {
    console.log(err);
    
  });
});



app.listen(3001, () => {
    console.log("Listening on 3001");
});