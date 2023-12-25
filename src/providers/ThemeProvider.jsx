"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <main data-theme={theme}>{children}</main>;
  }
};

export default ThemeProvider;
