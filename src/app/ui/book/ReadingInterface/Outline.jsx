import { BookReadContext } from "@/contexts/BookReadContext";
import { cn } from "@/utils/cn";
import React, { useContext } from "react";
import Loader from "../../common/Loader";

const Outline = () => {
  const { chapters, activeId, setActiveId, isLoading } =
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
    </div>
  );
};

export default Outline;
