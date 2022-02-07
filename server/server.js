const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

async function startApolloServer() {
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

  const app = express();
  app.use(cors(corsOptions));
  const httpServer = http.createServer(app);

  const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs")));
  const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, "./resolvers")));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
