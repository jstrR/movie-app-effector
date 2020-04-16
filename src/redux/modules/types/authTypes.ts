import { IUserObj, IMovieRatingObject } from "../../../utils/types";

import {
  USERLOGIN,
  USERLOGOUT,
  UPDATEUSERSDB,
  SETNEWRATING,
} from "../../constants/authConst";

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
