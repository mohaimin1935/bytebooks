"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FiBookOpen, FiHome } from "react-icons/fi";
import Outline from "./Outline";
import Layout from "./Layout";
import { BookReadContext } from "@/contexts/BookReadContext";
import { truncateText } from "@/utils/util";

const BookLeft = () => {
  const [active, setActive] = useState("outline");

  const { book } = useContext(BookReadContext);

  const changeTab = (tab) => {
    setActive(tab);
  };

  return (
    <div className="px-8 mt-20 capitalize">
      <Link href="/reader/home" className="flex items-center gap-x-3 mb-6">
        <FiHome className="text-xl" /> <h3 className="">Home</h3>
      </Link>
      <Link
        href={`/reader/view/book/${book?.id}`}
        className="flex items-center gap-x-3 mb-6 content-highlight font-semibold"
      >
        <FiBookOpen className="" />{" "}
        <h3 className="">{truncateText(book?.title, 18)}</h3>
      </Link>

      <div className="border-check border-b flex items-center justify-between mb-8">
        <div
          className={cn(
            "px-4 cursor-pointer border-b-4 border-transparent",
            active === "outline" && "border-check"
          )}
          onClick={() => changeTab("outline")}
        >
          Outline
        </div>
        <div
          className={cn(
            "px-4 cursor-pointer border-b-4 border-transparent",
            active === "layout" && "border-check"
          )}
          onClick={() => changeTab("layout")}
        >
          Layout
        </div>
      </div>

      {active === "layout" && <Layout />}
      {active === "outline" && <Outline />}
    </div>
  );
};

export default BookLeft;
