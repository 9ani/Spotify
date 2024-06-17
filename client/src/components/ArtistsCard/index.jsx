import React from "react";
import { RiPlayFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ArtistsCard = ({ id, title, imageUrl }) => {
  return (
    <Link
      to={`/artists/${id}`}
      className="bg-main-lg rounded-lg p-4 hover:bg-main-lgHover transition-all group"
    >
      <div className="mb-4 relative flex justify-center items-center">
        <img
          src={imageUrl}
          alt="Artist"
          className="w-48 h-48 rounded-full drop-shadow-2xl"
        />
        <button className="p-3 text-3xl bg-main-green rounded-full text-gray absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ease-out bg-[#65D46E] text-black">
          <RiPlayFill />
        </button>
      </div>
      <div>
        <h5 className="font-medium text-gray-100 mb-2 text-center">{title}</h5>
      </div>
    </Link>
  );
};

export default ArtistsCard;
