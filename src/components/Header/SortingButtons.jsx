import React from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";

export const MyLikedTweetsButton = ({ sort, handleHeaderLikeSort, liked }) => {
  const isAuthenticated = localStorage.getItem("userId") !== null;
  const handleHeaderLikeFunc = () => {
    handleHeaderLikeSort();
  };
  return (
    isAuthenticated && (
      <Button
        color="primary"
        variant="filled"
        endIcon={<FavoriteIcon />}
        onClick={handleHeaderLikeFunc}
        disabled={sort}
        className="Header-button-Like"
      >
        {liked ? "All Tweets" : "My"}
      </Button>
    )
  );
};

export const MyTweetsButton = ({ sort, handleHeaderPostsSort, liked }) => {
  const isAuthenticated = localStorage.getItem("userId") !== null;
  const handleSortUsersPostsFunc = () => {
    handleHeaderPostsSort();
  };
  return (
    isAuthenticated && (
      <Button
        color="primary"
        variant="filled"
        endIcon={<ChatIcon />}
        onClick={handleSortUsersPostsFunc}
        disabled={liked}
        className="Header-button-UserPosts"
      >
        {sort ? "All Tweets" : "My"}
      </Button>
    )
  );
};

export const SortingButtons = ({
  sort,
  handleHeaderPostsSort,
  handleHeaderLikeSort,
  liked,
}) => {
  return (
    <div className="SortLikedTweets">
      <MyLikedTweetsButton
        sort={sort}
        liked={liked}
        handleHeaderLikeSort={handleHeaderLikeSort}
      />
      <MyTweetsButton
        sort={sort}
        liked={liked}
        handleHeaderPostsSort={handleHeaderPostsSort}
      />
    </div>
  );
};
