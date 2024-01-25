"use client";

import React, { useEffect, useState } from "react";
import { motion, Reorder, useMotionValue } from "framer-motion";
import { PiDotsNineBold } from "react-icons/pi";
import { FiBookOpen, FiPlus } from "react-icons/fi";

const initialItems = [
  {
    id: 1,
    title: "Chapter 1",
    serial: 1,
  },
  {
    id: 2,
    title: "Chapter 2",
    serial: 2,
  },
  {
    id: 3,
    title: "Chapter 3",
    serial: 3,
  },
  {
    id: 4,
    title: "Chapter 4 is a very big name",
    serial: 4,
  },
];

const ChapterEditor = ({ chapterList = [], handleAdd = () => {} }) => {
  const [chapters, setChapters] = useState(initialItems);

  return (
    <div className="px-12 mt-20">
      <div className="flex items-center gap-x-3 mb-6">
    <FiBookOpen className="text-xl" />{" "}
        <h3 className="text-xl">Book Title</h3>
      </div>
      <div className="">
        <Reorder.Group
          axis="y"
          onReorder={setChapters}
          values={chapters}
          className="mb-8"
        >
          {chapters.map((chapter) => (
            <Item key={chapter.id} item={chapter} />
          ))}
        </Reorder.Group>
        <button
          className="rounded-md center secondary-btn w-full py-1.5 block"
          onClick={handleAdd}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export const Item = ({ item }) => {
  const y = useMotionValue(0);
  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ y }}
      className="mb-4 cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center gap-x-2">
        <PiDotsNineBold />
        <span>
          {item.title.substring(0, 20)} {item.title.length > 20 && "..."}
        </span>
      </div>
    </Reorder.Item>
  );
};

export default ChapterEditor;
