"use client";

import React, { useState } from "react";
import styles from "./BookFlip.module.css";
import { ColorExtractor } from "react-color-extractor";
import { FiPlayCircle, FiStar } from "react-icons/fi";
import { LuHeadphones } from "react-icons/lu";
import { cn } from "@/utils/cn";

const BookFlip = ({
  audio = false,
  details = true,
  className,
  width = 200,
}) => {
  const [bgColor, setBgColor] = useState();

  const getColors = (colors) => {
    if (colors) setBgColor(colors);
  };

  return (
    <div className={cn(`w-[${width}px] mx-4`, className, styles.parent)}>
      <div className={styles.container} style={{ height: `${width * 1.5}px` }}>
        <div className={styles.book}>
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
              style={{ width: `${width * 1.5}px` }}
              className="overflow-hidden"
            >
              <span>
                {"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quos?".substring(
                  0,
                  24
                )}
              </span>
            </h2>
          </div>
        </div>
      </div>

      {details && (
        <div className="mt-4 center">
          <h3 className="font-semibold">Book Title</h3>
          <p className="text-sm">By Zulkar Naim, Tanmoy</p>
          <div className="flex items-center gap-x-4 text-sm">
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
        <div className="flex gap-x-2 items-center mt-4">
          <FiPlayCircle size={24} />
          <div className="relative h-1.5 w-full rounded-full bg2">
            <div className="absolute w-[30%] accent1 left-0 top-0 bottom-0 rounded-full bg2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookFlip;
