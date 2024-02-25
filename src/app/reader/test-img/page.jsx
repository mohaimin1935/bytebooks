"use client";

import UploadFile from "@/app/ui/common/UploadFile";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

const TestImageUpload = () => {
  const { data } = useSession();
  console.log(data);

  const router = useRouter();

  if (data?.user?.role === "reader") {
    router.push("/reader/test");
  }

  const [img, setImg] = useState("");

  const { load, togglePlayPause } = useAudioPlayer();

  useEffect(() => {
    if (img) {
      load(img, {
        html5: true,
        autoplay: false,
        initialVolume: 0.5,
        initialRate: 1.0,
      });
    }
  }, [img]);

  return (
    <div>
      <UploadFile className="h-48 w-48" setURL={setImg} />
      <button className="btn-online" onClick={togglePlayPause}>
        Play/pause
      </button>
      <Link href="/reader/home">Go to Home</Link>
    </div>
  );
};

export default TestImageUpload;
