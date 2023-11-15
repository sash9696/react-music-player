import React, { useState } from "react";
import { Logo } from "./Logo";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Profile } from "./Profile";
import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import { ReactComponent as PodcastIcon } from "../../assets/podcast.svg";
import { ReactComponent as HeadPhoneIcon } from "../../assets/headphone.svg";

export const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <ul className="nav-links">
        <li className="link-item">
          <HomeIcon />
          <NavLink to="/">HOME</NavLink>
        </li>

        <li className="link-item">
          <PodcastIcon />
          <NavLink to="/social">Social</NavLink>
        </li>

        <li className="link-item">
          <HeadPhoneIcon />
          <NavLink to="/library">LIBRARY</NavLink>
        </li>
      </ul>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
      />
      <Profile />
    </nav>
  );
};
