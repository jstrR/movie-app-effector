import React from "react";
import { useStore } from "effector-react";

import CommentsInput from "../../common/commentsInput/CommentsInput";
import CommentsAuth from "../../common/commentsAuth/CommentsAuth";
import CommentsDisplay from "../../common/commentsDisplay/CommentsDisplay";
import { Comment } from "../../api";
import { $isAuthenticated } from "../../effector/auth";
interface ICommentsProps {
  commentsStack?: readonly Comment[];
}

const Comments: React.FC<ICommentsProps> = ({ commentsStack }) => {
  const isAuthenticated = useStore($isAuthenticated);

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
