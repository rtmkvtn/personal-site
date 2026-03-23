export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-widest text-on-surface/40">
        &copy; {new Date().getFullYear()} rtmkvtn
      </span>

      <div className="flex items-center gap-6">
        {[
          { label: "LINKEDIN", href: "#" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6875rem] font-semibold uppercase tracking-widest text-on-surface/40 transition-opacity duration-300 hover:opacity-60"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
