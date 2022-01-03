import React from 'react'
import Task from './component/task.jsx'

function App() {
  return (
    <div class="site">
      <h1>WHAT YOUR TASKS?</h1>
      <div class="addTask">
        <input placeholder="Write here ..."/>
        <button>Add</button>
      </div>
      <Task />
    </div>
  );
}

export default App;
