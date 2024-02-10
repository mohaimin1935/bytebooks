import React, { useContext } from "react";
import TopBar from "../../common/TopBar";
import BookLeft from "./BookLeft";
import AudioBar from "../../reader/AudioBar";
import { BookReadContext } from "@/contexts/BookReadContext";
import { ThemeContext } from "@/contexts/ThemeContext";

const InterfaceLayout = ({ children }) => {
  const { audioUrl } = useContext(ThemeContext);

  return (
    <div className="flex h-screen bg1">
      {/* left panel */}
      <div className="w-[300px] bg2">
        <BookLeft />
      </div>

      {/* right */}
      <div className="flex-1 flex flex-col overflow-hidden px-16">
        {/* top navbar */}
        <div className="bg-transparent">
          <TopBar role={"reader"} />
        </div>

        {/* main content */}
        <div className="flex-1 pr-16 -mr-16 overflow-y-auto py-12">
          {children}
        </div>

        <div className="-mx-4 sm:-mx-12 xl:-mx-16 ">
          {audioUrl ? (
            <AudioBar audioUrl={audioUrl} />
          ) : (
            <p className="text-center py-4 bg2 m-2 rounded">
              No audio available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterfaceLayout;
