"use client";

import React from "react";
import CreatorLeft from "../ui/creator/CreatorLeft";
import TopBar from "../ui/common/TopBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreatorLayout = ({ children }) => {
  const { data, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
  } else if (data?.user?.role === "reader") {
    router.push("/reader/home");
  }

  if (status === "authenticated")
    return (
      <div class="flex h-screen bg1">
        {/* left panel */}
        <div class="w-[300px] bg2">
          <CreatorLeft active={"for-you"} />
        </div>

        {/* right */}
        <div class="flex-1 flex flex-col overflow-hidden px-16">
          {/* top navbar */}
          <div class="bg-transparent">
            <TopBar role={"creator"} />
          </div>

          {/* main content */}
          <div class="flex-1 pr-4 -mr-16 overflow-y-auto py-12">{children}</div>
        </div>
      </div>
    );
};

export default CreatorLayout;
