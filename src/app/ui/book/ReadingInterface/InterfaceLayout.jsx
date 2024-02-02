import React from "react";
import TopBar from "../../common/TopBar";
import BookLeft from "./BookLeft";
import AudioBar from "../../reader/AudioBar";

const InterfaceLayout = ({ children }) => {
  return (
    <div class="flex h-screen bg1">
      {/* left panel */}
      <div class="w-[300px] bg2">
        <BookLeft />
      </div>

      {/* right */}
      <div class="flex-1 flex flex-col overflow-hidden px-16">
        {/* top navbar */}
        <div class="bg-transparent">
          <TopBar role={"reader"} />
        </div>

        {/* main content */}
        <div class="flex-1 pr-16 -mr-16 overflow-y-auto py-12">{children}</div>

        <div className="-mx-4 sm:-mx-12 xl:-mx-16 ">
          <AudioBar />
        </div>
      </div>
    </div>
  );
};

export default InterfaceLayout;
