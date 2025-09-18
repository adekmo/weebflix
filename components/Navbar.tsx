"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useTheme } from "next-themes";
import SearchBar from "./SearchBar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {

    // const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    // const router = useRouter();
    const pathname = usePathname();
    
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between gap-4 py-3">
        {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="text-xl md:text-2xl bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">Weebflix</span>
            <span className="hidden text-xs text-muted-foreground md:inline">/ explore anime</span>
          </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link
            href="/category"
            className={
              pathname === "/category"
                ? "text-neon font-semibold hover:text-foreground"
                : "text-primary "
            }
          >
            Category
          </Link>
          <Link
            href="/genre"
            className={
              pathname === "/genre"
                ? "text-neon font-semibold hover:text-foreground"
                : "text-primary"
            }
          >
            Genre
          </Link>
          <Link
            href="/producer"
            className={
              pathname === "/producer"
                ? "text-neon font-semibold hover:text-foreground"
                : "text-primary"
            }
          >
            Producer
          </Link>
          <Link
            href="/azlist"
            className={cn(
              "whitespace-nowrap",
              pathname === "/azlist"
                ? "text-neon font-semibold hover:text-foreground"
                : "text-primary"
            )}
          >
            A-Z List
          </Link>
          <Link
            href="/schedule"
            className={
              pathname === "/schedule"
                ? "text-neon font-semibold hover:text-foreground"
                : "text-primary"
            }
          >
            Schedule
          </Link>
          
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:block w-full max-w-xl">
            <SearchBar />
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex flex-col items-center justify-center gap-1.5 p-2 rounded hover:bg-accent"
          >
            {isOpen ? (
              <span className="text-2xl font-bold text-neon"></span>
            ) : (
              <>
                <span className="text-2xl font-bold text-neon"><Menu /></span>
              </>
            )}
          </button>
        </div>
      </div>
      

      {/* Mobile Search */}
      <div className="md:hidden w-full border-t border-border p-3">
        <SearchBar />
      </div>

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 border-b flex justify-between items-center bg-gradient-to-tr from-[#0D1117] to-[#111827]">
          <span className="font-bold text-lg text-neon">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-foreground hover:text-neon"
          >
            <X className="w-6 h-6 text-neon" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 p-4 text-sm text-neon bg-gradient-to-tr from-[#0D1117] to-[#111827]">
          <Link href="/category" onClick={() => setIsOpen(false)}>
            Category
          </Link>
          <Link href="/genre" onClick={() => setIsOpen(false)}>
            Genre
          </Link>
          <Link href="/producer" onClick={() => setIsOpen(false)}>
            Producer
          </Link>
          <Link href="/azlist" onClick={() => setIsOpen(false)}>
            A-Z List
          </Link>
          <Link href="/schedule" onClick={() => setIsOpen(false)}>
            Schedule
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}
    </header>
  )
}

export default Navbar