import { ISessionObject } from "../../../utils/types";

import {
  BOOKMOVIESESSION,
  SETMOVIEPRICE,
} from "../../constants/purchaseDataConst";

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
