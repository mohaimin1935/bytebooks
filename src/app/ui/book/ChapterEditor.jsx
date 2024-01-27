"use client";

import React, { useEffect, useState } from "react";
import { motion, Reorder, useMotionValue } from "framer-motion";
import { PiDotsNineBold } from "react-icons/pi";
import { FiBookOpen, FiHome, FiPlus } from "react-icons/fi";
import { cn } from "@/utils/cn";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import { fetcher } from "@/utils/util";
import useSWR from "swr";
import Link from "next/link";

const ChapterEditor = ({
  chapterList = [],
  title,
  activeId,
  setActiveId,
  bookId,
  type,
}) => {
  const [chapters, setChapters] = useState(chapterList);
  const [loading, setLoading] = useState(false);

  const { data } = useSWR(`/api/book-info/${bookId}`, fetcher);

  const handleAdd = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const res = await axios.post(`/api/book-info/${bookId}/${type}s`, {
        serial: chapterList.length + 1,
      });
      setActiveId(res.data.id);
      setChapters((prev) => [...prev, res.data]);
      toast.success("Content added");
    } catch (error) {
      toast.error("Request failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (values) => {
    setChapters(values);
    // TODO: update to db
  };

  return (
    <div className="px-8 mt-20 capitalize">
      <Link href="/creator/home" className="flex items-center gap-x-3 mb-6">
        <FiHome className="text-xl" /> <h3 className="">Home</h3>
      </Link>

      <Link
        href={`/creator/book-info/${bookId}`}
        className="flex items-center gap-x-3 mb-6 content-highlight"
      >
        <FiBookOpen className="text-xl " />{" "}
        <h3 className="text-xl">{data?.title}</h3>
      </Link>
      <div className="pl-4">
        {chapters ? (
          <Reorder.Group
            axis="y"
            onReorder={(values) => handleReorder(values)}
            values={chapters || []}
            className="mb-8"
          >
            {chapters?.map((chapter) => (
              <Item
                key={chapter.id}
                item={chapter}
                activeId={activeId}
                title={title}
                setActiveId={setActiveId}
                type={type}
              />
            ))}
          </Reorder.Group>
        ) : (
          <div className="animate-pulse flex flex-col gap-y-4 mb-8">
            <div className="bg1 h-8 w-full rounded-md"></div>
            <div className="bg1 h-8 w-full rounded-md"></div>
            <div className="bg1 h-8 w-full rounded-md"></div>
          </div>
        )}
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

export const Item = ({ item, title, activeId, setActiveId, type }) => {
  const y = useMotionValue(0);
  const active = activeId === item.id;
  let chapterTitle = active ? title : item.title;

  if (!item.title || item.title.length === 0)
    chapterTitle = `${type} ${item.serial}`;

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ y }}
      className="mb-4 cursor-grab active:cursor-grabbing capitalize"
      onClick={() => setActiveId(item.id)}
    >
      <div
        className={cn(
          "flex items-center gap-x-2",
          active && "border-b border-check capitalize"
        )}
      >
        <PiDotsNineBold />
        <span>
          {chapterTitle?.substring(0, 20)} {chapterTitle?.length > 20 && "..."}
        </span>
      </div>
    </Reorder.Item>
  );
};

export default ChapterEditor;
