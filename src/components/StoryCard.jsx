import { Clock, ArrowUpRight } from "lucide-react";

export default function StoryCard({ story }) {
  const isLarge = story.size === "large";
  
  return (
    <div className={`p-6 sm:p-8 rounded-2xl border parchment-border flex flex-col justify-between transition-all hover:shadow-2xl bg-[var(--background)] ${isLarge ? "md:col-span-2 row-span-1 min-h-[300px]" : "col-span-1 min-h-[240px]"}`}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs uppercase tracking-widest text-[var(--accent)] px-2.5 py-0.5 border border-[var(--accent)] rounded-full font-sans">
            {story.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-[var(--muted)] font-sans">
            <Clock className="w-3 h-3" /> {story.readingTime}
          </span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight mb-2">{story.title}</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3 font-sans">{story.excerpt}</p>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="flex items-center gap-1 text-xs uppercase tracking-wider font-sans hover:text-[var(--accent)] group cursor-pointer">
          Read Verse <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}