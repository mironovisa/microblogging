import { Link, useLocation } from "react-router-dom";
import "../../css/NavLinks.css";
import { useTweets } from "../../hooks/useTweets";
import { useEffect } from "react";

export const NavLinksAuthorized = () => {
  const { pathname } = useLocation();
  const isActive = (to) => pathname === to;
  const { fetchCount, totalTweets } = useTweets();
  useEffect(() => {
    fetchCount();
  }, [totalTweets]);
  const authorizedLinks = [
    {
      to: "/homepage",
      label: "Home",
      totalTweets: totalTweets,
    },
    {
      to: "/profile",
      label: "Profile",
      tweetCount: 5,
    },
  ];

  return (
    <>
      {authorizedLinks.map(({ to, label, totalTweets }) => (
        <Link
          key={to}
          to={to}
          className={isActive(to) ? "active" : ""}
          style={{ color: isActive(to) ? "white" : "gray" }}
        >
          {label === "Home" && (
            <span className="tweet-count">{totalTweets}</span>
          )}
          {label}
        </Link>
      ))}
    </>
  );
};

export const NavLinksUnauthorized = () => {
  const { pathname } = useLocation();
  const isActive = (to) => pathname === to;

  const unauthorizedLinks = [
    { to: "/#login", label: "Login" },
    { to: "/#signup", label: "Sign Up" },
  ];

  return (
    <>
      {unauthorizedLinks.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={isActive(to) ? "active" : ""}
          style={{ color: isActive(to) ? "white" : "gray" }}
        >
          {label}
        </Link>
      ))}
    </>
  );
};
