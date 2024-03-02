"use client";

import { fetcher } from "@/utils/util";
import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import useSWR from "swr";

const AdminHome = () => {


  return (
    <div className="flex gap-12 relative">
      {/* IN PROGRESS */}
      <div className="w-1/2 border border-bkg-2 h-fit rounded-b-lg">
        <div className="h-2 w-full bg-amber-500"></div>
        
      </div>

      {/* PUBLISHED */}
      <div className="w-1/2 border border-bkg-2 h-fit rounded-b-lg">
        <div className="h-2 w-full bg-emerald-500"></div>

        
      </div>
    </div>
  );
};

export default AdminHome;
