const express = require('express');

const app = express();

app.get('/',(req,res) => {
  res.send('norm')
})

app.listen(8000,()=>{
  console.log('norm')
})
