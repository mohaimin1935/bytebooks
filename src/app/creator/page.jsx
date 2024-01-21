import { useRouter } from "next/navigation";
import React from "react";

const CreatorHome = () => {
  const router = useRouter();
  router.push("creator/home");

  return <div>CreatorHome</div>;
};

export default CreatorHome;
