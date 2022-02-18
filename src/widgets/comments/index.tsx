import React from "react";
import { useStore } from "effector-react";

import { CommentsInput, CommentsAuth, CommentsDisplay } from "features/comments";
import { Comment } from "shared/api";
import { userModel } from "entities/user";

type ICommentsProps = {
  commentsStack?: readonly Comment[];
}

export const Comments: React.FC<ICommentsProps> = ({ commentsStack }) => {
  const isAuthenticated = useStore(userModel.$isAuthenticated);

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
