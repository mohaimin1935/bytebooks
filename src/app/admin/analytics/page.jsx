"use client";

import AuthorAnalytics from "@/app/ui/analytics/AuthorAnalytics";
import BookAnalytics from "@/app/ui/analytics/BookAnalytics";
import CreatorAnalytics from "@/app/ui/analytics/CreatorAnalytics";
import GenreAnalytics from "@/app/ui/analytics/GenreAnalytics";
import UserAnalytics from "@/app/ui/analytics/UserAnalytics";
import { cn } from "@/utils/cn";
import { fetcher } from "@/utils/util";
import React, { useState } from "react";
import useSWR from "swr";

const AdminAnalytics = () => {
  const { data: authorAnalytics, isLoading: authorLoading } = useSWR(
    `/api/analytics/authorAnalytics`,
    fetcher
  );

  const { data: bookAnalytics, isLoading: bookLoading } = useSWR(
    `/api/analytics/bookAnalytics`,
    fetcher
  );

  const { data: genreAnalytics, isLoading: genreLoading } = useSWR(
    `/api/analytics/genreAnalytics`,
    fetcher
  );

  // const { data: userAnalytics, isLoading: userLoading } = useSWR(
  //   `/api/analytics/userAnalytics`,
  //   fetcher
  // );

  // const { data: creatorAnalytics, isLoading: creatorLoading } = useSWR(
  //   `/api/analytics/creatorAnalytics`,
  //   fetcher
  // );

  const [active, setActive] = useState("Author");

  const tabs = ["Author", "Book", "Genre"];

  const changeTab = (tab) => {
    setActive(tab);
  };

  return (
    <div>
      <div className="border-b-2 border-bkg-2 flex items-center justify-start gap-x-6 mb-8">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={cn(
              "px-4 cursor-pointer border-b-4 border-transparent",
              active === tab && "border-check"
            )}
            onClick={() => changeTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {active === "Author" && <AuthorAnalytics data={authorAnalytics} />}

      {active === "Book" && <BookAnalytics data={bookAnalytics} />}

      {active === "Genre" && <GenreAnalytics data={genreAnalytics} />}
      {/* 
      {active === "User" && <UserAnalytics data={userAnalytics} />}

      {active === "Creator" && <CreatorAnalytics data={creatorAnalytics} />} */}
    </div>
  );
};

export default AdminAnalytics;
