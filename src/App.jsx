import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTweets } from "./hooks/useTweets";
import "./App.css";
import { Header } from "./layout/Header";
import { Homepage } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { TweetsContext } from "./context/TweetContext";

const App = () => {
  const { tweetlist, loading, addTweet, clearTweets } = useTweets();

  return (
    <TweetsContext.Provider>
      <div>
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </Router>
      </div>
    </TweetsContext.Provider>
  );
};
export default App;
