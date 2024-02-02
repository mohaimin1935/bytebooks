import { cn } from "@/utils/cn";
import React from "react";
import { IoMdClose } from "react-icons/io";

const NotificationCard = () => {
  return (
    <div
      className={cn(
        "flex items-start gap-x-4 mb-4 p-2 border-b border-bkg-2 rounded-md relative",
        "bg2"
      )}
    >
      <div className="w-8 h-12 rounded-full accent1"></div>
      <p className="flex-1">Lorem ipsum dolor sit amet.</p>
      <button className="">
        <IoMdClose />
      </button>
    </div>
  );
};

export default NotificationCard;
