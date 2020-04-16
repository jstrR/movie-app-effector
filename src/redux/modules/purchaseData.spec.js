import reducer, {
  bookMovieSession,
  setMoviePrice,
  initialState,
} from "./purchaseData";
import * as t from "../constants/purchaseDataConst";

describe("purchaseData actions", () => {
  it("bookMovieSession should new session", () => {
    const newSession = {
      cinema: "a",
      time: "00:00",
    };

    const expectedAction = {
      type: t.BOOKMOVIESESSION,
      payload: newSession,
    };

    expect(bookMovieSession(newSession)).toEqual(expectedAction);
  });

  it("setMoviePrice should set price", () => {
    const expectedAction = {
      type: t.SETMOVIEPRICE,
      payload: "1$",
    };

    expect(setMoviePrice("1$")).toEqual(expectedAction);
  });
});

describe("purchaseData reducer", () => {
  beforeEach(() => {
    // resets localStorage
    localStorage.clear();
  });

  it("BOOKMOVIESESSION with initial state", () => {
    const action = {
      type: t.BOOKMOVIESESSION,
      payload: {
        cinema: "a",
        time: "00:00",
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      session: action.payload,
    });
    expect(JSON.parse(localStorage.__STORE__["purchaseData"])).toStrictEqual({
      ...initialState,
      session: action.payload,
    });
  });

  it("BOOKMOVIESESSION with existing price", () => {
    const stateWithPrice = {
      ...initialState,
      price: "1$",
    };

    const action = {
      type: t.BOOKMOVIESESSION,
      payload: {
        cinema: "a",
        time: "00:00",
      },
    };

    expect(reducer(stateWithPrice, action)).toEqual({
      ...stateWithPrice,
      session: action.payload,
    });
    expect(JSON.parse(localStorage.__STORE__["purchaseData"])).toStrictEqual({
      ...stateWithPrice,
      session: action.payload,
    });
  });

  it("SETMOVIEPRICE with initial state", () => {
    const action = {
      type: t.SETMOVIEPRICE,
      payload: "1$",
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      price: action.payload,
    });

    expect(JSON.parse(localStorage.__STORE__["purchaseData"])).toStrictEqual({
      ...initialState,
      price: action.payload,
    });
  });

  it("SETMOVIEPRICE with existing session state", () => {
    const session = {
      cinema: "a",
      time: "00:00",
    };

    const stateWithSession = {
      ...initialState,
      session,
    };

    const action = {
      type: t.SETMOVIEPRICE,
      payload: "1$",
    };

    expect(reducer(stateWithSession, action)).toEqual({
      ...stateWithSession,
      price: action.payload,
    });

    expect(JSON.parse(localStorage.__STORE__["purchaseData"])).toStrictEqual({
      ...stateWithSession,
      price: action.payload,
    });
  });
});
