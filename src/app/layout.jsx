"use client";

import "./globals.css";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import ToggleTheme from "@/app/ui/common/ToggleTheme";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import NextTopLoader from "nextjs-toploader";
import ModalBg from "./ui/common/ModalBg";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="awV4VyXQbl7jUwfzaQEgi_kYCECNKUMbNhrxmNIp7E0"
        />
      </head>
      <body>
        <div>
          <NextTopLoader
            color={"#e36263"}
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            zIndex={1600}
            showAtBottom={false}
          />
          <Toaster />
        </div>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="font-rubik relative min-h-screen bg1 content1">
                {/* <div className="fixed bottom-12 right-12 cursor-pointer z-50">
                  <ToggleTheme />
                </div> */}
                {children}
                <ModalBg />
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
