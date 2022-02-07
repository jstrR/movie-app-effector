import { CORE_USER_FIELDS } from './fragments';

export const addUser = `
  ${CORE_USER_FIELDS}
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $token: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      token: $token
    ) {
      ...CoreUserFields
    }
  }
`;

export const updateUser = `
  ${CORE_USER_FIELDS}
  mutation UpdateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $disabled: Boolean
    $movieRatings: [MovieRatingsInput]!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      disabled: $disabled
      movieRatings: $movieRatings
    ) {
      ...CoreUserFields
    }
  }
`;
