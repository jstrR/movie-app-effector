import React from "react";
import { useStore } from "effector-react";

import CommentsInput from "../../common/commentsInput/CommentsInput";
import CommentsAuth from "../../common/commentsAuth/CommentsAuth";
import CommentsDisplay from "../../common/commentsDisplay/CommentsDisplay";
import { IComment } from "../../utils/types";
import { $isAuthenticated } from "../../effector/auth";
interface ICommentsProps {
  commentsStack?: Array<IComment>;
}

const Comments: React.FC<ICommentsProps> = ({ commentsStack }) => {
  const isAuthenticated: Boolean = useStore($isAuthenticated);

  const listComments = commentsStack?.map((comment, index) => (
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
