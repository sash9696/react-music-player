import axios from "axios";
import React, { useEffect, useState } from "react";
import { getHeaderWithProjectId } from "../utils/configs";
import MusicCard from "../components/music/MusicCard";
import { MusicProvider } from "../Provider/MusicProvider";
import { MusicPlayer } from "../components/music/MusicPlayer";
import { Navbar } from "../components/navbar/Navbar";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [musicsList, setMusicList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchMusics = async () => {
    const config = getHeaderWithProjectId();
    try {
      setIsLoading(true);
      const musics = await axios.get(
        "https://academics.newtonschool.co/api/v1/music/song",
        config
      );
      console.log("musics", musics);
      const musicListData = musics.data.data;
      setMusicList(musicListData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMusics();
  }, []);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }
    const searchURL = `https://academics.newtonschool.co/api/v1/music/song?search={"title":"${term}"}`;
    try {
      setIsLoading(true);
      const searchResponse = await axios.get(
        searchURL,
        getHeaderWithProjectId()
      );
      const searchResultsData = searchResponse.data.data;
      setSearchResults(searchResultsData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MusicProvider>
      <Navbar onSearch={handleSearch} />
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <section className="musicList-container">
            {searchResults.length > 0
              ? searchResults.map((music, i) => (
                  <MusicCard key={i} {...music} />
                ))
              : musicsList.map((music, i) => <MusicCard key={i} {...music} />)}
          </section>
          <MusicPlayer />
        </>
      )}
    </MusicProvider>
  );
};
