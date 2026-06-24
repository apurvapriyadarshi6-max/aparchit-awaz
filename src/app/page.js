"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ShayariSlider from "@/components/ShayariSlider";
import FloatingCanvas from "@/components/FloatingCanvas";
import LiteratureFrameModal from "@/components/LiteratureFrameModal";
import { contentDatabase, customNotifications } from "@/data/posts";
import { Bell, ArrowUpRight, Search, Hash, X, Layers, Sparkles, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("specific");
  const [search, setSearch] = useState("");
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [notifyIdx, setNotifyIdx] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  
  // Real-Time Scroll Engine configuration trackers
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const previousValue = scrollY.getPrevious() || 0;
    if (latestValue > previousValue && latestValue > 80) {
      setIsHeaderHidden(true);
    } else {
      setIsHeaderHidden(false);
    }
  });

  const categories = ["all", "shayari", "ghazal", "story", "blog", "kavitaye"];

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--ios-bg", "#000000");
      root.style.setProperty("--ios-text", "#ffffff");
      root.style.setProperty("--ios-card", "#1c1c1e");
      root.style.setProperty("--ios-card-hover", "#2c2c2e");
      root.style.setProperty("--ios-muted", "#8e8e93");
      root.style.setProperty("--ios-border", "rgba(255, 255, 255, 0.06)");
      root.style.setProperty("--ios-input", "rgba(28, 28, 30, 0.7)");
      root.style.setProperty("--ios-active-segment", "#2c2c2e");
    } else {
      root.style.setProperty("--ios-bg", "#f2f2f7"); 
      root.style.setProperty("--ios-text", "#000000"); 
      root.style.setProperty("--ios-card", "#ffffff"); 
      root.style.setProperty("--ios-card-hover", "#e5e5ea");
      root.style.setProperty("--ios-muted", "#636366");
      root.style.setProperty("--ios-border", "rgba(0, 0, 0, 0.05)");
      root.style.setProperty("--ios-input", "rgba(255, 255, 255, 0.8)");
      root.style.setProperty("--ios-active-segment", "#ffffff");
    }
  }, [isDarkMode]);

  const filtered = contentDatabase.filter(item => {
    const isShayari = item.category === "shayari";
    const isGhazal = item.category === "ghazal";

    const rawText = item.text ? (Array.isArray(item.text) ? item.text[0] : item.text) : "";
    const totalPoeticLines = rawText.split("\n").filter(line => line.trim() !== "").length;
    
    if (isShayari && totalPoeticLines > 5) return false;
    if (isGhazal && totalPoeticLines > 10) return false;

    const matchesCat = viewMode === "unified" || selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.articleNo.includes(search);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col relative font-sans antialiased transition-colors duration-300" style={{ backgroundColor: "var(--ios-bg)", color: "var(--ios-text)" }}>
      <FloatingCanvas />

      {/* 1. MASTER UNIFIED STICKY HEADER SYSTEM — Cleaned up to exclude old button styling conflicts */}
      <motion.div 
        animate={{ y: isHeaderHidden ? -180 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-[100] w-full flex flex-col gap-3 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <Navbar />
        </div>

        {/* System Broadcast Island Banner Layout Panel */}
        <div className="max-w-xl w-full mx-auto px-4 flex flex-col gap-3 pointer-events-auto">
          <AnimatePresence>
            {showNotification && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full px-5 py-3.5 rounded-[28px] shadow-xl flex items-center justify-between gap-4 border relative backdrop-blur-2xl"
                style={{ backgroundColor: "var(--ios-card)", borderColor: "var(--ios-border)" }}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-inner">
                    <Bell className="w-4 h-4 text-amber-500 animate-pulse" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <span className="text-[10px] font-black tracking-widest uppercase text-amber-500 block">System Broadcast</span>
                    <p className="text-[13px] font-semibold tracking-wide truncate leading-snug" style={{ color: "var(--ios-text)" }}>
                      {customNotifications[notifyIdx]}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    type="button"
                    onClick={() => setNotifyIdx((prev) => (prev + 1) % customNotifications.length)}
                    className="text-[11px] font-black uppercase tracking-widest text-amber-500 px-3 py-2 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 border-0 cursor-pointer transition-colors"
                  >
                    Next
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowNotification(false)} 
                    className="p-2 rounded-full border-0 cursor-pointer bg-neutral-200/50 dark:bg-neutral-800/60 hover:scale-105 transition-transform text-inherit"
                  >
                    <X className="w-3.5 h-3.5 opacity-70" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CORE DISPLAY STAGE */}
      <main className="max-w-5xl w-full mx-auto px-4 pt-44 space-y-12 flex-1">
        
        {/* Minimal System Header Line */}
        <section className="text-center py-2">
          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-6xl font-black tracking-tight mb-2 font-sans">
            The Apurva Library
          </motion.h1>
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase opacity-50">
            Aparchit Awaz
          </p>
        </section>

        <ShayariSlider />

        {/* OPERATION SELECTION TOOLBAR CONTAINER */}
        <section className="space-y-4 max-w-2xl mx-auto">
          {/* iOS-Style Integrated Search Capsule */}
          <div className="relative border rounded-2xl backdrop-blur-xl shadow-sm transition-all" style={{ backgroundColor: "var(--ios-input)", borderColor: "var(--ios-border)" }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input 
              type="text" 
              placeholder="Search verses by phrasing or id code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-[14px] font-normal pl-11 pr-4 py-3 bg-transparent border-0 focus:outline-none placeholder-neutral-500"
              style={{ color: "var(--ios-text)" }}
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => {
                setViewMode(viewMode === "specific" ? "unified" : "specific");
                setSelectedCategory("all");
              }}
              className="font-sans text-[12px] font-bold tracking-wide px-4 py-2 rounded-full border-0 shadow-md flex items-center gap-2 cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--ios-card)", color: "var(--ios-text)" }}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              {viewMode === "specific" ? "Open All-In-One Stream" : "Filter Specific Lists"}
            </motion.button>
          </div>

          {/* iOS SEGMENTED SELECTOR CONTROL MATRIX */}
          {viewMode === "specific" && (
            <div className="w-full p-1 rounded-xl backdrop-blur-xl border flex overflow-x-auto scrollbar-none snap-x transition-colors" style={{ backgroundColor: "var(--ios-input)", borderColor: "var(--ios-border)" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className="flex-1 min-w-[75px] text-center font-sans text-[12px] font-bold py-2 rounded-lg transition-all border-0 cursor-pointer snap-center relative"
                  style={{
                    backgroundColor: selectedCategory === cat ? "var(--ios-active-segment)" : "transparent",
                    color: "var(--ios-text)",
                    boxShadow: selectedCategory === cat ? "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)" : "none",
                    opacity: selectedCategory === cat ? 1 : 0.6
                  }}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* DISPLAY LIST GRID PLATFORM */}
        <motion.section layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((post) => (
              <motion.div 
                layout
                key={post.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl shadow-sm border flex flex-col justify-between p-5 relative overflow-hidden group h-full min-h-[190px] transition-colors"
                style={{ backgroundColor: "var(--ios-card)", borderColor: "var(--ios-border)" }}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[11px] font-bold tracking-wider uppercase">
                    <span className="flex items-center gap-0.5 opacity-40"><Hash className="w-3 h-3" /> {post.articleNo}</span>
                    <span className="text-amber-500 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded-full text-[10px]">{post.category}</span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--ios-text)" }}>{post.title}</h3>
                  <p className="text-[13px] font-normal line-clamp-3 leading-relaxed whitespace-pre-line" style={{ color: "var(--ios-muted)" }}>
                    {Array.isArray(post.text) ? post.text[0] : post.text}
                  </p>
                </div>

                <div className="mt-4 pt-1">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => setActiveModalItem(post)}
                    className="w-full text-center font-sans text-[12px] py-2.5 px-4 rounded-xl border-0 text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-inner font-bold"
                  >
                    <span>OPEN</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>
      </main>

      {/* DYNAMIC APP-BOX ICON FOOTER BLOCK */}
      <footer className="w-full max-w-xl mx-auto px-4 mt-20 pb-12 shrink-0">
        <div 
          className="grid grid-cols-3 gap-3 p-3 rounded-[28px] border backdrop-blur-xl shadow-2xl transition-colors justify-items-center bg-neutral-200/20 dark:bg-neutral-900/40" 
          style={{ borderColor: "var(--ios-border)" }}
        >
          {/* YouTube App Block */}
          <a href="#" className="no-underline block w-full">
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              className="w-full h-14 rounded-2xl bg-gradient-to-b from-[#ff0000] to-[#cc0000] shadow-md border-0 flex items-center justify-center cursor-pointer"
            >
              <span className="italic text-white tracking-wide text-sm font-bold capitalize select-none" style={{ fontFamily: "'Georgia', cursive, serif" }}>
                YouTube
              </span>
            </motion.button>
          </a>

          {/* Instagram Custom Gradient Box */}
          <a href="https://instagram.com/apurva4383" target="_blank" rel="noopener noreferrer" className="no-underline block w-full">
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              className="w-full h-14 rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-md border-0 flex items-center justify-center cursor-pointer"
            >
              <span className="italic text-white tracking-wide text-xs font-bold select-none" style={{ fontFamily: "'Georgia', cursive, serif" }}>
                Instagram
              </span>
            </motion.button>
          </a>

          {/* LinkedIn Metallic Box */}
          <a href="https://www.linkedin.com/in/apurva-priyadarshi-331955343" target="_blank" rel="noopener noreferrer" className="no-underline block w-full">
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              className="w-full h-14 rounded-2xl bg-gradient-to-b from-[#0077b5] to-[#005582] shadow-md border-0 flex items-center justify-center cursor-pointer"
            >
              <span className="italic text-white tracking-wide text-sm font-bold capitalize select-none" style={{ fontFamily: "'Georgia', cursive, serif" }}>
                LinkedIn
              </span>
            </motion.button>
          </a>
        </div>
      </footer>

      {/* 2. FIXED RIGHT BOTTOM CORNER FLOATING ACTION BUTTON (FAB) FOR SKIN THEME CONTROLS */}
      <div className="fixed bottom-6 right-6 z-[120]">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-14 h-14 rounded-full border border-neutral-200/20 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-2xl flex items-center justify-center cursor-pointer transition-all focus:outline-none"
          title="Toggle Skin Theme"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-amber-500 animate-spin-slow" />
          ) : (
            <Moon className="w-6 h-6 text-indigo-600" />
          )}
        </motion.button>
      </div>

      {/* Overlay Popup Modal Injector */}
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