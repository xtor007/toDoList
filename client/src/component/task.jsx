import React from 'react';
import axios from 'axios';

let deleteTask = (id) => {
  let post = axios.post('http://localhost:8000/del',{id: id})
  window.location.reload()
}


let Task = (props) => {
  if (props.isDone == 1) {
    return (
      <div className="task _done">
        <p>{props.name}</p>
        <div>
          <button onClick={() => {deleteTask(props.id)}}>&#9940;</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="task">
        <p>{props.name}</p>
        <div>
          <button onClick={() => {deleteTask(props.id)}}>&#9940;</button>
        </div>
      </div>
    )
  }
}

export default Task;
