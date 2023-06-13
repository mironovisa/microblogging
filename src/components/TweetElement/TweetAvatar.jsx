import React from "react";
import Avatar from "@mui/material/Avatar";

export const TweetAvatar = ({ userImage, username}) => {

  return <Avatar alt={username} src={userImage} />;
};
