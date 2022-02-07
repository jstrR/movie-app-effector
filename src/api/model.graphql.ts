export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONObject: any;
};

export type Comment = {
  readonly __typename?: 'Comment';
  readonly author: Scalars['String'];
  readonly date: Scalars['DateTime'];
  readonly message: Scalars['String'];
  readonly movieId: Scalars['ID'];
};

export type CommentInput = {
  readonly author: Scalars['String'];
  readonly date: Scalars['DateTime'];
  readonly message: Scalars['String'];
  readonly movieId: Scalars['ID'];
};

export type Movie = {
  readonly __typename?: 'Movie';
  readonly budget?: Maybe<Scalars['Float']>;
  readonly cinemas: ReadonlyArray<Scalars['JSONObject']>;
  readonly comments: ReadonlyArray<Comment>;
  readonly genres: ReadonlyArray<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly overview?: Maybe<Scalars['String']>;
  readonly places?: Maybe<Scalars['String']>;
  readonly poster_path?: Maybe<Scalars['String']>;
  readonly price?: Maybe<Scalars['Float']>;
  readonly release_date?: Maybe<Scalars['String']>;
  readonly revenue?: Maybe<Scalars['Float']>;
  readonly runtime?: Maybe<Scalars['Float']>;
  readonly tagline?: Maybe<Scalars['String']>;
  readonly title: Scalars['String'];
  readonly trailerUrl?: Maybe<Scalars['String']>;
  readonly vote_average?: Maybe<Scalars['Float']>;
};

export type MovieRatings = {
  readonly __typename?: 'MovieRatings';
  readonly disabled?: Maybe<Scalars['Boolean']>;
  readonly maxrating: Scalars['Float'];
  readonly movieId: Scalars['ID'];
  readonly rating: Scalars['Float'];
  readonly style: Scalars['JSONObject'];
};

export type MovieRatingsInput = {
  readonly disabled?: InputMaybe<Scalars['Boolean']>;
  readonly maxrating: Scalars['Float'];
  readonly movieId: Scalars['ID'];
  readonly rating: Scalars['Float'];
  readonly style: Scalars['JSONObject'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly addUser?: Maybe<User>;
  readonly updateMovie?: Maybe<Movie>;
  readonly updateUser?: Maybe<User>;
};


export type MutationAddUserArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateMovieArgs = {
  budget?: InputMaybe<Scalars['Float']>;
  cinemas?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['JSONObject']>>>;
  comments?: InputMaybe<ReadonlyArray<InputMaybe<CommentInput>>>;
  genres?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  id: Scalars['ID'];
  overview?: InputMaybe<Scalars['String']>;
  places?: InputMaybe<Scalars['String']>;
  poster_path?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  release_date?: InputMaybe<Scalars['String']>;
  revenue?: InputMaybe<Scalars['Float']>;
  runtime?: InputMaybe<Scalars['Float']>;
  tagline?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  trailerUrl?: InputMaybe<Scalars['String']>;
  vote_average?: InputMaybe<Scalars['Float']>;
};


export type MutationUpdateUserArgs = {
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  movieRatings: ReadonlyArray<InputMaybe<MovieRatingsInput>>;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly allMovies: ReadonlyArray<Movie>;
  readonly allUsers: ReadonlyArray<User>;
  readonly movie?: Maybe<Movie>;
  readonly user?: Maybe<User>;
};


export type QueryMovieArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type User = {
  readonly __typename?: 'User';
  readonly email: Scalars['String'];
  readonly firstName?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly lastName?: Maybe<Scalars['String']>;
  readonly movieRatings: ReadonlyArray<Maybe<MovieRatings>>;
  readonly password: Scalars['String'];
  readonly role?: Maybe<Scalars['String']>;
  readonly token: Scalars['String'];
};

export type UserData = {
  readonly email: Scalars['String'];
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
  readonly password: Scalars['String'];
  readonly token: Scalars['String'];
};
