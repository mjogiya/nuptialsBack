const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Cors = require('cors');
const mysql = require('mysql');
const fileupload = require("express-fileupload");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Nuptials"
});
router.use(fileupload());
router.use(express.static("files"));

router.use(bodyParser.urlencoded({extended:true}));
router.use(Cors({
  origin: 'http://localhost:3001',
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
  var Profilefor;
  var firstName;
  var lastName 
  var gender;
  var religionUser;
  var mothertongUser ;
  var email;
  var mobile;
  var dob ;
  var city;
router.post('/newuser', (req, res) => {
        Profilefor = req.body.Profilefor;
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        gender = req.body.gender;
        religionUser = req.body.religionUser;
        mothertongUser = req.body.mothertongUser;
        email = req.body.email;
        mobile = req.body.mobile;
        password = req.body.password;
        dob = req.body.dob;
        city = req.body.city;
})

router.post('/userdata', (req, res) => {
    const livewith = req.body.livewith;
    const maritalStatus = req.body.maritalStatus;
    const children = req.body.children;
    const diet = req.body.diet;
    const subCommunity = req.body.subCommunity;
    const qualification = req.body.qualification;
    const workwith = req.body.workwith;
    const profession = req.body.profession;
    const income = req.body.income;
    const about = req.body.about;

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let registerDate = year + "-" + month + "-" + date;

    const newpath = "../nuptials/public/usersimages/";
    const adminpath = "../../Admin Nuptials/client/public/usersimages/"
    const file = req.files.file;
    const filename = file.name;
    const file2 = req.files.file;
    const filename2 = file2.name;
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }
      res.status(200).send({ message: "File Uploaded", code: 200 });
    });
    con.query("INSERT INTO register (firstn, lastn, profilefor, gender, religion, mothertong, email, mobile, password, dob, city, request, register, profileimage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", 
    [firstName, lastName, Profilefor, gender, religionUser, mothertongUser, email, mobile, password, dob, city, 'Pending', registerDate, `/usersimages/${filename}`], (err, res) => {
    });
    con.query("INSERT INTO userdata (email, mobile, livewith, maritalstatus, children, diet, subcommunity, qualification, workin, profession, income, about) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [email, mobile, livewith, maritalStatus, children, diet, subCommunity, qualification, workwith, profession, income, about], (err, res) => { 
    });
    file2.mv(`${adminpath}${filename2}`, (err) => {
      
    });
})

module.exports=router;
