"use client";
import Navbar from "@/components/Navbar";
import FloatingCanvas from "@/components/FloatingCanvas";
import { contentDatabase } from "@/data/posts";
import { motion } from "framer-motion";
import { Feather, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function KavitayePage() {
  const data = contentDatabase.filter(item => item.category === "kavitaye");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative pb-24">
      <Navbar />
      <FloatingCanvas />
      
      <main className="max-w-3xl mx-auto px-4 pt-36 space-y-12">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--accent)] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight flex items-center gap-3">
            <Feather className="w-8 h-8 text-[var(--accent)]" /> कविताएँ / Poetry
          </h1>
        </motion.div>

        <div className="space-y-12">
          {data.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="border border-[var(--foreground)] border-opacity-20 p-8 sm:p-12 rounded-2xl bg-[var(--background)] shadow-sm space-y-6 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight">{item.title}</h2>
              <div className="w-12 h-0.5 bg-[var(--foreground)] opacity-30 mx-auto my-3" />
              <p className="text-xl sm:text-2xl font-serif font-bold leading-loose whitespace-pre-line opacity-90">
                {item.text}
              </p>
              <p className="text-xs font-sans text-[var(--muted)] pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800">English Meaning: {item.translation}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}