import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import PieChartCustom from "@/app/ui/common/charts/PieChartCustom";
import Bookshelf from "@/app/ui/reader/Bookshelf";
import React from "react";

const CreatorProfile = () => {
  // TODO: update
  return (
    <div>
      <Bookshelf />
      <GenreStat />
    </div>
  );
};

export default CreatorProfile;

const GenreStat = () => {
  return (
    <section className="mt-24 flex w-full">
      <div className="w-1/3 flex items-center flex-col text-center ">
        <h2 className="section-header">Top Genres</h2>
        <PieChartCustom />
      </div>
      <div className="w-2/3">
        <section>
          <div className="flex items-start justify-between gap-x-8 w-full">
            <h2 className="section-header mb-8">Recent Reads</h2>
            <PrevNext />
          </div>
          <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
            <BookFlip width={140} details={true} audio={true} />
            <BookFlip width={140} details={true} audio={true} />
            <BookFlip width={140} details={true} audio={true} />
          </div>
        </section>
      </div>
    </section>
  );
};
