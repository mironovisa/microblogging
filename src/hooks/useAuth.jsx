import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

export function useAuth() {
  const signIn = useSignIn();
  const history = useNavigate();
  const { AUTH_ENDPOINT } = useContext(GlobalContext);
  const addUser = async (newUserName, password) => {
    const newId = uuid();
    const values = { text: newUserName, password };
    if (newUserName.trim().length === 0) {
      return;
    }

    try {
      const response = await axios.get(
        `${AUTH_ENDPOINT}?username=${newUserName}`
      );

      if (response.data.length > 0) {
        toast.error("Username already exists. Please choose another name.");
        return;
      }

      const newReg = {
        id: newId,
        username: newUserName,
        password: password,
        imageUrl:
          "https://res.cloudinary.com/doqkfgbhz/image/upload/c_scale,h_500,q_43,w_500/v1684803868/cat_cnaler.jpg",
      };

      const registerResponse = await axios.post(AUTH_ENDPOINT, newReg, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (registerResponse.status < 200 || registerResponse.status >= 300) {
        throw new Error("Failed to register");
      }
      await logIn(values);
      toast.success("Successfully registered, redirecting to homepage");
      return registerResponse.data;
    } catch (err) {
      console.error(err);
      toast.error("Failed to register, try again later");
    }
  };
  const updateName = async (name) => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.put(`${AUTH_ENDPOINT}/${userId}`, {
        username: name,
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to update username");
      }

      toast.success("Username updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update username, try again later");
    }
  };
  const logIn = async (values) => {
    try {
      const response = await axios.get(
        `${AUTH_ENDPOINT}?username=${values.text}`
      );

      if (response.status === 200 && response.data.length > 0) {
        const user = response.data[0];

        if (user.password === values.password) {
          const { token, expireIn, id, username, imageUrl } = user;

          signIn({ token, expiresIn: expireIn + 50 });

          localStorage.setItem("userId", id);
          localStorage.setItem("username", username);
          localStorage.setItem("imageUrl", imageUrl);

          history("/homepage");
        } else {
          throw new Error("Incorrect password");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to authenticate, please try again.");
    }
  };
  const updateImageUrl = async (imageUrl) => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.put(`${AUTH_ENDPOINT}/${userId}`, {
        imageUrl: imageUrl,
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to update image URL");
      }

      toast.success("Image URL updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update image URL, try again later");
    }
  };
  return { addUser, updateName, logIn, updateImageUrl };
}
