const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Cors = require('cors');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Nuptials"
});

router.use(bodyParser.urlencoded({extended:true}));
router.use(Cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

con.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });

router.post('/newuser', (req, res) => {
        const Profilefor = req.body.Profilefor;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const gender = req.body.gender;
        const religionUser = req.body.religionUser;
        const mothertongUser = req.body.mothertongUser;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const dob = req.body.dob;
        const city = req.body.city;
    con.query("INSERT INTO register (firstn, lastn, profilefor, gender, religion, mothertong, email, mobile, dob, city) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
    [firstName, lastName, Profilefor, gender, religionUser, mothertongUser, email, mobile, dob, city], (err, res) => {
        console.log(err);
    })
})

router.post('/userdata', (req, res) => {
    const livewith = livewith;
    const maritalStatus = maritalStatus;
    const children = children;
    const diet = diet;
    const subCommunity = subCommunity;
    const qualification = qualification;
    const workwith = workwith;
    const profession = profession;
    const income = income;
    const about = about;
    con.query("INSERT INTO userdata (")
})

module.exports=router
