import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import CommentsInput from "../../common/commentsInput/CommentsInput";
import CommentsAuth from "../../common/commentsAuth/CommentsAuth";
import CommentsDisplay from "../../common/commentsDisplay/CommentsDisplay";
import { IComment } from "../../utils/types";
import { selectIsAuthenticated } from "../../redux/selectors/auth";

interface ICommentsProps {
  commentsStack?: Array<IComment>;
}

const Comments: React.FC<ICommentsProps> = ({ commentsStack }) => {
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
