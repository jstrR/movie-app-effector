import { createEvent, restore, sample } from 'effector';

import { IMovieObject, IComment } from "../utils/types";

export const setActiveMovie = createEvent<IMovieObject | null>();
export const setMoviesDb = createEvent<IMovieObject[] | []>();
export const addComment = createEvent<IComment>();
export const sortByRating = createEvent<"asc" | "desc">();
export const sortByDate = createEvent<"asc" | "desc">();
const updateMovieInDb = createEvent<IMovieObject | null>();

export const $activeMovie = restore(setActiveMovie, null)
  .on(addComment, (_, comment) => {
    if (_) {
      return { ..._, comments: [comment, ...(_.comments || [])] };
    }
  });

export const $moviesStorage = restore(setMoviesDb, JSON.parse(localStorage.getItem("moviesDb") || '[]') || [])
  .on(updateMovieInDb, (_, updatedMovie) => _?.map((movie: IMovieObject) =>
    updatedMovie?.id === movie.id ? { ...updatedMovie } : movie
  ))
  .on(sortByRating, (_, sortType) => [...(_ || [])].sort((a, b) =>
    sortType === "asc"
      ? Number(a.vote_average) - Number(b.vote_average)
      : Number(b.vote_average) - Number(a.vote_average)
  ))
  .on(sortByDate, (_, sortType) => [...(_ || [])].sort((a, b) => {
    const dateA = new Date(a.release_date || ""),
      dateB = new Date(b.release_date || "");
    return sortType === "asc"
      ? Number(dateA) - Number(dateB)
      : Number(dateB) - Number(dateA)
  }));

$moviesStorage.watch(movies => localStorage.setItem("moviesDb", JSON.stringify(movies)));

sample({
  clock: addComment,
  source: $activeMovie,
  target: updateMovieInDb
})