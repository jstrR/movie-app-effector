export const CORE_MOVIE_FIELDS = `fragment CoreMovieFields on Movie {
  id
  title
  tagline
  genres
  vote_average
  release_date
  poster_path
  overview
  budget
  revenue
  runtime
  trailerUrl
  price
  places
}`;

export const COMMENTS_MOVIE_FIELDS = `fragment CommentsMovieFields on Comment {
  movieId
  author
  date
  message
}`;
