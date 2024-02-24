"use client";

import { fetcher } from "@/utils/util";
import useSWR from "swr";

const Online = () => {
  // get
  const { data: books } = useSWR("/api/book-info", fetcher);

  console.log(books);

  // post

  // put / delete

  if (books)
    return (
      <div>
        {books?.map((book) => (
          <h3>
            {book.title}
            <EditBook />
          </h3>
        ))}
      </div>
    );
};

export default Online;

const EditBook = () => {
  return <></>;
};
