import { createEvent, createStore } from 'effector';

import { ISessionObject } from "utils/types";

export const bookMovieSession = createEvent<ISessionObject>();
export const setMoviePrice = createEvent<string>();

export const $purchaseData = createStore(JSON.parse(localStorage.getItem("purchaseData") || '{}') || {})
  .on(bookMovieSession, (_, session) => ({ ..._, session }))
  .on(setMoviePrice, (_, price) => ({ ..._, price }));

$purchaseData.watch(purchaseData => localStorage.setItem("purchaseData", JSON.stringify(purchaseData)));
