import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";
import { IoMdClose } from "react-icons/io";

const NotificationCard = ({ notification }) => {
  let href = "";

  switch (notification?.type) {
    case "new_book":
      href = `/reader/view/book/${notification.bookId}`;
      break;

    default:
      href = "/#";
      break;
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-start gap-x-4 mb-4 px-6 py-3 border-b border-bkg-2 rounded-md relative justify-between",
        "bg2"
      )}
    >
      <div className="">
        <h4 className="font-semibold">{notification.title}</h4>
        <p className="flex-1">{notification.message}</p>
      </div>
      {/* <button className="">
        <IoMdClose />
      </button> */}
    </Link>
  );
};

export default NotificationCard;
