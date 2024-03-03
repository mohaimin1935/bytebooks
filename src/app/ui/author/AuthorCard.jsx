import { truncateText } from "@/utils/util";
import Link from "next/link";
import React from "react";

const AuthorCard = ({ author }) => {
  return (
    <div className="flex items-start gap-x-4 mb-4 h-28 border-b border-bkg-2 pl-2">
      <div className="w-1/6 center gap-y-2">
        <div className="p-[2px] rounded-full border-check border">
          <div
            className="bg2 w-12 h-16 rounded-full"
            style={{
              backgroundImage: `url(${author?.image || "/author.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        <Link
          href={`/reader/author/${author.id}`}
          className="secondary-btn py-1 px-3 border text-xs"
        >
          View
        </Link>
      </div>
      <div className="w-5/6">
        <Link
          href={`/reader/author/${author.id}`}
          className="capitalize font-semibold mb-2 hover"
        >
          {author.name}
        </Link>
        <p className="text-sm">{truncateText(author.desc, 80)}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
