import React from "react";
import "../../css/Header.scss";
import { useLocation } from "react-router-dom";
import { SearchForm } from "./SearchForm";
import { NavLinksAuthorized, NavLinksUnauthorized } from "./NavLinks";
import { SortingButtons } from "./SortingButtons";
import { SignOutButton } from "./SignOutButton";

export const Header = ({
  liked,
  sort,
  handleSearch,
  handleHeaderLikeSort,
  handleHeaderPostsSort,
}) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("userId") !== null;
  const showHomePageButtonsBoolean = location.pathname === "/homepage";

  return (
    <div className="Header">
      <div className="Links">
        {isAuthenticated ? <NavLinksAuthorized /> : <NavLinksUnauthorized />}
      </div>
      <div className="SortLikedTweets">
        {isAuthenticated && showHomePageButtonsBoolean && (
          <SortingButtons
            liked={liked}
            sort={sort}
            handleHeaderLikeSort={handleHeaderLikeSort}
            handleHeaderPostsSort={handleHeaderPostsSort}
          />
        )}
      </div>
      {isAuthenticated && showHomePageButtonsBoolean ? (
        <div className="Search">
          <SearchForm handleSearch={handleSearch} />
        </div>
      ) : (
        ""
      )}
      <div className="SignOut">{isAuthenticated && <SignOutButton />}</div>
    </div>
  );
};
