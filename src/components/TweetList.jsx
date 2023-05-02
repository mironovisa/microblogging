import React from "react";
import { Tweet } from "./Tweet";
import "../css/TweetList.css";

export const TweetList = ({ tweetlist }) => {
  return (
    <div className="tweetlist-container">
      {tweetlist
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((item, index) => (
          <Tweet
            key={index}
            username={item.username}
            text={item.text}
            date={item.date}
          />
        ))}
    </div>
  );
};
