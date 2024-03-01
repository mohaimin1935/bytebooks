"use client";

import React, { useContext, useRef, useState } from "react";
import InterfaceLayout from "./InterfaceLayout";
import { BookReadContext } from "@/contexts/BookReadContext";
import { cn } from "@/utils/cn";
import { createHighlight, truncateText } from "@/utils/util";
import { LiaHighlighterSolid } from "react-icons/lia";
import axios from "axios";
import { useSession } from "next-auth/react";

const ReadingInterface = () => {
  const {
    activeChapter,
    fontFamily,
    fontSize,
    fontWeight,
    margins,
    alignments,
    spacing,
    bookId,
    type,
  } = useContext(BookReadContext);

  const [showMarker, setShowMarker] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const chapter = activeChapter?.at(0);
  const { data } = useSession();
  const userId = data?.user.id;

  const handleMouseUp = async () => {
    if (typeof window !== "undefined") {
      const selection = window.getSelection();
      console.log(
        window.getSelection().anchorOffset,
        window.getSelection().focusOffset
      );
      if (selection?.toString().length > 0) {
        try {
          const highlight = {
            userId,
            bookId,
            chapterId: type === "chapter" ? chapter.id : null,
            byteId: type === "byte" ? chapter.id : null,
            startIndex: window.getSelection().anchorOffset,
            endIndex: window.getSelection().focusOffset,
          };

          const res = await axios.post(`/api/highlights`, highlight);
          console.log(res.data)
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    setMousePosition({ x, y });
  };

  return (
    <InterfaceLayout>
      {showMarker && (
        <div
          className={`absolute`}
          style={{
            top: `${mousePosition.y - 32}px`,
            left: `${mousePosition.x}px`,
          }}
        >
          <LiaHighlighterSolid size={32} />
        </div>
      )}
      <h3
        className="text-2xl font-semibold mb-4 "
        style={{
          padding: `${0}px ${margins}px`,
          textAlign: alignments,
        }}
      >
        {truncateText(chapter?.title, 24)}
      </h3>

      <div
        onMouseEnter={() => setShowMarker(true)}
        onMouseLeave={() => setShowMarker(false)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
          fontWeight,
          padding: `${0}px ${margins}px`,
          textAlign: alignments,
          lineHeight: spacing,
          whiteSpace: "pre-wrap",
          cursor: showMarker ? "none" : "auto",
          position: "relative",
        }}
        className={cn("prose-lg w-full")}
      >
        <p>{chapter?.content}</p>
      </div>
    </InterfaceLayout>
  );
};

export default ReadingInterface;
