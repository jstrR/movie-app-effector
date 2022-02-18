import React, { useState } from "react";

import { ListCinemaSessions, cinemaSessionsModel } from "entities/cinemaSession";
import { ISessionObject } from "utils/types";

type ICinemaSessionsProps = {
  cinemaSessions?: readonly any[] | [];
}

export const CinemaSessions: React.FC<ICinemaSessionsProps> = ({ cinemaSessions }) => {
  const bookSession = (cinema: string, time: string): void => {
    setSelected({ cinema, time });
    cinemaSessionsModel.bookMovieSession({ cinema: cinema, time: time });
  };
  const [selected, setSelected] = useState<ISessionObject | {}>({});

  const listSessions = cinemaSessions?.map((cinema: object, index: number) => (
    <ListCinemaSessions
      key={index}
      bookSession={bookSession}
      movieSessions={cinema}
      selected={selected}
    />
  ));

  return <>{listSessions}</>;
};
