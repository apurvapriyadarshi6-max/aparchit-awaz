"use client";
export default function FloatingCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 h-full w-full shaded-canvas-bg">
      {/* Subtle modern layout lines overlay */}
      <div className="absolute inset-0 opacity-25" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />
    </div>
  );
}