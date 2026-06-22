"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, Feather, Radio, User, FolderOpen, Home } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false); // Defaulting to Bright Theme

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl backdrop-blur-md bg-opacity-80 border parchment-border rounded-xl px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg transition-all bg-[var(--background)]">
      
      {/* Brand Script Title Layout */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <Feather className="w-4 h-4 text-[var(--accent)]" />
        <span className="font-sans tracking-widest uppercase font-black text-xs sm:text-sm text-[var(--foreground)]">
          Aparchit Awaz <span className="text-[var(--accent)] font-serif italic lowercase font-light">by apurva</span>
        </span>
      </Link>
      
      {/* Fully Unlocked Navigation Links — Visible on BOTH Mobile and Desktop */}
      <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-sans text-[11px] sm:text-xs uppercase tracking-wider font-bold">
        <Link href="/" className="flex items-center gap-1 hover:text-[var(--accent)] text-[var(--foreground)] transition-colors">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <Link href="/archive" className="flex items-center gap-1 hover:text-[var(--accent)] text-[var(--foreground)] transition-colors">
          <FolderOpen className="w-3.5 h-3.5" /> All Items
        </Link>
        <Link href="/live-stage" className="flex items-center gap-1 text-red-600 animate-pulse font-extrabold hover:opacity-80">
          <Radio className="w-3.5 h-3.5" /> Live Stage
        </Link>
        
        {/* THIS TARGET LINK OPENS YOUR BIO PAGE DIRECTLY */}
        <Link href="/apurva" className="flex items-center gap-1 text-[var(--accent)] hover:opacity-80 transition-colors">
          <User className="w-3.5 h-3.5" /> Apurva Priyadarshi
        </Link>
      </nav>

      {/* Light / Dark Mode Toggle Button */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="p-1.5 rounded-lg border parchment-border hover:scale-105 transition-transform bg-transparent cursor-pointer text-[var(--foreground)] absolute top-2 right-4 sm:relative sm:top-auto sm:right-auto"
        aria-label="Toggle Theme Mode"
      >
        {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-700" />}
      </button>

    </header>
  );
}