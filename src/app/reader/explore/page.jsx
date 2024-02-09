"use client";

import BookList from "@/app/ui/book/BookList";
import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import { fetcher } from "@/utils/util";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

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
    `/api/users/${data?.user?.id}/books?type=trending`,
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
          <div className="bg2 px-6 py-2 rounded-md shadow hover:shadow-xl cursor-pointer">
            Genre
          </div>
          <div className="bg2 px-6 py-2 rounded-md shadow hover:shadow-xl cursor-pointer">
            Genre
          </div>
          <div className="bg2 px-6 py-2 rounded-md shadow hover:shadow-xl cursor-pointer">
            Genre
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-x-8 w-full mb-8 mt-16">
          <h2 className="section-header">Latest</h2>
          <PrevNext />
        </div>
        <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
          <BookFlip width={140} details={true} audio={false} />
          <BookFlip width={140} details={true} audio={false} />
          <BookFlip width={140} details={true} audio={false} />
        </div>
      </section>
    </div>
  );
};

export default Explore;
