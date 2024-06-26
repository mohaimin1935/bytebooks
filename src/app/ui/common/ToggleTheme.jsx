"use client";

import React, { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

const ToggleTheme = () => {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <button className="p-2 cursor-pointer content1 text-xl" onClick={toggle}>
      {theme === "light" ? (
        <>
          <IoMdMoon />
        </>
      ) : (
        <>
          <MdOutlineWbSunny />
        </>
      )}
    </button>
  );
};

export default ToggleTheme;
