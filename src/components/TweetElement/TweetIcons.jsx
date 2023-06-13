import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import ForumIcon from "@mui/icons-material/Forum";
import { useEffect, useState, useContext } from "react";
import useTweets from "../../hooks/useTweets";
import { Badge } from "@mui/material";
import "../../css/TweetIcons.scss";
export const TweetIcons = ({
  tweetKey,
  likedByUser,
  handleShowCommentsField,
  handleShowAllComments,
  commentsCount,
  likeCount,
}) => {
  const { likeTweet, disLikeTweet } = useTweets();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (likedByUser) {
      const likedByCurrentUser = likedByUser.some(
        (likedId) => likedId === userId
      );
      setLiked(likedByCurrentUser);
    }
  }, [likedByUser]);

  const handleLike = async () => {
    if (liked) {
      await disLikeTweet(tweetKey);
    } else {
      await likeTweet(tweetKey);
    }
    setLiked(!liked);
  };
  const handleShowComments = () => {
    handleShowCommentsField();
  };
  const handleShowAllCommentsClick = () => {
    handleShowAllComments();
  };

  return (
    <div className="icons-row">
      <LikeIcon
        tweetKey={tweetKey}
        likeTweet={likeTweet}
        disLikeTweet={disLikeTweet}
        liked={liked}
        onClick={handleLike}
        likeCount={likeCount}
      />
      <AddIcon onClick={handleShowComments} />
      <CommentsIcon
        onClick={handleShowAllCommentsClick}
        commentsCount={commentsCount}
      />
    </div>
  );
};

export const CommentsIcon = ({ onClick, commentsCount }) => {
  return (
    <Badge badgeContent={commentsCount} color="primary" onClick={onClick}>
      <ForumIcon className="CommentIcon" />
    </Badge>
  );
};

export const AddIcon = ({ onClick }) => {
  return (
    <Badge color="primary" onClick={onClick}>
      {" "}
      <MapsUgcIcon className="CommentIcon" onClick={onClick} />
    </Badge>
  );
};

export const LikeIcon = ({ onClick, liked, likeCount }) => {
  return (
    <Badge color="primary" onClick={onClick} badgeContent={likeCount}>
      <FavoriteIcon
        className="FavIconLiked"
        style={{ color: liked ? "red" : "white" }}
      />
    </Badge>
  );
};
