"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Reader = () => {
  const router = useRouter();
  router.push("reader/for-you");

  return <div className="h-screen w-full bg1"></div>;
};

export default Reader;
