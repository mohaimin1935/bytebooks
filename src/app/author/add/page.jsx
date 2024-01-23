"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext, useEffect } from "react";

import React from "react";

const AddAuthor = () => {
  const { setModal } = useContext(ThemeContext);

  useEffect(() => {
    setModal(false);
  }, []);

  return <div>AddAuthor</div>;
};

export default AddAuthor;
