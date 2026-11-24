import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display", axes: ["opsz", "wdth"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic", "normal"], variable: "--f-serif" });

export const metadata: Metadata = {
  title: "Muhammad Bilal · Full-Stack Developer, Laravel & AI Agents",
  description: "Full-stack developer building scalable Laravel APIs, web and mobile apps, real-time video platforms with LiveKit, and AI agents with Anthropic, n8n and Retell.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
