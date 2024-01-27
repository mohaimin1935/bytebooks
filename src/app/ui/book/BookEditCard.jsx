import Link from "next/link";
import React from "react";

const BookEditCard = ({ book = {} }) => {
  return (
    <div className="border border-bkg-2 shadow rounded-md flex gap-x-4 p-4 my-4">
      {/* LEFT */}
      <img src="/bookImage.jpg" alt="book" className="w-24 rounded" />

      {/* RIGHT */}
      <div className="w-full">
        <div className="flex flex-col h-full justify-between">
          {/* TOP */}
          <div className="w-full">
            <h3 className="text-xl font-semibold capitalize">{book.title}</h3>
            <p className="text-sm content2">
              By{" "}
              {book.authors?.map(({ author }) => (
                <p key={author.id} className="mr-2 bg2 px-2 py-1 rounded">
                  {author.name}
                </p>
              ))}
            </p>
            <p className="text-sm mt-2">
              {book.intro?.substring(0, 80)}
              ...
            </p>
          </div>

          {/* BOTTOM */}
          <div className="flex justify-between items-center w-full">
            {book.isPublished && (
              <button className="secondary-btn py-1 rounded px-4 text-sm">
                Publish
              </button>
            )}
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
