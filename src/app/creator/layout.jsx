import React from "react";
import CreatorLeft from "../ui/creator/CreatorLeft";
import TopBar from "../ui/common/TopBar";

const CreatorLayout = ({ children }) => {
  return (
    <div class="flex h-screen bg1">
      {/* left panel */}
      <div class="w-[300px] bg2">
        <CreatorLeft active={"for-you"} />
      </div>

      {/* right */}
      <div class="flex-1 flex flex-col overflow-hidden px-16">
        {/* top navbar */}
        <div class="bg-transparent">
          <TopBar role={"creator"} />
        </div>

        {/* main content */}
        <div class="flex-1 overflow-y-auto py-12">{children}</div>
      </div>
    </div>
  );
};

export default CreatorLayout;
