import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

const Topbar = () => {
  return (
    <div className="mt-6 flex items-center justify-between">
      {/* search */}
      <div className="flex items-center gap-x-3">
        <div className="text-xl">
          <FiSearch />
        </div>
        <input
          type="text"
          className="px-1 py-1 bg1 outline-none content2 border-b text-sm w-64"
          placeholder="eg, harry potter"
        />
      </div>

      <div className="flex items-center gap-x-4">
        <div className="w-12 h-12 accent2 rounded-full"></div>
        <div className="text-xl">
          <IoNotificationsOutline />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
