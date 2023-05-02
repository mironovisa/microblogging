import React, { useEffect } from "react";
import "../css/Tweet.css";

export const Tweet = ({ id, username, text, date }) => {
  useEffect(() => {
    const tweetContainers = document.querySelectorAll(".tweet-container");
    tweetContainers.forEach((tweetContainer) => {
      const tweetText = tweetContainer.querySelector(".tweet-text");
      const tweetTextHeight = tweetText.offsetHeight;
      tweetContainer.style.height = `${tweetTextHeight + 60}px`;
    });
  }, []);

  return (
    <div className="tweet-container" id={id}>
      <div className="top-line">
        <p className="tweet-nickname">{username}</p>
        <p className="tweet-date">{date}</p>
      </div>
      <p className="tweet-text">{text}</p>
    </div>
  );
};
