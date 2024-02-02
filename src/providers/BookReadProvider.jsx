"use client";

import { BookReadContext } from "@/contexts/BookReadContext";
import { useEffect, useState } from "react";

const BookReadProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) return <div>{children}</div>;
};

export default BookReadProvider;
