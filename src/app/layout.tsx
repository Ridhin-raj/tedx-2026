import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "coming soon",
  description:
    "Every breakthrough begins as an anomaly. TEDxCUSAT 2026 — Coming Soon.",
  metadataBase: new URL("https://tedxcusat.in"),
  openGraph: {
    title: "TEDxCUSAT 2026 | ANOMALY",
    description: "Every breakthrough begins as an anomaly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxCUSAT 2026 | ANOMALY",
    description: "Every breakthrough begins as an anomaly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
