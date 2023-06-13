import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useSignIn } from "react-auth-kit";
import { TweetBtn } from "../../UI/Buttons/Buttons";
import "../../css/SignInForm.css";

export const SignInForm = () => {
  const { addUser, logIn } = useAuth();
  const signIn = useSignIn();
  const [newUserName, setNewUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await addUser(newUserName, password);
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
    // finally {
    //   await logIn({ text: newUserName, password });
    // }
    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text"></label>
        <input
          type="text"
          name="newUserName"
          value={newUserName}
          placeholder="Username"
          onChange={(e) => setNewUserName(e.target.value)}
        />
        {error && <div>{error}</div>}
        <label htmlFor="text"></label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div>{error}</div>}
        <TweetBtn
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
          text="Sign up"
        />
      </form>
    </div>
  );
};
