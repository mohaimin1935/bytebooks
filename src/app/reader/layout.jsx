import React from "react";
import ReaderLeft from "../ui/reader/ReaderLeft";
import Topbar from "../ui/reader/Topbar";

const ReaderLayout = ({ children }) => {
  return (
    <div class="flex h-screen bg1">
      {/* left panel */}
      <div class="w-[300px] bg2">
        <ReaderLeft active={"for-you"} />
      </div>

      {/* right */}
      <div class="flex-1 flex flex-col overflow-hidden px-16">
        {/* top navbar */}
        <div class="bg-transparent">
          <Topbar />
        </div>

        {/* main content */}
        <div class="flex-1 overflow-y-auto py-12">{children}</div>
      </div>
    </div>
  );
};

export default ReaderLayout;
