"ues client";

import { textColorOnBg } from "@/utils/util";
import { color } from "framer-motion";
import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";

const BookBack = ({ book }) => {
  const [bgColor, setBgColor] = useState([]);

  const getColors = (colors) => {
    if (colors) setBgColor(colors);
  };

  return (
    <div
      className="bottom-0 rounded-t border-t border-bkg-2 hover:mb-2 center"
      style={{
        backgroundColor: bgColor?.at(3) || "gray",

        height: `${70 + Math.random() * 25}%`,
        width: `${32 + Math.random() * 20}px`,
      }}
    >
      <ColorExtractor getColors={getColors}>
        <img
          src={book.image || "bookImage.jpg"}
          alt=""
          className="h-0 w-0 hidden"
        />
      </ColorExtractor>

      <div
        className=""
        style={{
          color: textColorOnBg(bgColor?.at(3)),
        }}
      >
        <p
          className="text-center"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          {book.title}
        </p>
      </div>
    </div>
  );
};

export default BookBack;
