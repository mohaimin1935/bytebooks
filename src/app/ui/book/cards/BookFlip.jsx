"use client";

import React, { useState } from "react";
import styles from "./BookFlip.module.css";
import { ColorExtractor } from "react-color-extractor";
import { FiPlayCircle, FiStar } from "react-icons/fi";
import { LuHeadphones } from "react-icons/lu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { textColorOnBg, truncateText } from "@/utils/util";

const BookFlip = ({
  audio = false,
  details = true,
  className,
  width = 200,
  ratio = 1.7,
  book = {},
}) => {
  const [bgColor, setBgColor] = useState();

  const getColors = (colors) => {
    if (colors) setBgColor(colors);
  };

  const getAuthors = () => {
    let str = "";
    for (let i = 0; i < book?.authors?.length; i++) {
      str += book.authors[i].author?.name;
      if (i < book?.authors?.length - 1) str += ", ";
    }
    return truncateText(str, 16);
  };

  return (
    <div className={cn(`mr-4 ml-1 block`, className, styles.parent)}>
      <div
        className={styles.container}
        style={{ width: `${width}px`, height: `${width * ratio}px` }}
      >
        <div className={cn(styles.book)}>
          <div className={styles.front}>
            <div className={styles.cover}>
              <ColorExtractor src={book?.image} getColors={getColors}>
                <img
                  src={book?.image || "/bookImage.jpg"}
                  alt=""
                  className="w-0 h-0 z-10 bg-green-200"
                  crossOrigin="anonymous"
                />
              </ColorExtractor>
              <div
                className="h-full bg2 w-full"
                style={{
                  backgroundImage: `url(${book.image || "/bookImage.jpg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
          </div>
          <div
            className={styles.leftSide}
            style={{ background: bgColor ? bgColor[3] : "gray" }}
          >
            <h2
              className={"overflow-hidden"}
              style={{
                width: `${width * ratio}px`,
                color: bgColor && textColorOnBg(bgColor[3]),
              }}
            >
              <span>{truncateText(book?.title, 24)}</span>
            </h2>
          </div>
        </div>
      </div>

      {details && (
        <div className="mt-4 center content2">
          <Link
            href={`/reader/view/book/cls50ph5c001r1aih26119zp3`}
            className="font-medium hover"
          >
            {truncateText(book?.title, 36)}
          </Link>
          <p className="text-sm font-light">By {getAuthors()}</p>
          <div className="flex items-center gap-x-4 text-xs  content3">
            <div className="flex items-center gap-x-1">
              <FiStar /> <p className="">4.7</p>
            </div>
            <div className="flex items-center gap-x-1">
              <LuHeadphones /> <p className="">32 min</p>
            </div>
          </div>
        </div>
      )}

      {audio && (
        <button
          className="flex gap-x-2 items-center w-full"
          onClick={() => {
            console.log("first");
          }}
        >
          <FiPlayCircle size={32} />
          <div className="relative h-1.5 w-full rounded-full bg2">
            <div className="absolute w-[30%] accent1 left-0 top-0 bottom-0 rounded-full bg2"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default BookFlip;
