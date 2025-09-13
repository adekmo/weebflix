"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import SearchBar from "./SearchBar";

const Navbar = () => {

    const { theme, setTheme } = useTheme();
    const router = useRouter();
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
            href="/"
            className={
              pathname === "/"
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            Category
          </Link>
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            Genre
          </Link>
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            Producer
          </Link>
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            A-Z List
          </Link>
          
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-3 w-1/2 max-w-xl">
          <div className="hidden sm:block flex-1">
            <SearchBar />
          </div>
          {/* <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button> */}
          <button
            onClick={() => router.push("/search")}
            className="sm:hidden inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-accent"
          >
            Search
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden border-t border-border p-3">
        <SearchBar />
      </div>
    </header>
  )
}

export default Navbar