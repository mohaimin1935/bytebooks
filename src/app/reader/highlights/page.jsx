import HighlightCard from "@/app/ui/book/cards/HighlightCard";
import Search from "@/app/ui/common/Search";
import React from "react";

const Highlights = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="section-header">Memories Bring Back You</h2>

        <Search placeholder={"Search from memories..."} />
      </div>

      <div className="flex flex-wrap items-center gap-10">
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </div>
    </div>
  );
};

export default Highlights;
