export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-on-surface/40">
        &copy; {new Date().getFullYear()} STUDIO MONOLITH
      </span>

      <div className="flex items-center gap-6">
        {[
          { label: "INSTAGRAM", href: "#" },
          { label: "LINKEDIN", href: "#" },
          { label: "TWITTER", href: "#" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-on-surface/40 transition-opacity duration-300 hover:opacity-60"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
