"use client";

import { fetcher } from "@/utils/util";
import React from "react";
import useSWR from "swr";
import Loader from "../common/Loader";
import BookDataTable from "../common/BookDataTable";

const BookList = () => {
  const { data, isLoading } = useSWR("/api/book-info", fetcher, {
    refreshInterval: 200,
  });
  console.log("bookdata: ", data);

  if (isLoading)
    return (
      <div className="mt-16">
        <Loader />
      </div>
    );

  return (
    <BookDataTable
      data={data}
      hasImage
      defaultImage={"/author.png"}
      // deleteApi="/api/author"
      // type={"author"}
    />
  );
};

export default BookList;
