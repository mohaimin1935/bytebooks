"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import InterfaceLayout from "./InterfaceLayout";
import { BookReadContext } from "@/contexts/BookReadContext";
import { cn } from "@/utils/cn";
import { createHighlight, fetcher, truncateText } from "@/utils/util";
import { LiaHighlighterSolid, LiaReadme } from "react-icons/lia";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useSWR from "swr";

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

  const [mode, setMode] = useState("normal");
  const [showMarker, setShowMarker] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [contentArray, setContentArray] = useState([]);

  const chapter = activeChapter?.at(0);
  const { data } = useSession();
  const userId = data?.user.id;

  let searchParam = "";
  if (type === "byte") searchParam = `byteId=${chapter?.id}`;
  else if (type === "chapter") searchParam = `chapterId=${chapter?.id}`;

  const { data: highlights } = useSWR(
    `/api/highlights/user/${userId}/book/${bookId}/?${searchParam}`,
    fetcher,
    { refreshInterval: 100 }
  );

  useEffect(() => {
    if (!highlights) return;

    highlights?.sort((a, b) => a.startIndex - b.startIndex);
    let lastIndex = 0;
    let tempArray = [];
    highlights.forEach((highlight) => {
      if (highlight.startIndex < lastIndex) return;
      tempArray.push({
        highlighted: false,
        text: chapter.content.substring(lastIndex, highlight.startIndex),
      });
      tempArray.push({
        highlighted: true,
        id: highlight.id,
        startIndex: highlight.startIndex,
        endIndex: highlight.endIndex,
        text: chapter.content.substring(
          highlight.startIndex,
          highlight.endIndex
        ),
      });
      lastIndex = highlight.endIndex;
    });
    tempArray.push({
      highlighted: false,
      text: chapter.content.substring(lastIndex),
    });
    console.log("updated", tempArray);
    setContentArray(tempArray);
  }, [highlights, activeChapter]);

  const handleMouseUp = async (index, id, start, end) => {
    if (mode === "normal") return;

    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += contentArray[i].text.length;
    }

    if (id) {
      // return;
      // console.log(start);
      // console.log(window.getSelection().anchorOffset + offset);
      // console.log(end);
      // console.log(window.getSelection().focusOffset + offset);

      if (
        window.getSelection().anchorOffset + offset >= start &&
        window.getSelection().focusOffset + offset < end
      ) {
        try {
          await axios.delete(`/api/highlights/${id}`);
          toast.success("Highlight Removed");
          return;
        } catch (error) {
          console.log(error);
        }
      } else return;
    }

    if (typeof window !== "undefined") {
      const selection = window.getSelection();
      if (selection?.toString().length > 0) {
        try {
          const highlight = {
            userId,
            bookId,
            chapterId: type === "chapter" ? chapter.id : null,
            byteId: type === "byte" ? chapter.id : null,
            startIndex: window.getSelection().anchorOffset + offset,
            endIndex: window.getSelection().focusOffset + offset,
          };

          await axios.post(`/api/highlights`, highlight);
          toast.success("Highlight Added");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleMouseMove = (event) => {
    if (mode === "normal") return;

    const x = event.clientX;
    const y = event.clientY;

    setMousePosition({ x, y });
  };

  return (
    <InterfaceLayout>
      <div
        className="absolute right-12 bottom-12 bg1 z-50 rounded-full shadow-lg hover:shadow-2xl cursor-pointer p-4"
        onClick={() => {
          setMode((p) => (p === "normal" ? "highlight" : "normal"));
        }}
      >
        {mode === "normal" ? (
          <LiaHighlighterSolid size={28} />
        ) : (
          <LiaReadme size={28} />
        )}
      </div>
      {mode === "highlight" && showMarker && (
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
        onMouseEnter={() => setShowMarker(mode === "highlight" && true)}
        onMouseLeave={() => setShowMarker(false)}
        onMouseMove={handleMouseMove}
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
          fontWeight,
          padding: `${0}px ${margins}px`,
          textAlign: alignments,
          lineHeight: spacing,
          whiteSpace: "pre-wrap",
          cursor: mode === "normal" ? "auto" : "none",
          position: "relative",
        }}
        className={cn(
          "prose-lg w-full",
          mode === "highlight" && "highlight-mode"
        )}
      >
        {contentArray.map((content, index) => (
          <span
            onMouseUp={() =>
              handleMouseUp(
                index,
                content.id,
                content.startIndex,
                content.endIndex
              )
            }
            key={index}
            className={cn("", content.highlighted && "highlighted")}
          >
            {content.text}
          </span>
        ))}
      </div>
    </InterfaceLayout>
  );
};

export default ReadingInterface;
