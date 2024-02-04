"use client";

import { cn } from "@/utils/cn";
import React, { useRef, useState } from "react";
import { IoPause, IoPlay, IoVolumeMediumOutline } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  TbBrandSpeedtest,
  TbRewindBackward10,
  TbRewindForward10,
  TbVolume,
  TbVolume2,
  TbVolume3,
} from "react-icons/tb";
import useSound from "use-sound";
import RangeSlider from "../common/RangeSlider";
import { convertMsToHMS } from "@/utils/util";

const Book = {};
const chapter = {
  audioLink:
    "https://firebasestorage.googleapis.com/v0/b/bytebooks-1574e.appspot.com/o/1706426970550business-168341.mp3?alt=media&token=5e3145c9-a284-43d8-a085-00d21f11a34b",
};

const playBackSpeeds = [1, 1.25, 1.5, 1.75, 2, 0.75];

const AudioBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const [play, { stop, duration, sound }] = useSound(chapter.audioLink, {
    playbackRate: playBackSpeeds[playbackRate],
    volume,
    interrupt: true,
  });

  console.log(sound);

  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      play();
    } else {
      setIsPlaying(false);
      stop();
    }
  };

  const handleSpeed = () => {
    console.log(playbackRate, playBackSpeeds[playbackRate]);
    setPlaybackRate((prev) => (prev + 1) % playBackSpeeds.length);
  };

  return (
    <div className="bg2 px-4 h-20 py-2 sm:px-4 xl:px-8 m-2 rounded ">
      {/* large screen */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center gap-x-4 w-32 text-sm">
          <img src="/bookImage.jpg" alt="" className="h-16 rounded" />
          <div className="">
            <p className="font-light">Book Title</p>
            <p className="font-light content2 text-xs">By Author</p>
          </div>
        </div>

        <div className="flex-1 px-12">
          <div className="flex items-center gap-x-6 justify-center text-xl my-2">
            {/* prev */}
            <button>
              <MdSkipPrevious />
            </button>
            {/* rewind */}
            <button>
              <TbRewindBackward10 />
            </button>
            {/* play */}
            <button className="text-2xl" onClick={handlePlayPause}>
              {isPlaying ? <IoPause /> : <IoPlay />}
            </button>
            {/* advance */}
            <button>
              <TbRewindForward10 />
            </button>
            {/* next */}
            <button>
              <MdSkipNext />
            </button>
          </div>
          <div className="flex items-center gap-x-4 content2">
            <p className="">12:25</p>
            <div className="relative bg1 h-2 flex-1 rounded-full">
              <div className="absolute rounded-full w-[30%] left-0 top-0 h-2 accent2"></div>
              <div className="absolute left-[29%] h-4 w-4 rounded-full -top-1 accent1"></div>
            </div>
            <p className="">{convertMsToHMS(duration)}</p>
          </div>
        </div>

        <div className="">
          <div className="flex items-center gap-x-2 my-2">
            <button onClick={() => setVolume((prev) => (prev > 0 ? 0 : 0.5))}>
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
          <div className="flex items-center gap-x-2">
            <TbBrandSpeedtest />
            <button
              className="border border-check rounded-full px-2 py-0.5 text-xs"
              onClick={handleSpeed}
            >
              x{playBackSpeeds[playbackRate]}
            </button>
          </div>
        </div>
      </div>

      {/* small screen audio */}
      <div className="flex lg:hidden relative h-full">
        <div className="flex justify-between items-center w-full">
          <BookView />
          <div className="flex items-center gap-x-2">
            <button className="border border-check rounded-full px-2 py-0.5 text-xs">
              x1.5
            </button>
            <button className="text-2xl">
              <IoPause />
            </button>
          </div>
        </div>

        <div className="absolute -bottom-2 -left-4 -right-4">
          <div className="relative bg1 h-1 flex-1 rounded-full">
            <div className="absolute rounded-full w-[30%] left-0 top-0 bottom-0 accent2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookView = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-x-2")}>
      <img src="/bookImage.jpg" alt="" className="h-16 rounded" />
      <div className="">
        <p className="font-light">Book Title</p>
        <p className="font-light content2 text-xs">By Author</p>
      </div>
    </div>
  );
};

export default AudioBar;
