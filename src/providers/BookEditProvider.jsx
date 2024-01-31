"use client";

import { BookEditContext } from "@/contexts/BookEditContext";
import { useEffect, useState } from "react";

const BookEditProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) return <div>{children}</div>;
};

export default BookEditProvider;
