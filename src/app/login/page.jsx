"use client";

import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const { status } = useSession();
  console.log(status);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg2"></div>
      <div className="center w-1/2">
        <h3 className="text-center text-4xl font-semibold mb-12">Log in</h3>

        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[300px] auth-input"
          />
        </div>

        <div className="relative w-[300] flex items-center mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[300px] auth-input"
          />
          <button
            className="absolute center h-full right-2 content3 text-lg px-1 cursor-pointer"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <button className="primary-btn w-[300px] rounded py-2.5 mb-6 text-base">
          Log in
        </button>

        <div className="flex items-center justify-center w-[300px] gap-x-4 mb-6">
          <div className="flex-1 bg2 h-[2px]"></div>
          <p className="content2">or</p>
          <div className="flex-1 bg2 h-[2px]"></div>
        </div>

        <button
          className="secondary-btn w-[300px] rounded py-2.5 mb-6 flex items-center text-base"
          onClick={() => signIn("google")}
        >
          <p className="text-lg mr-4">
            <FaGoogle />
          </p>
          <p className="">Log in with Google</p>
        </button>

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
          Don&apos;t have an account? Sign up.
        </Link>
      </div>
    </div>
  );
};

export default Login;
