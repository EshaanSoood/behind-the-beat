import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../styles/globals.css";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SkipLink } from "../components/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Behind the Beat",
  description: "A cozy, modern magazine experience for interviews and reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
