import Link from "next/link";
import React, { useContext, useState } from "react";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import { useSWRConfig } from "swr";
import Modal from "../common/Modal";
import { ThemeContext } from "@/contexts/ThemeContext";
import { FiDelete, FiTrash } from "react-icons/fi";
import DeleteConfirm from "../common/DeleteConfirm";
import { cn } from "@/utils/cn";

const BookEditCard = ({ book = {} }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [deleteLoading, setDeleteLoading] = useState();

  const { setModal } = useContext(ThemeContext);
  const { mutate } = useSWRConfig();

  const handleDelete = () => {
    setModal(true);
    setShowModal("delete");
  };

  const handleCancel = () => {
    setModal(false);
    setShowModal("");
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      axios.delete(`/api/book-info/${book.id}`);
      toast.success("Deleted Successfully");
      mutate(`/api/book-info`);
    } catch (error) {
      console.log(error);
      toast.error("Request failed");
    } finally {
      setDeleteLoading(false);
      setShowModal(false);
      setModal(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/book-info/${book.id}`, {
        isPublished: !book.isPublished,
      });
      mutate(`/api/book-info`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-bkg-2 shadow rounded-md flex gap-x-4 px-4 py-4 my-4">
      {showModal === "delete" && (
        <div className={cn(" -mt-56 center")}>
          <DeleteConfirm
            handleCancel={handleCancel}
            handleDeleteConfirm={handleDeleteConfirm}
            loading={loading}
          />
        </div>
      )}
      {/* LEFT */}
      <div className="w-1/5">
        <div
          className="pb-[133%] bg2"
          style={{
            backgroundImage: `url(${book.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {/* RIGHT */}
      <div className="w-full">
        <div className="flex flex-col h-full justify-between">
          {/* TOP */}
          <div className="w-full">
            <h3 className="font-semibold capitalize">{book.title}</h3>
            <p className="text-xs content2 my-1 w-full overflow-hidden flex flex-wrap items-center gap-1">
              <span>By </span>
              {book.authors?.map(({ author }) => (
                <span key={author.id} className="bg2 px-2 py-1 rounded">
                  {author.name}
                </span>
              ))}
            </p>
          </div>

          {/* BOTTOM */}
          <div className="flex justify-between items-center w-full">
            <button
              className="secondary-btn py-1 rounded px-4 text-sm"
              onClick={handlePublish}
            >
              {!loading ? (
                <p>{book.isPublished ? "Unpublish" : "Publish"}</p>
              ) : (
                <Loader />
              )}
            </button>
            <FiTrash
              className="cursor-pointer content-highlight ml-auto mr-4 p-1"
              size={28}
              onClick={() => handleDelete(book?.id)}
            />
            <Link
              href={`book-info/${book.id}`}
              className="primary-btn py-1 rounded px-4 text-sm"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEditCard;
