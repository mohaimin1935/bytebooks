import React from "react";
import { BiCollection } from "react-icons/bi";

const CollectionCard = () => {
  return (
    <div className="w-48 p-2 hover:bg2 flex flex-col items-center rounded-md">
      <img src="/profile.png" alt="" className="w-46 h-46 rounded" />
      <h3 className="font-semibold mt-4">Collection title</h3>
      <div className="flex items-center gap-x-2 text-sm mt-4">
        <BiCollection /> <span className="">6 items</span>
      </div>
    </div>
  );
};

export default CollectionCard;
