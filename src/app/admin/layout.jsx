"use client";

import React, { useEffect } from "react";
import AdminLeft from "../ui/admin/AdminLeft";
import TopBar from "../ui/common/TopBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }) => {
  const { data, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "authenticated")
    return (
      <div className="flex h-screen bg1">
        {/* left panel */}
        <div className="w-[300px] bg2">
          <AdminLeft active={"for-you"} />
        </div>

        {/* right */}
        <div className="flex-1 flex flex-col overflow-hidden px-16">
          {/* top navbar */}
          <div className="bg-transparent">
            {/* need to check admin topbar */}
            <TopBar role={"admin"} />
          </div>

          {/* main content */}
          <div className="flex-1 -mr-16 overflow-y-auto py-12">
            <div className="pr-16">{children}</div>
          </div>
        </div>
      </div>
    );
  else return <></>;
};

export default AdminLayout;
