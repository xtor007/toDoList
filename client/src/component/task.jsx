import React from 'react';

let Task = (props) => {
  return (
    <div className="task">
      <p>{props.name}</p>
      <div>
        <button>&#128396;</button>
        <button onClick={deleteTask(props.id)}>&#9940;</button>
      </div>
    </div>
  )
}

export default Task;
