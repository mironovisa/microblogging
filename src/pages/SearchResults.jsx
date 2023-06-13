import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useTweets from "../hooks/useTweets";

export const SearchResults = () => {
  const url = window.location.href;
  const searchQuery = (url.match(/text=([^&]+)/) || [])[1];
  console.log(searchQuery);

  const [searchResults, setSearchResults] = useState([]);
  const { searchTweets } = useTweets();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const results = await searchTweets(searchQuery);
      setSearchResults(results);
    };

    fetchSearchResults();
  }, [searchQuery, searchTweets]);

  return (
    <div>
      <h2>Search Results</h2>
      {searchResults.map((result) => (
        <div key={result.id}>
          <h3>{result.username}</h3>
          <p>{result.text}</p>
          <p>{result.date}</p>
        </div>
      ))}
    </div>
  );
};
