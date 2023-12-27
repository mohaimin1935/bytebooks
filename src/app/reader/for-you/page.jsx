"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const ForYou = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "authenticated")
    return (
      <div>
        <button className="p-4 border" onClick={signOut}>
          Logout
        </button>
        {data?.user && <>hi {data?.user?.name}</>}
      </div>
    );
};

export default ForYou;
