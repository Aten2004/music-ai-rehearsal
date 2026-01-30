import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./Navigation"; // Import เมนูที่เราเพิ่งสร้าง

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Music Rehearsal",
  description: "Real-time Music Analysis System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white flex h-screen overflow-hidden`}>
        
        {/* เรียกใช้ Component เมนูที่แยกออกมา */}
        <Navigation />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-black relative pb-24 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}