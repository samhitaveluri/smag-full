"use client";

import "./globals.css";
import { Teko, Rubik } from "next/font/google";
import { Toaster, toast } from "sonner";
import { Providers } from "./providers";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-teko" });

const protectedPaths = ["/dashboard"];
const autoLogPaths = ["/register", "/"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const authCheck = () => {
    if (
      protectedPaths.includes(pathName) &&
      !localStorage.getItem("currUser")
    ) {
      toast.error("Login to access this page");
      router.push("/");
    }
    if (autoLogPaths.includes(pathName) && !!localStorage.getItem("currUser")) {
      router.push("/dashboard");
    }
  };
  if (typeof window !== "undefined") authCheck();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>SMAG | BI for the masses</title>
      </head>
      <body className={`${rubik.className}`}>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
