"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { contentDatabase } from "@/data/posts";
import { ArrowLeft, Bookmark } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";

// 1. Separate component reading search params safely at runtime
function ArchiveContent() {
  const searchParams = useSearchParams();
  const idFilter = searchParams.get("id");

  const records = idFilter 
    ? contentDatabase.filter(r => r.id === idFilter) 
    : contentDatabase;

  return (
    <section className="space-y-12">
      {records.map((item, idx) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
          className="border-2 border-[var(--foreground)] p-6 sm:p-12 rounded-2xl bg-[var(--background)] box-premium-shadow space-y-8"
        >
          <div className="flex justify-between items-center border-b border-[var(--foreground)] pb-4 font-mono text-xs">
            <span className="font-bold flex items-center gap-1">
              <Bookmark className="w-4 h-4 text-[var(--accent)]" /> Index: {item.articleNo}
            </span>
            <span className="uppercase text-[var(--muted)]">{item.category} Matrix</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">{item.title}</h1>
            <p className="text-xs font-mono text-[var(--muted)]">Curated by {item.author}</p>
          </div>

          <div className="border-l-4 border-[var(--foreground)] pl-6 py-2">
            <p className="text-xl sm:text-3xl font-serif whitespace-pre-line leading-relaxed italic">
              {item.text}
            </p>
            <p className="text-xs font-mono text-[var(--muted)] mt-6 block border-t border-dashed pt-4 border-[var(--foreground)]">
              Translation Grid: {item.translation}
            </p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

// 2. Clear root export isolating the Suspense frame boundary for static bundlers
export default function CentralArchiveRegistry() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-32 space-y-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--accent)] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Return to Main Deck
          </Link>
        </motion.div>

        <Suspense fallback={<div className="pt-12 text-center font-mono text-xs animate-pulse">Loading Celestial Archive...</div>}>
          <ArchiveContent />
        </Suspense>
      </main>
    </div>
  );
}