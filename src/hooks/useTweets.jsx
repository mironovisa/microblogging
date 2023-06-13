import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Toast } from "../components/Toastifyalerts";

export function useTweets() {
  const { API_ENDPOINT } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [totalTweets, setTotalTweets] = useState(0);
  const [allTweets, setAllTweets] = useState([]);
  const [usersSortedTweets, setUsersSortedTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const likeTweet = async (id) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`${API_ENDPOINT}/${id}`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to fetch tweet data");
      }
      const tweetData = response.data;
      const currentLikedBy = tweetData.likedBy;
      if (currentLikedBy.includes(userId)) {
        throw new Error("User has already liked the tweet");
      }
      const updatedLikedBy = [...currentLikedBy, userId];
      const updateResponse = await axios.put(`${API_ENDPOINT}/${id}`, {
        likedBy: updatedLikedBy,
      });

      if (updateResponse.status < 200 || updateResponse.status >= 300) {
        throw new Error("Failed to update likedBy array");
      }

      toast.success("Tweet liked successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to like the tweet, try again later");
    }
  };

  const disLikeTweet = async (id) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`${API_ENDPOINT}/${id}`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to fetch tweet data");
      }
      const tweetData = response.data;
      const currentLikedBy = tweetData.likedBy;
      if (!currentLikedBy.includes(userId)) {
        throw new Error("User has not liked the tweet");
      }
      const updatedLikedBy = currentLikedBy.filter(
        (likedUserId) => likedUserId !== userId
      );
      const updateResponse = await axios.put(`${API_ENDPOINT}/${id}`, {
        likedBy: updatedLikedBy,
      });

      if (updateResponse.status < 200 || updateResponse.status >= 300) {
        throw new Error("Failed to update likedBy array");
      }

      toast.success("Tweet unliked successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to unlike the tweet, try again later");
    }
  };

  const transformedAPITweets = (apiTweets) => {
    return apiTweets.map((tweet) => {
      return {
        id: tweet.id,
        username: tweet.name,
        text: tweet.post,
        date: new Date(tweet.createdAt).toLocaleString(),
        userId: tweet.userId,
        userImage: tweet.userImage,
        likedBy: tweet.likedBy,
      };
    });
  };

  const fetchCount = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      if (response.data && response.data.count) {
        const count = response.data.items.length;
        setTotalTweets(count);
      } else {
        setTotalTweets(0);
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  const fetchTweets = async (
    myPage,
    searchQuery = "",
    userNameSearch = "",
    userId,
    username
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINT, {
        params: {
          sortBy: "createdAt",
          order: "desc",
          page: myPage,
          limit: 10,
          post: searchQuery,
          name: userNameSearch,
        },
      });
      const apiTweets = response.data.items;
      const transformedTweets = transformedAPITweets(apiTweets);

      setAllTweets((prevTweets) => [...prevTweets, ...transformedTweets]);

      const filteredByLikesTweets = transformedTweets.filter((tweet) =>
        tweet.likedBy.includes(userId)
      );
      setLikedTweets((prevTweets) => [...prevTweets, ...filteredByLikesTweets]);
      const filteredByUsersTweets = transformedTweets.filter((tweet) =>
        tweet.userId.toString().includes(`${userId}`)
      );
      setUsersSortedTweets((prevTweets) => [
        ...prevTweets,
        ...filteredByUsersTweets,
      ]);
      fetchCount();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchMoreTweets = async () => {
    const nextPage = Math.ceil(allTweets.length / 10) + 1;
    const tryThis = localStorage.getItem("searchText");
    const tryId = localStorage.getItem("searchId");
    await fetchTweets(nextPage, tryThis, tryId);
    fetchCount();
  };

  const addTweet = async (tweet, username) => {
    if (tweet.trim().length === 0) {
      toast.error("Tweet can't be empty");
      return;
    }
    try {
      setLoading(true);
      const newTweet = {
        name: username,
        post: tweet,
        createdAt: new Date().toLocaleString("en-US"),
        userId: localStorage.getItem("userId"),
        userImage: localStorage.getItem("imageUrl"),
      };
      const updatedTweets = [newTweet, ...allTweets];
      const transformedTweets = updatedTweets.map((tweet) => {
        return {
          id: tweet.id,
          username: tweet.name,
          text: tweet.post,
          date: new Date(tweet.createdAt).toLocaleString(),
          userId: tweet.userId,
          userImage: tweet.userImage,
        };
      });
      setAllTweets(transformedTweets);
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTweet),
      });

      if (!response.ok) {
        throw new Error("Failed to add tweet.");
      }
      toast.success("Tweet added successfully!");
      fetchCount();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setAllTweets([]);
      fetchTweets();
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/${postId}/comments`);
      const apiComments = response.data;
      const transformedComments = transformedAPIComments(apiComments);
      console.log(transformedComments);
      setComments(transformedComments);
      setCommentsCount(transformedComments.length);
    } catch (error) {
      console.error(error);
    }
  };
  const transformedAPIComments = (apiComments) => {
    return apiComments.map((comment) => {
      return {
        id: comment.id,
        username: comment.name,
        text: comment.post,
        date: new Date(comment.createdAt).toLocaleString(),
        userId: comment.userId,
        userImage: comment.userImage,
      };
    });
  };

  const addComment = async (postId, username, post) => {
    if (post.trim().length === 0) {
      toast.error("Please add some text!");
      return;
    }
    try {
      setLoading(true);
      const newComment = {
        name: username,
        post: post,
        createdAt: new Date().toLocaleString("en-US"),
        userId: localStorage.getItem("userId"),
        userImage: localStorage.getItem("imageUrl"),
      };
      const updatedComments = [newComment, ...comments];
      const transformedComments = updatedComments.map((comment) => {
        return {
          id: comment.id,
          username: comment.name,
          text: comment.post,
          date: new Date(comment.createdAt).toLocaleString(),
          userId: comment.userId,
          userImage: comment.userImage,
          postId: postId,
        };
      });
      setComments(transformedComments);
      const response = await fetch(`${API_ENDPOINT}/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment.");
      }
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      fetchComments();
      setLoading(false);
    }
  };

  return {
    loading,
    addTweet,
    totalTweets,
    fetchTweets,
    allTweets,
    setAllTweets,
    totalTweets,
    fetchCount,
    usersSortedTweets,
    setUsersSortedTweets,
    likeTweet,
    disLikeTweet,
    fetchMoreTweets,
    likedTweets,
    setLikedTweets,
    addComment,
    fetchComments,
    comments,
    commentsCount,
  };
}

export default useTweets;
