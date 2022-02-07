const { UserInputError } = require('apollo-server-express');
const movies = require('../db/MovieDb');

module.exports = {
  Query: {
    allMovies: () => movies || [],
    movie: (_, { id: movieId }) => {
      const movie = movies.find(({ id }) => id === Number(movieId));
      if (!movie) {
        throw new Error('No movie exists with id ' + movieId)
      }
      return movie;
    },
  },
  Mutation: {
    updateMovie: (_, { id, ...rest }) => {
      const existedMovie = movies.find(movie => movie.id === Number(id));
      if (!existedMovie) {
        throw new UserInputError('Current movie does not exist  ' + id);
      }
      const updatedMovie = { ...existedMovie, ...rest };
      movies.forEach((movie, i) => {
        return (movie.id === updatedMovie.id) ? movies[i] = updatedMovie : movie
      });
      return updatedMovie;
    }
  }
};
