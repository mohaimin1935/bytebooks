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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const role = data?.user?.role ?? reader;
      router.push(`/${role}/home`);
    }
  }, [status]);

  const login = async () => {
    if (status === "loading") return;

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email is not valid.");
      return;
    }

    setLoading(true);
    signIn("credentials", { email, password, redirect: false }).then((res) => {
      setLoading(false);
      if (res?.error) {
        toast.error("Login failed.");
        console.log(res?.error);
      }
      if (res?.ok && !res?.error) toast.success("Logged in successfully!");
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg2"></div>
      <div className="center w-1/2">
        <h3 className="text-center text-4xl font-semibold mb-12">Log in</h3>

        <Input
          type="text"
          placeholder="Email"
          value={email}
          setValue={setEmail}
          className={"mb-6"}
        />

        <Input
          type={"password"}
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
          className={"mb-6"}
        />

        <button
          className={cn(
            "primary-btn w-[300px] center rounded py-2.5 mb-6 text-base",
            status === "loading" && "cursor-not-allowed"
          )}
          onClick={login}
        >
          {status !== "loading" && !loading ? (
            <>Log in</>
          ) : (
            <div className="animate-spin text-lg">
              <CgSpinner />
            </div>
          )}
        </button>

        <ProviderLogin className={"mb-6"} />

        <Link
          href="/reset-password"
          className="content3 text-left w-[300px] text-sm mb-1"
        >
          Forgot password?
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

export default Login;
