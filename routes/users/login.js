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
  con.query("SELECT * FROM register where email= ? AND  password = ? AND request='Approved' ", [req.body.email, req.body.password], (err, result) => {
    console.log(err);
    console.log(result);
    if(result.length>0) {
        req.session.user = result;
        res.send({userLogedin: true});
    } else {
        res.send({userLogedin: false});
    }

  });
  
});


module.exports=router
