import "./globals.css";

export const metadata = {
  title: "The Apurva Library | Aparchit Awaz",
  description: "A high-end celestial literary portfolio, rhythmic text manuscripts, and spoken artifacts by Apurva Priyadarshi.",
  icons: {
    icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%231c1917'/%3E%3Cpath d='M50 25 L70 55 L60 55 L60 75 L40 75 L40 55 L30 55 Z' fill='%23d4af37'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23fdfaf2'/%3E%3Cline x1='50' y1='25' x2='50' y2='47' stroke='%231c1917' stroke-width='2'/%3E%3C/svg%3E`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen relative selection:bg-[var(--foreground)] selection:text-[var(--background)]">
        {children}
      </body>
    </html>
  );
}