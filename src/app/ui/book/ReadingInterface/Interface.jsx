import React, { useContext } from "react";
import InterfaceLayout from "./InterfaceLayout";
import { BookReadContext } from "@/contexts/BookReadContext";
import { cn } from "@/utils/cn";

const ReadingInterface = () => {
  const { activeChapter, fontFamily, fontSize, fontWeight } =
    useContext(BookReadContext);

  const chapter = activeChapter?.at(0);

  return (
    <InterfaceLayout>
      <h3 className="text-2xl font-semibold mb-4">{chapter?.title}</h3>
      <div
        style={{
          fontFamily,
          fontSize,
          fontWeight,
        }}
        className={cn("prose")}
        dangerouslySetInnerHTML={{ __html: chapter?.content }}
      />
    </InterfaceLayout>
  );
};

export default ReadingInterface;
