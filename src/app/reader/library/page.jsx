"use client";

import BookBack from "@/app/ui/book/BookBack";
import BookList from "@/app/ui/book/BookList";
import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import { fetcher, textColorOnBg } from "@/utils/util";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

const Library = () => {
  const { data } = useSession();

  const { data: continueBooks, isLoading: continueLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=latest`,
    fetcher
  );

  const { data: savedBooks, isLoading: savedLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=latest`,
    fetcher
  );

  const { data: finishedBooks, isLoading: finishedLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=latest`,
    fetcher
  );

  return (
    <div>
      <section>
        <div className="flex items-center justify-between gap-x-8 w-full mb-8">
          <h2 className="section-header">Continue</h2>
          <PrevNext />
        </div>
        <BookList isLoading={continueLoading} books={continueBooks} />
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between gap-x-8 w-full mb-8">
          <h2 className="section-header">Saved Books</h2>
          <PrevNext />
        </div>
        <BookList books={savedBooks} isLoading={savedLoading} />
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between gap-x-8 w-full mb-8">
          <h2 className="section-header">Finished Books</h2>
          <PrevNext />
        </div>
        <div className="flex flex-wrap justify-start items-end gap-x-0 border-b-4 border-check px-4 h-[200px]">
          {finishedBooks?.map((book) => (
            <BookBack book={book} key={book.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Library;
