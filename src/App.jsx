import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/Home";
import { Header } from "./components/Header/Header";
import { Profile } from "./pages/Profile";
import { UserProfile } from "./pages/UserProfile";
import { CountProvider, MyContext } from "./context/TweetContext";
import { GlobalProvider } from "./context/GlobalContext";
import { RequireAuth } from "react-auth-kit";
import { SignInPage } from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import { Tryouts } from "./pages/404";
import { SearchResults } from "./pages/SearchResults";
import { useSignOut } from "react-auth-kit";
const App = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const [liked, setLiked] = useState(false);
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState(false);
  const handleHeaderLikeSort = () => {
    setLiked(!liked);
  };
  const handleHeaderPostsSort = () => {
    setSort(!sort);
  };
  const handleSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      signOut();
      localStorage.removeItem("userId");
      localStorage.removeItem("uploadedImageUrl");
      localStorage.removeItem("likedTweets");
      navigate("/#login");
    };

    const handleUnload = () => {
      signOut();
      localStorage.removeItem("userId");
      localStorage.removeItem("uploadedImageUrl");
      localStorage.removeItem("likedTweets");
      navigate("/");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return (
    <div>
      <GlobalProvider>
        <CountProvider>
          <Header
            handleHeaderLikeSort={handleHeaderLikeSort}
            liked={liked}
            sort={sort}
            handleSearch={handleSearch}
            handleHeaderPostsSort={handleHeaderPostsSort}
          />
          <Routes>
            <Route
              path="/tryouts"
              element={
                <RequireAuth loginPath="/#login">
                  <Tryouts />
                </RequireAuth>
              }
            />
            <Route path="/" element={<SignInPage />} />
            <Route
              path="/homepage"
              element={
                <RequireAuth loginPath="/">
                  <>
                    <Homepage liked={liked} search={search} sort={sort} />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth loginPath="/#login">
                  <>
                    <Profile />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="/userprofile/:name"
              element={
                <RequireAuth loginPath="/#login">
                  <>
                    <UserProfile />
                  </>
                </RequireAuth>
              }
            />
            <Route
              path="/searchresults/:text"
              element={
                <RequireAuth loginPath="/#login">
                  <>
                    <SearchResults />
                  </>
                </RequireAuth>
              }
            />
          </Routes>
        </CountProvider>
      </GlobalProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
