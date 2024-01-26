import AddBook from "@/app/ui/book/AddBook";
import Loader from "@/app/ui/common/Loader";
import { baseApi } from "@/utils/util";
import axios from "axios";
import React, { Suspense } from "react";

const getData = async (bookId) => {
  try {
    const res = await axios.get(`${baseApi}/book-info/${bookId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }) => {
  const book = await getData(params.bookId);

  if (book) return <AddBook bookInfo={book} />;
};

export default page;
