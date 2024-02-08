import BookFlip from "@/app/ui/book/cards/BookFlip";
import PrevNext from "@/app/ui/common/PrevNext";
import { textColorOnBg } from "@/utils/util";
import React from "react";

const Library = () => {
  const finishedBooks = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

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
        <div className="flex flex-wrap justify-start items-end gap-x-0 border-b-4 border-check px-4 h-[200px]">
          {finishedBooks.map((_, index) => {
            const color = `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`;
            return (
              <div
                key={index}
                className="bottom-0 rounded-t border-t border-bkg-2 hover:mb-2"
                style={{
                  backgroundColor: color,

                  height: `${70 + Math.random() * 25}%`,
                  width: `${32 + Math.random() * 20}px`,
                }}
              >
                <div
                  className="rotate-90 text-left px-2 py-8"
                  style={{
                    color: textColorOnBg(color),
                  }}
                >
                  {"Title"}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Library;
