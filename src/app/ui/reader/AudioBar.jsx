"use client";

import { cn } from "@/utils/cn";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoPause, IoPlay, IoVolumeMediumOutline } from "react-icons/io5";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import {
  TbBrandSpeedtest,
  TbRewindBackward10,
  TbRewindForward10,
  TbVolume,
  TbVolume2,
  TbVolume3,
} from "react-icons/tb";
import { useAudioPlayer } from "react-use-audio-player";
import RangeSlider from "../common/RangeSlider";
import { convertMsToHMS, getAuthors, truncateText } from "@/utils/util";
import Loader from "../common/Loader";
import { ThemeContext } from "@/contexts/ThemeContext";
import { AudioContext } from "@/contexts/AudioContext";

const Book = {};
const chapter = {
  audioLink:
    "https://firebasestorage.googleapis.com/v0/b/bytebooks-1574e.appspot.com/o/1706426970550business-168341.mp3?alt=media&token=5e3145c9-a284-43d8-a085-00d21f11a34b",
};

const AudioBar = () => {
  const {
    audioBook,
    audioUrl,
    handlePlayPause,
    audioLoading,
    audioPlayer,
    pos,
    handleSpeed,
    goTo,
    volume,
    setVolume,
    duration,
    playing,
    rate,
    getPosition,
  } = useContext(AudioContext);

  if (audioUrl)
    return (
      <div className="bg2 h-20 py-2 px-8 m-2 rounded ">
        {/* large screen */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4 text-sm">
            <div className="w-12">
              <div
                className="pb-[133%] bg1"
                style={{
                  backgroundImage: `url(${
                    audioBook?.image || "/bookImage.jpg"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
            <div className="">
              <p className="font-light text-sm">
                {truncateText(audioBook?.title, 20)}
              </p>
              <p className="font-light content2 text-xs">
                By {getAuthors(audioBook)}
              </p>
            </div>
          </div>

          <div className="flex-1 px-12">
            <div className="flex items-center gap-x-6 justify-center text-xl my-2">
              {/* prev */}
              {/* <button>
              <MdSkipPrevious />
            </button> */}
              {/* rewind */}
              <button onClick={() => goTo(-10)}>
                <TbRewindBackward10 />
              </button>
              {/* play */}
              <button className="text-2xl" onClick={handlePlayPause}>
                {audioLoading && playing ? (
                  <Loader />
                ) : playing ? (
                  <IoPause />
                ) : (
                  <IoPlay />
                )}
              </button>
              {/* advance */}
              <button onClick={() => goTo(10)}>
                <TbRewindForward10 />
              </button>
              {/* next */}
              {/* <button>
              <MdSkipNext />
            </button> */}
            </div>
            <div className="flex items-center gap-x-4 content2">
              <p className="">{convertMsToHMS(getPosition() * 1000)}</p>
              {!audioLoading ? (
                <div className="relative bg1 h-2 flex-1 rounded-full">
                  <div
                    className="absolute rounded-full left-0 top-0 h-2 accent2"
                    style={{ width: `${(pos / duration) * 100}%` }}
                  ></div>
                </div>
              ) : (
                // <RangeSlider min={0} max={duration} value={getPosition()} />
                <div className="bg1 h-2 flex-1 w-4 rounded-full -top-1 animate-pulse"></div>
              )}
              <p className="">{convertMsToHMS(duration * 1000)}</p>
            </div>
          </div>

          <div className="">
            <div className="flex items-center gap-x-2 my-2">
              <button
                onClick={() => {
                  if (volume > 0) setVolume(0);
                  else setVolume(0.5);
                }}
              >
                <>
                  {volume > 0 && volume <= 0.5 && <TbVolume2 />}
                  {volume > 0.5 && <TbVolume />}
                  {volume <= 0 && <TbVolume3 />}
                </>
              </button>
              <RangeSlider
                className="[&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 h-1 w-20"
                max={1}
                min={0}
                value={volume}
                setValue={setVolume}
              />
            </div>
            {/* speed */}
            <div className="flex items-center">
              <TbBrandSpeedtest />
              <div className="flex items-center">
                <button className="p-1" onClick={() => handleSpeed(-0.25)}>
                  <MdKeyboardArrowLeft />
                </button>
                <div className="border border-check rounded-full w-12 text-center py-0.5 text-xs">
                  x{rate.toFixed(2)}
                </div>
                <button className="p-1" onClick={() => handleSpeed(0.25)}>
                  <MdKeyboardArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AudioBar;
