import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import React from "react";

const Library = () => {
  return (
    <div>
      <section>
        <div className="flex items-center justify-between gap-x-8 w-full mb-8">
          <h2 className="section-header">Continue</h2>
          <PrevNext />
        </div>
        <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
          <BookFlip width={140} details={true} audio={true} />
          <BookFlip width={140} details={true} audio={true} />
          <BookFlip width={140} details={true} audio={true} />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between gap-x-8 w-full mb-8">
          <h2 className="section-header">Saved Books</h2>
          <PrevNext />
        </div>
        <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
          <BookFlip width={140} details={true} audio={true} />
          <BookFlip width={140} details={true} audio={true} />
          <BookFlip width={140} details={true} audio={true} />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between gap-x-8 w-full mb-8">
          <h2 className="section-header">Finished Books</h2>
          <PrevNext />
        </div>
        <div className="flex flex-wrap justify-start gap-x-0 sm:gap-x-2 md:gap-x-4 xl:gap-x-8">
          <BookFlip width={140} details={true} audio={true} />
          <BookFlip width={140} details={true} audio={true} />
          <BookFlip width={140} details={true} audio={true} />
        </div>
      </section>
    </div>
  );
};

export default Library;
