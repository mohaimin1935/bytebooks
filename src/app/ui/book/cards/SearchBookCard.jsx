import Link from "next/link";
import React from "react";

const SearchBookCard = ({ book, link, global = true, setValue }) => {
  const renderBody = () => {
    return (
      <>
        <div className="w-1/5">
          <div
            className="pb-[133%] bg2"
            style={{
              backgroundImage: `url(${book?.image || "/bookImage.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        <div className="w-full">
          <h3 className="font-semibold capitalize">{book?.title}</h3>
          <p className="text-xs content2 my-1 w-full overflow-hidden flex flex-wrap items-center gap-1">
            <span>By </span>
            {book?.authors?.map(({ author }) => (
              <span key={author.id} className="bg2 px-2 py-1 rounded">
                {author.name}
              </span>
            ))}
          </p>
        </div>
      </>
    );
  };

  if (global) {
    return (
      <Link
        href={link}
        className="border border-bkg-2 shadow rounded-md flex gap-x-2 px-2 py-2 my-2 cursor-pointer"
      >
        {renderBody()}
      </Link>
    );
  } else {
    return (
      <div
        onClick={() => setValue(book.id)}
        className="border border-bkg-2 shadow rounded-md flex gap-x-2 px-2 py-2 my-2 cursor-pointer"
      >
        {renderBody()}
      </div>
    );
  }
};

export default SearchBookCard;
