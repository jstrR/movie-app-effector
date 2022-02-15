import { CORE_USER_FIELDS } from './fragments';

export const getAllUsers = `
  ${CORE_USER_FIELDS}
  query allUsersQuery {
    allUsers {
      ...CoreUserFields
    }
  }
`;

export const getUser = `
  ${CORE_USER_FIELDS}
  query userQuery($email: String!, $password: String!, $token: String!) {
    user(email: $email, password: $password, token: $token) {
      ...CoreUserFields
    }
  }
`;
