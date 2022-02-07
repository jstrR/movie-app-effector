const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  scalar JSONObject

  type Comment {
    movieId: ID!
    author: String!
    date: DateTime!
    message: String!
  }

  input CommentInput {
    movieId: ID!
    author: String!
    date: DateTime!
    message: String!
  }

  input MovieRatingsInput {
    movieId: ID!
    rating: Float!
    maxrating: Float!
    style: JSONObject!
    disabled: Boolean
  }

  type MovieRatings {
    movieId: ID!
    rating: Float!
    maxrating: Float!
    style: JSONObject!
    disabled: Boolean
  }

  type Movie {
    id: ID!
    title: String!
    tagline: String
    genres: [String!]!
    vote_average: Float
    release_date: String
    poster_path: String
    overview: String
    budget: Float
    revenue: Float
    runtime: Float
    trailerUrl: String
    price: Float
    places: String
    comments: [Comment!]!
    cinemas: [JSONObject!]!
  }

  type Query {
    allMovies: [Movie!]!
    movie(id: ID!): Movie
  }

  type Mutation {
    updateMovie(
      id: ID!
      title: String
      tagline: String
      genres: [String]
      vote_average: Float
      release_date: String
      poster_path: String
      overview: String
      budget: Float
      revenue: Float
      runtime: Float
      trailerUrl: String
      price: Float
      places: String
      comments: [CommentInput]
      cinemas: [JSONObject]
    ): Movie
  }
`;