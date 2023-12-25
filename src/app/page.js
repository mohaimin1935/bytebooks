"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import ThemeContainer from "@/ui/common/ThemeContainer";
import { useContext } from "react";

const Home = () => {
  const { toggle } = useContext(ThemeContext);

  return <ThemeContainer>Homepage</ThemeContainer>;
};

export default Home;
