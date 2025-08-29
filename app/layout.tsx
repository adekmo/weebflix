import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeebFlix",
  description: "Explore and stream anime with WeebFlix",
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
        <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-500">
            WeebFlix
          </Link>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-red-400">Home</Link>
            <Link href="/recent" className="hover:text-red-400">Recent</Link>
            <Link href="/watchlist" className="hover:text-red-400">Watchlist</Link>
          </nav>
        </header>
        <main className="px-6 py-8">{children}</main>
        <footer className="bg-gray-800 px-6 py-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} WeebFlix. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
