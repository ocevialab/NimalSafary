import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import the GoogleAnalytics component
import { GoogleAnalytics } from "@next/third-parties/google";

import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import WhatsAppChatButton from "./Components/WhatsAppChatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nimal Safari",
  description: "Experience the Wild Like Never Before",
  icons: {
    icon: "/favicon.ico", // or "/favicon.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollToTop />
        <WhatsAppChatButton />
        {children}
        <Footer />

        {/*
          Add the GoogleAnalytics component here.
          Replace 'G-VLXEQQL4J7' with your actual Measurement ID.
          This will inject the Google Analytics script for every page.
        */}
      </body>
      <GoogleAnalytics gaId="G-VLXEQQL4J7" />
    </html>
  );
}
