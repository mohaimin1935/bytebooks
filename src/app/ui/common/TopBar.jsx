"use client";

import React, { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TopBar = ({ role }) => {
  const [openSwitch, setOpenSwitch] = useState(false);
  const [mode, setMode] = useState(role);

  const { data } = useSession();
  const router = useRouter();

  const handleSwitch = (mode) => {
    if (data?.user?.role !== "reader") {
      setMode(mode);
      toast.success(`Switched to ${mode} mode.`);
      router.push(`/${mode}/home`);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-between relative">
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
        {data?.user?.role !== "reader" && (
          <div
            className="w-32 py-2 border border-bkg-2 rounded-full flex gap-2 items-center justify-center cursor-pointer"
            onClick={() => setOpenSwitch((prev) => !prev)}
          >
            <p className="ml-2 content2 capitalize">{mode}</p>
            <RiArrowDownSLine />
          </div>
        )}
        {openSwitch && data?.user?.role !== "reader" && (
          <div className="absolute w-32 bg2 center p-2 rounded-lg top-12 z-10">
            <button
              className="cursor-pointer hover:bg1 py-2 w-full rounded-lg transition duration-300"
              onClick={() => handleSwitch("reader")}
            >
              Reader
            </button>
            {data?.user?.role === "creator" && (
              <button
                className="cursor-pointer hover:bg1 py-2 w-full rounded-lg transition duration-300"
                onClick={() => handleSwitch("creator")}
              >
                Creator
              </button>
            )}
            {data?.user?.role === "admin" && (
              <button
                className="cursor-pointer hover:bg1 py-2 w-full rounded-lg transition duration-300"
                onClick={() => handleSwitch("admin")}
              >
                Creator
              </button>
            )}
          </div>
        )}

        <div className="w-12 h-12 accent2 rounded-full left-4"></div>
        <div className="text-xl">
          <IoNotificationsOutline />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
