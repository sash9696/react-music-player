import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

export const SearchBar = ({ onSearch, value, onChange }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <section className="searchbar-container">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="search here"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        autoComplete="off"
      />
      <SearchIcon onClick={onSearch} style={{ cursor: "pointer" }} />
    </section>
  );
};
