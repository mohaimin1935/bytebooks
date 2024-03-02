"use client";

import React, { useContext, useState } from "react";
import styles from "./BookFlip.module.css";
import { ColorExtractor } from "react-color-extractor";
import { FiPlayCircle, FiStar } from "react-icons/fi";
import { LuHeadphones } from "react-icons/lu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { getAuthors, textColorOnBg, truncateText } from "@/utils/util";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../common/Loader";
import { useSession } from "next-auth/react";
import { AudioContext } from "@/contexts/AudioContext";

// TODO: bookmark

const BookFlip = ({
  audio = false,
  details = true,
  className,
  width = 200,
  ratio = 1.7,
  book = {},
  initialAngle = 0,
}) => {
  const [bgColor, setBgColor] = useState();
  const [audioLoading, setAudioLoading] = useState(false);

  const { data: user } = useSession();
  const { setAudioUrl, play, setAudioBook } = useContext(AudioContext);

  const getColors = (colors) => {
    if (colors) setBgColor(colors);
  };

  // FIXME: also plays prev audio
  const handleAudio = async () => {
    try {
      setAudioLoading(true);
      const res = await axios.get(
        `/api/users/${user?.user?.id}/books/${book.id}`
      );
      setAudioUrl(res.data?.byte?.audioLink);
      play();
      const bookData = await axios.get(`/api/book-info/${book.id}`);
      setAudioBook(bookData.data);
      play();
      // TODO: how to know byte or chapter??
    } catch (error) {
      console.log(error);
      toast.error("Audio load failed");
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <div className={cn(`mr-4 ml-1 block`, className, styles.parent)}>
      <div
        className={styles.container}
        style={{ width: `${width}px`, height: `${width * ratio}px` }}
      >
        <div
          className={cn(styles.book)}
          style={{
            transform:
              initialAngle > 0 && `rotate3d(0, 1, 0, ${initialAngle}deg)`,
          }}
        >
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
            href={`/reader/view/book/${book.id}`}
            className="font-medium hover"
          >
            {truncateText(book?.title, 20)}
          </Link>
          <p className="text-sm font-light">By {getAuthors(book)}</p>
          <div className="flex items-center gap-x-4 text-xs  content3">
            <div className="flex items-center gap-x-1">
              <FiStar />{" "}
              <p className="">{book?.rating?.toFixed(2) || "No rating"}</p>
            </div>
            {/* <div className="flex items-center gap-x-1">
              <LuHeadphones /> <p className="">32 min</p>
            </div> */}
          </div>
        </div>
      )}

      {/* {audio && (
        <button
          className="flex gap-x-2 items-center w-full"
          onClick={() => {
            console.log("first");
          }}
        >
          {!audioLoading ? (
            <FiPlayCircle
              size={32}
              onClick={handleAudio}
              className="cursor-pointer"
            />
          ) : (
            <Loader className="w-6" />
          )}
          <div className="relative h-1.5 w-full rounded-full bg2">
            <div className="absolute w-[30%] accent1 left-0 top-0 bottom-0 rounded-full bg2"></div>
          </div>
        </button>
      )} */}
    </div>
  );
};

export default BookFlip;
