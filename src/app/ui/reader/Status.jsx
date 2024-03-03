"use client";

import { fetcher, truncateText } from "@/utils/util";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowDownSLine } from "react-icons/ri";
import useSWR from "swr";

const Status = ({ bookId }) => {
  const [openSwitch, setOpenSwitch] = useState(false);

  const { data } = useSession();
  const userId = data?.user?.id;

  const { data: bookUser } = useSWR(
    `/api/users/${userId}/books/${bookId}`,
    fetcher,
    { refreshInterval: 200 }
  );
  const status = bookUser?.status || "No Shelf";

  const handleSwitch = async (status) => {
    try {
      const res = await axios.post(`/api/users/${userId}/books/${bookId}`, {
        status,
      });
      toast.success("Status updated");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setOpenSwitch(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="w-36 py-2 border border-check rounded-full flex gap-2 items-center justify-center cursor-pointer"
        onClick={() => setOpenSwitch((prev) => !prev)}
      >
        <p className="ml-2 content2 capitalize">{truncateText(status, 16)}</p>
        <RiArrowDownSLine />
      </div>

      {openSwitch && (
        <div className="absolute w-36 bg2 center p-2 rounded-lg top-12 z-50">
          <button
            className="cursor-pointer hover:bg1 py-2 w-full rounded-lg transition duration-300"
            onClick={() => handleSwitch("no shelf")}
          >
            No Shelf
          </button>
          <button
            className="cursor-pointer hover:bg1 py-2 w-full rounded-lg transition duration-300"
            onClick={() => handleSwitch("will read")}
          >
            Will Read
          </button>
          <button
            className="cursor-pointer hover:bg1 py-2 w-full rounded-lg transition duration-300"
            onClick={() => handleSwitch("reading")}
          >
            Reading
          </button>
          <button
            className="cursor-pointer hover:bg1 py-2 w-full rounded-lg transition duration-300"
            onClick={() => handleSwitch("completed")}
          >
            Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default Status;
