import { CORE_MOVIE_FIELDS, COMMENTS_MOVIE_FIELDS } from './fragments';

export const updateMovie = `
  ${CORE_MOVIE_FIELDS}
  ${COMMENTS_MOVIE_FIELDS}
  mutation UpdateMovie(
    $id: ID!
    $title: String
    $tagline: String
    $genres: [String]
    $vote_average: Float
    $release_date: String
    $poster_path: String
    $overview: String
    $budget: Float
    $revenue: Float
    $runtime: Float
    $trailerUrl: String
    $price: Float
    $places: String
    $comments: [CommentInput]
    $cinemas: [JSONObject]
  ) {
    updateMovie(
      id: $id
      title: $title
      tagline: $tagline
      genres: $genres
      vote_average: $vote_average
      release_date: $release_date
      poster_path: $poster_path
      overview: $overview
      budget: $budget
      revenue: $revenue
      runtime: $runtime
      trailerUrl: $trailerUrl
      price: $price
      places: $places
      comments: $comments
      cinemas: $cinemas
    ) {
      ...CoreMovieFields
      comments {
        ...CommentsMovieFields
      }
      cinemas
    }
  }
`;