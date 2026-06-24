"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ShayariSlider from "@/components/ShayariSlider";
import FloatingCanvas from "@/components/FloatingCanvas";
import LiteratureFrameModal from "@/components/LiteratureFrameModal";
import { contentDatabase, customNotifications } from "@/data/posts";
import { Bell, ArrowUpRight, Search, Hash, X, Layers, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("specific"); // Modes: "specific" (isolated category view) or "unified" (all-in-one scroll)
  const [search, setSearch] = useState("");
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [notifyIdx, setNotifyIdx] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  const categories = ["all", "shayari", "ghazal", "story", "blog", "kavitaye"];

  // Filter Algorithm
  const filtered = contentDatabase.filter(item => {
    const isShayari = item.category === "shayari";
    const isGhazal = item.category === "ghazal";

    const rawText = item.text ? (Array.isArray(item.text) ? item.text[0] : item.text) : "";
    const totalPoeticLines = rawText.split("\n").filter(line => line.trim() !== "").length;
    
    if (isShayari && totalPoeticLines > 5) return false;
    if (isGhazal && totalPoeticLines > 10) return false;

    // Logic Switch between Specific Category isolation versus All-in-One master feed
    const matchesCat = viewMode === "unified" || selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.articleNo.includes(search);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24 relative selection:bg-amber-900 selection:text-amber-50">
      <Navbar />
      <FloatingCanvas />

      {/* System Notice Banner */}
      <div className="pt-28 max-w-6xl mx-auto px-4">
        <AnimatePresence>
          {showNotification && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full border border-[var(--foreground)] p-5 rounded-xl bg-[var(--background)] shadow-lg flex justify-between items-start gap-4 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)]" />
              <div className="flex items-start gap-3 flex-1 pl-2">
                <Bell className="w-5 h-5 text-[var(--accent)] animate-bounce mt-0.5 shrink-0" />
                <div className="space-y-1 w-full">
                  <p className="font-sans text-xs font-bold tracking-wider uppercase opacity-60">System Notice</p>
                  <p className="font-serif text-sm tracking-wide leading-relaxed">{customNotifications[notifyIdx]}</p>
                  <button 
                    type="button"
                    onClick={() => setNotifyIdx((prev) => (prev + 1) % customNotifications.length)}
                    className="text-[11px] underline font-sans font-bold uppercase text-[var(--accent)] mt-2 block bg-transparent border-0 cursor-pointer"
                  >
                    Next Alert
                  </button>
                </div>
              </div>
              <button type="button" onClick={() => setShowNotification(false)} className="p-1 border bg-transparent text-[var(--foreground)] parchment-border opacity-70 rounded-md cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-16">
        
        {/* Branding Hero Deck */}
        <section className="text-center py-6 relative">
          <motion.h1 initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl sm:text-7xl font-bold tracking-tight mb-4 font-serif">
            The Apurva Library
          </motion.h1>
          <p className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto italic font-serif opacity-80">
            "Where silence transforms into ink, and ink crystallizes into stellar blueprints."
          </p>
        </section>

        <ShayariSlider />

        {/* CONTROLS AREA: Dynamic Route Mode Switcher Deck */}
        <section className="space-y-6 border p-6 rounded-2xl parchment-border bg-black/5 dark:bg-white/5 relative">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-dashed parchment-border pb-4">
            <div>
              <h4 className="font-sans text-xs font-black tracking-widest uppercase flex items-center gap-1.5 text-[var(--accent)]">
                <Sparkles className="w-4 h-4" /> Library Viewing Layout Strategy
              </h4>
              <p className="font-serif text-xs italic text-[var(--muted)] mt-0.5">Toggle between filtered single catalogs or the unified master scroll matrix.</p>
            </div>
            
            {/* THE MASTER ALL-IN-ONE SYSTEM TOGGLE BUTTON */}
            <button
              onClick={() => {
                setViewMode(viewMode === "specific" ? "unified" : "specific");
                setSelectedCategory("all");
              }}
              className="font-sans text-[11px] font-black tracking-widest uppercase px-4 py-2.5 rounded-xl border border-amber-600 bg-amber-600 text-white shadow-md hover:opacity-90 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              {viewMode === "specific" ? "✨ Open All-In-One Page" : "🔒 Back to Specific Pages"}
            </button>
          </div>

          {/* Search Field */}
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

          {/* Category Badges — Hidden if Unified All-In-One page is active */}
          {viewMode === "specific" && (
            <div className="flex flex-wrap justify-center gap-2 font-sans text-xs font-bold tracking-wider pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full border border-[var(--foreground)] border-opacity-20 uppercase cursor-pointer transition-all bg-transparent ${selectedCategory === cat ? "bg-[var(--foreground)]! text-[var(--background)]!" : "text-[var(--foreground)] hover:border-[var(--accent)]"}`}
                >
                  {cat === "all" ? "📜 Show Specific: All" : cat}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Display Grid Platform */}
        <motion.section layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((post) => (
              <motion.div 
                layout
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveModalItem(post)} // Instantly maps current item to our Custom Literary Frame Component
                className="p-6 rounded-2xl bg-transparent border parchment-border transition-all hover:shadow-xl flex flex-col justify-between min-h-[220px] relative group cursor-pointer h-full"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center font-sans text-[10px] text-[var(--muted)] border-b parchment-border pb-2">
                    <span className="flex items-center gap-0.5 font-bold"><Hash className="w-3 h-3" /> {post.articleNo}</span>
                    <span className="uppercase font-semibold tracking-widest text-[var(--accent)]">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] font-serif">{post.title}</h3>
                  <p className="text-xs text-[var(--muted)] font-serif line-clamp-4 leading-relaxed italic whitespace-pre-line">
                    {Array.isArray(post.text) ? post.text[0] : post.text}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-dashed parchment-border flex justify-end">
                  <span className="font-sans text-[10px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:text-[var(--accent)] transition-colors">
                    Read in Luxury Frame <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

      </main>

      {/* RENDER MODAL: Mounted dynamically over viewport when an item card is active */}
      <AnimatePresence>
        {activeModalItem && (
          <LiteratureFrameModal 
            item={activeModalItem} 
            onClose={() => setActiveModalItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}