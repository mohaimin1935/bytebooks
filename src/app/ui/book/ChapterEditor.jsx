"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion, Reorder, useMotionValue } from "framer-motion";
import { PiDotsNineBold } from "react-icons/pi";
import { FiBookOpen, FiDelete, FiHome, FiPlus, FiTrash2 } from "react-icons/fi";
import { cn } from "@/utils/cn";
import Loader from "../common/Loader";
import Link from "next/link";
import { BookEditContext } from "@/contexts/BookEditContext";

const ChapterEditor = ({}) => {
  const {
    chapters,
    bookId,
    book,
    addLoading,
    addChapter,
    handleReorder,
    isLoading,
    unsavedOrder,
    handleOrderSave,
    reorderLoading,
  } = useContext(BookEditContext);

  return (
    <div className="px-8 mt-20 capitalize">
      <Link href="/creator/home" className="flex items-center gap-x-3 mb-6">
        <FiHome className="text-xl" /> <h3 className="">Home</h3>
      </Link>

      <Link
        href={`/creator/book-info/${bookId}`}
        className="flex items-center gap-x-3 mb-6 content-highlight font-semibold"
      >
        <FiBookOpen className="" /> <h3 className="">{book?.title}</h3>
      </Link>
      {isLoading ? (
        <Loader className="h-32" />
      ) : (
        <div className="pl-4">
          <Reorder.Group
            axis="y"
            onReorder={(values) => handleReorder(values)}
            values={chapters || []}
            className="mb-8"
          >
            {chapters?.map((chapter) => (
              <Item key={chapter.id} item={chapter} />
            ))}
          </Reorder.Group>

          {unsavedOrder && (
            <button
              className="accent1 text-sm w-full mb-2 px-3 py-1 rounded"
              onClick={handleOrderSave}
            >
              {reorderLoading ? <Loader /> : <>Save Order</>}
            </button>
          )}

          <button
            className="rounded-md center secondary-btn w-full py-2 block"
            onClick={addChapter}
          >
            {!addLoading ? <FiPlus /> : <Loader />}
          </button>
        </div>
      )}
    </div>
  );
};

export const Item = ({ item }) => {
  const { activeId, handleDelete, switchActiveId, activeTitle } =
    useContext(BookEditContext);

  const y = useMotionValue(0);
  const active = activeId === item.id;

  return (
    <>
      <Reorder.Item
        value={item}
        id={item.id}
        style={{ y }}
        className="mb-4 cursor-grab active:cursor-grabbing capitalize"
        onClick={() => switchActiveId(item.id)}
      >
        <div
          className={cn(
            "flex items-center gap-x-2",
            item.id === activeId && "border-b border-check capitalize"
          )}
        >
          <PiDotsNineBold />
          <span>
            {(active ? activeTitle : item.title)?.substring(0, 16)}{" "}
            {(active ? activeTitle : item.title)?.length > 16 && "..."}
          </span>
          {active && (
            <FiTrash2
              size={20}
              className="cursor-pointer"
              onClick={handleDelete}
            />
          )}
        </div>
      </Reorder.Item>
    </>
  );
};

export default ChapterEditor;
