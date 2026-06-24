"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronLeft, ChevronRight, Hash } from "lucide-react";
import { contentDatabase } from "@/data/posts";

export default function ShayariSlider() {
  const slides = contentDatabase.filter(item => item.category === "shayari");
  
  const [current, setCurrent] = useState(0);
  const [copied, setCopied] = useState(false);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  const handleCopy = () => {
    if (slides.length === 0) return;
    navigator.clipboard.writeText(slides[current].text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (slides.length === 0) {
    return (
      <div className="w-full border border-white/10 p-10 rounded-2xl text-center bg-[#1c1c1e] font-serif italic text-xs text-neutral-400">
        No shayari items available inside the active library records.
      </div>
    );
  }

  return (
    // Rebuilt with clear text colors so hindi text never blends invisibly into the light background layout container
    <div className="w-full rounded-2xl relative bg-[#faf6ed] border border-neutral-200/50 p-6 sm:p-10 shadow-xl overflow-hidden">
      
      {/* Top Header Card Metadata Gutter */}
      <div className="flex justify-between font-sans text-[10px] font-bold tracking-widest uppercase border-b border-neutral-200 pb-3 mb-6 text-neutral-500">
        <span className="flex items-center gap-0.5">
          <Hash className="w-3 h-3" /> {slides[current].articleNo} // {slides[current].category}
        </span>
        <span>Writer: {slides[current].author}</span>
      </div>

      {/* Main Verse Core Display Pane */}
      <div className="min-h-[140px] flex flex-col justify-center items-center px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="text-center space-y-4 w-full"
          >
            {/* FIXED: Hardcoded dark styling to contrast with the crisp ivory paper look */}
            <p className="text-xl sm:text-3xl font-serif font-bold italic whitespace-pre-line leading-relaxed text-neutral-900">
              "{slides[current].text}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Control Bar Row Deck */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-200">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleCopy}
          className="font-sans text-[11px] font-black tracking-widest px-4 py-2 border border-neutral-300 rounded-xl hover:bg-neutral-900 hover:text-white transition-all cursor-pointer bg-white text-neutral-800 flex items-center gap-1.5 shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
          <span>{copied ? "COPIED" : "COPY TEXT"}</span>
        </motion.button>

        {/* Haptic Navigation Chevrons */}
        <div className="flex gap-1.5">
          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)} 
            className="p-2 border border-neutral-300 rounded-xl hover:bg-neutral-200 text-neutral-700 bg-white cursor-pointer shadow-sm"
            title="Previous Shayari"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={nextSlide} 
            className="p-2 border border-neutral-300 rounded-xl hover:bg-neutral-200 text-neutral-700 bg-white cursor-pointer shadow-sm"
            title="Next Shayari"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}