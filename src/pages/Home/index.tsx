import React, { useState } from "react";
import BookList from "./partials/booklist/booklist";
import "./index.css";

const Home = () => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setQuery(target.value.toLowerCase());
  };

  return (
    <>
      <div className="search_box">
        <div className="text_box">
          <span className="form_text_header">Hi there Booklover</span>
          <span className="form_text">lets find your dream book!</span>
        </div>
        <form className="form-search" action="" onSubmit={handleSubmit}>
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
