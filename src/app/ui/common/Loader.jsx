import { cn } from "@/utils/cn";
import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loader = ({ className }) => {
  return (
    <div className={cn("center animate-spin", className)}>
      <CgSpinner />
    </div>
  );
};

export default Loader;
