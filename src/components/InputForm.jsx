import React, { useState } from "react";
import "../css/InputForm.css";
import { TweetBtn } from "../UI/Buttons/Buttons";

export const InputForm = ({ handleTweetSubmit }) => {
  const [tweet, setTweet] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTweetSubmit(tweet, username);
    setTweet("");
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <textarea
          value={tweet}
          placeholder="What you have in mind"
          onChange={(e) => setTweet(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {tweet.length > 140 && (
          <span className="errorspan">
            The tweet can't contain more then 140 chars.
          </span>
        )}
        <TweetBtn
          type="submit"
          disabled={tweet.length > 140}
          text={"Tweet"}
        ></TweetBtn>
      </form>
    </div>
  );
};
