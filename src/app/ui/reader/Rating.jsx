"use client";

import { fetcher } from "@/utils/util";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";
import { PiStar, PiStarFill } from "react-icons/pi";
import useSWR from "swr";

const Rating = ({ bookId }) => {
  const { data } = useSession();
  const userId = data?.user?.id;

  const { data: bookUser } = useSWR(
    `/api/users/${userId}/books/${bookId}`,
    fetcher,
    { refreshInterval: 200 }
  );
  const rating = bookUser?.rating;

  const handleRating = async (rating) => {
    try {
      const res = await axios.post(`/api/users/${userId}/books/${bookId}`, {
        rating: rating,
        status: bookUser?.status || "will read",
      });
      toast.success("Rating added");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-x-[2px] text-amber-500 text-lg cursor-pointer">
        <div className="" onClick={() => handleRating(1)}>
          {rating > 0 ? <PiStarFill /> : <PiStar />}
        </div>
        <div className="" onClick={() => handleRating(2)}>
          {rating > 1 ? <PiStarFill /> : <PiStar />}
        </div>
        <div className="" onClick={() => handleRating(3)}>
          {rating > 2 ? <PiStarFill /> : <PiStar />}
        </div>
        <div className="" onClick={() => handleRating(4)}>
          {rating > 3 ? <PiStarFill /> : <PiStar />}
        </div>
        <div className="" onClick={() => handleRating(5)}>
          {rating > 4 ? <PiStarFill /> : <PiStar />}
        </div>
      </div>
    </div>
  );
};

export default Rating;
