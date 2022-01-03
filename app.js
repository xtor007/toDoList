const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'webdb'
});

db.connect(function(err){
  if(err) {
    console.log(err);
  } else {
    console.log('db connect');
  }
});

app.get('/',(req,res) => {
  db.query('SELECT * FROM tasks',function(err,result,fields){
    res.send(result)
  });
});

app.listen(8000,()=>{
  console.log('norm')
});
