"use client";

import React, { useContext, useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { ThemeContext } from "@/contexts/ThemeContext";
import SearchModal from "./SearchModal";
import Search from "./Search";

const TopBar = ({ role }) => {
  const [openSwitch, setOpenSwitch] = useState(false);
  const [mode, setMode] = useState(role);

  const [searchModal, setSearchModal] = useState(false);
  const { setModal } = useContext(ThemeContext);

  const { data } = useSession();
  const router = useRouter();

  const handleSwitch = (mode) => {
    if (data?.user?.role !== "reader") {
      setMode(mode);
      setOpenSwitch(false);
      toast.success(`Switched to ${mode} mode.`);
      router.push(`/${mode}/home`);
    }
  };

  const handleSearchModal = () => {
    setSearchModal(true);
    setModal(true);
  };

  return (
    <div className="">
      {searchModal && <SearchModal />}
      <div className="mt-6 flex items-center justify-between relative">
        {/* search */}
        <div className="" onClick={handleSearchModal}>
          <Search />
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

          <ToggleTheme />
          <div className="text-xl">
            <IoNotificationsOutline />
          </div>
          <Link href="settings">
            <img
              src={data?.user?.image || "/profile.png"}
              alt="profile"
              className="w-12 h-12 p-[2px] border border-check rounded-full left-4"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
