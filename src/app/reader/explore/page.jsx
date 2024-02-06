import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import React from "react";

const Explore = () => {
  return (
    <div>
      <section>
        <div className="flex items-center justify-between gap-x-8 w-full mb-8">
          <h2 className="section-header">Trending</h2>
          <PrevNext />
        </div>
        <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
          <BookFlip width={140} details={true} audio={false} />
          <BookFlip width={140} details={true} audio={false} />
          <BookFlip width={140} details={true} audio={false} />
        </div>
      </section>

      <section>
        <h2 className="section-header mb-8 mt-16">Categories</h2>
        <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
          <div className="bg2 px-6 py-2 rounded-md shadow hover:shadow-xl cursor-pointer">
            Genre
          </div>
          <div className="bg2 px-6 py-2 rounded-md shadow hover:shadow-xl cursor-pointer">
            Genre
          </div>
          <div className="bg2 px-6 py-2 rounded-md shadow hover:shadow-xl cursor-pointer">
            Genre
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-x-8 w-full mb-8 mt-16">
          <h2 className="section-header">Latest</h2>
          <PrevNext />
        </div>
        <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
          <BookFlip width={140} details={true} audio={false} />
          <BookFlip width={140} details={true} audio={false} />
          <BookFlip width={140} details={true} audio={false} />
        </div>
      </section>
    </div>
  );
};

export default Explore;
