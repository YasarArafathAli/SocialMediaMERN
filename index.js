const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require('mongoose');


const typeDefs = require("./graphql/typeDefs");
const resolvers  = require("./graphql/resolvers")
const {MONGODB} = require("./congif");






const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser : true})
    .then(() => {
        console.log("connected to database");
        return server.listen({port : 5000})
    })
    .then(res => {
    console.log(`Server is running at ${res.url}`)
})