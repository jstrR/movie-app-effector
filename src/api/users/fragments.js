export const CORE_USER_FIELDS = `fragment CoreUserFields on User {
  id
  firstName
  lastName
  email
  role
  token
  movieRatings {
    movieId
    rating
    maxrating
    style
    disabled
  }
}`;