import React, { useState } from "react";
import { TweetBtn } from "../../UI/Buttons/Buttons.jsx";
import "../../css/TweetCommentField.scss";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useTweets } from "../../hooks/useTweets.jsx";
import { Toast } from "../Toastifyalerts.jsx";
import { toast } from "react-toastify";

export const TweetCommentField = ({
  tweetId,
  handleShowCommentsFieldAndComments,
}) => {
  const [comment, setComment] = useState("");
  const { addComment } = useTweets();
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const handleSubmit = (e) => {
    if (comment.trim() === "") {
      toast.error("Comment can't be empty!");
    }
    e.preventDefault();
    addComment(tweetId, username, comment);
    setComment("");
    handleShowCommentsFieldAndComments();
  };

  return (
    <div className="addCommentField">
      <div className="tweet-comment-field">
        <form onSubmit={handleSubmit} className="form">
          <div>
            <TextareaAutosize
              className="input-form"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            <TweetBtn text="Add" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
