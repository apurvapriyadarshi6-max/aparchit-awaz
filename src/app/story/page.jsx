"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingCanvas from "@/components/FloatingCanvas";
import { contentDatabase } from "@/data/posts";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Bookmark, ArrowLeft, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

export default function MultiPageStoryLayout() {
  const stories = contentDatabase.filter(item => item.category === "story");
  
  // Track current page active indices for each story independently using an object map state variable
  const [storyPages, setStoryPages] = useState({});

  const handlePageChange = (storyId, direction, maxPages) => {
    const currentPage = storyPages[storyId] || 0;
    let nextPage = currentPage;
    
    if (direction === "next" && currentPage < maxPages - 1) {
      nextPage = currentPage + 1;
    } else if (direction === "prev" && currentPage > 0) {
      nextPage = currentPage - 1;
    }

    setStoryPages({
      ...storyPages,
      [storyId]: nextPage
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative pb-24">
      <Navbar />
      <FloatingCanvas />
      
      <main className="max-w-4xl mx-auto px-4 pt-36 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--accent)] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </motion.div>

        {/* Section Heading Panel */}
        <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-[var(--accent)]" /> Stories & Tales
          </h1>
        </motion.div>

        {/* Stories Listing Container Feed */}
        <div className="space-y-16">
          {stories.map((item, idx) => {
            // Normalize content structure: support both classic text strings and modern arrays gracefully
            const pagesArray = Array.isArray(item.text) ? item.text : [item.text];
            const currentPageIdx = storyPages[item.id] || 0;
            const totalPages = pagesArray.length;

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border border-[var(--foreground)] border-opacity-10 p-6 sm:p-10 rounded-3xl bg-[var(--background)] shadow-md space-y-6 relative overflow-hidden"
              >
                {/* Meta Header Indicators Row */}
                <div className="flex justify-between items-center text-xs font-sans opacity-60 border-b parchment-border pb-4">
                  <span className="flex items-center gap-1 font-bold">
                    <Bookmark className="w-3.5 h-3.5 text-[var(--accent)]" /> Chapter #{item.articleNo}
                  </span>
                  <span className="font-medium">Written by {item.author}</span>
                </div>

                {/* Optional Production Image Component Layer */}
                {item.featuredImage && (
                  <div className="w-full h-64 sm:h-96 overflow-hidden rounded-2xl relative border parchment-border bg-stone-100 dark:bg-neutral-900 shadow-inner">
                    <img 
                      src={item.featuredImage} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Title Context heading text */}
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">{item.title}</h2>

                {/* Immersive Paginated Core Text Block Section with smooth exit animations */}
                <div className="min-h-[160px] py-2">
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={currentPageIdx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg sm:text-xl font-serif leading-loose italic text-stone-800 dark:text-stone-200 whitespace-pre-line pl-4 border-l-2 border-[var(--accent)]"
                    >
                      {pagesArray[currentPageIdx]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Pagination Controls Block — Conditionally renders ONLY if story contains multiple pages */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center pt-6 border-t border-dashed border-neutral-200 dark:border-neutral-800 mt-6 font-sans">
                    
                    <button 
                      disabled={currentPageIdx === 0}
                      onClick={() => handlePageChange(item.id, "prev", totalPages)}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 border parchment-border rounded-xl disabled:opacity-20 transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)] bg-transparent text-[var(--foreground)] cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    <span className="text-[11px] font-bold tracking-widest uppercase opacity-50 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Page {currentPageIdx + 1} of {totalPages}
                    </span>

                    <button 
                      disabled={currentPageIdx === totalPages - 1}
                      onClick={() => handlePageChange(item.id, "next", totalPages)}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 border parchment-border rounded-xl disabled:opacity-20 transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)] bg-transparent text-[var(--foreground)] cursor-pointer disabled:cursor-not-allowed"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>

                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </main>
    </div>
  );
}