const express = require('express'); 
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql'); 
const crypto = require('crypto');
const app = express();


const schema = buildSchema(`   
    type Query{
      users: [User!]! 
      user(id: ID!): User
    }

    type Mutation{
        addUser(email: String!, name: String):User
    }
    type User{
        id: ID!
        email: String!
        name: String!
        avatarUrl: String!
        message: [Message!]!
    }


    type Message { 
        id: ID
        message: String!
        createdAt: String!
    }
`)

const db  ={ users:[
        {id: '1', email: 'santos@d.co',name:"Santos"},
        {id:'12',email:"sjeiss@gma.com",name:"alex"}
    ],messages: [
        {id: '1', userId: '1',body: 'Hello',createdAt: Date.now()},
        {id: '2',userId: '2', body: 'Hi', createdAt: Date.now()}
    ]}

class User{
    constructor(user){
        Object.assign(this,user);
    }

    message(){
        return db.messages.filter(message  => message.userId === this.id)
    }
}
const rootValue = { 
        users:() => db.users,
        user: args => db.users.find( user => user.id === args.id) ,
        addUser: ({name,email})=>{
            const user = { 
                id: crypt.randomBytes(10).toString('hex'),
                email,
                name
            }
             db.user.push(user) ;

             return user;
         },
        message: ()=> db.messages
}



app.use('/graphql',graphqlHTTP({
    schema,
    rootValue,
    graphiql:true
}))


// graphql(
//     schema, 
// `{
//     users{
//        name
//     }
// }`,
// rootValue
// ).then(console.log).catch(console.error)
app.listen(3000,console.log);