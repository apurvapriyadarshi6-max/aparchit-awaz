export default function VideoPlayer({ video }) {
  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden border parchment-border shadow-xl bg-black">
      <iframe 
        src={video.url} 
        className="w-full h-full opacity-90 hover:opacity-100 transition-opacity border-0" 
        allowFullScreen 
        title={video.title}
      />
    </div>
  );
}