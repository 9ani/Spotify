import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlaylistsCard from '../PlaylistCard';
const ArtistDetailPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get(`https://spotify-7s22.onrender.com/api/v5/artists/${id}`);
        setArtist(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artist:', error);
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!artist) return <p>Artist not found</p>;

  return (
    <div className="container mx-auto mt-20"> 
      <h2 className="text-3xl font-bold mb-4">{artist.name}</h2>
      <img src={artist.imageUrl} alt="Artist" className="w-32 h-32 rounded-full mb-4" />
      <p className="text-lg">{artist.description}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artist.songs.map((song, index) => (
          <PlaylistsCard
            key={index}
            title={song.title}
            description={song.album}
            imageUrl={artist.imageUrl}
            songUrl={song.songUrl}
            artist={artist.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistDetailPage;
