import React, { useState, useEffect } from "react";
import { Artistsection } from "../../components/Artistsection";
import Header from "../../components/Header";
import { Playlistsection } from "../../components/PlaylistSection";
import Sidebar from "../../components/Sidebar";
import "./Home.css";
import { Footer } from "../../components/footer";
import UploadForm from "../../components/UploadForm";

export const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className="min-h-screen text-gray-300">
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="bg-custom-section pt-28 md:pl-72 p-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          onClick={() => setShowUploadForm(!showUploadForm)}
        >
          {showUploadForm ? "Hide Upload Form" : "Upload a Song"}
        </button>

        {showUploadForm && <UploadForm />}

        <h1>Playlist </h1>
        <Playlistsection playlistTitle="Playlist 1" />
        
        <Artistsection />
        <Footer />
      </div>
    </div>
  );
};
