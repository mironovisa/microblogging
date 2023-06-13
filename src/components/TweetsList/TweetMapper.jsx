import React from "react";
import { Tweet } from "../TweetElement/Tweet";

const TweetMapper = ({ tweets, backgroundColor }) => {
  return (
    <>
      {tweets.map((item) => (
        <Tweet
          key={item.id}
          tweetKey={item.id}
          username={item.username ? item.username : "John The ITC SURVIVOR"}
          text={item.text}
          date={item.date}
          backgroundColor={backgroundColor}
          userImage={item.userImage}
          likedByUser={item.likedBy}
          allTweets={tweets}
        />
      ))}
    </>
  );
};

export default TweetMapper;
