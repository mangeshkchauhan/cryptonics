import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cryptonics - Advanced Cryptocurrency Tracker",
  description: "Track cryptocurrency prices, view detailed charts, and explore market data with Cryptonics - the ultimate crypto tracking platform.",
  keywords: ["cryptocurrency", "crypto", "bitcoin", "ethereum", "trading", "prices", "charts"],
  authors: [{ name: "Cryptonics Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
