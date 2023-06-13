import { createContext, useState } from "react";

export const GlobalContext = createContext();

const Provider = GlobalContext.Provider;
export const GlobalProvider = ({ children }) => {
  const API_ENDPOINT =
    "https://644cbbd957f12a1d3dd00594.mockapi.io/api/v1/posts";
  const AUTH_ENDPOINT =
    "https://644cbbd957f12a1d3dd00594.mockapi.io/api/v1/login";
  const [myPage, setMyPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const value = {
    API_ENDPOINT,
    AUTH_ENDPOINT,
    myPage,
    setMyPage,
    searchQuery,
    setSearchQuery,
  };

  return <Provider value={value}>{children}</Provider>;
};
