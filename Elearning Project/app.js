const { createPool } = require("mysql");
const mysql = require('mysql2');
const ejs = require("ejs");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyparser.json());
const alert = require('alert');
var succl = " ";
var succr = ' ';
var succc = ' ';


const pool = createPool({
  host:"localhost",
  user:"root",
  password:"Hajaram@1999",
  database:"dbms",
  connectionLimit :10
})




 app.get("/", function(req, res){
     res.render("home.ejs", {successl :  succl, successr: succr, successc : succc});
    });

    app.get("/course", function(req, res){
        res.render("course.ejs", {successl : succl, successr : succr, successc : succc});
       });


app.get("/home", function(req, res){
      res.send("Home page get successfully ");
    }) 
app.post("/login", function(req, res){
        const Uname = req.body.username;
        const pass = req.body.password;
        pool.query("select password from account where username = ? ",[Uname], function(err, result){
            if(err){throw err;}
            else {  
              console.log(result.length);
              if(result.length > 0){
                var string=JSON.stringify(result);
                var json =  JSON.parse(string);
                const pp = json[0].password;
             
                if(pp == pass){
                const succl = "Login successfully !";
                res.render("login.ejs", {successl : succl, successr : succr, successc : succc});    
                }
                else {
                const succl = "password did not match !";
                res.render("login.ejs", {successl : succl, successr : succr, successc : succc});
                }
             }
             else {
             const succl = "user not found";
             res.render("login.ejs", {successl : succl, successr : succr, successc : succc});
             }
            }    
        })
})


app.post("/register", function(req, res){
  const naam = req.body.name;
  const Uname = req.body.username;
  const pass = req.body.password;
  const Cpass = req.body.confirmpassword;
  const Cnumber = req.body.contactnumber;
  pool.query("select password from account where username = ? ",[Uname], function(err, result){
    if(err){throw err;}
    else {  
      console.log(result.length);

      
    if (pass === Cpass && Cnumber.toString().length === 10 && pass.toString().length >=4 && result.length === 0 ) {
      const qu = "insert into student ( username, name,  contact_no) values (? , ?, ?)";
      pool.query(qu, [Uname, naam, Cnumber]  , function(err, result){
          if(err){throw err;}
         
      });
        
      const que = "insert into account ( username,  password) values (? , ?)";
      pool.query(que, [Uname, pass], function(err, result){
          if(err){throw err;}
          else {   const succl = 'Registered Successfully ! login now';
              res.render("login.ejs", {successl : succl, successr : succr, successc : succc});}
      });
        }

       else if (result.length >0 ) {
         const succr = "username already exit , try different";
         res.render("register.ejs", {successl : succl, successr : succr, successc : succc});
     
        }
        else if (Cnumber.toString().length != 10){
          const succr = 'length of contact number should be 10';
          res.render("register.ejs", {successl : succl, successr : succr, successc : succc});
        }
        else if (pass.toString().length< 4){
          const succr = 'length of password should be >=4';
          res.render("register.ejs", {successl : succl, successr : succr, successc : succc});
        }
        else if (pass != Cpass) {
          const succr = 'Password did not match ! ';
          res.render("register.ejs", {successl : succl, successr : succr, successc : succc});
        }

      }});

    })


    app.post("/fp", function(req, res){
      const sid = req.body.studentid;
      const Uname = req.body.username;
      const pass = req.body.password;
      const Cpass = req.body.confirmpassword;
      const Cnumber = req.body.contactnumber;
    
      pool.query("select student_id from student where username = ? and contact_no = ?", [Uname, Cnumber], function(err, results){
        if (err){ throw err}
        else {
          if(results.length >0){
          var string=JSON.stringify(results);
          var json =  JSON.parse(string);
          const pp = json[0].student_id;
          console.log(pp);
           if( Cnumber.toString().length ==10  && pass == Cpass && pp == sid){
          
            pool.query("update account set password = ? where username = ?", [pass, Uname], function(err, result){
              if (err){ throw err}
              else {
                const succc = 'Yeah ! password updated successfully ';
                res.render('forgotpass.ejs', {successl : succl, successr : succr, successc : succc});
              }
            })
         

           }
           else {
             const succc = 'No data found ! Enter a valid details';
             res.render('forgotpass.ejs', {successl : succl, successr : succr, successc : succc})
           }
          } 
          else {
            const succc = 'No data found ! Enter a valid details';
            res.render('forgotpass.ejs', {successl : succl, successr : succr, successc : succc})
          }

        }
      })


    })
      


app.listen(3000, function(err){
  if(err) { throw err}
  else {
    console.log("Server started on port 3000");
  }
})