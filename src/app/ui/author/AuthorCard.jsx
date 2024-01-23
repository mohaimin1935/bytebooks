import Link from "next/link";
import React from "react";

const AUthorCard = ({ author, editable = false }) => {
  return (
    <div className="flex gap-x-4">
      <div className="flex flex-col items-center gap-y-2">
        <div className="w-16 h-16 bg-indigo-400 rounded-full"></div>
        {editable ? (
          <Link
            href={"/edit-author"}
            className="secondary-btn py-1 px-3 border text-xs"
          >
            Edit
          </Link>
        ) : (
          <button className="secondary-btn py-1 px-3 border text-xs">
            View
          </button>
        )}
      </div>
      <div className="flex-1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore rerum
        provident accusantium beatae! Quam, quos.
      </div>
    </div>
  );
};

export default AUthorCard;
