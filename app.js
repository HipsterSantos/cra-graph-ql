const {ApolloServer,gql} = require('apollo-server'); 

const typeDefs  = gql`
    type Query{
        users: [User!]!
        user(id: ID!): User 
        message: [Message!]!
    }

    type Mutation{ 
        addUser(email: String! , name: String!):User 
    }

    type User{
        id: ID!
        email: String! 
        name: String!
        avatarUrl: String! 
        messages: [Message!]!
    }

    type Message{
        id: ID! 
        message: String !
        createdAt: String!
    }
`;
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
        return db.messages.filter(message => message.userId === this.id)
    }
}

const resolvers = { 
    Query: { 
          users:() => db.users,
          user: (root,{id}) => db.users.find( user => user.id === id) ,
          message: () => db.messages
    },
    Mutation: {
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


const server = new ApolloServer({
    typeDefs,resolvers
})

server.listen().then(({url})=>console.log(url)).catch(console.log)