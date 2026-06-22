"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingCanvas from "@/components/FloatingCanvas";
import { contentDatabase } from "@/data/posts";
import { motion } from "framer-motion";
import { Copy, Check, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ShayariPage() {
  const data = contentDatabase.filter(item => item.category === "shayari");
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative pb-24">
      <Navbar />
      <FloatingCanvas />
      
      <main className="max-w-5xl mx-auto px-4 pt-36 space-y-12">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--accent)] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </motion.div>

        {/* Fixed heading syntax container layout block */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-[var(--accent)]" /> Shayari Collection
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="border border-[var(--foreground)] border-opacity-20 p-8 rounded-2xl bg-[var(--background)] shadow-sm flex flex-col justify-between min-h-[240px]"
            >
              <p className="text-xl sm:text-2xl font-serif font-bold italic leading-relaxed text-center my-auto whitespace-pre-line">
                "{item.text}"
              </p>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                <span className="font-sans text-[10px] opacity-60">ID: #{item.articleNo}</span>
                <button 
                  onClick={() => handleCopy(item.text, item.id)}
                  className="font-sans text-xs font-bold px-3 py-1 border border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] flex items-center gap-1.5 transition-all cursor-pointer bg-transparent text-[var(--foreground)]"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}