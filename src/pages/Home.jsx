import React from "react";
import { InputForm } from "../components/InputForm/InputForm";
import { Loader } from "../components/Loader";
import { TweetList } from "../components/TweetsList/TweetList";
import { useTweets } from "../hooks/useTweets";
import "../css/HomePage.scss";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const Homepage = ({ liked, search, sort }) => {
  const {
    addTweet,
    fetchTweets,
    allTweets,
    setAllTweets,
    fetchMoreTweets,
    likedTweets,
    usersSortedTweets,
    setLikedTweets,
    setUsersSortedTweets,
  } = useTweets();
  const [userTweets, setUserTweets] = useState(sort);
  useEffect(() => {
    setAllTweets([]);
    setLikedTweets([]);
    setUsersSortedTweets([]);
    const tryThis = localStorage.getItem("searchText");
    const tryId = localStorage.getItem("searchId");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    fetchTweets(1, tryThis, tryId, userId, username);
    localStorage.removeItem("searchText");
    localStorage.removeItem("searchId");
  }, [search, liked]);

  useEffect(() => {
    setUserTweets(sort);
  }, [sort]);

  const tweetListProps = userTweets
    ? usersSortedTweets
    : liked
    ? likedTweets
    : allTweets;

  return (
    <div className="area">
      <InputForm className="input-form" handleTweetSubmit={addTweet} />
      <InfiniteScroll
        dataLength={allTweets.length}
        next={fetchMoreTweets}
        hasMore={true}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollableTarget="area"
      >
        <TweetList allTweets={tweetListProps} />
      </InfiniteScroll>
    </div>
  );
};
