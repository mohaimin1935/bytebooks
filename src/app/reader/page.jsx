"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Reader = () => {
  const router = useRouter();
  router.push("reader/home");

  return <div className="h-screen w-full bg1"></div>;
};

export default Reader;
