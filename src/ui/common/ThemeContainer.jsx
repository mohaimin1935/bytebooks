import { ThemeContext } from "@/contexts/ThemeContext";
import React, { useContext } from "react";

const ThemeContainer = ({ children, className }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <main data-theme={theme} className={className}>
      {children}
    </main>
  );
};

export default ThemeContainer;
