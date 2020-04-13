import { ISessionObject } from "../../../utils/types";

export const BOOKMOVIESESSION = "purchase/bookMovieSession";
export const SETMOVIEPRICE = "purchase/setMoviePrice";

interface bookMovieSessionAction {
  type: typeof BOOKMOVIESESSION;
  payload: ISessionObject;
}

interface setMoviePriceAction {
  type: typeof SETMOVIEPRICE;
  payload: string;
}

export type purchaseDataActionTypes =
  | bookMovieSessionAction
  | setMoviePriceAction;
