"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion, Reorder, useMotionValue } from "framer-motion";
import { PiDotsNineBold } from "react-icons/pi";
import { FiBookOpen, FiDelete, FiHome, FiPlus, FiTrash2 } from "react-icons/fi";
import { cn } from "@/utils/cn";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import { fetcher } from "@/utils/util";
import useSWR from "swr";
import Link from "next/link";
import { ThemeContext } from "@/contexts/ThemeContext";
import DeleteConfirm from "../common/DeleteConfirm";

const ChapterEditor = ({
  chapterList = [],
  title,
  activeId,
  setActiveId,
  bookId,
  type,
  saved,
  setShowModal,
  setContentList
}) => {
  const [chapters, setChapters] = useState(
    chapterList?.sort((a, b) => a.serial - b.serial)
  );
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

  const handleReorder = async (values) => {
    setChapters(values);
    values.forEach(async (value, index) => {
      try {
        await axios.patch(`/api/book-info/${bookId}/${type}s/${value.id}`, {
          serial: index,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="px-8 mt-20 capitalize">
      <Link href="/creator/home" className="flex items-center gap-x-3 mb-6">
        <FiHome className="text-xl" /> <h3 className="">Home</h3>
      </Link>

      <Link
        href={`/creator/book-info/${bookId}`}
        className="flex items-center gap-x-3 mb-6 content-highlight font-semibold"
      >
        <FiBookOpen className="" /> <h3 className="">{data?.title}</h3>
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
                saved={saved}
                setShowModal={setShowModal}
                setChapters={setChapters}
                chapters={chapters}
                bookId={bookId}
                setContentList={setContentList}
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

export const Item = ({
  item,
  title,
  activeId,
  setActiveId,
  type,
  saved,
  setShowModal,
  setChapters,
  chapters,
  bookId,
  setContentList,
}) => {
  const { setModal } = useContext(ThemeContext);

  const y = useMotionValue(0);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const active = activeId === item.id;
  let chapterTitle = active ? title : item.title;

  if (!item.title || item.title.length === 0)
    chapterTitle = `${type} ${item.serial}`;

  if (item.id === activeId && title?.length !== 0) chapterTitle = title;

  const handleDelete = () => {
    setModal(true);
    setDeleteModal(true);
  };

  const handleCancel = () => {
    setModal(false);
    setDeleteModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteLoading) return;

    try {
      setDeleteLoading(true);
      await axios.delete(`/api/book-info/${bookId}/${type}s/${item.id}`);
      toast.success("Deleted successfully");
      let items = chapters;
      items = chapters.filter((c) => c.id !== item.id);
      setChapters(items);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setDeleteLoading(false);
      setModal(false);
      setDeleteModal(false);
    }
  };

  const handleClick = (id) => {
    if (!saved) {
      setShowModal(id);
      setModal(true);
    } else setActiveId(id);
  };

  return (
    <>
      {deleteModal && (
        <DeleteConfirm
          handleDeleteConfirm={handleDeleteConfirm}
          handleCancel={handleCancel}
          loading={deleteLoading}
        />
      )}
      <Reorder.Item
        value={item}
        id={item.id}
        style={{ y }}
        className="mb-4 cursor-grab active:cursor-grabbing capitalize"
        onClick={() => handleClick(item.id)}
      >
        <div
          className={cn(
            "flex items-center gap-x-2",
            active && "border-b border-check capitalize"
          )}
        >
          <PiDotsNineBold />
          <span>
            {chapterTitle?.substring(0, 16)}{" "}
            {chapterTitle?.length > 16 && "..."}
          </span>
          {activeId === item.id && (
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
