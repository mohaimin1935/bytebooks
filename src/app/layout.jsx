"use client";

import "./globals.css";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-rubik">
        <ThemeContextProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
