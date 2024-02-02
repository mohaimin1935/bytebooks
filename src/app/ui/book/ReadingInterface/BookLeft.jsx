"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import React, { useState } from "react";
import { FiBookOpen, FiHome } from "react-icons/fi";
import Outline from "./Outline";
import Layout from "./Layout";

const BookLeft = () => {
  const [active, setActive] = useState("outline");

  const changeTab = (tab) => {
    setActive(tab);
  };

  return (
    <div className="px-8 mt-20 capitalize">
      <Link href="/creator/home" className="flex items-center gap-x-3 mb-6">
        <FiHome className="text-xl" /> <h3 className="">Home</h3>
      </Link>
      <Link
        href={`/creator/book-info/${123}`}
        className="flex items-center gap-x-3 mb-6 content-highlight font-semibold"
      >
        <FiBookOpen className="" /> <h3 className="">Book Title</h3>
      </Link>

      <div className="border-b-2 border-bkg-2 flex items-center justify-start gap-x-6 mb-8 border-b-2">
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
