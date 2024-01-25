"use client";

import AuthorList from "@/app/ui/author/AuthorList";
import GenreList from "@/app/ui/author/GenreList";
import TagList from "@/app/ui/author/TagList";
import { cn } from "@/utils/cn";
import React, { useState } from "react";

const DataManager = () => {
  const [active, setActive] = useState("author");

  const changeTab = (tab) => {
    setActive(tab);
  };

  return (
    <div>
      <div className="border-b-2 border-bkg-2 flex items-center justify-start gap-x-6 mb-8">
        <div
          className={cn(
            "px-4 cursor-pointer border-b-4 border-transparent",
            active === "author" && "border-check"
          )}
          onClick={() => changeTab("author")}
        >
          Author
        </div>
        <div
          className={cn(
            "px-4 cursor-pointer border-b-4 border-transparent",
            active === "genre" && "border-check"
          )}
          onClick={() => changeTab("genre")}
        >
          Genre
        </div>
        <div
          className={cn(
            "px-4 cursor-pointer border-b-4 border-transparent",
            active === "tag" && "border-check"
          )}
          onClick={() => changeTab("tag")}
        >
          Tag
        </div>
      </div>

      {active === "author" && <AuthorList />}

      {active === "tag" && <TagList />}

      {active === "genre" && <GenreList />}
    </div>
  );
};

export default DataManager;
