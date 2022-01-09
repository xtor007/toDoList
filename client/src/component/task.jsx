import React from 'react';
import {queryFetch} from '../App.js';

let doneClass = (isDone) => {
  if (isDone === 1) {
    return "task _done"
  } else {
    return "task"
  }
}


let Task = (props) => {

  let [isDeleteActive,setIsDeleteActive] = React.useState([])

  let deleteTask = async (id) => {
    try {
      await queryFetch(
        `mutation DelMutation($delId: uuid!) {
          delete_tasks_by_pk(id: $delId) {
            id
          }
        }`,
        {delId: id}
      )
    } catch(err) {
      setIsDeleteActive(false)
    }
  }

  if (!isDeleteActive) {
    return (<div className="task">YOU AREN'T CONNECT</div>)
  }

  return (
    <div className={doneClass(props.isDone)}>
      <p>{props.name}</p>
      <div>
        <button onClick={() => {deleteTask(props.id)}}>&#9940;</button>
      </div>
    </div>
  )
}

export default Task;
