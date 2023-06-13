import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { UploadWidget } from "../components/Profile/ProfilePhoto/Cloudinary";
import { TweetBtn } from "../UI/Buttons/Buttons";
import "../css/ProfilePage.scss";

export const Profile = ({ onUsernameChange }) => {
  const [newUsername, setNewUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { updateName } = useAuth();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setNewUsername(savedUsername);
    }
    const uploadedImageUrl = localStorage.getItem("imageUrl");
    setImageUrl(uploadedImageUrl);
  }, []);

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleShowSuccess = () => {
    toast.success("New username saved!");
  };

  const handleSave = () => {
    localStorage.setItem("username", newUsername);
    if (onUsernameChange) {
      onUsernameChange(newUsername);
    }
  };

  const handleUpdateName = async () => {
    try {
      console.log("Updating name:", newUsername);
      await updateName(newUsername);
      handleShowSuccess();
      handleSave();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update username, try again later");
    }
  };

  return (
    <div className="Profilepage">
      <h1>Profile</h1>
      <div className="Profileform">
        <div className="Profilephoto">
          <span>Your profile's photo</span>
          {imageUrl !==
            "https://res.cloudinary.com/doqkfgbhz/image/upload/c_scale,h_500,q_43,w_500/v1684803868/cat_cnaler.jpg" && (
            <img src={imageUrl} alt="cat" />
          )}
          <UploadWidget />
        </div>
        <div className="InputName">
          <span className="Usernamespan">User Name:</span>
          <div className="Usernameinput">
            <input
              type="text"
              id="username"
              value={newUsername}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="Savebutton">
            <TweetBtn type="submit" text={"Save"} onClick={handleUpdateName} />
          </div>
        </div>

      </div>
    </div>
  );
};
