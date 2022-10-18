import React, { useEffect, useCallback, useRef, useState } from "react";
import BookList from "./partials/booklist/booklist";
import "./index.css";

const Home = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleInput = (e: any) => {
    setQuery(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="search_box">
        <div className="text_box">
          <span className="form_text_header">Hi there Booklover</span>
          <span className="form_text">lets find your dream book!</span>
        </div>
        <form className="form-search" onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            value={query}
            placeholder="search your book here for.."
            onChange={handleInput}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <BookList query={query} />
    </>
  );
};

export default Home;
