import React from 'react'
import Task from './component/task.jsx'
import { gql } from '@apollo/client'
import { useSubscription } from '@apollo/react-hooks'

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

let isConnection = true

function App() {

  function isEqual(a,b) {
    if(a.length !== b.length)
       return false;
    let i = 0
    for(i = 0; i < a.length; i++)
       if(a[i] !== b[i])
          return false;
    return true;
  }

  let [list,setList] = React.useState([]);

  const {data,error,loading} = useSubscription(gql(`
    subscription subData {
      tasks(order_by: {date: asc}) {
        id
        isDone
        name
      }
    }
  `),{})

  if (data) {
    console.log("data load")
    let loadData = data?.tasks
    console.log(loadData)
    if (!isEqual(loadData,list)) {
      setList(loadData)
      console.log(list)
    }
  }

  if (error) {
    console.log(error)
  }

  if (loading) {
    console.log("loading data")
  }

  React.useEffect(async () => {
    try {
      await queryFetch(
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
    } catch(err) {
      isConnection = false
    }
  },[]);

  let inName = React.createRef()

  let pushData = async () => {
    if (inName.current.value !== "") {
      try {
        await queryFetch(
          `mutation insertData($inText: String){
            insert_tasks_one(object: {isDone: 0, name: $inText}) {
              id
            }
          }`,
          {inText: inName.current.value}
        )
      } catch(err) {
        isConnection = false
      }
    }
    inName.current.value = ""
  }

  let changeDone = async (id,isDone) => {
    let newData = (isDone === 1) ? 0 : 1
    try {
      await queryFetch(
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
    } catch(err) {
      console.log("sdvvnmbhnvsd")
      isConnection = false
      return
    }
  }

  let isChecked = (isDone) => {
    if (isDone) {
      return "checked"
    } else {
      return ""
    }
  }

  let isConnected = (connVal) => {
    console.log("check")
    if (connVal) return "!"
  }

  return (
    <div className="site">
      <h1>WHAT YOUR TASKS? {isConnected(isConnection)}</h1>
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
