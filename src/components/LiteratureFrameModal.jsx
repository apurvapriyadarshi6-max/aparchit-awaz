"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Share2, Download, Copy, Check, Feather, Bookmark } from "lucide-react";

export default function LiteratureFrameModal({ item, onClose }) {
  const [copied, setCopied] = useState(false);
  const fullTextContent = Array.isArray(item.text) ? item.text.join("\n\n") : item.text;

  // 1. Native API Share Implementation Frame
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.title} — By Apurva Priyadarshi`,
          text: `"${fullTextContent}"\n\nDiscover more at The Apurva Library.`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Sharing cancelled safely.");
      }
    } else {
      // Fallback: Copy link text sequence
      navigator.clipboard.writeText(`"${fullTextContent}" \n\n— Read on Aparchit Awaz (${window.location.href})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 2. High-Performance Text-File / E-Book Chapter Layout Download Module
  const handleDownloadManuscript = () => {
    const fileHeader = `==================================================\n   THE APURVA LIBRARY // APARCHIT AWAZ\n==================================================\n\nTITLE    : ${item.title.toUpperCase()}\nMANUSCRIPT ID : #${item.articleNo}\nCATEGORY : ${item.category.toUpperCase()}\nAUTHOR   : ${item.author}\n\n--------------------------------------------------\n\n${fullTextContent}\n\n--------------------------------------------------\n\nTranslation / Insight Notes:\n${item.translation || "N/A"}\n\n==================================================\n© 2026 Apurva Priyadarshi. All Rights Reserved.`;
    
    const blob = new Blob([fileHeader], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Apurva_Manuscript_${item.articleNo}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto">
      
      {/* Container Motion Canvas Frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        className="w-full max-w-2xl bg-[#faf6ed] text-stone-900 rounded-2xl shadow-2xl relative border-4 border-double border-amber-800/40 p-6 sm:p-10 my-8 overflow-hidden bg-[radial-gradient(#fbf8f3_1px,transparent_1px)] [background-size:16px_16px]"
      >
        {/* Decorative Corner Filigree Highlights */}
        <div className="absolute top-2 left-2 text-amber-800/20 font-serif text-xs select-none">✦ 📜 ✦</div>
        <div className="absolute top-2 right-2 text-amber-800/20 font-serif text-xs select-none">✦ 📜 ✦</div>
        
        {/* Close Button Anchor Point */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-900 hover:text-[#faf6ed] transition-colors cursor-pointer bg-transparent"
          title="Return to Gallery"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Action Controls Toolbar Deck Header */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 pb-4 mb-6 font-sans text-[10px] font-black tracking-widest uppercase">
          <span className="bg-amber-800 text-amber-50 px-2 py-1 rounded flex items-center gap-1">
            <Bookmark className="w-3 h-3" /> NO: {item.articleNo}
          </span>
          <span className="border border-stone-300 px-2 py-1 rounded text-stone-600">
            {item.category}
          </span>

          {/* Action Operation Toolbar Segment */}
          <div className="ml-auto flex items-center gap-1.5">
            <button 
              onClick={handleNativeShare}
              className="p-1.5 border border-stone-300 hover:border-amber-800 rounded-lg text-stone-700 hover:text-amber-900 bg-white transition-colors flex items-center gap-1 cursor-pointer text-[10px] font-bold"
              title="Share Text Artifact"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button 
              onClick={handleDownloadManuscript}
              className="p-1.5 border border-stone-300 hover:border-amber-800 rounded-lg text-stone-700 hover:text-amber-900 bg-white transition-colors flex items-center gap-1 cursor-pointer text-[10px] font-bold"
              title="Download TXT Manuscript Layout File"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>

        {/* CINEMATIC LITERATURE PARCHMENT FRAME PANEL */}
        <div className="border-2 border-dashed border-amber-800/20 p-6 sm:p-8 rounded-xl bg-[#fdfbf7] relative shadow-inner text-center space-y-6">
          <Feather className="w-6 h-6 text-amber-800/30 mx-auto transform -rotate-45" />
          
          <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-stone-950 decoration-amber-800/30 decoration-double underline underline-offset-8">
            {item.title}
          </h2>

          {/* Poetic Inscription Copy Frame */}
          <p className="text-xl sm:text-2xl font-serif italic text-stone-900 leading-loose whitespace-pre-line tracking-wide py-4">
            {fullTextContent}
          </p>

          <div className="w-12 h-0.5 bg-amber-800/20 mx-auto" />

          {/* Translation Insight Frame */}
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

        {/* Footer Attributions Frame */}
        <p className="text-center font-serif text-[10px] italic text-stone-500 mt-6 select-none">
          Aparchit Awaz Creative Archive System • Designed in Patna, Bihar
        </p>

      </motion.div>
    </div>
  );
}