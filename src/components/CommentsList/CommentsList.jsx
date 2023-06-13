import React from "react";
// import "../../css/CommentsList.css";

import { CommentsMapper } from "./CommentsMapper";

export const CommentsList = ({ postComments }) => {
  return (
    <div className="CommentsList-Div">
      <div className="commentslist-container">
        <CommentsMapper comments={postComments} backgroundColor="#223a40" />
      </div>
    </div>
  );
};
