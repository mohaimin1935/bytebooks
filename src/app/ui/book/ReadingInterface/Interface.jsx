import React, { useContext } from "react";
import InterfaceLayout from "./InterfaceLayout";
import { BookReadContext } from "@/contexts/BookReadContext";
import { cn } from "@/utils/cn";
import { truncateText } from "@/utils/util";

const ReadingInterface = () => {
  const { activeChapter, fontFamily, fontSize, fontWeight } =
    useContext(BookReadContext);

  const chapter = activeChapter?.at(0);

  return (
    <InterfaceLayout>
      <h3 className="text-2xl font-semibold mb-4 ">
        {truncateText(chapter?.title, 24)}
      </h3>
      <div
        style={{
          fontFamily,
          fontSize,
          fontWeight,
        }}
        className={cn("prose-lg w-full text-justify ")}
        dangerouslySetInnerHTML={{ __html: chapter?.content }}
      />
    </InterfaceLayout>
  );
};

export default ReadingInterface;
