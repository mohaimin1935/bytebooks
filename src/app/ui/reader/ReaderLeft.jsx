"use client";

import React from "react";
import { FiHome, FiSearch, FiBookmark, FiSettings } from "react-icons/fi";
import { LuHighlighter } from "react-icons/lu";
import LeftPanel from "../common/LeftPanel";

const ReaderLeft = ({ active }) => {
  return <LeftPanel options={options} active={active} />;
};

const options = [
  {
    name: "For you",
    link: "home",
    icon: () => <FiHome />,
  },
  {
    name: "Explore",
    link: "explore",
    icon: () => <FiSearch />,
  },
  {
    name: "Library",
    link: "library",
    icon: () => <FiBookmark />,
  },
  {
    name: "HighLights",
    link: "highlights",
    icon: () => <LuHighlighter />,
  },
  {
    name: "Settings",
    link: "settings",
    icon: () => <FiSettings />,
  },
];

export default ReaderLeft;
