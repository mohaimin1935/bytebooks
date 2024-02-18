"use client";

import React, { useContext, useRef, useState } from "react";
import InterfaceLayout from "./InterfaceLayout";
import { BookReadContext } from "@/contexts/BookReadContext";
import { cn } from "@/utils/cn";
import { truncateText } from "@/utils/util";
import { MdOutlineContentCopy } from "react-icons/md";

const ReadingInterface = () => {
  const [selection, setSelection] = useState("");

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);

  const { activeChapter, fontFamily, fontSize, fontWeight } =
    useContext(BookReadContext);

  const chapter = activeChapter?.at(0);

  const handleMouseUp = () => {
    if (typeof window !== "undefined") {
      const selection = window.getSelection();
      // if (selection.toString().length > 0) {
      //   const range = selection.getRangeAt(0);
      //   const rect = range.getBoundingClientRect();
      //   const top = rect.top + window.scrollY - 50; // Adjust offset as needed
      //   const left = rect.left + window.scrollX - 10; // Adjust offset as needed
      //   setPopupPosition({ top, left });
      //   setIsPopupVisible(true);
      // }
    }
  };

  const handleSelectAction = (action) => {
    setIsPopupVisible(false);
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
        dangerouslySetInnerHTML={{ __html: chapter?.content }}
      />
      <div
        ref={popupRef}
        className={`absolute z-10 ${
          isPopupVisible
            ? "bg-gray-700 text-white rounded p-2 shadow-md flex gap-x-2 items-center"
            : "hidden"
        }`}
        style={{ top: popupPosition.top, left: popupPosition.left }}
      >
        <div
          className="w-6 h-6 rounded-full bg-emerald-200 ml-1.5"
          onClick={() => handleSelectAction("")}
        ></div>
        <div
          className="w-6 h-6 rounded-full bg-fuchsia-200"
          onClick={() => handleSelectAction("")}
        ></div>
        <div className="w-6 text-lg" onClick={() => handleSelectAction("")}>
          <MdOutlineContentCopy />
        </div>
      </div>
    </InterfaceLayout>
  );
};

export default ReadingInterface;
