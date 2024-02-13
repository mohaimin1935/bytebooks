"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Input from "@/app/ui/auth/Input";
import ProviderLogin from "@/app/ui/auth/ProviderLogin";
import { CgSpinner } from "react-icons/cg";
import { useParams } from "next/navigation";
import axios from "axios";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/util";
import useSWR from "swr";
import { baseApi, fetcher } from "@/utils/util";


const ResetPassword = () => {
  const { tokenValue } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  const { data, status } = useSession();
  const router = useRouter();

  const { data : tokenReturn, isLoading } = useSWR(
    `/api/reset-password/${tokenValue}`,
    fetcher
  );

  
  useEffect(() => {
    if (tokenReturn) {
      if (tokenReturn?.message==="Invalid request token") {
        setIsValid(false);
        toast.error("Invalid request token");
      }
      else if (tokenReturn?.message==="success") {
        setIsValid(true);
      }
    }
  }, [tokenReturn, isLoading]);

  // should reset password link redirect to home if logged in?

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     const role = data?.user?.role ?? reader;
  //     router.push(`/${role}/home`);
  //   }
  // }, [status]);

  const reset = async () => {
    if (status === "loading") return;

    if (!newPassword || !confirmNewPassword) {
      toast.error("Both fields are required.");
      return;
    }

    if (newPassword!==confirmNewPassword) {
      toast.error("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `/api/reset-password/${tokenValue}`,
        {newPassword}
      );
      setLoading(false);
      if (res?.data?.message==="Invalid request token") {
        toast.error("Invalid request token.");
        setIsValid(false);
      }
      else if (res?.data?.message==="success") {
        toast.success("Success");
        router.push(`/login`);
      }

    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong.");
      console.log(error);
    }
    

  };

  return (
    !isValid?
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg2 center">
        <img
          src="/login.svg"  // change image for broken link
          alt=""
          className="w-1/3"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
      <div className="center w-1/2">
        
      </div>
    </div>
    :
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg2 center">
        <img
          src="/login.svg"  // change image for forgot password
          alt=""
          className="w-1/3"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
      <div className="center w-1/2">
        <h3 className="text-center text-4xl font-semibold mb-12">Reset password</h3>

        <Input
          type={"password"}
          placeholder={"New password"}
          value={newPassword}
          setValue={setNewPassword}
          className={"mb-6"}
        />

        <Input
          type={"password"}
          placeholder={"Confirm new password"}
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
          className={"mb-6"}
        />

        <button
          className={cn(
            "primary-btn w-[300px] center rounded py-2.5 mb-6 text-base",
            status === "loading" && "cursor-not-allowed"
          )}
          onClick={reset}
        >
          {status !== "loading" && !loading ? (
            <>Reset</>
          ) : (
            <div className="animate-spin text-lg">
              <CgSpinner />
            </div>
          )}
        </button>

        {/* <ProviderLogin className={"mb-6"} /> */}

        <Link
          href="/login"
          className="content3 text-left w-[300px] text-sm mb-1"
        >
          Already have an account? <span className="font-semibold">Log in</span>
        </Link>
        <Link
          href="/signup"
          className="content3 text-left w-[300px] text-sm mb-1"
        >
          Don&apos;t have an account?{" "}
          <span className="font-semibold">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
