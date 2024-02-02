"use client";

import { cn } from "@/utils/cn";
import React, { useState } from "react";

const RangeSlider = ({ className }) => {
  const [value, setValue] = useState(40);

  return (
    <input
      className={cn(
        `appearance-none w-64 h-2 bg2 rounded-full outline-none [&::-webkit-slider-thumb]:bg-red-300`,
        className
      )}
      type="range"
      min={0}
      max={200}
      step={1}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export default RangeSlider;
