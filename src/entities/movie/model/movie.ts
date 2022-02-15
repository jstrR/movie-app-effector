import { createEvent, createEffect, createStore, sample, attach } from 'effector';

import { GqlClient, getAllMovies, getMovie, updateMovie, Movie, Comment, Query, Mutation  } from "shared/api";

export const addComment = createEvent<Comment>();
export const sortByRating = createEvent<"asc" | "desc">();
export const sortByDate = createEvent<"asc" | "desc">();

export const fetchAllMoviesFx = createEffect(async () => {
  const req: Query = await GqlClient(getAllMovies);
  return req.allMovies; 
});

export const fetchMovieFx = createEffect(async (id: String) => {
  const req: Query = await GqlClient(getMovie, {
    variables: { id },
  });
  return req.movie;
});

export const updateMovieFx = createEffect(async (movie: Movie ) => {
  const req: Mutation = await GqlClient(updateMovie, {
    variables: movie,
  });
  return req.updateMovie;
});

export const $activeMovie = createStore<Movie | null>(null)
  .on(fetchMovieFx.doneData, (_, movie) => movie || null)
  .on(updateMovieFx.doneData, (_, movie) => movie || null);

export const addMovieFieldFx = attach({
  effect: updateMovieFx,
  source: $activeMovie,
  mapParams: (params: Comment, movie) => {
    return { ...movie as Movie, comments: movie ? [ ...movie.comments, params] : [params] };
  },
});

export const $moviesStorage = createStore<readonly Movie[] | []>([])
  .on(fetchAllMoviesFx.doneData, (_, movies) => movies || [])
  .on(sortByRating, (_, sortType) => [..._].sort((a, b) =>
    sortType === "asc"
      ? Number(a.vote_average) - Number(b.vote_average)
      : Number(b.vote_average) - Number(a.vote_average)
  ))
  .on(sortByDate, (_, sortType) => [..._].sort((a, b) => {
    const dateA = new Date(a.release_date || ""),
      dateB = new Date(b.release_date || "");
    return sortType === "asc"
      ? Number(dateA) - Number(dateB)
      : Number(dateB) - Number(dateA)
  }));

sample({
  clock: addComment,
  target: addMovieFieldFx
});
