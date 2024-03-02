"use client";

import React from "react";
import LeftPanel from "../common/LeftPanel";
import { FiBookOpen, FiDatabase, FiHome, FiSettings } from "react-icons/fi";
import { IoAnalyticsOutline } from "react-icons/io5";

const AdminLeft = ({ active }) => {
  return <LeftPanel options={options} active={active} />;
};

const options = [
  {
    name: "Home",
    link: "/admin/home",
    icon: () => <FiHome />,
  },
  // {
  //   name: "Analytics",
  //   link: "/admin/analytics",
  //   icon: () => <IoAnalyticsOutline />,
  // },
  {
    name: "Data Manager",
    link: "/admin/data-manager",
    icon: () => <FiDatabase />,
  },
  {
    name: "Settings",
    link: "/admin/settings",
    icon: () => <FiSettings />,
  },
];

export default AdminLeft;
