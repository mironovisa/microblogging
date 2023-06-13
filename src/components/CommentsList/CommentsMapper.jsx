import React from "react";
import { Tweet } from "../TweetElement/Tweet";

export const CommentsMapper = ({ postComments }) => {
  return (
    <>
      {postComments.map((item) => (
        <Tweet
          key={item.id}
          tweetKey={item.id}
          username={item.username ? item.username : "John The ITC SURVIVOR"}
          text={item.text}
          date={item.date}
          userImage={item.userImage}
          likedByUser={item.likedBy}
          allTweets={postComments}
        />
      ))}
    </>
  );
};
