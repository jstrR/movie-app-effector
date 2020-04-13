import { IUserObj, IMovieRatingObject } from "../../../utils/types";

export const USERLOGIN = "auth/users/userLogIn";
export const USERLOGOUT = "auth/users/userLogOut";
export const UPDATEUSERSDB = "auth/users/updateUsersDb";
export const SETNEWRATING = "auth/movie/setNewRating";

interface logInAction {
  type: typeof USERLOGIN;
  payload: IUserObj;
}

interface logOutAction {
  type: typeof USERLOGOUT;
}

interface setCurrentUserAction {
  type: typeof USERLOGIN;
  payload: IUserObj;
}

interface updateUsersDbAction {
  type: typeof UPDATEUSERSDB;
}

interface setNewMovieRatingAction {
  type: typeof SETNEWRATING;
  payload: IMovieRatingObject;
}

export interface authState {
  isAuthenticated: boolean;
  currentUser: IUserObj | {};
}

export type authActionTypes =
  | logInAction
  | logOutAction
  | setCurrentUserAction
  | updateUsersDbAction
  | setNewMovieRatingAction;
