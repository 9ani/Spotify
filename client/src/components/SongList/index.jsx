import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get('https://spotify-7s22.onrender.com/api/v5/songs');
        setSongs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div>
      {songs.map((song) => (
        <div key={song.name}>
          <h3>{song.name}</h3>
          <ReactAudioPlayer src={song.url} controls />
        </div>
      ))}
    </div>
  );
};

export default SongList;
