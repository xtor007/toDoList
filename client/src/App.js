import axios from 'axios'
import React from 'react'
import Task from './component/task.jsx'

function queryFetch(inQuery, inVariables) {
  return fetch('https://new-pig-96.hasura.app/v1/graphql',{
    method: 'POST',
    headers: { "content-type": "aplication/json",
               "x-hasura-admin-secret": "eRltODkyV4VCMHxjGoRnnARLNfG6oWviDAL6lH8EZnCwbmRHnTprwdXD3AQlalhQ"},
    body: JSON.stringify({
      query: inQuery,
      variables: inVariables
    })
  }).then(res => res.json())
}

function App() {

  let [list,setList] = React.useState([]);
  //let realList = null

  React.useEffect(() => {
    // let data = axios.get('http://localhost:8000/')
    // data.then(res => {
    //   setList(res.data);
    // })
    queryFetch(
      `query getAll {
        tasks(order_by: {date: asc}) {
          id
          isDone
          name
        }
      }`
    ).then(data => {
      setList(data.data.tasks)
    })
  },[]);

  let inName = React.createRef()

  let pushData = () => {
    if (inName.current.value != "") {
      // let post = axios.post('http://localhost:8000/',{
      //   id: null,
      //   name: inName.current.value,
      //   isDone: 0
      // })
      queryFetch(
        `mutation insertData($inText: String){
          insert_tasks_one(object: {isDone: 0, name: $inText}) {
            id
          }
        }`,
        {inText: inName.current.value}
      )
      //window.location.reload()
    }
  }

  let changeDone = (id,isDone) => {
    // let post = axios.post('http://localhost:8000/upd',{
    //   id: id,
    //   isDone: !isDone
    // })
    // window.location.reload()
    let newData = (isDone == 1) ? 0 : 1
    queryFetch(
      `mutation editIsDone($findId: uuid!, $newIsDone: Int) {
        update_tasks_by_pk(pk_columns: {id: $findId}, _set: {isDone: $newIsDone}) {
          id
        }
      }`,
      {
        findId: id,
        newIsDone: newData
      }
    )
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
export {queryFetch};
