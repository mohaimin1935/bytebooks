"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import { cn } from "@/utils/cn";
import React, { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <main className={cn(theme, "relative")}>{children}</main>;
  }
};

export default ThemeProvider;
