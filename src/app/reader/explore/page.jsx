"use client";

import BookList from "@/app/ui/book/BookList";
import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import { fetcher } from "@/utils/util";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import Loader from "@/app/ui/common/Loader";

const Explore = () => {
  const { data } = useSession();
  const { data: trendingBooks, isLoading: trendingLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=trending`,
    fetcher
  );
  const { data: latestBooks, isLoading: latestLoading } = useSWR(
    `/api/users/${data?.user?.id}/books?type=latest`,
    fetcher
  );
  const { data: categories, isLoading: categoriesLoading } = useSWR(
    `/api/genre`,
    fetcher
  );

  return (
    <div>
      <section>
        <div className="flex items-center justify-between gap-x-8 w-full mb-8">
          <h2 className="section-header">Trending</h2>
          <PrevNext />
        </div>
        <BookList isLoading={trendingLoading} books={trendingBooks} />
      </section>

      <section>
        <h2 className="section-header mb-8 mt-16">Categories</h2>
        <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
          {categoriesLoading ? (
            <Loader className="h-20" />
          ) : (
            categories?.map((category) => (
              <div
                className="bg2 px-6 py-2 rounded-md shadow hover:shadow-xl cursor-pointer"
                key={category.id}
              >
                {category.name}
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-x-8 w-full mb-8 mt-16">
          <h2 className="section-header">Latest</h2>
          <PrevNext />
        </div>
        <BookList isLoading={latestLoading} books={latestBooks} />
      </section>
    </div>
  );
};

export default Explore;
