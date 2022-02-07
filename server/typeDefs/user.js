const { gql } = require('apollo-server-express');

module.exports = gql`
  input UserData {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    token: String!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    role: String
    token: String!
    movieRatings: [MovieRatings]!
  }

  type Query {
    allUsers: [User!]!
    user(email: String!, password: String!, token: String!): User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      token: String!
    ): User
    updateUser(
      firstName: String!
      lastName: String!
      email: String!
      disabled: Boolean
      movieRatings: [MovieRatingsInput]!
    ): User
  }
`;
