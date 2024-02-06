"use client";

import React from "react";
import { FiHome, FiSearch, FiBookmark, FiSettings } from "react-icons/fi";
import { LuHighlighter } from "react-icons/lu";
import LeftPanel from "../common/LeftPanel";
import { useSession } from "next-auth/react";

const ReaderLeft = ({ active }) => {
  const { data } = useSession();

  const options = [
    {
      name: "For you",
      link: "/reader/home",
      icon: () => <FiHome />,
    },
    {
      name: "Explore",
      link: "/reader/explore",
      icon: () => <FiSearch />,
    },
    {
      name: "Library",
      link: "/reader/library",
      icon: () => <FiBookmark />,
    },
    {
      name: "HighLights",
      link: "/reader/highlights",
      icon: () => <LuHighlighter />,
    },
    {
      name: "Settings",
      link: `/${data?.user?.role}/settings`,
      icon: () => <FiSettings />,
    },
  ];

  return <LeftPanel options={options} active={active} />;
};

export default ReaderLeft;
