const express = require('express'); 
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql'); 
const app = express();


const schema = buildSchema(`   
    type Query{
      users: [User!]! 
    }

    type User{
        id: ID!
        email: String!
        name: String!
        avatarUrl: String!
    }
`)

const db  ={ users:[
        {id: '1', email: 'santos@d.co',name:"Santos"},
        {id:'12',email:"sjeiss@gma.com",name:"alex"}
    ]}
const rootValue = { 
        users:() => [
        {id: '1', email: 'santos@d.co',name:"Santos"},
        {id:'12',email:"sjeiss@gma.com",name:"alex"}
    ]
}

graphql(
        schema, 
    `{
        users{
           name
        }
    }`,
    rootValue
).then(console.log).catch(console.error)


app.use('/graphql',graphqlHTTP({
    schema,
    rootValue,
    graphiql:true
}))

app.listen(3000,console.log);