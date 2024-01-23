import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="animate-spin text-lg center w-full">
      <CgSpinner size={24} />
    </div>
  );
};

export default Loader;
