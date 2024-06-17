import React from "react";
import { RiPlayFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const PlaylistsCard = ({ title, description, imageUrl, songUrl, artist }) => {
  return (
    <div className="bg-main-lg rounded-lg p-4 hover:bg-main-lgHover transition-all group w-60">
      <div className="mb-4 relative flex justify-center items-center">
        <img
          src={imageUrl}
          alt="Album"
          className="w-48 h-48 rounded-xl drop-shadow-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <AudioPlayer
            src={songUrl}
            header={title}
            footer={artist}
            autoPlayAfterSrcChange={false} 
            customAdditionalControls={[<RiPlayFill key="play-icon" />]} 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            layout="horizontal-reverse"
            showSkipControls={false}
            showJumpControls={false}
            showDownloadProgress={false}
            showFilledProgress={false}
            showFilledVolume={false}
          />
        </div>
      </div>
      <div>
        <h5 className="font-medium text-gray-100 mb-2">{title}</h5>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default PlaylistsCard;
