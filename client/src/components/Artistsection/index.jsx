import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ArtistsCard from "../ArtistsCard";

import "./Artistsection.css";

export const Artistsection = ({ title }) => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v5/artists");
        setArtists(res.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">
          {title}
        </Link>
        <Link
          to="/"
          className="text-sm font-bold tracking-[2px] hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {artists.map((artist) => (
          <ArtistsCard
            key={artist._id}
            id={artist._id}
            title={artist.name}
            imageUrl={artist.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
