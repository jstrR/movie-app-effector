import React, { useState } from "react";
import { useDispatch } from "react-redux";

import ListCinemaSessions from "../listCinemaSessions/ListCinemaSessions";
import { bookMovieSession } from "../../redux/modules/purchaseData";

interface ICinemaSessionsProps {
  cinemaSessions?: Array<{
    cinema?: Array<string>;
  }>;
}

const CinemaSessions: React.FC<ICinemaSessionsProps> = ({ cinemaSessions }) => {
  const dispatch = useDispatch();

  const bookSession = (cinema: string, time: string): void => {
    setSelected({ cinema: cinema, time: time });
    dispatch(bookMovieSession({ cinema: cinema, time: time }));
  };
  const [selected, setSelected] = useState({});

  const listSessions =
    cinemaSessions &&
    cinemaSessions.map((cinema: object, index: number) => {
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
