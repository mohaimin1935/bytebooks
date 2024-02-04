"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";

const RangeSlider = ({
  className = "[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4",
  max = 100,
  min = 0,
  value,
  setValue,
}) => {
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(parseInt(((value - min) / (max - min)) * 100));
    console.log(value, min, max);
  }, [value]);

  return (
    <div className={cn("w-64 h-2 relative", className)}>
      <input
        className={cn(
          `appearance-none w-full h-full rounded-full outline-none block relative `,
          className
        )}
        type="range"
        min={min}
        max={max}
        step={(max - min) / 100}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 rounded-full accent1 transition-none"
        )}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default RangeSlider;
