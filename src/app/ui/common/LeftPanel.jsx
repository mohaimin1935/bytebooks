"use client";

import { cn } from "@/utils/cn";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const LeftPanel = ({ options, active }) => {
  return (
    <div className=" mt-6">
      {/* logo */}
      <div className="mb-12 font-semibold text-xl pl-10 flex items-center gap-x-4">
        <div className="w-6 h-8 rounded-full accent1"></div>
        <h3 className="">ByteBooks</h3>
      </div>
      {/* menus */}
      {options.map((option) => (
        <Item option={option} key={option.link} active={active} />
      ))}
      {/* logout button */}
      <button
        className="flex items-center hover:content-highlight transition duration-300"
        onClick={() => signOut()}
      >
        <div className={cn("w-1.5 py-6 bg2")}></div>
        <div className={cn("flex gap-x-4 ml-8 items-center")}>
          <div className="text-lg">
            <FiLogOut />
          </div>
          <div>Log Out</div>
        </div>
      </button>
    </div>
  );
};

const Item = ({ option }) => {
  const { data } = useSession();
  const pathname = usePathname().split("/").at(-1);

  if (data?.user?.role) {
    return (
      <Link
        href={`/${data.user.role}/${option.link}`}
        className="flex items-center hover:content-highlight transition duration-300"
      >
        <div
          className={cn(
            "w-1.5 py-6",
            pathname === option.link ? "accent2" : "bg2"
          )}
        ></div>
        <div
          className={cn(
            "flex gap-x-4 ml-8 items-center",
            pathname === option.link && "content-highlight"
          )}
        >
          <div className="text-lg">{option.icon()}</div>
          <div>{option.name}</div>
        </div>
      </Link>
    );
  } else {
    return (
      <div className="flex items-center py-2 ml-8 gap-x-4 animate-pulse">
        <div className="w-8 h-8 rounded-full bg1"></div>
        <div className="w-32 h-6 rounded bg1"></div>
      </div>
    );
  }
};

export default LeftPanel;
