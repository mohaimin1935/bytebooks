"use client";

import { cn } from "@/utils/cn";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";

const ProviderLogin = ({ className }) => {
  const { status } = useSession();

  const signin = () => {
    if (status === "loading") return;
    signIn("google").then((res) => {
      console.log(res);
      if (res?.error) toast.error(res.error);
      if (res?.ok && !res?.error) toast.success("Logged in successfully!");
    });
  };

  return (
    <>
      <div className="flex items-center justify-center w-[300px] gap-x-4 mb-6">
        <div className="flex-1 bg2 h-[2px]"></div>
        <p className="content2">or</p>
        <div className="flex-1 bg2 h-[2px]"></div>
      </div>
      <button
        className={cn(
          "secondary-btn w-[300px] rounded py-2.5 flex items-center text-base",
          className,
          status === "loading" && "cursor-none"
        )}
        onClick={signin}
      >
        {status !== "loading" ? (
          <>
            <p className="text-lg mr-4">
              <FaGoogle />
            </p>
            <p className="">Log in with Google</p>
          </>
        ) : (
          <div className="animate-spin text-lg center w-full">
            <CgSpinner />
          </div>
        )}
      </button>
    </>
  );
};

export default ProviderLogin;
