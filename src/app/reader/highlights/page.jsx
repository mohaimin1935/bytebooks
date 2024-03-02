"use client";

import HighlightCard from "@/app/ui/book/cards/HighlightCard";
import Search from "@/app/ui/common/Search";
import { fetcher } from "@/utils/util";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

const Highlights = () => {
  const { data } = useSession();
  const userId = data?.user.id;

  const { data: highlights, loading } = useSWR(
    `/api/highlights/user/${userId}`,
    fetcher,
    { refreshInterval: 300 }
  );
  console.log(highlights);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="section-header">Memories Bring Back You</h2>

        <Search placeholder={"Search from memories..."} />
      </div>

      <div className="flex flex-wrap items-center gap-10">
        {!loading &&
          highlights?.map((highlight) => (
            <HighlightCard key={highlight.id} highlight={highlight} />
          ))}
        {loading && <Loader className="h-24 w-full" />}
      </div>
    </div>
  );
};

export default Highlights;
