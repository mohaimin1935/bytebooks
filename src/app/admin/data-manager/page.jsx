"use client";

import BookList from "@/app/ui/admin/BookList";
import UserList from "@/app/ui/admin/UserList";
import AuthorList from "@/app/ui/author/AuthorList";
import GenreList from "@/app/ui/author/GenreList";
import TagList from "@/app/ui/author/TagList";
import { cn } from "@/utils/cn";
import React, { useState } from "react";

const AdminDataManager = () => {
  const [active, setActive] = useState("user");

  const changeTab = (tab) => {
    setActive(tab);
  };

  return (
    <div>
      <div className="border-b-2 border-bkg-2 flex items-center justify-start gap-x-6 mb-8">
        <div
          className={cn(
            "px-4 cursor-pointer border-b-4 border-transparent",
            active === "user" && "border-check"
          )}
          onClick={() => changeTab("user")}
        >
          User
        </div>
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
        <div
          className={cn(
            "px-4 cursor-pointer border-b-4 border-transparent",
            active === "book" && "border-check"
          )}
          onClick={() => changeTab("book")}
        >
          Book
        </div>
      </div>
      {active === "user" && <UsergeneList />}

      {active === "author" && <AuthorList />}

      {active === "tag" && <TagList />}

      {active === "genre" && <GenreList />}

      {active === "book" && <BookList />}
    </div>
  );
};

export default AdminDataManager;
