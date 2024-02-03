"use client";

import AddBook from "@/app/ui/book/AddBook";
import Loader from "@/app/ui/common/Loader";
import { fetcher } from "@/utils/util";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const AddBookPage = () => {
  const { bookId } = useParams();

  const { data, isLoading } = useSWR(`/api/book-info/${bookId}`, fetcher);

  const [book, setBook] = useState();

  useEffect(() => {
    setBook(data);
  }, [data]);

  if (book) return <AddBook bookInfo={book} />;
  if (isLoading) return <Loader className="h-96" />;
};

export default AddBookPage;
