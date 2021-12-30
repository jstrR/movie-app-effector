import React, { useState } from "react";

import ListCinemaSessions from "../listCinemaSessions/ListCinemaSessions";
import { bookMovieSession } from "../../effector/purchaseData";
import { ISessionObject } from "../../utils/types";

interface ICinemaSessionsProps {
  cinemaSessions?: Array<{
    cinema?: Array<string>;
  }>;
}

const CinemaSessions: React.FC<ICinemaSessionsProps> = ({ cinemaSessions }) => {
  const bookSession = (cinema: string, time: string): void => {
    setSelected({ cinema, time });
    bookMovieSession({ cinema: cinema, time: time });
  };
  const [selected, setSelected] = useState<ISessionObject | {}>({});

  const listSessions = cinemaSessions?.map((cinema: object, index: number) => {
    return (
      <ListCinemaSessions
        key={index}
        bookSession={bookSession}
        movieSessions={cinema}
        selected={selected}
      />
    );
  });

  return <>{listSessions}</>;
};

export default CinemaSessions;
