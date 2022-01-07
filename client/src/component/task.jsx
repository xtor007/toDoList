import React from 'react';
import {queryFetch} from '../App.js';

let deleteTask = (id) => {
  queryFetch(
    `mutation MyMutation($delId: uuid!) {
      delete_tasks_by_pk(id: $delId) {
        id
      }
    }`,
    {delId: id}
  )
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
