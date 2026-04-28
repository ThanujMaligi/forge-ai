import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forge-AI | The Elite Content Engine",
  description: "Transform event media into high-impact social assets and strategic intelligence using state-of-the-art multimodal AI.",
};

import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-primary/30 aura-bg min-h-screen relative`}>
        <div className="aura-blob aura-1" />
        <div className="aura-blob aura-2" />
        <Sidebar />
        <div className="pl-32 lg:pl-48 pr-6 md:pr-12">
          {children}
        </div>
      </body>
    </html>
  );
}
