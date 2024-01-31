import { cn } from "@/utils/cn";
import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loader = ({ size = 24, className = "" }) => {
  return (
    <div className={cn("animate-spin text-lg center w-full", className)}>
      <CgSpinner size={size} />
    </div>
  );
};

export default Loader;
