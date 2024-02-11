"use client";

import React from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const PrevNext = ({ handleNext = () => {}, handlePrev = () => {} }) => {
  return (
    <div className="flex items-center gap-x-3">
      {/* <button
        className="p-2 rounded-full border border-check group "
        onClick={handleNext}
      >
        <GoArrowLeft
          className="group-hover:pr-1 transition-all duration-300"
          size={20}
        />
      </button>
      <button
        className="p-2 rounded-full border border-check group "
        onClick={handlePrev}
      >
        <GoArrowRight
          className="group-hover:pl-1 transition-all duration-300"
          size={20}
        />
      </button> */}
    </div>
  );
};

export default PrevNext;
