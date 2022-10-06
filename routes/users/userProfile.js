const express = require("express");
const bodyParser = require("body-parser");
const Cors = require('cors');
const router = express.Router();
const mysql = require("mysql");
// const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Nuptials"
});

router.use(bodyParser.urlencoded({extended:true}));
router.use(Cors({
  origin: 'http://localhost:3001',
  methods: ["POST", "GET"],
  credentials: true,
}));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(session({
    key: "userId",
    secret: "nuptials",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 *1000
    }
}));

con.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });



  router.post('/profile', (req, res) => {
    con.query("SELECT register.*, userdata.* FROM register INNER JOIN userdata ON register.email = userdata.email where register.email = ?;", [req.body.email], (err, result) => {
        res.send(result);
    })
  })
router.post('/settings', (req, res) => {
  con.query("SELECT register.*, userdata.* FROM register INNER JOIN userdata ON register.email = userdata.email where register.email = ?;", [req.body.email], (err, result) => {
      res.send(result);
  })
})
router.post('/updatePassword', (req, res) => {
    con.query("UPDATE register set password = ? where email = ?;", [req.body.password, req.body.email], (err, result) => {
        res.send(result);
    })
})
router.post('/updateSettings', (req, res) => {
  const livewith = req.body.livewith;
  con.query("UPDATE register set accounttype=?, city=?, mothertong=? where email=? ", [req.body.accouttype, req.body.city, req.body.mothertong, req.body.email], (err, result) => {
    console.log(err);
  });
  con.query("UPDATE userdata set livewith=?, maritalstatus=?, children=? where email=?", [req.body.livewith, req.body.maritalstatus, req.body.children, req.body.email], (err, result) => {
    console.log(err);
  });
})
router.post('/updateProfile', (req, res) => {
  con.query("UPDATE userdata set income=?, diet=?, subcommunity=?, qualification=?, workin=?, profession=?, instagram=?, linkedin=?, facebook=?, about=? where email=? ", [req.body.income,
    req.body.diet,
    req.body.subcommunity,
    req.body.qualification,
    req.body.workin,
    req.body.profession,
    req.body.instagram,
    req.body.linkedin,
    req.body.facebook,
    req.body.about,
    req.body.email], (err, result) => {
      console.log(err);
    })
})
router.post('/userDetails', (req, res) => {
  con.query("SELECT register.*, userdata.* FROM register INNER JOIN userdata ON register.email = userdata.email where register.email= ?;",
  [req.body.email],  (err, result) => {   
      res.send(result);
  })
 
})

module.exports=router
