type GqlError = {
  message: string
};

export const GqlClient = async <T>(query: string, variables = {}) : Promise<T> => {
  return await fetch(process.env.REACT_APP_API_URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query,  ...(variables)})
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<{ data: T, errors?: [GqlError] }>
  })
  .then(data => {
    if (data.errors) {
      throw new Error(data.errors[0]?.message);
    }
    return data.data
  }).catch((error: Error) => {
    throw error;
  });
};


export { getAllMovies, getMovie, updateMovie } from './movies';
export { getUser, addUser, updateUser, getAllUsers } from './users';
export * from './model.graphql';
