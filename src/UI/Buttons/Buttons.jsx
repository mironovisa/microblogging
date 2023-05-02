import React from "react";
import "./Buttons.css";
export const TweetBtn = (props) => {
  const { type, disabled, onClick, text } = props;
  return (
    <button
      className="tweet-btn"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
