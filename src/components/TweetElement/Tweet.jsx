import React, { useEffect, useState } from "react";
import "../../css/TweetElement.scss";
import { Link } from "react-router-dom";
import { TweetAvatar } from "./TweetAvatar";
import { TweetNickname } from "./TweetNickname";
import { TweetDate } from "./TweetDate";
import { TweetText } from "./TweetText";
import { TweetIcons } from "./TweetIcons";
import { TweetCommentField } from "./TweetCommentField";
import { CommentsList } from "../CommentsList/CommentsList";
import useTweets from "../../hooks/useTweets";
import { tweetCommentsRender } from "./TweetCommentsRender";

export const Tweet = ({
  tweetKey,
  username,
  text,
  date,
  userImage,
  likedByUser,
  allTweets,
}) => {
  const [addTweet, setAddTweet] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { fetchComments, comments, commentsCount, likeCount } = useTweets();
  useEffect(() => {
    fetchComments(tweetKey);
  }, [showComments]);

  const handleShowCommentsField = () => {
    setAddTweet(!addTweet);
  };
  const hadnleShowAllComments = () => {
    setShowComments(!showComments);
  };
  const handleShowCommentsFieldAndComments = () => {
    setShowComments(false);
    setAddTweet(false);
  };

  return (
    <div className="tweet-container">
      <div className="tweet-avatar">
        <TweetAvatar username={username} userImage={userImage} />
      </div>
      <div className="tweet-nickname">
        <Link
          to={`/userprofile/${username}?imageUrl=${encodeURIComponent(
            userImage
          )}`}
          className="profile-link"
        >
          <TweetNickname username={username} />
        </Link>
      </div>
      <div className="tweet-date">
        <TweetDate date={date} />
      </div>
      <div className="tweet-text">
        <TweetText text={text} />
      </div>
      <div className="tweet-like">
        <TweetIcons
          tweetKey={tweetKey}
          likedByUser={likedByUser}
          handleShowCommentsField={handleShowCommentsField}
          handleShowAllComments={hadnleShowAllComments}
          commentsCount={commentsCount}
          likeCount={likeCount}
        />
      </div>
      <div className="tweet-comment-field">
        {addTweet && (
          <TweetCommentField
            tweetId={tweetKey}
            handleShowCommentsFieldAndComments={
              handleShowCommentsFieldAndComments
            }
          />
        )}
      </div>
      <div className="tweet-comments-list">
        {" "}
        {showComments && <div>{tweetCommentsRender(comments)}</div>}
      </div>
    </div>
  );
};
