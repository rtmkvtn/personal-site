"use client";

import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/shared/lib/supabase/client";
import styles from "./layout.module.scss";
import clsx from "clsx";

const NAV_ITEMS = [
  { label: "DASHBOARD", href: "/admin" },
  { label: "PROJECTS", href: "/admin/projects" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    document.cookie =
      "sb-access-token=; path=/; max-age=0; SameSite=Lax";
    router.push("/admin/login");
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>CMS</div>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={clsx(
                styles.navItem,
                pathname === item.href && styles.navItemActive,
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button onClick={handleSignOut} className={styles.signOut}>
          SIGN OUT
        </button>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
