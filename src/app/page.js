"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ShayariSlider from "@/components/ShayariSlider";
import FloatingCanvas from "@/components/FloatingCanvas";
import { contentDatabase, customNotifications } from "@/data/posts";
import { Bell, ArrowUpRight, Search, Hash, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [notifyIdx, setNotifyIdx] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  // Core navigation segment tags focused on short poetry elements
  const categories = ["all", "shayari", "ghazal"];

  // Filter logic: Enforces exact max line constraints for both short poetry categories
  const filtered = contentDatabase.filter(item => {
    const isShayari = item.category === "shayari";
    const isGhazal = item.category === "ghazal";

    if (!isShayari && !isGhazal) return false; // Hard filter out stories, blogs, and essays entirely

    const lineCount = item.text ? item.text.split("\n").length : 0;
    
    // Strict Line Restrictions: Shayari (max 5 lines), Ghazal (max 10 lines)
    if (isShayari && lineCount > 5) return false;
    if (isGhazal && lineCount > 10) return false;

    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.text.toLowerCase().includes(search.toLowerCase()) ||
                          item.articleNo.includes(search);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24 relative">
      <Navbar />
      <FloatingCanvas />

      {/* 1. Global Notice Box Tray */}
      <div className="pt-28 max-w-6xl mx-auto px-4">
        <AnimatePresence>
          {showNotification && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full border border-[var(--foreground)] p-5 rounded-xl bg-[var(--background)] shadow-lg flex justify-between items-start gap-4 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)]" />
              <div className="flex items-start gap-3 flex-1 pl-2">
                <Bell className="w-5 h-5 text-[var(--accent)] animate-bounce mt-0.5 shrink-0" />
                <div className="space-y-1 w-full">
                  <p className="font-sans text-xs font-bold tracking-wider uppercase opacity-60">System Notice / Announcement</p>
                  <p className="font-serif text-sm tracking-wide leading-relaxed">
                    {customNotifications[notifyIdx]}
                  </p>
                  <button 
                    type="button"
                    onClick={() => setNotifyIdx((prev) => (prev + 1) % customNotifications.length)}
                    className="text-[11px] underline font-sans font-bold tracking-wide uppercase text-[var(--accent)] mt-2 block hover:opacity-80 cursor-pointer bg-transparent border-0"
                  >
                    Show Next Alert
                  </button>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowNotification(false)}
                className="p-1 border parchment-border rounded-md hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors cursor-pointer text-[var(--foreground)] opacity-70 hover:opacity-100 bg-transparent"
                title="Close Notification Box"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-20">
        
        {/* 2. Platform Branding Hero Layout */}
        <section className="text-center py-12 relative">
          <div className="absolute inset-0 celestial-glow w-80 h-80 mx-auto rounded-full -z-10 opacity-60" />
          <motion.h1 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-4"
          >
            The Apurva Library
          </motion.h1>
          <p className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto italic font-light">
            "A celestial collection of rhythmic whispers, short compositions, and curated verse logs echoing through the digital infinite."
          </p>
        </section>

        {/* 3. Pure Shayari Slider Carousel Frame */}
        <ShayariSlider />

        {/* 4. Filter Framework Search Metric Segment */}
        <section className="space-y-6">
          <div className="relative border parchment-border rounded-full bg-transparent shadow-sm">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input 
              type="text" 
              placeholder="Search verses by phrasing, name, or record index value..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-sans text-xs pl-12 pr-4 py-3.5 bg-transparent border-0 focus:outline-none text-[var(--foreground)]"
            />
          </div>

          {/* Clean Selection Buttons */}
          <div className="flex flex-wrap justify-center gap-2 font-sans text-xs font-bold tracking-wider">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full border border-[var(--foreground)] border-opacity-20 uppercase cursor-pointer transition-all bg-transparent ${selectedCategory === cat ? "bg-[var(--foreground)]! text-[var(--background)]!" : "text-[var(--foreground)] hover:border-[var(--accent)]"}`}
              >
                {cat === "all" ? "📜 Short Compositions" : cat}
              </motion.button>
            ))}
          </div>
        </section>

        {/* 5. Production Content Grid Display */}
        <motion.section layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((post) => (
              <Link href={`/archive?id=${post.id}`} key={post.id} className="no-underline">
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ y: -6 }}
                  className="p-6 rounded-2xl bg-transparent border parchment-border transition-all hover:shadow-xl flex flex-col justify-between min-h-[220px] relative overflow-hidden group cursor-pointer h-full"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center font-sans text-[10px] text-[var(--muted)] border-b parchment-border pb-2">
                      <span className="flex items-center gap-0.5 font-bold"><Hash className="w-3 h-3" /> {post.articleNo}</span>
                      <span className="uppercase font-semibold tracking-widest text-[var(--accent)]">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">{post.title}</h3>
                    <p className="text-xs text-[var(--muted)] font-serif line-clamp-4 leading-relaxed whitespace-pre-line italic">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-dashed parchment-border flex justify-end">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:text-[var(--accent)] transition-colors">
                      Open <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.section>

      </main>

      {/* 6. Footer Navigation Block */}
      <footer className="max-w-6xl mx-auto px-4 mt-28 border-t parchment-border pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["📺 YouTube Studio", "📸 Instagram", "💼 LinkedIn"].map((social, i) => (
            <a 
              key={i}
              href="#" 
              className="p-4 border parchment-border rounded-xl font-sans text-center text-xs font-bold uppercase hover:border-[var(--accent)] transition-colors no-underline text-[var(--foreground)]"
            >
              {social}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}