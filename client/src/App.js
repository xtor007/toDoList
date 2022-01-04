import axios from 'axios'
import React from 'react'
import Task from './component/task.jsx'

function App() {

  let [list,setList] = React.useState([]);

  React.useEffect(() => {
    let data = axios.get('http://localhost:8000/')
    data.then(res => {
      setList(res.data);
    })
  },[]);

  let inName = React.createRef()

  let pushData = () => {
    let post = axios.post('http://localhost:8000/',{
      id: null,
      name: inName.current.value,
      isDone: 0
    })
    window.location.reload()
  }

  return (
    <div className="site">
      <h1>WHAT YOUR TASKS?</h1>
      <div className="addTask">
        <input ref={inName} placeholder="Write here ..."/>
        <button onClick={pushData}>Add</button>
      </div>
      {
        list.map(task => {
          return <Task id={task.id} name={task.name}/>
        })
      }
    </div>
  );
}

export default App;
