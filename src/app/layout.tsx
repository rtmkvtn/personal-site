import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Inter, Noto_Sans_SC, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.scss";
import {
  I18nProvider,
  LOCALE_COOKIE,
  resolveRequestLocale,
} from "@/shared/lib/i18n";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600"],
  display: "swap",
  variable: "--font-noto-sans-sc",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "rtmkvtn | AI-First Fullstack Engineer",
  description: "Engineering Scalable Digital Infrastructure",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  const locale = resolveRequestLocale(
    cookieStore.get(LOCALE_COOKIE)?.value,
    headerList.get("accept-language"),
  );

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansSC.variable} ${jetbrainsMono.variable} ${styles.html}`}>
      <body className={styles.body}>
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
