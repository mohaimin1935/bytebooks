"use client";

import BookCard from "@/app/ui/book/BookCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ReaderHome = () => {
  const { data } = useSession();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="order-1 lg:order-2 w-full lg:w-2/5">
        {/* right | top */}
        <BookCard details={true} />
      </div>
      <div className="order-2 lg:order-1 w-full lg:w-3/5">
        {/* left | bottom */}
      </div>
    </div>
  );
};

export default ReaderHome;
