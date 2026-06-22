"use client";
import Navbar from "@/components/Navbar";
import FloatingCanvas from "@/components/FloatingCanvas";
import { contentDatabase } from "@/data/posts";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GhazalPage() {
  const data = contentDatabase.filter(item => item.category === "ghazal");

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

        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[var(--accent)]" /> Ghazal Room
          </h1>
        </motion.div>

        <div className="space-y-12">
          {data.map((item, idx) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border border-[var(--foreground)] border-opacity-20 p-8 sm:p-12 rounded-2xl bg-[var(--background)] shadow-sm space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">{item.title}</h2>
                <div className="w-16 h-0.5 bg-[var(--accent)] mx-auto" />
              </div>
              <div className="py-6 border-y border-dashed border-neutral-200 dark:border-neutral-800 text-center">
                <p className="text-xl sm:text-2xl font-serif leading-relaxed italic whitespace-pre-line">
                  {item.text}
                </p>
              </div>
              <p className="text-xs font-sans text-center opacity-60">Translation Summary: {item.translation}</p>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
}