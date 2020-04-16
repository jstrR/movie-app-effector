import reducer, {
  setActiveMovie,
  setMoviesDb,
  addComment,
  sortByRating,
  sortByDate,
  initialState,
} from "./movie";
import * as t from "../constants/movieConst";

describe("movie actions", () => {
  it("setActiveMovie should set active movie", () => {
    const newMovie = {
      id: 0,
      name: "default",
    };

    const expectedAction = {
      type: t.SETACTIVEMOVIE,
      payload: newMovie,
    };

    expect(setActiveMovie(newMovie)).toEqual(expectedAction);
  });

  it("logOut should add movies to movies storage", () => {
    const newMoviesDB = [{
      id: 0,
      name: "default",
    }, ];

    const expectedAction = {
      type: t.SETMOVIESDB,
      payload: newMoviesDB,
    };

    expect(setMoviesDb(newMoviesDB)).toEqual(expectedAction);
  });

  it("addComment should add new comment to the movie", () => {
    const newComment = {
      movieid: 0,
      user: 0,
      comment: "default",
    };

    const expectedAction = {
      type: t.ADDCOMMENT,
      payload: newComment,
    };

    expect(addComment(newComment)).toEqual(expectedAction);
  });

  it("sortByRating should sort movies storage by ratings with incomming type", () => {
    const newRatingsSortOrder = "desc";

    const expectedAction = {
      type: t.SORTBYRATING,
      payload: newRatingsSortOrder,
    };

    expect(sortByRating(newRatingsSortOrder)).toEqual(expectedAction);
  });

  it("sortByDate should sort movies storage by date with incomming type", () => {
    const newDateSortOrder = "asc";

    const expectedAction = {
      type: t.SORTBYDATE,
      payload: newDateSortOrder,
    };

    expect(sortByDate(newDateSortOrder)).toEqual(expectedAction);
  });
});

describe("movie reducer", () => {
  beforeEach(() => {
    // resets localStorage
    localStorage.clear();
  });

  it("SETACTIVEMOVIE", () => {
    const action = {
      type: t.SETACTIVEMOVIE,
      payload: {
        name: "a",
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      activeMovie: action.payload,
    });
  });

  it("SETMOVIESDB", () => {
    const newMoviesDB = [{
      id: 0,
      name: "default",
    }, ];

    const action = {
      type: t.SETMOVIESDB,
      payload: newMoviesDB,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      moviesStorage: action.payload,
    });
  });

  it("ADDCOMMENT", () => {
    const moviesDbMock = [{
        id: 0,
        comments: []
      },
      {
        id: 1,
        comments: [{
          comment: "a"
        }]
      },
    ];

    const newComment = {
      movieId: 0,
      user: 0,
      comment: "default",
    };

    const action = {
      type: t.ADDCOMMENT,
      payload: {
        ...newComment,
      },
    };

    localStorage.setItem("moviesDb", JSON.stringify(moviesDbMock));

    expect(reducer(initialState, action)).toEqual({
      activeMovie: {
        id: 0,
        comments: [action.payload]
      },
      moviesStorage: [{
          id: 0,
          comments: [action.payload]
        },
        {
          id: 1,
          comments: [{
            comment: "a"
          }]
        },
      ],
    });
    expect(JSON.parse(localStorage.__STORE__["moviesDb"])).toStrictEqual([{
        id: 0,
        comments: [action.payload]
      },
      {
        id: 1,
        comments: [{
          comment: "a"
        }]
      },
    ]);
  });

  it("SORTBYRATING with asc sorted data", () => {
    const stateWithASCSorted = {
      moviesStorage: [{
          id: 0,
          vote_average: 1
        },
        {
          id: 1,
          vote_average: 2
        },
      ]
    }

    const action = {
      type: t.SORTBYRATING,
      payload: 'asc'
    };

    expect(reducer(stateWithASCSorted, action)).toEqual({
      ...stateWithASCSorted,
    });
  });

  it("SORTBYRATING with desc sorted data", () => {
    const stateWithDESCSorted = {
      moviesStorage: [{
          id: 0,
          vote_average: 2
        },
        {
          id: 1,
          vote_average: 1
        },
      ]
    }

    const action = {
      type: t.SORTBYRATING,
      payload: 'asc'
    };

    expect(reducer(stateWithDESCSorted, action)).toEqual({
      moviesStorage: [{
          id: 1,
          vote_average: 1
        },
        {
          id: 0,
          vote_average: 2
        },
      ]
    });
  });

  it("SORTBYDATE with asc sorted data", () => {
    const stateWithASCSorted = {
      moviesStorage: [{
          id: 0,
          release_date: "0001-01-01"
        },
        {
          id: 1,
          release_date: "0001-01-02"
        },
      ]
    }
    const action = {
      type: t.SORTBYDATE,
      payload: 'asc'
    };

    expect(reducer(stateWithASCSorted, action)).toEqual({
      ...stateWithASCSorted,
    });
  });

  it("SORTBYDATE with desc sorted data", () => {
    const stateWithDESCSorted = {
      moviesStorage: [{
          id: 0,
          release_date: "0001-01-01"
        },
        {
          id: 1,
          release_date: "0001-01-02"
        },
      ]
    }
    const action = {
      type: t.SORTBYDATE,
      payload: 'desc'
    };

    expect(reducer(stateWithDESCSorted, action)).toEqual({
      moviesStorage: [{
          id: 1,
          release_date: "0001-01-02"
        },
        {
          id: 0,
          release_date: "0001-01-01"
        },
      ]
    });
  });
});