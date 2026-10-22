import { Geist_Mono, Host_Grotesk, Inter } from "next/font/google";

// Same pairing as the SSC back office: Inter carries UI and running text,
// Host Grotesk sets headings and big numbers, Geist Mono sets labels. Every
// root document (locale layout, not-found, dashboard) loads all three.
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${inter.variable} ${hostGrotesk.variable} ${geistMono.variable}`;
