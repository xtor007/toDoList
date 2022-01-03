import axios from 'axios'
import React from 'react'
import Task from './component/task.jsx'

function App() {

  let [list,setList] = React.useState([]);

  let data = axios.get('http://localhost:8000/')
  data.then(res => {
    setList(res.data);
  });

  return (
    <div className="site">
      <h1>WHAT YOUR TASKS?</h1>
      <div className="addTask">
        <input placeholder="Write here ..."/>
        <button>Add</button>
      </div>
      <Task />
    </div>
  );
}

export default App;
