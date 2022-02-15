import { CORE_MOVIE_FIELDS, COMMENTS_MOVIE_FIELDS } from './fragments';

export const getAllMovies = `
  ${CORE_MOVIE_FIELDS}
  query allMoviesQuery {
    allMovies {
      ...CoreMovieFields
    }
  }
`;

export const getMovie = `
  ${CORE_MOVIE_FIELDS}
  ${COMMENTS_MOVIE_FIELDS}
  query movieQuery($id: ID!) {
    movie(id: $id) {
      ...CoreMovieFields
      comments {
        ...CommentsMovieFields
      }
      cinemas
    }
  }
`;
