const express = require('express') ; 
const { ApolloServer, gql} = require('apollo-server');
const { typeDefs, resolvers} = require('./schema')
const app  = express(); 
const {PORT = 4000,NODE_ENV}  = process.env;

app.disable('x-powered-by'); 
const server = new ApolloServer({
    typeDEfs,
    resolvers,
    playground:true
})

server.applyMiddleware({app})

app.listen(`${PORT}`,_ =>console.log('listening on port '+PORT))