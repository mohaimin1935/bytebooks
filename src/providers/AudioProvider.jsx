"use client";

import React, { useEffect, useState } from "react";

const AudioProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <div>AudioProvider</div>;
  }
};

export default AudioProvider;
