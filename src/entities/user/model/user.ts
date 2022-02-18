import { createStore, createEvent, createEffect, sample } from 'effector';

import { GqlClient, MovieRatings, User, Query, Mutation, getUser, addUser, updateUser } from "shared/api";

type UserLogin = {
  email: String,
  password: String,
  token: String
}

const getLocalStorageUser = () => JSON.parse(localStorage.getItem('currentUser') || 'null');

export const logIn = createEvent<UserLogin>();
export const signUp = createEvent<User>();
export const logOut = createEvent<void>();
export const setNewRating = createEvent<MovieRatings>();

export const fetchUserFx = createEffect(async ({ email, password, token }: UserLogin) => {
  const req: Query = await GqlClient(getUser, {
    variables: { email, password, token },
  });
  return req.user;
});

export const signUpUserFx = createEffect(async (user: User) => {
  const req: Mutation = await GqlClient(addUser, {
    variables: { ...user },
  });
  return req.addUser;
});

export const updateUserFx = createEffect(async (user: User) => {
  const req: Mutation = await GqlClient(updateUser, {
    variables: { ...user },
  });
  return req.updateUser;
});


fetchUserFx.doneData.watch(payload => localStorage.setItem('currentUser', JSON.stringify(payload)));
signUpUserFx.doneData.watch(payload => localStorage.setItem('currentUser', JSON.stringify(payload)));
updateUserFx.doneData.watch(payload => localStorage.setItem('currentUser', JSON.stringify(payload)));
logOut.watch(() => localStorage.removeItem('currentUser'));

export const $currentUser = createStore<User | null>(getLocalStorageUser())
  .on(fetchUserFx.doneData, (_, user) => user || null)
  .on(signUpUserFx.doneData, (_, user) => user || null)
  .on(updateUserFx.doneData, (_, user) => user || null)
  .reset(logOut);

export const $logInError = createStore<object | null>(null)
  .on(fetchUserFx.failData, (_, error) => error)
  .reset(fetchUserFx.doneData);

export const $signUpError = createStore<object | null>(null)
  .on(signUpUserFx.failData, (_, error) => error)
  .reset(signUpUserFx.doneData);

export const $isAuthenticated = createStore<Boolean>(!!getLocalStorageUser())
  .on($currentUser, (_, user) => !!user)
  .reset(logOut);

sample({
  source: logIn,
  target: fetchUserFx,
});

sample({
  source: signUp,
  target: signUpUserFx,
});
 
sample({
  clock: setNewRating,
  source: $currentUser,
  filter: user => !!user,
  fn: (user, newRatings: MovieRatings) => {
    const updatedUser = { ...user as User };
      const existedRating = updatedUser.movieRatings.find(movieRating => movieRating?.movieId === newRatings.movieId);
      if (existedRating) {
        updatedUser.movieRatings = updatedUser.movieRatings.map(movieRating => movieRating?.movieId === newRatings.movieId ? ({ ...movieRating, rating: newRatings.rating }) : movieRating);
      } else {
        updatedUser.movieRatings = [
          ...updatedUser.movieRatings,
          newRatings,
        ];
      }
      return updatedUser;
  },
  target: updateUserFx,
});
