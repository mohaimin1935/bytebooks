import ReadingInterface from "@/app/ui/book/ReadingInterface/Interface";
import { BookReadContextProvider } from "@/contexts/BookReadContext";
import BookReadProvider from "@/providers/BookReadProvider";
import React from "react";

const Byte = () => {
  return (
    <BookReadContextProvider>
      <BookReadProvider>
        <ReadingInterface />
      </BookReadProvider>
    </BookReadContextProvider>
  );
};

export default Byte;
