import React from "react";
import "../../css/TweetList.css";

import TweetMapper from "./TweetMapper";

export const TweetList = ({ allTweets }) => {
  return (
    <div className="TweetList-Div">
      <div className="tweetlist-container">
        <TweetMapper tweets={allTweets} backgroundColor="#223a40" />
      </div>
    </div>
  );
};
