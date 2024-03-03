"use client";

import BookBack from "@/app/ui/book/BookBack";
import BookList from "@/app/ui/book/BookList";
import BookshelfBooks from "@/app/ui/book/BookshelfBooks";
import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import Bookshelf from "@/app/ui/reader/Bookshelf";
import { fetcher, textColorOnBg } from "@/utils/util";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

const Library = () => {
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

      <section className="my-16">
        <div className="flex items-center justify-between gap-x-8 w-full">
          <h2 className="section-header mb-8">Finished Books</h2>
          <PrevNext />
        </div>
        <Bookshelf books={finishedBooks} onlyBooks={true} />
      </section>
    </div>
  );
};

export default Library;
