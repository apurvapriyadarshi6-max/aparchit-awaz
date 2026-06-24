"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { contentDatabase } from "@/data/posts";

export default function ShayariSlider() {
  // LOCKED: Filtering strictly for shayari items now to remove ghazals from the slider loop
  const slides = contentDatabase.filter(item => item.category === "shayari");
  
  const [current, setCurrent] = useState(0);
  const [copied, setCopied] = useState(false);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return; // No auto-scroll required if single slide exists
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  const handleCopy = () => {
    if (slides.length === 0) return;
    navigator.clipboard.writeText(slides[current].text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe fallback if zero shayari items are active inside your local array data script
  if (slides.length === 0) {
    return (
      <div className="w-full border border-[var(--foreground)] p-10 rounded-2xl text-center bg-[var(--background)] font-serif italic text-xs opacity-50">
        No shayari items available inside the active library records.
      </div>
    );
  }

  return (
    <div className="w-full border border-[var(--foreground)] p-6 sm:p-10 rounded-2xl relative bg-[var(--background)] shadow-xl overflow-hidden">
      <div className="absolute inset-0 celestial-glow w-64 h-64 mx-auto rounded-full -z-10 opacity-40" />
      
      <div className="flex justify-between font-sans text-[10px] tracking-widest uppercase border-b parchment-border pb-3 mb-6 opacity-60">
        <span>No: {slides[current].articleNo} // {slides[current].category}</span>
        <span>Writer: {slides[current].author}</span>
      </div>

      <div className="min-h-[140px] flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4 w-full"
          >
            <p className="text-xl sm:text-3xl font-serif font-bold italic whitespace-pre-line leading-relaxed">
              "{slides[current].text}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t parchment-border">
        <button 
          type="button"
          onClick={handleCopy}
          className="font-sans text-xs font-bold px-3 py-1.5 border border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] flex items-center gap-1.5 transition-all cursor-pointer bg-transparent text-[var(--foreground)]"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "COPIED" : "COPY"}</span>
        </button>

        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)} 
            className="p-1.5 border border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] cursor-pointer bg-transparent text-[var(--foreground)] rounded-md"
            title="Previous Verse"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={nextSlide} 
            className="p-1.5 border border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] cursor-pointer bg-transparent text-[var(--foreground)] rounded-md"
            title="Next Verse"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}