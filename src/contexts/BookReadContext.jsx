"use client";

import { fetcher } from "@/utils/util";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { AudioContext } from "./AudioContext";

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

  const [progressLoading, setProgressLoading] = useState(false);

  const { data: user } = useSession();
  const { setAudioUrl, setAudioBook } = useContext(AudioContext);

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
    if (progressLoading || !contentId) return;

    let progress = {
      status: "reading",
    };
    if (type === "byte") {
      progress.byteId = contentId;
    } else {
      progress.chapterId = contentId;
    }
    try {
      setProgressLoading(true);
      const res = await axios.post(
        `/api/users/${user?.user?.id}/books/${bookId}`,
        progress
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setProgressLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      if (type === "byte") {
        setChapters(data?.byte);
        if (progress?.byteId) {
          setActiveId(progress?.byteId);
        } else {
          setActiveId(data?.byte?.at(0)?.id);
        }
      } else if (type === "chapter") {
        setChapters(data?.chapters);
        if (progress?.chapterId) {
          setActiveId(progress?.chapterId);
        } else {
          setActiveId(data?.chapters?.at(0)?.id);
        }
      }
    }
  }, [bookId, data, progress]);

  useEffect(() => {
    if (!activeId) return;
    setActiveChapter(chapters.filter((c) => c.id === activeId));
  }, [activeId, chapters]);

  useEffect(() => {
    if (!progress) {
      updateProgress(type, activeId);
    } else {
      if (type === "chapter") {
        if (progress.chapterId !== activeId) {
          updateProgress(type, activeId);
        }
      } else if (progress.byteId !== activeId) {
        updateProgress(type, activeId);
      }
    }
  }, [activeId, bookId, type]);

  useEffect(() => {
    if (activeChapter) {
      setAudioUrl(activeChapter?.at(0)?.audioLink);
      setAudioBook(book);
    }
  }, [activeChapter]);

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
