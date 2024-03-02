"use client";

import { fetcher } from "@/utils/util";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Loader from "../common/Loader";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";

const ReportCard = ({ report }) => {
  console.log(report);
  const [loading, setLoading] = useState(false);

  const { data: book } = useSWR(`/api/book-info/${report.bookId}`, fetcher, {
    refreshInterval: 200,
  });
  const { data: user } = useSWR(`/api/users/${report.userId}`, fetcher, {
    refreshInterval: 200,
  });

  console.log(book?.isSuspended);

  const handleSuspend = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.post(
        `/api/report/${report.id}/suspend/${report.bookId}`,
        {
          status: book.isSuspended ? "unsuspend" : "suspend",
        }
      );
      toast.success("Request approved");
    } catch (error) {
      console.log(error);
      toast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (status) => {
    try {
      await axios.patch(`/api/report/${report.id}`, {
        status: status === "like" ? "positive" : "negative",
      });
      toast.success("Feedback submitted");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="border border-bkg-2 shadow rounded-md flex gap-x-4 px-4 py-4 my-4">
      {/* LEFT */}
      <div className="w-1/5">
        <div
          className="pb-[133%] bg2"
          style={{
            backgroundImage: `url(${book?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {/* RIGHT */}
      <div className="w-full">
        <div className="flex flex-col h-full justify-between">
          {/* TOP */}
          <div className="w-full">
            <h3 className="font-semibold capitalize">{book?.title}</h3>
            <p className="content2 my-1 w-full overflow-hidden">
              <p className="font-semibold">Reported by: {user?.name}</p>
              <p className="text-sm">{report.comment}</p>
            </p>
          </div>

          {/* BOTTOM */}
          <div className="flex justify-between items-center w-full">
            <button
              className="secondary-btn py-1 rounded px-4 text-sm"
              onClick={handleSuspend}
            >
              {!loading ? (
                <p>{book?.isSuspended ? "Unsuspend" : "Suspend"}</p>
              ) : (
                <Loader />
              )}
            </button>
            <div className="flex items-center">
              <div
                className="text-emerald-500"
                onClick={() => handleFeedback("like")}
              >
                {report.status === "positive" ? (
                  <BiSolidLike
                    className="cursor-pointer ml-auto p-1"
                    size={28}
                  />
                ) : (
                  <BiLike className="cursor-pointer ml-auto p-1" size={28} />
                )}
              </div>
              <div
                className="content-highlight"
                onClick={() => handleFeedback("dislike")}
              >
                {report.status === "negative" ? (
                  <BiSolidDislike
                    className="cursor-pointer  ml-auto p-1"
                    size={28}
                  />
                ) : (
                  <BiDislike className="cursor-pointer ml-auto p-1" size={28} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
