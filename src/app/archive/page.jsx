"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { contentDatabase } from "@/data/posts";
import { ArrowLeft, Bookmark } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";

function ArchiveContent() {
  const searchParams = useSearchParams();
  const idFilter = searchParams.get("id");

  const records = idFilter 
    ? contentDatabase.filter(r => r.id === idFilter) 
    : contentDatabase;

  return (
    <section className="space-y-12 w-full">
      {records.map((item, idx) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          className="p-6 sm:p-10 rounded-2xl bg-transparent border parchment-border shadow-sm space-y-6"
        >
          <div className="flex justify-between items-center border-b parchment-border pb-4 font-sans text-xs opacity-70">
            <span className="font-bold flex items-center gap-1">
              <Bookmark className="w-4 h-4 text-[var(--accent)]" /> Record ID: #{item.articleNo}
            </span>
            <span className="uppercase font-semibold tracking-widest">// Category: {item.category}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{item.title}</h1>
            <p className="text-xs font-sans tracking-wide text-[var(--muted)]">Written by: {item.author}</p>
          </div>

          <div className="border-l-4 border-[var(--foreground)] pl-6 py-2">
            <p className="text-xl sm:text-2xl font-serif whitespace-pre-line leading-relaxed italic">
              {item.text}
            </p>
            {item.translation && (
              <p className="text-xs font-sans text-[var(--muted)] mt-6 block border-t border-dashed pt-4 parchment-border">
                Translation Summary: {item.translation}
              </p>
            )}
          </div>
        </motion.div>
      ))}

      {records.length === 0 && (
        <p className="font-sans text-xs text-center py-12 text-[var(--muted)]">Requested composition not found in archival records.</p>
      )}
    </section>
  );
}

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24 relative">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 pt-32 space-y-12">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--accent)] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </motion.div>

        <Suspense fallback={<div className="pt-12 text-center font-sans text-xs animate-pulse">Loading Original Entry...</div>}>
          <ArchiveContent />
        </Suspense>
      </main>
    </div>
  );
}