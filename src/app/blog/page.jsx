"use client";
import Navbar from "@/components/Navbar";
import FloatingCanvas from "@/components/FloatingCanvas";
import { contentDatabase } from "@/data/posts";
import { motion } from "framer-motion";
import { PenTool, Calendar } from "lucide-react";

export default function BlogPage() {
  const data = contentDatabase.filter(item => item.category === "blog");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative pb-24">
      <Navbar />
      <FloatingCanvas />
      <main className="max-w-4xl mx-auto px-4 pt-36 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-b-2 border-[var(--foreground)] pb-6">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight flex items-center gap-3">
            <PenTool className="w-8 h-8 text-[var(--accent)]" /> LITERARY BLOGS
          </h1>
          <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mt-2">Essays regarding Critical Theory, Structural Writing, and Philosophy.</p>
        </motion.div>

        <div className="space-y-8">
          {data.map((item, idx) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border-2 border-[var(--foreground)] p-6 sm:p-8 rounded-2xl bg-[var(--background)] box-premium-shadow space-y-4"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--muted)]">
                <Calendar className="w-3.5 h-3.5" />
                <span>ARCHIVAL POST DATE: JUNE 2026</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{item.title}</h2>
              <p className="text-sm text-[var(--muted)] font-sans leading-relaxed">{item.excerpt}</p>
              <div className="pt-4 border-t border-dashed border-[var(--foreground)] font-serif italic text-lg">
                {item.text}
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
}