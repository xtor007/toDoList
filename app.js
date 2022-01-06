const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const schema = require('./schema.js');

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

const root = {
  getAll: () => {
    let notr = [{id:1,name:"fdvsd",isDone:1}]
    // db.query('SELECT * FROM tasks',function(err,result,fields){
    //   console.log(result)
    //   var string=JSON.stringify(result);
    //   console.log(string)
    //   console.log(JSON.parse(string))
    //   return JSON.parse(string);
    // });
    return notr
  },
  createTasks: ({input}) => {

  }
}

app.use('/graphql',graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}))


//
app.get('/',(req,res) => {
  db.query('SELECT * FROM tasks',function(err,result,fields){
    res.send(result)
  });
});
//
// app.post('/',(req,res) => {
//   let data = [req.body.id,req.body.name,req.body.isDone];
//   db.query('INSERT INTO tasks (id,name,isDone) VALUES (?,?,?)',data,(err,result,fields) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });
//
// app.post('/del',(req,res) => {
//   db.query('DELETE FROM tasks WHERE id=?',req.body.id,(err,result,fields) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });
//
// app.post('/upd',(req,res) => {
//   let data = [req.body.isDone,req.body.id];
//   db.query('UPDATE tasks SET isDone = ? WHERE id = ?',data,(err,result,fields) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

app.listen(8000,()=>{
  console.log('norm')
});
