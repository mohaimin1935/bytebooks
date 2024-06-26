"use client";

import { cn } from "@/utils/cn";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({ type, placeholder, value, setValue, rule, className }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("relative w-[300px] flex items-center", className)}>
      <input
        type={!showPassword && type === "password" ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-[300px] auth-input"
      />
      {type === "password" && (
        <button
          className="absolute center h-full right-2 content3 text-lg px-1 cursor-pointer"
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      )}
      {rule && (
        <p className="absolute text-xs right-2 content3 -bottom-[16px] l-0 px-1">
          {rule}
        </p>
      )}
    </div>
  );
};

export default Input;
