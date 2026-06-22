"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export default function FlipBookViewer({ book }) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="w-full max-w-xl mx-auto border parchment-border rounded-xl p-6 sm:p-8 bg-[var(--background)] shadow-2xl">
      <div className="flex items-center gap-2 mb-6 border-b parchment-border pb-3 text-[var(--muted)] font-sans">
        <BookOpen className="w-4 h-4 text-[var(--accent)]" />
        <span className="text-xs tracking-wider uppercase font-medium">{book.title}</span>
      </div>
      
      <div className="min-h-[160px] flex items-center justify-center text-center italic text-lg px-4 leading-relaxed transition-all">
        {book.pages[currentPage]}
      </div>

      <div className="flex justify-between items-center mt-6 border-t parchment-border pt-4">
        <button 
          disabled={currentPage === 0} 
          onClick={() => setCurrentPage(p => p - 1)}
          className="p-2 border parchment-border rounded-lg disabled:opacity-20 transition-opacity cursor-pointer bg-transparent"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-sans text-[var(--muted)]">
          Manuscript Page {currentPage + 1} of {book.pages.length}
        </span>
        <button 
          disabled={currentPage === book.pages.length - 1} 
          onClick={() => setCurrentPage(p => p + 1)}
          className="p-2 border parchment-border rounded-lg disabled:opacity-20 transition-opacity cursor-pointer bg-transparent"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}