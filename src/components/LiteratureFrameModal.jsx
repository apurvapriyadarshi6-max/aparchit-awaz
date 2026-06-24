"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Feather, Bookmark, Sparkles, Copy, Check } from "lucide-react";

export default function LiteratureFrameModal({ item, onClose }) {
  const [copied, setCopied] = useState(false);
  const fullTextContent = Array.isArray(item.text) ? item.text.join("\n\n") : item.text;

  // 1. Native API Share Implementation 
  const handleNativeShare = async () => {
    const shareMessage = `✨ *${item.title}* ✨\n\n${fullTextContent}\n\n— _By ${item.author}_\n\nRead more inside the official creative space at Aparchit Awaz.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: shareMessage,
          url: window.location.origin,
        });
      } catch (err) {
        console.log("Sharing safely dismissed.");
      }
    } else {
      // Fallback to Clipboard Copy if browser doesn't support Web Share API
      handleDirectCopy();
    }
  };

  // 2. Direct Clipboard Copy Framework with layout tracking flags
  const handleDirectCopy = () => {
    const formattedText = `✨ ${item.title} ✨\n\n${fullTextContent}\n\n— By ${item.author}\n\nFrom The Apurva Library / Aparchit Awaz`;
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center p-4 bg-stone-950/60 backdrop-blur-xl overflow-y-auto pt-28 sm:pt-32">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Floating Copy Confirmation Pill Box Alert */}
      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[120] bg-stone-900 text-stone-100 px-5 py-3 rounded-full shadow-2xl font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 border border-amber-800/30"
          >
            <Check className="w-4 h-4 text-green-400" />
            <span>Verse Copied to Clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ type: "spring", damping: 25, stiffness: 180 }}
        className="w-full max-w-2xl bg-[#faf6ed] text-stone-900 rounded-3xl shadow-2xl relative border-4 border-double border-amber-800/40 p-6 sm:p-10 mb-12 overflow-hidden bg-[radial-gradient(#fbf8f3_1px,transparent_1px)] [background-size:16px_16px]"
      >
        {/* Decorative Layout Markers */}
        <div className="absolute top-3 left-3 text-amber-800/20 font-serif text-xs select-none">✦ 📜 ✦</div>
        <div className="absolute top-3 right-3 text-amber-800/20 font-serif text-xs select-none">✦ 📜 ✦</div>
        
        {/* Close Button Anchor Point */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-950 hover:text-[#faf6ed] hover:border-stone-950 transition-all cursor-pointer bg-white/80 shadow-sm z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Action Controls Toolbar Deck Header */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 pb-4 mb-6 font-sans text-[10px] font-black tracking-widest uppercase">
          <span className="bg-amber-900 text-amber-50 px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
            <Bookmark className="w-3 h-3" /> NO: {item.articleNo}
          </span>
          <span className="border border-stone-300 px-2 py-1 rounded-md text-stone-600 bg-white/50">
            {item.category}
          </span>

          {/* Interactive Native Actions Control Bar Deck */}
          <div className="ml-auto flex items-center gap-1.5">
            <button 
              type="button"
              onClick={handleDirectCopy}
              className="p-2 border border-stone-300 hover:border-amber-800 rounded-xl text-stone-700 hover:text-amber-900 bg-white transition-all flex items-center gap-1.5 cursor-pointer text-[10px] font-bold shadow-sm"
            >
              <Copy className="w-3.5 h-3.5 text-amber-700" /> 
              <span>COPY WORDS</span>
            </button>
            
            <button 
              type="button"
              onClick={handleNativeShare}
              className="p-2 border border-stone-300 hover:border-amber-800 rounded-xl text-amber-50 hover:bg-amber-900 bg-amber-800 transition-all flex items-center gap-1.5 cursor-pointer text-[10px] font-bold shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-50" /> 
              <span>SHARE TO APPS</span>
            </button>
          </div>
        </div>

        {/* 📜 CINEMATIC LITERATURE PARCHMENT PRESENTATION CARD PANEL */}
        <div className="border-2 border-dashed border-amber-800/20 p-6 sm:p-8 rounded-2xl bg-[#fdfbf7] relative shadow-inner text-center space-y-6">
          <div className="absolute top-4 right-4 opacity-10 animate-pulse">
            <Sparkles className="w-6 h-6 text-amber-800" />
          </div>
          
          <Feather className="w-6 h-6 text-amber-800/30 mx-auto transform -rotate-45" />
          
          <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-stone-950 decoration-amber-800/30 decoration-double underline underline-offset-8">
            {item.title}
          </h2>

          <p className="text-xl sm:text-2xl font-serif italic text-stone-900 leading-loose whitespace-pre-line tracking-wide py-4 font-medium px-2 selection:bg-amber-800 selection:text-amber-50">
            {fullTextContent}
          </p>

          <div className="w-16 h-0.5 bg-amber-800/20 mx-auto" />

          {item.translation && (
            <div className="font-serif text-xs italic text-stone-600 max-w-md mx-auto leading-relaxed border-t border-stone-200 pt-4">
              <span className="font-sans text-[9px] uppercase tracking-widest font-black block text-amber-800 mb-1">English Parallel Insight</span>
              "{item.translation}"
            </div>
          )}

          <p className="font-sans text-[10px] font-black tracking-widest uppercase text-amber-900 opacity-60">
            — {item.author} —
          </p>
        </div>

        {/* Global Exit Command Bar */}
        <button 
          onClick={onClose}
          className="w-full text-center font-sans text-[11px] font-black tracking-widest uppercase text-stone-400 hover:text-amber-800 transition-colors mt-6 block cursor-pointer bg-transparent border-0 focus:outline-none"
        >
          [ Return to Library Gallery ]
        </button>

      </motion.div>
    </div>
  );
}