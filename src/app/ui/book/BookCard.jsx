import React from "react";
import { FiPlay, FiPlayCircle, FiStar } from "react-icons/fi";
import { LuFileAudio2 } from "react-icons/lu";

const BookCard = ({ book, details = false }) => {
  return (
    <div className="flex items-start gap-x-2 h-36">
      <img
        src="/bookImage.jpg"
        alt="book-cover"
        className="h-full rounded shadow-md"
      />
      <div className="h-full flex flex-col justify-between">
        <h3 className="mb-1 font-semibold">Book Title</h3>

        <p className="text-sm mb-1">By Zulkar Naim, Shafayatul Haque</p>

        <div className="flex items-center gap-x-2 text-sm mb-1">
          <div className="flex items-center gap-x-1">
            <FiStar />
            <p>4.7</p>
          </div>
          <div className="flex items-center gap-x-1">
            <LuFileAudio2 />
            <p>22 min</p>
          </div>
        </div>

        <div className="items-center flex gap-x-2 mt-auto">
          <FiPlayCircle size={24} />
          <div className="relative w-full rounded-full h-1.5 bg2">
            <div className="absolute left-0 top-0 bottom-0 accent1 rounded-full w-[30%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
