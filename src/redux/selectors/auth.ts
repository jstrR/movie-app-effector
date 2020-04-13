import { IMovieRatings, IUserStatus, IUserObj } from "../../utils/types";

interface ILoggedStatusSelector {
  auth: {
    isAuthenticated: boolean;
  };
}

interface IMovieRatingsSelector {
  auth: {
    currentUser?: {
      movieRatings?: Array<IMovieRatings>;
    };
  };
}

interface IUserStatusSelector {
  auth: {
    isAuthenticated: boolean;
    currentUser: {
      token?: string;
    };
  };
}

interface ITokenStatusSelector {
  auth: {
    currentUser?: {
      token?: string;
    };
  };
}

interface ICurrentUserSelector {
  auth: {
    currentUser?: IUserObj;
  };
}

export const selectIsAuthenticated = (
  state: ILoggedStatusSelector
): boolean => {
  return state.auth.isAuthenticated;
};

export const selectUserToken = (
  state: ITokenStatusSelector
): string | undefined => {
  return state.auth && state.auth.currentUser && state.auth.currentUser.token;
};

export const selectUserMoviesRatings = (
  state: IMovieRatingsSelector
): Array<IMovieRatings> | undefined => {
  return (
    state &&
    state.auth &&
    state.auth.currentUser &&
    state.auth.currentUser.movieRatings
  );
};

export const selectUserStatus = (state: IUserStatusSelector): IUserStatus => {
  return {
    isAuthenticated: selectIsAuthenticated(state),
    token: selectUserToken(state),
  };
};

export const selectCurrentUser = (
  state: ICurrentUserSelector
): IUserObj | undefined => {
  return state.auth.currentUser;
};
