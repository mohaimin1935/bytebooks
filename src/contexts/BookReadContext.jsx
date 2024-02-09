"use client";

import { fetcher } from "@/utils/util";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

export const BookReadContext = createContext();

export const BookReadContextProvider = ({ children, bookId, type }) => {
  const [fontFamily, setFontFamily] = useState(`"Rubik", sans-serif`);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);

  const [margins, setMargins] = useState();
  const [alignments, setAlignments] = useState();
  const [spacing, setSpacing] = useState();

  const [warmth, setWarmth] = useState();

  const [chapters, setChapters] = useState([]);
  const [activeId, setActiveId] = useState();
  const [activeChapter, setActiveChapter] = useState();

  const { data: user } = useSession();

  const { data, isLoading } = useSWR(
    `/api/book-info/${bookId}/${type}s`,
    fetcher
  );
  const { data: book } = useSWR(`/api/book-info/${bookId}`, fetcher);

  const { data: progress } = useSWR(
    `/api/users/${user?.user?.id}/books/${bookId}`,
    fetcher
  );

  const updateProgress = async (type, contentId) => {
    console.log(user);
    let progress = {
      status: "reading",
    };
    if (type === "byte") {
      progress.byteId = contentId;
    } else {
      progress.chapterId = contentId;
    }
    try {
      const res = await axios.post(
        `/api/users/${user?.user?.id}/books/${bookId}`,
        updateProgress
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      console.log(progress);
      if (type === "byte") {
        setChapters(data?.byte);
        if (progress?.byteId) {
          setActiveId(progress?.byteId);
        } else {
          setActiveId(data?.byte?.at(0)?.id);
          updateProgress(type, data?.byte?.at(0)?.id);
        }
      } else if (type === "chapter") {
        setChapters(data?.chapters);
        setActiveId(data?.chapters?.at(0)?.id);
      }
      // TODO: progress
    }
  }, [bookId, data, progress]);

  useEffect(() => {
    if (!activeId) return;
    setActiveChapter(chapters.filter((c) => c.id === activeId));
  }, [activeId, chapters]);

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
        chapters,
        book,
        activeId,
        setActiveId,
        activeChapter,
        isLoading,
      }}
    >
      {children}
    </BookReadContext.Provider>
  );
};
