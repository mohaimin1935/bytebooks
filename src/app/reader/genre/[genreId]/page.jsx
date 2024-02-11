"use client";

import BookList from "@/app/ui/book/BookList";
import Loader from "@/app/ui/common/Loader";
import PrevNext from "@/app/ui/common/PrevNext";
import { cn } from "@/utils/cn";
import { fetcher } from "@/utils/util";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const GenrePage = () => {
  const { genreId } = useParams();

  const { data: categories, isLoading: categoriesLoading } = useSWR(
    `/api/genre`,
    fetcher
  );

  const { data: books, isLoading: booksLoading } = useSWR(
    `/api/book-info?genre=${genreId}`,
    fetcher
  );

  return (
    <div>
      <section>
        <h2 className="section-header mb-8">Categories</h2>
        <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
          {categoriesLoading ? (
            <Loader className="h-20" />
          ) : (
            categories?.map((category) => (
              <Link
                href={`/reader/genre/${category.id}`}
                className={cn(
                  "bg2 px-6 py-2 rounded-md shadow hover:shadow-xl cursor-pointer",
                  category.id === genreId && "border border-check"
                )}
                key={category.id}
              >
                {category.name}
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="mt-12">
        {/* <div className="flex items-center justify-between gap-x-8 w-full mb-8 mt-16">
          <h2 className="section-header"></h2>
          <PrevNext />
        </div> */}
        <BookList
          isLoading={booksLoading}
          books={books?.filter((item) =>
            item?.genres?.some((genre) => genre.genreId === genreId)
          )}
        />
      </section>
    </div>
  );
};

export default GenrePage;
