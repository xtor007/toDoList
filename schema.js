const {buildSchema} = require('graphql');

const schema = buildSchema(

  `type Tasks {
    id: ID
    name: String
    isDone: Int
  }

  input TasksInput {
    id: ID
    name: String!
    isDone: Int!
  }

  type Query {
    getAll: [Tasks]
  }

  type Mutations {
    createTasks(input: TasksInput): Tasks
  }`

)

module.exports = schema
