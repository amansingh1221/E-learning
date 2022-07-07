const { createPool } = require("mysql");
const mysql = require('mysql2');
const express = require("express");
const app = express();
const bodyparser = require("body-parser");


const pool = createPool({
  host:"localhost",
  user:"root",
  password:"Ayush#12345",
  database:"e_learning",
  connectionLimit :10
})

pool.query("select * from course", function(err, result){
    if (err) { throw err}
    else { console.log(result)}
})