import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/UserProfile.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

export const UserProfile = () => {
  const { name } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userImage = searchParams.get("imageUrl");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/homepage");
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <h2 className="profile-name">Profile of {name}</h2>
      </div>
      <Button
        color="secondary"
        variant="filled"
        endIcon={<ArrowBackIcon />}
        className="go-back-button"
        onClick={handleClick}
      >
        Back To Tweets
      </Button>
      <div className="profile-photo">
        <img src={userImage} alt={name} />
      </div>
    </div>
  );
};
