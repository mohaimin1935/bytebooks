"use client";

import React from "react";
import LeftPanel from "../common/LeftPanel";
import { FiBookOpen, FiDatabase, FiHome, FiSettings } from "react-icons/fi";
import { IoAnalyticsOutline } from "react-icons/io5";

const CreatorLeft = ({ active }) => {
  return <LeftPanel options={options} active={active} />;
};

const options = [
  {
    name: "Home",
    link: "home",
    icon: () => <FiHome />,
  },
  {
    name: "Your Books",
    link: "your-books",
    icon: () => <FiBookOpen />,
  },
  {
    name: "Analytics",
    link: "analytics",
    icon: () => <IoAnalyticsOutline />,
  },

  {
    name: "Data Manager",
    link: "data-manager",
    icon: () => <FiDatabase />,
  },
  {
    name: "Settings",
    link: "settings",
    icon: () => <FiSettings />,
  },
];

export default CreatorLeft;
