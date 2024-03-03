"use client";

import React from "react";
import { PiBookmarksSimpleLight, PiBooksLight } from "react-icons/pi";
import Loader from "../common/Loader";
import useSWR from "swr";
import { fetcher } from "@/utils/util";
import { FiStar } from "react-icons/fi";

const BookAnalytics = ({ data }) => {
  const mostBookmarked = data?.mostBookmarkedBooks?.sort(
    (a, b) => b.count - a.count
  );

  const topRated = data?.topRatedBooks?.sort(
    (a, b) => b.averageRating - a.averageRating
  );

  return (
    <div className="flex items-start">
      <div className="w-1/3 px-8">
        <h3 className="section-header mb-8">Highest Bookmarked</h3>

        {mostBookmarked ? (
          mostBookmarked
            ?.slice(0, 5)
            .map((item, index) => (
              <Item
                key={index}
                item={item}
                label={"count"}
                icon={() => <PiBookmarksSimpleLight />}
              />
            ))
        ) : (
          <Loader className="h-72" />
        )}
      </div>

      <div className="w-1/3 px-8">
        <h3 className="section-header mb-8">Top Rated</h3>

        {topRated ? (
          topRated
            ?.slice(0, 5)
            .map((item, index) => (
              <Item
                key={index}
                item={item}
                label={"averageRating"}
                icon={() => <FiStar />}
              />
            ))
        ) : (
          <Loader className="h-72" />
        )}
      </div>
    </div>
  );
};

const Item = ({ item, icon, label }) => {
  const { data } = useSWR(`/api/book-info/${item.bookId}`, fetcher);

  if (data)
    return (
      <div className="flex items-start gap-x-4 mb-4 border-b border-bkg-2 pl-2 pb-2">
        <div className="w-1/6 center gap-y-2">
          <div className="p-[2px]">
            <div
              className="bg2 w-10 h-12 rounded"
              style={{
                backgroundImage: `url(${data?.image || "/author.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>
        <div className="w-5/6">
          <div className="capitalize font-semibold mb-2">{data.title}</div>
          <p className="text-xl flex items-center gap-x-2">
            {icon()}{" "}
            {label === "averageRating" ? item[label]?.toFixed(2) : item[label]}
          </p>
        </div>
      </div>
    );
};

export default BookAnalytics;
