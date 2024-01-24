import Link from "next/link";
import React from "react";

const AuthorCard = ({ author }) => {
  return (
    <div className="flex items-start gap-x-4 mb-4 h-24 pb-2 border-b border-bkg-2">
      <div className="w-1/6 center gap-y-2">
        <img
          src={"/author.png"}
          alt="author"
          className="w-12 h-12 rounded-full p-[1px] border-check border"
        />
        <Link href={"/"} className="secondary-btn py-1 px-3 border text-xs">
          View
        </Link>
      </div>
      <div className="w-5/6">
        <Link href="/" className="capitalize font-semibold mb-2">
          {author.name}
        </Link>
        <p className="text-sm">
          {author.desc.substring(0, 120)} {author.desc.length > 120 && "..."}
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;
