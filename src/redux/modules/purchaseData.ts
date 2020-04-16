import { purchaseDataActionTypes } from "./types/purchaseDataTypes";
import {
  BOOKMOVIESESSION,
  SETMOVIEPRICE,
} from "../constants/purchaseDataConst";
import { ISessionObject } from "../../utils/types";

export const bookMovieSession = (session: ISessionObject) => ({
  type: BOOKMOVIESESSION,
  payload: session,
});

export const setMoviePrice = (price: string) => ({
  type: SETMOVIEPRICE,
  payload: price,
});

export const initialState = {};

const reducer = (state = initialState, action: purchaseDataActionTypes) => {
  switch (action.type) {
    case BOOKMOVIESESSION: {
      localStorage.setItem(
        "purchaseData",
        JSON.stringify({ ...state, session: action.payload })
      );
      return { ...state, session: action.payload };
    }
    case SETMOVIEPRICE: {
      localStorage.setItem(
        "purchaseData",
        JSON.stringify({ ...state, price: action.payload })
      );
      return { ...state, price: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
