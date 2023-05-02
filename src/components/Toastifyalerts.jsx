import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = ({
  position = "top-right",
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  theme = "dark",
}) => {
  const handleShowError = () => {
    toast.error("Server error:(");
  };
  const handleShowSuccess = () => {
    toast.success("Your tweet has been added! :)");
  };

  return (
    <>
      <ToastContainer
        position={position}
        autoClose={autoClose}
        hideProgressBar={hideProgressBar}
        closeOnClick={closeOnClick}
        pauseOnHover={pauseOnHover}
        draggable={draggable}
        theme={theme}
      />
    </>
  );
};
