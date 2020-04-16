import reducer, {
  logIn,
  logOut,
  updateUsersDb,
  setNewMovieRating,
  initialState,
} from "./auth";
import * as t from "../constants/authConst";

describe("auth actions", () => {
  it("logIn should set current User, set isAuthenticated", () => {
    const newUser = {
      value: "default",
    };

    const expectedAction = {
      type: t.USERLOGIN,
      payload: newUser,
    };

    expect(logIn(newUser)).toEqual(expectedAction);
  });

  it("logOut should unset currentUser, unset isAuthenticated", () => {
    const expectedAction = {
      type: t.USERLOGOUT,
    };

    expect(logOut()).toEqual(expectedAction);
  });

  it("updateUsersDb should update current user Data in users DB", () => {
    const expectedAction = {
      type: t.UPDATEUSERSDB,
    };

    expect(updateUsersDb()).toEqual(expectedAction);
  });

  it("setNewMovieRating should set new ratings to User", () => {
    const newRating = {
      value: "default",
    };

    const expectedAction = {
      type: t.SETNEWRATING,
      payload: newRating,
    };

    expect(setNewMovieRating(newRating)).toEqual(expectedAction);
  });
});

describe("auth reducer", () => {
  beforeEach(() => {
    // resets localStorage
    localStorage.clear();
  });

  it("USERLOGIN", () => {
    const action = {
      type: t.USERLOGIN,
      payload: {
        value: "default",
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isAuthenticated: true,
      currentUser: action.payload,
    });

    expect(JSON.parse(localStorage.__STORE__["currentUser"])).toStrictEqual({
      ...action.payload,
    });
  });

  it("USERLOGOUT", () => {
    const userLogOutState = {
      isAuthenticated: true,
      currentUser: {
        value: "default",
      },
    };

    const action = {
      type: t.USERLOGOUT,
    };

    expect(reducer(userLogOutState, action)).toEqual({
      ...initialState,
      isAuthenticated: false,
      currentUser: {},
    });
    expect(JSON.parse(localStorage.__STORE__["currentUser"])).toStrictEqual({});
  });

  it("UPDATEUSERSDB", () => {
    const moviesStorageMock = [
      { id: 0, name: "a" },
      { id: 2, name: "b" },
    ];

    localStorage.setItem("usersDb", JSON.stringify(moviesStorageMock));
    localStorage.setItem("currentUser", JSON.stringify({ id: 0, name: "c" }));

    const action = {
      type: t.UPDATEUSERSDB,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
    });

    expect(JSON.parse(localStorage.__STORE__["usersDb"])).toStrictEqual([
      { id: 0, name: "c" },
      { id: 2, name: "b" },
    ]);
  });

  it("SETNEWRATING", () => {
    const initialStateWithUser = {
      currentUser: {
        movieRatings: {
          value: "default",
        },
      },
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        movieRatings: {
          value: "default",
        },
      })
    );

    const action = {
      type: t.SETNEWRATING,
      payload: {
        newValue: "some",
      },
    };

    expect(reducer(initialStateWithUser, action)).toEqual({
      currentUser: {
        movieRatings: {
          ...action.payload,
          value: "default",
        },
      },
    });
    expect(JSON.parse(localStorage.__STORE__["currentUser"])).toStrictEqual({
      movieRatings: {
        ...action.payload,
        value: "default",
      },
    });
  });
});
