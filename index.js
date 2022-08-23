const express = require("express");
const app = express();
const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Nuptials"
});

con.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });
app.get('/', (req, res) => {
    var db = req.co;
    const sqlinsert = "INSERT INTO login(username, email, password) VALUES('Yash', 'yash@gmail.com', '12345');";
    con.query(sqlinsert, (err, result) => {

        res.send("Data Inserted :))");
    });

    // con.query('SELECT * FROM login',function(err,rows){
    //   //if(err) throw err;
      
    //   // console.log('Data received from Db:\n');
    //   console.log(rows);
    //   var data = rows;
    //   res.send(rows);
    //   res.send("Outside--"+data.username);
    //   // res.render('userIndex', { title: 'User Information', dataGet: data });
    // });
});

app.listen(3001, () => {
    console.log("Listening on 3001");
});