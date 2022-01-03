const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser());

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

app.post('/',(req,res) => {
  let data = [req.body.id,req.body.name,req.body.isDone];
  db.query('INSERT INTO tasks (id,name,isDone) VALUES (?,?,?)',data,(err,result,fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(8000,()=>{
  console.log('norm')
});
