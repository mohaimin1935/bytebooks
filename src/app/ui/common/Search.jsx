"use client";

import { cn } from "@/utils/cn";
import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = (
  value = "",
  setValue = () => {},
  className,
  placeholder = "eg, Harry Potter"
) => {
  return (
    <div className={cn("flex items-center gap-x-3", className)}>
      <div className="text-xl">
        <FiSearch />
      </div>
      <input
        value={""}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="px-1 py-1 bg1 outline-none content2 border-b text-sm w-64 hidden sm:block"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
