"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import Input from "@/app/ui/auth/Input";
import ProviderLogin from "@/app/ui/auth/ProviderLogin";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/util";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    const role = user?.role ?? "reader";
    router.push(`/${role}/`);
  }

  const signup = () => {
    if (!email || !password || !name) {
      toast.error("Name, email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email is not valid.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should contain at least 6 chatacters.");
      return;
    }

    axios
      .post("/api/register", { name, email, password })
      .then(() => {
        toast.success("Registered successfully.");
        signIn("credentials", { email, password, redirect: false }).then(
          (res) => {
            if (res?.error) toast.error(res.error);
            if (res?.ok && !res?.error)
              toast.success("Logged in successfully!");
          }
        );
      })
      .catch((e) => toast.error(e?.response?.data || "Something went wrong."));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg2"></div>
      <div className="w-1/2 center">
        <h3 className="text-center text-4xl font-semibold mb-12">Sign up</h3>

        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          setValue={setName}
          className={"mb-6"}
        />

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
          rule={"at least 6 characters"}
        />

        <button
          className="primary-btn w-[300px] rounded py-2.5 mb-6 text-base"
          onClick={signup}
        >
          Sign up
        </button>

        <ProviderLogin className={"mb-6"} />

        <Link
          href="/login"
          className="content3 text-left w-[300px] text-sm mb-1"
        >
          Already have an account? <span className="font-semibold">Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
