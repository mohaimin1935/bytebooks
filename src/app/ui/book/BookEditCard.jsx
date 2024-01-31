import Link from "next/link";
import React, { useState } from "react";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import { useSWRConfig } from "swr";

const BookEditCard = ({ book = {} }) => {
  const [loading, setLoading] = useState(false);

  const { mutate } = useSWRConfig();

  const handlePublish = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/book-info/${book.id}`, {
        isPublished: !book.isPublished,
      });
      mutate(`/api/book-info`);
      console.log(res.data);
      toast.success("Published successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-bkg-2 shadow rounded-md flex gap-x-4 px-4 pt-4 my-4 h-40 overflow-scroll">
      {/* LEFT */}
      <img
        src={book.image || "/bookImage.jpg"}
        alt="book"
        className="h-full rounded"
      />

      {/* RIGHT */}
      <div className="w-full">
        <div className="flex flex-col h-full justify-between">
          {/* TOP */}
          <div className="w-full">
            <h3 className="font-semibold capitalize">{book.title}</h3>
            <p className="text-xs content2 my-1">
              By{" "}
              {book.authors?.map(({ author }) => (
                <span key={author.id} className="mr-2 bg2 px-2 py-1 rounded">
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
                <p>{book.isPublished ? "Draft" : "Publish"}</p>
              ) : (
                <Loader />
              )}
            </button>
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
