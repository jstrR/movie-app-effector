import {
  USERLOGIN,
  USERLOGOUT,
  UPDATEUSERSDB,
  SETNEWRATING,
  authActionTypes,
  authState,
} from "./types/authTypes";
import { IUserObj, IMovieRatingObject } from "../../utils/types";

export const logIn = (value: IUserObj): authActionTypes => ({
  type: USERLOGIN,
  payload: value,
});

export const logOut = (): authActionTypes => ({
  type: USERLOGOUT,
});

export const setCurrentUser = (value: IUserObj): authActionTypes => ({
  type: USERLOGIN,
  payload: value,
});

export const updateUsersDb = (): authActionTypes => ({
  type: UPDATEUSERSDB,
});

export const setNewMovieRating = (
  value: IMovieRatingObject
): authActionTypes => ({
  type: SETNEWRATING,
  payload: value,
});

const initialState: authState = {
  isAuthenticated: false,
  currentUser: {},
};

const reducer = (state = initialState, action: authActionTypes): authState => {
  switch (action.type) {
    case USERLOGIN: {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, isAuthenticated: true, currentUser: action.payload };
    }
    case USERLOGOUT: {
      localStorage.setItem("currentUser", JSON.stringify({}));
      return { ...state, isAuthenticated: false, currentUser: {} };
    }
    case UPDATEUSERSDB: {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "");
      const usersDb = JSON.parse(localStorage.getItem("usersDb") || "");
      const newUsersDb = usersDb.map((userObj: IUserObj) =>
        currentUser.id === userObj.id ? { ...currentUser } : userObj
      );
      localStorage.setItem("usersDb", JSON.stringify(newUsersDb));
      return state;
    }
    case SETNEWRATING: {
      const user = JSON.parse(localStorage.getItem("currentUser") || "");
      user.movieRatings = {
        ...user.movieRatings,
        ...action.payload,
      };
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { ...state, currentUser: user };
    }
    default:
      return state;
  }
};

export default reducer;
