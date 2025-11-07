import { Geist, Geist_Mono } from "next/font/google";

import "../styles/globals.css";
import "../styles/ui.css";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SkipLink } from "../components/SkipLink";
import { generateMetadata as genMeta } from "../lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  ...genMeta(),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#6D2B79",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#6D2B79",
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
        <div className="site-container">
          <Header />
          <main id="main" className="page-well">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
