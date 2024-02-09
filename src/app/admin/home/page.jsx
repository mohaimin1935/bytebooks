"use client";

import { fetcher } from "@/utils/util";
import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import useSWR from "swr";

const AdminHome = () => {
//   const { data: inProgressBooks, isLoading: progressBooksLoading } = useSWR(
//     "/api/book-info?isPublished=false",
//     fetcher
//     // { refreshInterval: 500 }
//   );
//   const { data: publishedBooks, isLoading: publishedBooksLoading } = useSWR(
//     "/api/book-info?isPublished=true",
//     fetcher
//     // { refreshInterval: 500 }
//   );

  return (
    <div className="flex gap-12 relative">
      {/* IN PROGRESS */}
      <div className="w-1/2 border border-bkg-2 h-fit rounded-b-lg">
        <div className="h-2 w-full bg-amber-500"></div>
        {/* <div className="px-8 pb-8">
          <h3 className="text-xl font-semibold text-center my-4">
            IN PROGRESS
          </h3>

          <Link
            href={"/creator/book-info"}
            className="border border-check center cursor-pointer py-2 rounded-full mt-8 text-xl"
          >
            <IoMdAdd />
          </Link>

          
          {progressBooksLoading ? (
            <>
              <BookEditSkeleton />
              <BookEditSkeleton />
              <BookEditSkeleton />
              <BookEditSkeleton />
            </>
          ) : (
            inProgressBooks?.map((book) => (
              <BookEditCard key={book.id} book={book} />
            ))
          )}
        </div> */}
      </div>

      {/* PUBLISHED */}
      <div className="w-1/2 border border-bkg-2 h-fit rounded-b-lg">
        <div className="h-2 w-full bg-emerald-500"></div>

        {/* <div className="px-8 pb-8">
          <h3 className="text-xl font-semibold text-center my-4">PUBLISHED</h3>

          {publishedBooksLoading ? (
            <>
              <BookEditSkeleton />
              <BookEditSkeleton />
              <BookEditSkeleton />
              <BookEditSkeleton />
            </>
          ) : (
            publishedBooks?.map((book) => (
              <BookEditCard key={book.id} book={book} />
            ))
          )}
        </div> */}
      </div>
    </div>
  );
};

export default AdminHome;
