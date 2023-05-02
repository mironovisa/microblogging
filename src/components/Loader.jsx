import React, { useState } from "react";
import loader from "../assets/loader.svg";
import "../css/Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loader} alt="loader" />
    </div>
  );
};
