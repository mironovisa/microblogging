import React from "react";
import { Toast } from "../components/Toastifyalerts";
import { InputForm } from "../components/InputForm";
import { Loader } from "../components/Loader";
import { TweetList } from "../components/TweetList";
import { useTweets } from "../hooks/useTweets";
import { toast } from "react-toastify";
import "../App.css";

export const Homepage = () => {
  const { tweetlist, loading, addTweet, clearTweets } = useTweets();

  return (
    <div>
      <Toast
        showError={() => toast.error("Oops! Server error.")}
        showSuccess={() =>
          toast.success("Success! Your tweets have been saved.")
        }
      />
      <InputForm handleTweetSubmit={addTweet} />
      {loading ? <Loader /> : <TweetList tweetlist={tweetlist} />}
      {/* <button onClick={clearTweets}>Clear</button> */}
    </div>
  );
};
