"use client";
import { useState, useEffect } from "react";
import PaletteCard from "./PaletteCard";

const PaletteCardList = ({ data, handleTagClick }) => {

  return (
    <div className="mt-16 palette_layout">
      {data.map((palette) => (
        <PaletteCard 
          key={palette.id}
          palette={palette}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [palettes, setPalettes] = useState([]);
  const [filteredPalettes, setFilteredPalettes] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const reg = new RegExp(searchText, "i");
    const filtered = palettes.filter((palette) => {
      return reg.test(palette.tag) || reg.test(palette.creator.username);
    })
    setFilteredPalettes(filtered);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const reg = new RegExp(searchText, "i");
    const filtered = palettes.filter((palette) => {
      return reg.test(palette.tag) || reg.test(palette.creator.username);
    })
    setFilteredPalettes(filtered);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const reg = new RegExp(tag, "i");
    const filtered = palettes.filter((palette) => {
      return reg.test(palette.tag) || reg.test(palette.creator.username);
    })
    setFilteredPalettes(filtered);
  }

  useEffect(() => {
    // fetch data
    const fetchPalettes = async() => {
      const response = await fetch("/api/palette");
      const data = await response.json();

      setPalettes(data);
    }
    fetchPalettes();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center max-w-xl" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>


      {
        searchText?
        <PaletteCardList
          data = {filteredPalettes}
          handleTagClick={handleTagClick}
        />
        :
        <PaletteCardList
          data={palettes}
          handleTagClick={handleTagClick}
        />
      }
    </section>
  )
}

export default Feed