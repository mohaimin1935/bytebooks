"use client";

import React from "react";
import ReaderLeft from "../ui/reader/ReaderLeft";
import TopBar from "../ui/common/TopBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AudioBar from "../ui/reader/AudioBar";

const ReaderLayout = ({ children }) => {
  const { data, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
  } else if (data?.user?.role === "reader") {
    router.push("/reader/home");
  }

  if (status === "authenticated")
    return (
      <div class="flex h-screen bg1 font-rubik">
        {/* left panel */}
        <div class="w-[60px] md:w-[240px] lg:w-[300px] bg2">
          <ReaderLeft active={"for-you"} />
        </div>

        {/* right */}
        <div class="flex-1 flex flex-col overflow-hidden px-4 sm:px-12 xl:px-16">
          {/* top navbar */}
          <div class="bg-transparent">
            <TopBar role={"reader"} />
          </div>

          {/* main content */}
          <div class="flex-1 overflow-y-auto -mr-4 sm:-mr-12 xl:-mr-16 pr-4 sm:pr-12 xl:pr-16 py-12">
            {children}
          </div>

          <div className="-mx-4 sm:-mx-12 xl:-mx-16 ">
            <AudioBar  />
          </div>
        </div>
      </div>
    );
};

export default ReaderLayout;
