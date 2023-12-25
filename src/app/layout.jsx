"use client";

import "./globals.css";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import ToggleTheme from "@/ui/common/ToggleTheme";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <ThemeProvider>
            <div className="font-rubik relative min-h-screen bg1 content1">
              <div className="absolute bottom-12 right-12 cursor-pointer">
                <ToggleTheme />
              </div>
              {children}
            </div>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
