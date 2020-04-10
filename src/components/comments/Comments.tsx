import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import CommentsInput from "../../common/commentsInput/CommentsInput";
import CommentsAuth from "../../common/commentsAuth/CommentsAuth";
import CommentsDisplay from "../../common/commentsDisplay/CommentsDisplay";

interface ICommentsProps {
  commentsStack?: Array<{ author: string; date: string; message: string }>;
}

interface ILoggedStatus {
  auth: {
    isAuthenticated: boolean;
  };
}

const Comments: React.FC<ICommentsProps> = ({ commentsStack }) => {
  const selectIsAuthenticated = (state: ILoggedStatus): boolean => {
    return state.auth.isAuthenticated;
  };

  const isAuthenticated: boolean = useSelector(
    selectIsAuthenticated,
    shallowEqual
  );

  const listComments =
    commentsStack &&
    commentsStack.map((comment, index) => (
      <CommentsDisplay key={index} comment={comment} />
    ));

  return (
    <>
      {isAuthenticated ? <CommentsInput /> : <CommentsAuth />}
      {listComments}
    </>
  );
};

export default Comments;
