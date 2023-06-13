import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../../css/SearchForm.scss";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatIcon from "@mui/icons-material/Chat";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ButtonGroup from "@mui/material/ButtonGroup";
export const SearchForm = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchByLikesClick = () => {
    handleSearch();
    localStorage.setItem("searchText", searchText);
    setSearchText("");
  };
  const handleSearchByUsernameClick = () => {
    handleSearch();
    localStorage.setItem("searchId", searchText);
    setSearchText("");
  };
  const handleClearSearch = () => {
    handleSearch();
    localStorage.removeItem("searchText");
    localStorage.removeItem("searchId");
    setSearchText("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-form">
      <SearchIcon />
      <input
        className="search-input"
        type="text"
        value={searchText}
        placeholder="Search by..."
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />

      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        size="small"
        className="ButtonGroup"
      >
        <Button
          color="error"
          onClick={handleClearSearch}
          endIcon={<ArrowBackIcon />}
        ></Button>
        <Button
          color="primary"
          onClick={handleSearchByLikesClick}
          endIcon={<ChatIcon />}
        >
          By
        </Button>
        <Button
          color="secondary"
          onClick={handleSearchByUsernameClick}
          endIcon={<AccountBoxIcon />}
        >
          By
        </Button>
      </ButtonGroup>
    </div>
  );
};
