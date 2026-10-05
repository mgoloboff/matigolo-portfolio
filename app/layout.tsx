import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Matias Goloboff · Product Designer",
  description:
    "Product Designer specializing in complex B2B systems. Turning complex into clarity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${spaceMono.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
