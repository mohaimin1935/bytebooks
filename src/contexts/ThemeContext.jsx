"use client";

import { createContext, useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

export const ThemeContext = createContext();

const getThemeFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};
// TODO: remove
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
// TODO: upto this

export const ThemeContextProvider = ({ children }) => {
  
  const [theme, setTheme] = useState(() => {
    return getThemeFromLocalStorage();
  });

  const [modal, setModal] = useState(false);

  // TODO: remove
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
    isReady,
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
  // TODO: upto this

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // TODO: remove
  useEffect(() => {
    if (audioUrl) localStorage.setItem("audioUrl", audioUrl);
  }, [audioUrl]);

  useEffect(() => {
    if (audioBook) localStorage.setItem("audioBook", JSON.stringify(audioBook));
  }, [audioBook]);

  useEffect(() => {
    localStorage.setItem("audioProgress", audioProgress);
  }, [audioProgress]);
  // TODO: upto this

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // TODO: remove
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
    <ThemeContext.Provider
      value={{
        theme,
        toggle,
        modal,
        setModal,
        // TODO: remove
        audioUrl,
        setAudioUrl,
        audioBook,
        setAudioBook,
        audioProgress,
        setAudioProgress,
        updateAudioProgress,
        pos,
        setPos,
        audioLoading,
        setAudioLoading,
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
        isReady,
        handlePlayPause,
        handleSpeed,
        goTo,
        pause,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
