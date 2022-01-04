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
    if (inName.current.value != "") {
      let post = axios.post('http://localhost:8000/',{
        id: null,
        name: inName.current.value,
        isDone: 0
      })
      window.location.reload()
    }
  }

  let changeDone = (id,isDone) => {
    let post = axios.post('http://localhost:8000/upd',{
      id: id,
      isDone: !isDone
    })
    window.location.reload()
  }

  let isChecked = (isDone) => {
    if (isDone) {
      return "checked"
    } else {
      return ""
    }
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
          return <div className="check-task">
            <input type="checkbox" onClick={() => {changeDone(task.id,task.isDone)}} checked={isChecked(task.isDone)}/>
            <Task id={task.id} name={task.name} isDone={task.isDone}/>
          </div>
        })
      }
    </div>
  );
}

export default App;
