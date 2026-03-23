"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/shared/config";

export function Header() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
      <Link
        href="/"
        className="text-primary text-[0.6875rem] font-semibold uppercase tracking-[0.1em] transition-opacity duration-300 hover:opacity-60"
      >
        rtmkvtn
      </Link>

      <div className="flex items-center gap-4 sm:gap-8">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative text-[0.6875rem] font-semibold uppercase tracking-[0.1em] ${isActive ? "text-primary" : "text-on-surface"} transition-opacity duration-300 hover:opacity-60`}
            >
              {label}
              {isActive && (
                <span className="absolute -bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
