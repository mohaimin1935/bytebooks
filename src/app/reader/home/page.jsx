"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ForYou = () => {
  const { data, status } = useSession();

  console.log(data?.user?.role);

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "authenticated")
    return (
      <div>
        <Link
          href="view/book/clrrls9ol0000f8xt8qt82m2u"
          className="secondary-btn"
        >
          View Book
        </Link>
      </div>
    );
};

export default ForYou;
