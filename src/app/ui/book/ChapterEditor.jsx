"use client";

import React, { useEffect, useState } from "react";
import { motion, Reorder, useMotionValue } from "framer-motion";
import { PiDotsNineBold } from "react-icons/pi";
import { FiBookOpen, FiPlus } from "react-icons/fi";
import { cn } from "@/utils/cn";
import Loader from "../common/Loader";

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

const ChapterEditor = ({ chapterList = [], title, activeId }) => {
  const [chapters, setChapters] = useState(initialItems);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (loading) return;

    try {
      setLoading(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (values) => {
    setChapters(values);
    // TODO: update to db
  };

  return (
    <div className="px-12 mt-20">
      <div className="flex items-center gap-x-3 mb-6">
        <FiBookOpen className="text-xl" />{" "}
        <h3 className="text-xl">Book Title</h3>
      </div>
      <div className="">
        <Reorder.Group
          axis="y"
          onReorder={(values) => handleReorder(values)}
          values={chapters}
          className="mb-8"
        >
          {chapters.map((chapter) => (
            <Item
              key={chapter.id}
              item={chapter}
              activeId={activeId}
              title={title}
            />
          ))}
        </Reorder.Group>
        <button
          className="rounded-md center secondary-btn w-full py-2 block"
          onClick={handleAdd}
        >
          {!loading ? <FiPlus /> : <Loader />}
        </button>
      </div>
    </div>
  );
};

export const Item = ({ item, title, activeId }) => {
  const y = useMotionValue(0);
  const active = activeId === item.id;
  let chapterTitle = active ? title : item.title;

  if (active && (!title || title.length === 0)) chapterTitle = "Title";

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ y }}
      className="mb-4 cursor-grab active:cursor-grabbing"
    >
      <div
        className={cn(
          "flex items-center gap-x-2",
          active && "border-b border-check capitalize"
        )}
      >
        <PiDotsNineBold />
        <span>
          {chapterTitle.substring(0, 20)} {chapterTitle.length > 20 && "..."}
        </span>
      </div>
    </Reorder.Item>
  );
};

export default ChapterEditor;
