"use client";

import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import PieChartCustom from "@/app/ui/common/charts/PieChartCustom";
import Bookshelf from "@/app/ui/reader/Bookshelf";
import { fetcher } from "@/utils/util";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

const AdminProfile = () => {
  const { data } = useSession();

  const { data: continueBooks, isLoading: continueLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=continue`,
    fetcher
  );

  const { data: savedBooks, isLoading: savedLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=bookmarked`,
    fetcher
  );

  const { data: finishedBooks, isLoading: finishedLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=finished`,
    fetcher
  );

  const books = [];
  continueBooks?.forEach((book) => books.push(book));
  savedBooks?.forEach((book) => books.push(book));
  finishedBooks?.forEach((book) => books.push(book));
  console.log(savedBooks?.length);
  books.slice(0, 10);

  return (
    <div>
      <Bookshelf books={books.slice(0, 10)} />
      <GenreStat books={books} />
    </div>
  );
};

export default AdminProfile;

const GenreStat = ({ books }) => {
  return (
    <section className="mt-24 flex w-full">
      <div className="w-1/3 flex items-center flex-col text-center ">
        <h2 className="section-header">Top Genres</h2>
        <PieChartCustom />
      </div>
      <div className="w-2/3">
        <section>
          <div className="flex items-start justify-between gap-x-8 w-full">
            <h2 className="section-header mb-8">Recent Reads</h2>
            <PrevNext />
          </div>
          <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
            {books.map((book) => (
              <BookFlip
                book={book}
                width={140}
                details={true}
                audio={true}
                key={book.id}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};
