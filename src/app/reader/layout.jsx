import React from "react";
import ReaderLeft from "../ui/reader/ReaderLeft";

const ReaderLayout = ({ children }) => {
  return (
    <div class="flex h-screen bg1">
      {/* left panel */}
      <div class="w-1/4 bg2">
        <ReaderLeft active={"for-you"} />
      </div>

      {/* right */}
      <div class="flex-1 flex flex-col overflow-hidden">
        {/* top navbar */}
        <div class="bg-transparent">
          <p>Fixed Navbar Content</p>
        </div>

        {/* main content */}
        <div class="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReaderLayout;
