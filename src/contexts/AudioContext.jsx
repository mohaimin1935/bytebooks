"use client";

import { createContext, useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

export const AudioContext = createContext();

const getItemFromLocalStorage = (item) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(item);
    return value;
  }
};

const getObjectFromLocalStorage = (item) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(item);
    if (!value) return {};
    return JSON.parse(localStorage.getItem(item));
  }
};

export const AudioContextProvider = ({ children }) => {
  const [audioUrl, setAudioUrl] = useState(() => {
    return getItemFromLocalStorage("audioUrl") || "";
  });
  const [audioBook, setAudioBook] = useState(() => {
    return getObjectFromLocalStorage("audioBook") || {};
  });
  const [audioProgress, setAudioProgress] = useState(() => {
    return getItemFromLocalStorage("audioProgress" || 0);
  });
  const [pos, setPos] = useState(0);
  const [audioLoading, setAudioLoading] = useState(true);

  const {
    load,
    togglePlayPause,
    volume,
    setVolume,
    duration,
    playing,
    rate,
    setRate,
    seek,
    getPosition,
    pause,
  } = useAudioPlayer();

  const updateAudioProgress = (userId, bookId, type, contentId) => {};

  const handlePlayPause = () => {
    togglePlayPause();
  };

  const handleSpeed = (val) => {
    if (rate + val > 2 || rate + val < 0.5) return;
    setRate(rate + val);
  };

  const goTo = (advance) => {
    seek(pos + advance);
  };

  useEffect(() => {
    if (audioProgress) goTo(audioProgress);
  }, []);

  useEffect(() => {
    if (audioUrl) localStorage.setItem("audioUrl", audioUrl);
  }, [audioUrl]);

  useEffect(() => {
    if (audioBook) localStorage.setItem("audioBook", JSON.stringify(audioBook));
  }, [audioBook]);

  useEffect(() => {
    localStorage.setItem("audioProgress", audioProgress);
  }, [audioProgress]);

  useEffect(() => {
    if (audioUrl)
      load(audioUrl, {
        html5: true,
        autoplay: false,
        initialVolume: 0.5,
        initialRate: 1.0,
        onload: () => setAudioLoading(false),
      });
    else pause();
  }, [audioUrl]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPos(getPosition());
      setAudioProgress(getPosition());
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        // states, setStates
        audioUrl,
        setAudioUrl,
        audioBook,
        setAudioBook,
        audioProgress,
        setAudioProgress,
        pos,
        setPos,
        audioLoading,
        setAudioLoading,
        // audioPlayer
        load,
        togglePlayPause,
        volume,
        setVolume,
        duration,
        playing,
        rate,
        setRate,
        seek,
        getPosition,
        pause,
        // functions
        updateAudioProgress,
        handlePlayPause,
        handleSpeed,
        goTo,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
