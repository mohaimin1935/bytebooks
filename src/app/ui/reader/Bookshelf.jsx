"use client";

import { cn } from "@/utils/cn";
import React, { useState } from "react";
import styles from "./Bookshelf.module.css";
import { fetcher, textColorOnBg, truncateText } from "@/utils/util";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { ColorExtractor } from "react-color-extractor";
import BookFlip from "../book/cards/BookFlip";
import BookshelfBooks from "../book/BookshelfBooks";

const Bookshelf = ({ books, onlyBooks = false }) => {
  const { data } = useSession();
  const { data: userData } = useSWR(`/api/users/${data?.user?.id}`, fetcher);

  return (
    <div className="relative">
      <div
        className={cn(
          "w-full flex items-end relative h-0 border-b border-bkg-2 before:shadow-xl mt-[200px] z-50",
          styles.bookshelf
        )}
      >
        <div className="w-full -mb-4 flex  items-end ml-16">
          <BookshelfBooks books={books} />

          {!onlyBooks && (
            <>
              <img src="/plant.png" alt="" className="w-32 ml-auto" />

              <img
                src={userData?.image || "/profile.png"}
                alt=""
                className="w-40 h-40 mb-4 mx-4 rounded-sm -z-10"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
