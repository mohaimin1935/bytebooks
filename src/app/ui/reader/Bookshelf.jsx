import { cn } from "@/utils/cn";
import React from "react";
import styles from "./Bookshelf.module.css";
import { textColorOnBg } from "@/utils/util";

const Bookshelf = () => {
  return (
    <div>
      <button className="absolute bg2 z-10 block right-24 px-4 py-1.5 text-sm rounded top-28">
        Organize
      </button>
      <div
        className={cn(
          "w-full flex items-end relative h-0 border-b border-bkg-2 before:shadow-xl mt-[200px]",
          styles.bookshelf
        )}
      >
        <div className="w-full -mb-4 flex  items-end">
          <Books />

          <img src="/plant.png" alt="" className="w-32 ml-auto" />

          <img
            src="/profile.png"
            alt=""
            className="w-40 h-40  mx-4 rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

const Books = () => {
  const books = [1, 1, 1, 1];

  return (
    <div className="flex justify-start items-end gap-x-0 px-4 h-[200px]">
      {books.map((_, index) => {
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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
  );
};

export default Bookshelf;
