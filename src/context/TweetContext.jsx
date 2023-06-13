import { createContext, useState } from "react";
import { useTweets } from "../hooks/useTweets";
export const MyContext = createContext();

const Provider = MyContext.Provider;
export const CountProvider = ({ children }) => {
  const { tweetlist, addTweet } = useTweets();
  const [tweetCount, setTweetCount] = useState(0);

  const incrementTweetCount = () => {
    setTweetCount(tweetCount + 1);
  };

  const value = {
    tweetlist,
    addTweet,
    tweetCount,
    incrementTweetCount,
  };
  return <Provider value={value}>{children}</Provider>;
};
