import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dusanluketic.com"),
  title: "Dusan Luketic | Senior Frontend Developer",
  description:
    "Portfolio of Dusan Luketic — Senior Frontend Developer specializing in React, Next.js, and TypeScript. Building elegant, performant web experiences.",
  keywords: [
    "frontend developer",
    "react",
    "next.js",
    "typescript",
    "portfolio",
    "web developer",
  ],
  authors: [{ name: "Dusan Luketic" }],
  creator: "Dusan Luketic",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Dusan Luketic | Senior Frontend Developer",
    description:
      "Portfolio of Dusan Luketic — Senior Frontend Developer specializing in React, Next.js, and TypeScript.",
    siteName: "Dusan Luketic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dusan Luketic | Senior Frontend Developer",
    description: "Portfolio of Dusan Luketic — Senior Frontend Developer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body className="bg-neutral-950 text-neutral-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
