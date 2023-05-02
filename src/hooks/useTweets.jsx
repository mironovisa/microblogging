import { Toast } from "../components/Toastifyalerts";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export function useTweets() {
  const API_ENDPOINT =
    "https://644cbbd957f12a1d3dd00594.mockapi.io/api/v1/posts";

  const [tweetlist, setTweetlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformTweets = (tweets) => {
    const sortedTweets = tweets.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const reversedTweets = sortedTweets.reverse();

    return reversedTweets.map((tweet) => {
      return {
        id: tweet.id,
        username: tweet.name,
        text: tweet.post,
        date: new Date(tweet.createdAt).toLocaleString(),
      };
    });
  };

  const fetchTweets = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      const transformedTweets = transformTweets(data);
      setTweetlist(transformedTweets);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const clearTweets = async () => {
    try {
      setLoading(true);
      await fetch(API_ENDPOINT, { method: "DELETE" });
      setTweetlist([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addTweet = async (tweet, username) => {
    if (tweet.trim().length === 0) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          post: tweet,
          createdAt: Date.now(),
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong while posting your tweet");
      }
      const data = await response.json();
      setTweetlist((prevTweets) => [
        {
          id: data.id,
          username: data.name,
          text: data.post,
          date: new Date(data.createdAt).toLocaleString(),
        },
        ...prevTweets,
      ]);
      handleShowSuccess();
    } catch (error) {
      console.error(error);
      handleShowError();
    } finally {
      setLoading(false);
    }
  };
  const handleShowError = () => {
    toast.error("Tweet cannot be longer than 140 characters");
  };

  const handleShowSuccess = () => {
    toast.success("Success! Your tweet have been saved.");
  };

  return { tweetlist, loading, addTweet, clearTweets };
}
