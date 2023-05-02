import React, { useState, useEffect } from "react";
import "../css/Profile.css";
import { TweetBtn } from "../UI/Buttons/Buttons";
import { Toast } from "../components/Toastifyalerts";
import { toast } from "react-toastify";

export const Profile = ({ username, onUsernameChange }) => {
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setNewUsername(savedUsername);
    } else {
      setNewUsername(username);
    }
  }, [username]);

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
    handleShowSuccess();
    console.log("New username saved:", newUsername);
  };

  return (
    <div className="Profilepage">
      <div className="Profileform">
        <h1>Profile</h1>
        <span className="Usernamespan">User Name:</span>
        <div className="Usernameinput">
          <input
            type="text"
            id="username"
            value={newUsername}
            placeholder={newUsername}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="Savebutton">
          <TweetBtn type="submit" text={"Save"} onClick={handleSave} />
        </div>
        <Toast />
      </div>
    </div>
  );
};
