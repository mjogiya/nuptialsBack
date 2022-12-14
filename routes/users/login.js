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

router.post('/login', (req, res) => {
  const d = new Date();
  let text = d.toLocaleString();
  console.log(text);
  con.query("SELECT * FROM register where email= ? AND  password = ? AND request='Approved' ", [req.body.email, req.body.password], (err, result) => {
    if(result.length>0) {
        con.query("UPDATE register set lastLogin= ? where email= ?;", [text, req.body.email], (errin, result) => {
          console.log(errin);
        });
        req.session.user = result;
        res.send({userLogedin: true, result: result});
    } else {
        res.send({userLogedin: false});
    }

  });
  
});
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send({userLogedin: false})
});
router.post('/search', (req, res) => {
  con.query("SELECT register.*, userdata.* FROM register INNER JOIN userdata ON register.email = userdata.email where register.firstn= ? OR register.lastn= ? OR register.mobile = ? OR register.email = ?;", [req.body.firstName, req.body.firstName, req.body.firstName, req.body.firstName], (err, result) => {
    console.log(err);
    res.send(result);
  })
})
router.post('/AllUsers', (req, res) => {
  con.query("SELECT register.*, userdata.* FROM register INNER JOIN userdata ON register.email = userdata.email;",
  (err, result) => {   
    console.log(err);  
    res.send(result);
  })
 
})


module.exports=router
