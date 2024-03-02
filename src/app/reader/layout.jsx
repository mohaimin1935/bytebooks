"use client";

import React, { useEffect } from "react";
import ReaderLeft from "../ui/reader/ReaderLeft";
import TopBar from "../ui/common/TopBar";
import { useSession } from "next-auth/react";
import AudioBar from "../ui/reader/AudioBar";
import { useRouter } from "next/navigation";
import axios from "axios";

const ReaderLayout = ({ children }) => {
  const { data, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      updateStreak();
    }
  }, [status]);


  const updateStreak = async () => {
    try {
      const res = await axios.post(`/api/users/${data?.user?.id}/streak`, {});
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "authenticated")
    return (
      <div className="flex h-screen bg1 font-rubik">
        {/* left panel */}
        <div className="w-[60px] md:w-[240px] lg:w-[300px] bg2">
          <ReaderLeft active={"for-you"} />
        </div>

        {/* right */}
        <div className="flex-1 flex flex-col overflow-hidden px-4 sm:px-12 xl:px-16">
          {/* top navbar */}
          <div className="bg-transparent">
            <TopBar role={"reader"} />
          </div>

          {/* main content */}
          <div className="flex-1 overflow-y-auto -mr-4 sm:-mr-12 xl:-mr-16 pr-4 sm:pr-12 xl:pr-16 py-12">
            {children}
          </div>

          <div className="-mx-4 sm:-mx-12 xl:-mx-16 ">
            <AudioBar />
          </div>
        </div>
      </div>
    );
  else return <></>;
};

export default ReaderLayout;
