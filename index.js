const { graphql, buildSchema } = require('graphql'); 

const schema = buildSchema(`   
    type Query{
        message: String 
    }
`)

const rootValue = { 
    message: ()=> 'Graphql works and this is my resolver'
}

graphql(
    schema, 
    `{
        message
    }`,
    rootValue
).then(console.log).catch(console.log)