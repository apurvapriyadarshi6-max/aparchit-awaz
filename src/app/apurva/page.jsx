"use client";
import Navbar from "@/components/Navbar";
import FloatingCanvas from "@/components/FloatingCanvas";
import { motion } from "framer-motion";
import { ArrowLeft, Feather, BookOpen, Heart, Compass, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ApurvaBiography() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative pb-24">
      <Navbar />
      <FloatingCanvas />
      
      <main className="max-w-4xl mx-auto px-4 pt-36 space-y-12">
        
        {/* Navigation Breadcrumb back to Home Dashboard */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/" className="font-sans text-xs uppercase tracking-wider font-bold text-[var(--accent)] flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> 🏠 Home
          </Link>
        </motion.div>

        {/* Hero Identity Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 sm:p-12 rounded-2xl border parchment-border text-center space-y-6 bg-[var(--background)] shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 celestial-glow w-64 h-64 mx-auto rounded-full -z-10 opacity-40" />
          
          <div className="w-20 h-20 mx-auto rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center font-serif font-bold text-3xl shadow-md">
            AP
          </div>
          
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase">Apurva Priyadarshi</h1>
            <p className="font-sans text-xs tracking-widest uppercase text-[var(--accent)] font-bold">
              The Voice Behind Aparchit Awaz
            </p>
          </div>

          {/* Premium Hero Quote */}
          <div className="max-w-2xl mx-auto pt-4 border-t border-dashed border-neutral-300 dark:border-neutral-700">
            <p className="font-serif text-lg sm:text-xl italic leading-relaxed text-[var(--muted)]">
              "I do not write to be heard by everyone. I write so that somewhere, someone may discover their own voice hidden within my words."
            </p>
            <span className="font-sans text-[10px] uppercase tracking-widest font-bold mt-2 block opacity-60">— Apurva Priyadarshi</span>
          </div>
        </motion.div>

        {/* Detailed Literary Article Sections */}
        <div className="space-y-10 font-serif text-base sm:text-lg leading-relaxed text-[var(--foreground)] opacity-95">
          
          {/* Section 1: Intro Narrative */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p>
              In a world overflowing with noise, some voices choose silence as their language and words as their universe. 
              Apurva Priyadarshi is one such writer, creating a unique literary space where emotions, thoughts, dreams, 
              and unanswered questions find their place through poetry, shayari, stories, blogs, and reflective writings.
            </p>
          </motion.section>

          {/* Section 2: Split Insight Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs uppercase tracking-wider font-bold">
            <div className="p-6 rounded-2xl border parchment-border bg-[var(--background)] space-y-3 shadow-sm">
              <span className="text-[var(--accent)] flex items-center gap-1.5"><Heart className="w-4 h-4" /> About the Author</span>
              <p className="font-serif normal-case tracking-normal font-normal text-sm text-[var(--muted)] leading-relaxed">
                Apurva Priyadarshi is an independent literary creator and digital writer whose works explore the depths of human emotions, self-discovery, time, memory, solitude, and imagination. Through a blend of Hindi and English literature, he seeks to transform ordinary experiences into meaningful artistic expressions.
              </p>
            </div>

            <div className="p-6 rounded-2xl border parchment-border bg-[var(--background)] space-y-3 shadow-sm">
              <span className="text-[var(--accent)] flex items-center gap-1.5"><Compass className="w-4 h-4" /> The Vision of Aparchit Awaz</span>
              <p className="font-serif normal-case tracking-normal font-normal text-sm text-[var(--muted)] leading-relaxed">
                "Aparchit Awaz" (The Unknown Voice) is more than a collection of writings—it is a digital sanctuary for thoughts that often remain unspoken. The platform was created with the belief that every emotion deserves a voice, every memory deserves a place, and every reader deserves a moment of reflection.
              </p>
            </div>
          </div>

          {/* Section 3: Core Bullet Focus Vectors */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border parchment-border bg-[var(--background)] space-y-4"
          >
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--foreground)] border-b parchment-border pb-2 flex items-center gap-2">
              <Feather className="w-4 h-4 text-[var(--accent)]" /> Core Core thematic Focus
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-serif text-sm italic text-[var(--muted)] pl-4 list-disc">
              <li>Human emotions and relationships</li>
              <li>Dreams, memories, and nostalgia</li>
              <li>Self-reflection and personal growth</li>
              <li>Philosophical observations</li>
              <li>Contemporary social thoughts</li>
              <li>Cosmic and existential imagination</li>
            </ul>
          </motion.section>

          {/* Section 4: Writing Style Overview */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--foreground)]">Writing Style Architecture</h3>
            <p className="text-sm sm:text-base">
              The literary style of Apurva Priyadarshi combines classical poetic sensitivity with modern narrative expression, 
              minimalist emotional depth, and philosophical introspection. His works frequently use symbolic and cosmic imagery—metaphors involving shadows, stars, time, journeys, windows, memories, and forgotten conversations to create immersive emotional landscapes.
            </p>
          </motion.section>

          {/* Section 5: Structural Philosophy & Outro Msg */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl text-center space-y-4 bg-black/5 dark:bg-white/5"
          >
            <h4 className="font-serif text-xl font-bold italic text-[var(--foreground)]">
              "Words are not merely written; they are lived, felt, and remembered."
            </h4>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-2xl mx-auto">
              Every piece published on Aparchit Awaz attempts to preserve a fragment of human experience. Some writings are inspired by reality, some by imagination, and some by the countless emotions that exist between the two. If even one line makes you pause, think, smile, remember, or feel understood, then the purpose of these writings has been fulfilled.
            </p>
            <div className="pt-2 font-sans text-xs uppercase tracking-wider font-bold text-[var(--accent)]">
              — Apurva Priyadarshi <br />
              <span className="text-[10px] text-[var(--muted)] lowercase font-normal italic font-serif">Founder & Author, Aparchit Awaz</span>
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  );
}