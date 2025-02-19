import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/custom/Navbar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Web Genie",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
  
        <Navbar/>
        <main className="pt-16">
        {children}
        </main>
      </body>
    </html>
  );
}
