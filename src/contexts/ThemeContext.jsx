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

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getThemeFromLocalStorage();
  });

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle,
        modal,
        setModal,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
