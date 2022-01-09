import React from 'react'
import Task from './component/task.jsx'
import { gql } from '@apollo/client'
import { useSubscription } from '@apollo/react-hooks'
import { Spinner } from 'react-bootstrap'

function queryFetch(inQuery, inVariables) {
  return fetch(process.env.REACT_APP_HTTP_LINK,{
    method: 'POST',
    headers: { "content-type": process.env.REACT_APP_CONTENT_TYPE,
               "x-hasura-admin-secret": process.env.REACT_APP_SECRET},
    body: JSON.stringify({
      query: inQuery,
      variables: inVariables
    })
  }).then(res => res.json())
}

let isServerWork = true
let isLoading = false

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
  let [isConnection,setIsConnection] = React.useState([]);

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
    isServerWork = true
    isLoading = false
    console.log("data load")
    let loadData = data?.tasks
    if (!isEqual(loadData,list)) {
      setList(loadData)
    }
  }

  if (error) {
    isServerWork = false
    isLoading = false
  }

  if (loading) {
    isLoading = true
  }

  React.useEffect(() => {
    async function fetchData() {
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
        setIsConnection(false)
      }
    }
    fetchData()
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
        setIsConnection(false)
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
      setIsConnection(false)
    }
  }

  let isChecked = (isDone) => {
    if (isDone) {
      return "checked"
    } else {
      return ""
    }
  }

  if (isLoading) {
    return (
      <div className={'main-spinner-div'}>
          <Spinner animation="grow" className={'main-spinner'} />
      </div>
    );
  }

  if(!isConnection) {return (<div className="errorMes">ERROR CONNECTION</div>)}

  if(!isServerWork) {return (<div className="errorMes">SERVER ERROR</div>)}

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
