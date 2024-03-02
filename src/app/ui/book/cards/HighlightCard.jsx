"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext, useState } from "react";
import {
  FiBook,
  FiBookOpen,
  FiDelete,
  FiShare,
  FiShare2,
  FiTrash,
} from "react-icons/fi";
import DeleteConfirm from "../../common/DeleteConfirm";
import axios from "axios";
import Link from "next/link";

const HighlightCard = ({ highlight }) => {
  console.log(highlight);

  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("");

  const { modal, setModal } = useContext(ThemeContext);

  const removeHighlight = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/highlights/${highlight.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setModal(false);
      setModalType("");
    }
  };

  return (
    <div className="border border-bkg-2 shadow-md rounded-xl w-[31%] h-64 overflow-y-auto overflow-scroll p-4 pb-2 flex flex-col justify-between">
      {modal && modalType === "delete" && (
        <DeleteConfirm
          handleCancel={() => {
            setModal(false);
            setModalType("");
          }}
          handleDeleteConfirm={removeHighlight}
          loading={loading}
        />
      )}
      <p className="text-center mx-6 mt-6 flex">{highlight?.content}</p>
      <div className="center">
        <Link
          href={`/reader/view/book/${highlight.bookId}`}
          className="mt-4 text-center font-semibold text-lg hover mx-auto inline-block"
        >
          {highlight.title}
        </Link>
      </div>

      <div className="flex items-center justify-between mx-4">
        <p className="text-xs">
          {/* {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(highlight.createdAt))} */}
        </p>
        <div className="flex items-center gap-x-1">
          <button
            className="p-2 content-highlight"
            onClick={() => {
              console.log("first");
              setModal(true);
              setModalType("delete");
            }}
          >
            <FiTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
