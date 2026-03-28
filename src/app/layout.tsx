import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.scss";
import { I18nProvider } from "@/shared/lib/i18n";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "rtmkvtn | Fullstack Web Engineer",
  description: "Engineering Scalable Digital Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${styles.html}`}>
      <body className={styles.body}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
