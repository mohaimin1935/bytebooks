"use client";

import ReadingInterface from "@/app/ui/book/ReadingInterface/Interface";
import { BookReadContextProvider } from "@/contexts/BookReadContext";
import BookReadProvider from "@/providers/BookReadProvider";
import React from "react";

const Chapter = ({ params, searchParams }) => {
  const { bookId } = params;
  const { type } = searchParams;

  return (
    <BookReadContextProvider bookId={bookId} type={type}>
      <BookReadProvider>
        <ReadingInterface />
      </BookReadProvider>
    </BookReadContextProvider>
  );
};

export default Chapter;
