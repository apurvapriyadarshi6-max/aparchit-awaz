"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingCanvas from "@/components/FloatingCanvas";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Users, Send, Key, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LiveStage() {
  const [streamKey, setStreamKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [newRequest, setNewRequest] = useState("");
  const [queue, setQueue] = useState([]); // Completely cleaned - No mock data strings

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!newRequest.trim()) return;
    setQueue([...queue, { id: Date.now(), user: "Guest Contributor", notes: newRequest }]);
    setNewRequest("");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative pb-24">
      <Navbar />
      <FloatingCanvas />

      <main className="max-w-7xl mx-auto px-4 pt-36 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--accent)] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Media Core Component */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-[var(--foreground)] border-opacity-20 rounded-2xl bg-black aspect-video overflow-hidden relative shadow-md flex items-center justify-center text-white"
            >
              <iframe 
                className="w-full h-full border-0"
                src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
                title="Live Spoken Feed Stream"
                allowFullScreen
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white font-sans text-[10px] font-bold px-2.5 py-1 uppercase rounded-md tracking-widest flex items-center gap-1.5 animate-pulse">
                <Radio className="w-3 h-3" /> Live Broadcast
              </div>
            </motion.div>

            {/* Encoder Connection Frame */}
            <div className="p-6 rounded-2xl border parchment-border bg-[var(--background)] space-y-4">
              <h3 className="font-sans text-xs font-bold uppercase flex items-center gap-2 opacity-80">
                <Key className="w-4 h-4 text-[var(--accent)]" /> Streaming Key Connection
              </h3>
              <div className="flex gap-2">
                <input 
                  type={showKey ? "text" : "password"}
                  value={streamKey}
                  onChange={(e) => setStreamKey(e.target.value)}
                  placeholder="Paste your streaming server string directly here..."
                  className="flex-1 font-sans text-xs px-4 py-2.5 border border-[var(--foreground)] border-opacity-20 bg-transparent rounded-xl focus:outline-none"
                />
                <button 
                  onClick={() => setShowKey(!showKey)}
                  className="font-sans text-xs font-bold border border-[var(--foreground)] px-4 rounded-xl hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors cursor-pointer bg-transparent text-[var(--foreground)]"
                >
                  {showKey ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Request Board Module */}
          <div className="col-span-1 rounded-2xl p-6 flex flex-col justify-between h-[480px] border parchment-border bg-[var(--background)] shadow-sm">
            <div className="space-y-4 overflow-y-auto pr-1">
              <h3 className="font-sans text-xs font-bold uppercase border-b parchment-border pb-2 flex items-center gap-1.5 opacity-80">
                <Users className="w-4 h-4 text-[var(--accent)]" /> Request Board ({queue.length})
              </h3>
              
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {queue.map((item) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id}
                      className="p-3 border border-dashed border-[var(--foreground)] border-opacity-20 rounded-xl font-sans text-xs bg-black/5 dark:bg-white/5"
                    >
                      <p className="font-sans text-[10px] font-bold text-[var(--accent)]">@{item.user}</p>
                      <p className="mt-1 opacity-90 font-serif italic">{item.notes}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {queue.length === 0 && (
                  <div className="text-center py-20 opacity-40 font-serif text-xs italic">
                    No requests currently in queue.
                  </div>
                )}
              </div>
            </div>

            {/* Form Input Deck */}
            <form onSubmit={handleRequestSubmit} className="pt-4 border-t border-[var(--foreground)] border-opacity-20 relative">
              <input 
                type="text"
                value={newRequest}
                onChange={(e) => setNewRequest(e.target.value)}
                placeholder="Type your message or request here..."
                className="w-full font-sans text-xs pl-3 pr-10 py-3 border border-[var(--foreground)] border-opacity-20 bg-transparent rounded-xl focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)] hover:text-[var(--accent)] cursor-pointer bg-transparent border-0">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}