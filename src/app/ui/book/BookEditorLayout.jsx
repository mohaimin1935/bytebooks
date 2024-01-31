"use client";

import React from "react";
import ChapterEditor from "./ChapterEditor";
import TopBar from "../common/TopBar";

const BookEditorLayout = ({
  children,
}) => {
  return (
    <div class="flex h-screen bg1">
      {/* left panel */}
      <div class="w-[300px] bg2">
        <ChapterEditor/>
      </div>

      {/* right */}
      <div class="flex-1 flex flex-col overflow-hidden px-16">
        {/* top navbar */}
        <div class="bg-transparent">
          <TopBar role={"creator"} />
        </div>

        {/* main content */}
        <div class="flex-1 pr-16 -mr-16 overflow-y-auto py-12">{children}</div>
      </div>
    </div>
  );
};

export default BookEditorLayout;
