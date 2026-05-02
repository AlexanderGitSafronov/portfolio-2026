import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alexander Safronov — Full-stack developer",
  description:
    "Full-stack developer building modern web apps with Next.js, TypeScript and a love for clean product thinking. 14 live products shipped on Vercel.",
  metadataBase: new URL("https://portfolio-alexander-safronov.vercel.app"),
  authors: [{ name: "Alexander Safronov" }],
  keywords: [
    "Next.js",
    "TypeScript",
    "Full-stack developer",
    "React",
    "Tailwind",
    "Portfolio",
    "Vercel",
  ],
  openGraph: {
    title: "Alexander Safronov — Full-stack developer",
    description:
      "Full-stack developer building modern web apps. 14 live products shipped.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Safronov — Full-stack developer",
    description:
      "Full-stack developer building modern web apps. 14 live products shipped.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050509",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
