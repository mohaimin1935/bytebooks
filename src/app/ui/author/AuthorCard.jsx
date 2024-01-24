import Link from "next/link";
import React from "react";

const AuthorCard = ({ author, editable = false }) => {
  console.log(author.image);
  return (
    <div className="flex gap-x-4 mb-4">
      <div className="flex flex-col items-center gap-y-2">
        <img
          src={author.image}
          alt={"author"}
          className="w-12 h-12 rounded-full"
        />
        {editable && (
          <Link
            href={"/edit-author"}
            className="secondary-btn py-1 px-3 border text-xs"
          >
            Edit
          </Link>
        )}
      </div>
      <div className="flex-1">
        <Link href="/" className="font-semibold">
          {author.name}
        </Link>
        <div className="text-sm">{author.desc}</div>
      </div>
    </div>
  );
};

export default AuthorCard;
