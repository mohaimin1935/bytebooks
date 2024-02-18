"use client";

import React, { useContext, useRef, useState } from "react";
import InterfaceLayout from "./InterfaceLayout";
import { BookReadContext } from "@/contexts/BookReadContext";
import { cn } from "@/utils/cn";
import { createHighlight, truncateText } from "@/utils/util";
import { MdOutlineContentCopy } from "react-icons/md";

const ReadingInterface = () => {
  const { activeChapter, fontFamily, fontSize, fontWeight } =
    useContext(BookReadContext);

  const chapter = activeChapter?.at(0);

  const handleMouseUp = () => {
    if (typeof window !== "undefined") {
      const selection = window.getSelection();
      console.log(
        selection.getRangeAt(0).cloneRange()
      );
    }
  };

  return (
    <InterfaceLayout>
      <h3 className="text-2xl font-semibold mb-4 ">
        {truncateText(chapter?.title, 24)}
      </h3>
      <div
        onMouseUp={handleMouseUp}
        style={{
          fontFamily,
          fontSize,
          fontWeight,
        }}
        className={cn("prose-lg w-full text-justify ")}
        dangerouslySetInnerHTML={{
          __html: chapter?.content,
        }}
      />
    </InterfaceLayout>
  );
};

export default ReadingInterface;
