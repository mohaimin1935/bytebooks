"use client";

import { createContext, useState } from "react";

export const BookReadContext = createContext();

export const BookReadContextProvider = ({ children, bookId, type }) => {
  const [fontFamily, setFontFamily] = useState(`"Rubik", sans-serif`);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(500);

  const [margins, setMargins] = useState();
  const [alignments, setAlignments] = useState();
  const [spacing, setSpacing] = useState();

  const [warmth, setWarmth] = useState();

  return (
    <BookReadContext.Provider
      value={{
        fontFamily,
        setFontFamily,
        fontSize,
        setFontSize,
        fontWeight,
        setFontWeight,
        margins,
        setMargins,
        alignments,
        setAlignments,
        spacing,
        setSpacing,
        warmth,
        setWarmth,
      }}
    >
      {children}
    </BookReadContext.Provider>
  );
};
