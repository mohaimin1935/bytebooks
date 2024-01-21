"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const ForYou = () => {
  const { data, status } = useSession();

  console.log(data?.user?.role);

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "authenticated") return <div></div>;
};

export default ForYou;
