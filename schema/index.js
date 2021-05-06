const  {gql} = require('apollo-server-express'); 

const typeDefs = gql`

type Query{
    user: [User!]! 
    user(id: ID):User 
    message:[Message!]!
}

type Mutation{
    addUser(email: String!, name: String!): User
}

type User{
        id: ID!
        name: String!
        avatarUrl: String! 
        message: [Message!]!
}


type Message{
    id: ID!
    message: String!
    createdAt: String!
}

`;

const resolvers  = { 
    Query:{
        users:() => db.users,
        user: (root,{id}) => db.users.find( user => user.id === id) ,
        message: () => db.messages
    }, 
    Mutation:{
        addUser: (parent,args,context,info)=>{
            const user = { 
                id: crypt.randomBytes(10).toString('hex'),
                email,
                name
             }
             db.user.push(user) ;

            return user;
             }
    },
    User:{
        messages: User => db.messages.filter(message => message.userId === user.id)
    }
    
}

export default {
    resolver, 
    typeDefs
}