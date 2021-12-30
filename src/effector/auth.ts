import { createStore, createEvent, sample } from 'effector'

import { IUserObj, IMovieRatingObject } from "../utils/types";

export const logIn = createEvent<IUserObj>();
export const logOut = createEvent<void>();
// export const updateUsersDb = createEvent<void>();
export const setNewRating = createEvent<IMovieRatingObject>();

logIn.watch(payload => localStorage.setItem('currentUser', JSON.stringify(payload)));
logOut.watch(() => localStorage.setItem('currentUser', JSON.stringify({})));

// updateUsersDb.watch(() => {
// 	const currentUser = localStorage.getItem("currentUser")
// 		? JSON.parse(localStorage.getItem("currentUser") || "")
// 		: {};
// 	const usersDb = localStorage.getItem("usersDb")
// 		? JSON.parse(localStorage.getItem("usersDb") || "")
// 		: [];
// 	const newUsersDb = usersDb.map((userObj: IUserObj) =>
// 		currentUser.id === userObj.id ? { ...currentUser } : userObj
// 	);
// 	localStorage.setItem("usersDb", JSON.stringify(newUsersDb));
// });

export const $currentUser = createStore<IUserObj>(JSON.parse(localStorage.getItem('currentUser') || '{}') || {})
	.on(logIn, (_, payload) => payload)
	.reset(logOut);

export const $isAuthenticated = createStore<Boolean>(false)
	.on(logIn, () => true)
	.reset(logOut);

$currentUser.watch(currentUser => {
  const usersDb = localStorage.getItem("usersDb")
    ? JSON.parse(localStorage.getItem("usersDb") || '[]')
    : [];
  const newUsersDb = usersDb.map((userObj: IUserObj) =>
    currentUser.id === userObj.id ? { ...currentUser } : userObj
  );

  localStorage.setItem("usersDb", JSON.stringify(newUsersDb));
});

sample({
	clock: setNewRating,
	source: $currentUser,
	fn: (user, newRatings : IMovieRatingObject) => {
		const updatedUser = { ...user };
		updatedUser.movieRatings = {
			...user.movieRatings,
			...newRatings,
		};
		return updatedUser;
	},
	target: $currentUser,
})