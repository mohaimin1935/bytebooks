"use client";

import BookFlip from "@/app/ui/book/cards/BookFlip";
import Carousel from "@/app/ui/common/Carousel";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Calender from "@/app/ui/reader/Calendar";

const ReaderHome = () => {
  const { data } = useSession();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="order-1 lg:order-2 w-full lg:w-2/5">
        {/* right | top */}

        {/* continue carousel */}
        <h3 className="section-header">Continue</h3>
        <Carousel
          className={"w-[240px] my-4"}
          items={[
            () => <BookFlip audio={true} details={false} />,
            () => <BookFlip audio={true} details={false} />,
            () => <BookFlip audio={true} details={false} />,
            () => <BookFlip audio={true} details={false} />,
          ]}
        />

        {/* calender */}
        <div className="mt-12">
          <Calender />
        </div>

        {/* author of the day */}

        {/* notifications */}
      </div>
      <div className="order-2 lg:order-1 w-full lg:w-3/5">
        {/* left | bottom */}

        {/* welcome text */}
        <div className="">
          <div className="flex flex-col gap-y-2 capitalize font-semibold">
            <h2 className="text-3xl">Happy Reading,</h2>
            <h2 className="text-4xl">{data?.user?.name || "User"}</h2>
          </div>
          <p className="my-8 w-2/3">
            Welcome to our book sanctuary! Explore captivating stories and
            diverse genres. Immerse yourself in a world of literary delights.
          </p>
          <button className="primary-btn py-2 px-8">Explore</button>
          <h2 className="section-header mt-12">Top Genres</h2>
          <div className="flex flex-wrap gap-2 my-2 items-center">
            <span className="bg2 px-4 py-1.5 rounded">Category</span>
            <span className="bg2 px-4 py-1.5 rounded">Category</span>
            <span className="bg2 px-4 py-1.5 rounded">Category</span>
            <span className="bg2 px-4 py-1.5 rounded">Category</span>
          </div>
        </div>

        {/* recommended for you */}
        <div className="flex items-center justify-between pr-4 mt-16 mb-4">q
          <h2 className="section-header">Recommended</h2>
          <button className="bg2 py-1.5 px-4 rounded">View All</button>
        </div>
        <div className="flex flex-wrap justify-between gap-x-4">
          <BookFlip width={160} details={true} audio={false} />
          <BookFlip width={160} details={true} audio={false} />
          <BookFlip width={160} details={true} audio={false} />
          <BookFlip width={160} details={true} audio={false} />
        </div>

        {/* collections */}
      </div>
    </div>
  );
};

export default ReaderHome;
