import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MobileNav } from "@/components/mobile-nav";

const geistSans = Geist({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "ShopHub - Modern E-commerce Store",
  description: "Discover amazing products at great prices",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-background text-foreground`}>
        <ThemeProvider>
          {children}
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
