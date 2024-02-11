"use client";

import BookList from "@/app/ui/book/BookList";
import BookFlip from "@/app/ui/book/cards/BookFlip";
import Search from "@/app/ui/common/Search";
import { baseApi, fetcher } from "@/utils/util";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const ViewAuthor = () => {
  const { authorId } = useParams();

  const { data: author } = useSWR(`/api/author/${authorId}`, fetcher);
  const { data: books, isLoading: booksLoading } = useSWR(
    `/api/book-info?author=${authorId}`,
    fetcher
  );
  return (
    <div>
      {/* banner */}
      <div className="h-72 accent1 rounded-xl shadow relative">
        <div className="absolute top-0 right-20 pt-12 p-4 rounded-b-full bg2">
          <div className="p-[2px] rounded-full border-check border">
            <div
              className="bg2 w-40 h-48 rounded-full"
              style={{
                backgroundImage: `url(${author?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>

        <div className="absolute top-16 left-20">
          <h3 className="text-2xl font-semibold mb-1">{author?.name}</h3>
          <p className="">
            {
              books?.filter((item) =>
                item?.authors?.some((genre) => genre.authorId === authorId)
              ).length
            }{" "}
            Books
          </p>
        </div>
      </div>
      {/* books */}
      <h2 className="section-header mt-16 mb-4">Books by Author</h2>
      {/* <Search placeholder={"Search by title"} /> */}
      <BookList
        isLoading={booksLoading}
        books={books?.filter((item) =>
          item?.authors?.some((genre) => genre.authorId === authorId)
        )}
      />
    </div>
  );
};

export default ViewAuthor;
