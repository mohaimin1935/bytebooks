"use client";

import React, { useState } from "react";
import styles from "./BookFlip.module.css";
import { ColorExtractor } from "react-color-extractor";
import { FiPlayCircle, FiStar } from "react-icons/fi";
import { LuHeadphones } from "react-icons/lu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { textColorOnBg } from "@/utils/util";

const BookFlip = ({
  audio = false,
  details = true,
  className,
  width = 200,
  ratio = 1.7,
}) => {
  const [bgColor, setBgColor] = useState();

  const getColors = (colors) => {
    if (colors) setBgColor(colors);
  };

  return (
    <div
      className={cn(`w-[${width}px] mr-4 ml-1 block`, className, styles.parent)}
    >
      <div
        className={styles.container}
        style={{ height: `${width * ratio}px` }}
      >
        <div className={cn(styles.book)}>
          <div className={styles.front}>
            <div className={styles.cover}>
              <ColorExtractor getColors={getColors}>
                <img
                  src="/bookImage.jpg"
                  alt=""
                  className="w-full h-full z-10"
                />
              </ColorExtractor>
            </div>
          </div>
          <div
            className={styles.leftSide}
            style={{ background: bgColor && bgColor[3] }}
          >
            <h2
              style={{
                width: `${width * ratio}px`,
                color: bgColor && textColorOnBg(bgColor[3]),
              }}
              className="overflow-hidden"
            >
              <span>{"Book title".substring(0, 24)}</span>
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
            Book Title
          </Link>
          <p className="text-sm font-light ">By Zulkar Naim, Tanmoy</p>
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
