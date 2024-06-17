import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import axios from 'axios';
import { RiPlayFill } from 'react-icons/ri'; 

export const Playlistsection = ({ title }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v5/songs'); 
        setSongs(res.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">
          {title}
        </Link>
        <Link to="/" className="text-sm font-bold tracking-[2px] hover:underline">
          Show all
        </Link>
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {songs.map((song, index) => (
          <div key={index} className="cursor-pointer">
            <div className="bg-main-lg rounded-lg p-4 hover:bg-main-lgHover transition-all group">
              <div className="mb-4 relative flex justify-center items-center">
                <img
                  src={song.imageUrl} 
                  alt="Album"
                  className="w-48 h-48 rounded-xl drop-shadow-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                <AudioPlayer
                     src={song.songUrl} 
                     header={song.title} 
                     footer={song.artist} 
                     customAdditionalControls={[<RiPlayFill key="play-icon" />]}
                     autoPlayAfterSrcChange={false} 
                     className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     layout="stacked" 
                     showSkipControls={false}
                     showJumpControls={false}
                     showDownloadProgress={false}
                     showFilledProgress={false}
                     showFilledVolume={false}
                  />
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-100 mb-2">{song.title}</h5>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
