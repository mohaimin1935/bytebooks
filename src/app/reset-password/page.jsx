"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Input from "@/app/ui/auth/Input";
import ProviderLogin from "@/app/ui/auth/ProviderLogin";
import { CgSpinner } from "react-icons/cg";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/util";

const SendEmail = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const role = data?.user?.role ?? reader;
      router.push(`/${role}/home`);
    }
  }, [status]);

  const sendEmail = async () => {
    if (status === "loading") return;

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email is not valid.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `/api/reset-password`,
        {email}
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
        <h3 className="text-center text-4xl font-semibold mb-12">Request reset</h3>

        <Input
          type="text"
          placeholder="Email"
          value={email}
          setValue={setEmail}
          className={"mb-6"}
        />

        {/* <Input
          type={"password"}
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
          className={"mb-6"}
        /> */}

        <button
          className={cn(
            "primary-btn w-[300px] center rounded py-2.5 mb-6 text-base",
            status === "loading" && "cursor-not-allowed"
          )}
          onClick={sendEmail}
        >
          {status !== "loading" && !loading ? (
            <>Submit</>
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

export default SendEmail;
