import { createContext } from "react";

export const TweetsContext = createContext({
  tweetlist: [],
  addTweet: () => {},
});
