import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import LogoutIcon from "@mui/icons-material/Logout";

export const SignOutButton = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    localStorage.removeItem("userId");
    localStorage.removeItem("uploadedImageUrl");
    localStorage.removeItem("likedTweets");
    console.log(localStorage.getItem("userId"));
    navigate("/#login");
  };
  return <LogoutIcon className="LogOutIcon" onClick={handleSignOut} />;
};
