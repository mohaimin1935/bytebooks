import { BookReadContext } from "@/contexts/BookReadContext";
import { cn } from "@/utils/cn";
import React, { useContext } from "react";
import Loader from "../../common/Loader";
import Rating from "../../reader/Rating";
import Status from "../../reader/Status";

const Outline = () => {
  const { chapters, activeId, setActiveId, isLoading, bookId } =
    useContext(BookReadContext);

  return (
    <div className="flex flex-col gap-y-4 pl-4">
      {!isLoading ? (
        chapters.map((c) => (
          <div
            onClick={() => setActiveId(c.id)}
            className={cn(
              "cursor-pointer transition duration-300",
              activeId === c.id && "content-highlight"
            )}
            key={c.id}
          >
            {c.title}
          </div>
        ))
      ) : (
        <Loader className="h-32" />
      )}
      <p className="mt-6 mb-2">Your activity</p>
      <Rating bookId={bookId} />
      <Status bookId={bookId} />
    </div>
  );
};

export default Outline;
