"use client";

import UploadFile from "@/app/ui/common/UploadFile";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TestImageUpload = () => {
  const { data } = useSession();
  console.log(data);

  const router = useRouter();

  if (data?.user?.role === "reader") {
    router.push("/reader/test");
  }

  const [img, setImg] = useState("");

  return (
    <div>
      <UploadFile className="h-48 w-48" setURL={setImg} />
      <Link href="/reader/home">Go to Home</Link>
    </div>
  );
};

export default TestImageUpload;
