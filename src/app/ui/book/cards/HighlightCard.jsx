import React from "react";
import { FiBook, FiBookOpen, FiShare, FiShare2 } from "react-icons/fi";

const HighlightCard = () => {
  return (
    <div className="border border-bkg-2 shadow-md rounded-xl w-[31%] overflow-scroll p-4 pb-2 relative">
      <p className="text-center mx-6 mt-6">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi hic cum
        fuga ea necessitatibus! Soluta nostrum sapiente ipsa quos? Repudiandae
        libero, ut consequatur quod eaque ex et provident facere quos at
        perspiciatis cumque quis ea. In, qui? Ipsam delectus et asperiores ipsa
        soluta voluptatum, quidem corporis animi earum neque! Possimus.
      </p>
      <h4 className="mt-4 text-center font-semibold text-lg">Book Title</h4>

      <div className="flex items-center justify-between mx-4">
        <p className="text-xs">Added 2y ago</p>
        <div className="flex items-center gap-x-1">
          <button className="p-2">
            <FiBookOpen />
          </button>
          <button className="p-2">
            <FiShare2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
