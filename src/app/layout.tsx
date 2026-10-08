import type { Metadata } from "next";
import { Inter, Noto_Sans_SC, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.scss";
import { I18nProvider } from "@/shared/lib/i18n";

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
  title: "rtmkvtn | Fullstack Web Engineer",
  description: "Engineering Scalable Digital Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansSC.variable} ${jetbrainsMono.variable} ${styles.html}`}>
      <body className={styles.body}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
