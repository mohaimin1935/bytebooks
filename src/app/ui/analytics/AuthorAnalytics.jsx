import { fetcher } from "@/utils/util";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { PiBookmarksSimpleLight, PiBooksLight } from "react-icons/pi";
import useSWR from "swr";
import Loader from "../common/Loader";
import { FiStar } from "react-icons/fi";

const AuthorAnalytics = ({ data }) => {
  const authorBookCount = data?.booksPerAuthor?.sort(
    (a, b) => b.count - a.count
  );

  const authorRating = data?.ratingsByAuthor?.sort(
    (a, b) => b.averageRating - a.averageRating
  );

  const authorBookmarks = data?.bookmarksByAuthor?.sort(
    (a, b) => b.bookmarkCount - a.bookmarkCount
  );

  return (
    <div className="flex items-start">
      <div className="w-1/3 px-8">
        <h3 className="section-header mb-8">Highest Books</h3>

        {authorBookCount ? (
          authorBookCount
            ?.slice(0, 5)
            .map((item) => (
              <Item item={item} label={"count"} icon={() => <PiBooksLight />} />
            ))
        ) : (
          <Loader className="h-72" />
        )}
      </div>

      <div className="w-1/3 px-8">
        <h3 className="section-header mb-8">Highest Rated</h3>
        {authorRating ? (
          authorRating
            ?.slice(0, 5)
            .map((item) => (
              <Item
                item={item}
                label={"averageRating"}
                icon={() => <FiStar />}
              />
            ))
        ) : (
          <Loader className="h-72" />
        )}
      </div>

      <div className="w-1/3 px-8">
        <h3 className="section-header mb-8">Top Bookmarked</h3>

        {authorBookmarks ? (
          authorBookmarks
            ?.slice(0, 5)
            .map((item) => (
              <Item
                item={item}
                label={"bookmarkCount"}
                icon={() => <PiBookmarksSimpleLight />}
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
  const { data } = useSWR(`/api/author/${item.authorId}`, fetcher);

  return (
    <div className="flex items-start gap-x-4 mb-4 border-b border-bkg-2 pl-2 pb-2">
      <div className="w-1/6 center gap-y-2">
        <div className="p-[2px] rounded-full border-check border">
          <div
            className="bg2 w-10 h-12 rounded-full"
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
        <Link
          href={`/reader/author/${item.authorId}`}
          className="capitalize font-semibold mb-2 hover"
        >
          {item.authorName}
        </Link>
        <p className="text-xl flex items-center gap-x-2">
          {icon()}{" "}
          {label === "averageRating" ? item[label]?.toFixed(2) : item[label]}
        </p>
      </div>
    </div>
  );
};

export default AuthorAnalytics;
