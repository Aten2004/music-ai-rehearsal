import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Activity, BarChart3, Home, Music2, Settings, User, Users } from "lucide-react";

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
        
        {/* Sidebar (Desktop) */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col hidden md:flex z-50">
          <div className="p-6 border-b border-zinc-800">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Music AI
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Intelligent Rehearsal</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all group">
              <Home size={20} className="group-hover:text-blue-400 transition-colors"/> หน้าแรก (Home)
            </Link>
            <Link href="/live" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all group">
              <Activity size={20} className="group-hover:text-green-400 transition-colors"/> โหมดซ้อม (Live Monitor)
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all group">
              <BarChart3 size={20} className="group-hover:text-purple-400 transition-colors"/> ผลวิเคราะห์ (Analytics)
            </Link>
            
            <div className="pt-4 mt-4 border-t border-zinc-800">
              <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">My Band</p>
              {/* เปลี่ยนปุ่มเป็น Link ตรงนี้ครับ */}
              <Link href="/repertoire" className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
                <Music2 size={18} /> รายชื่อเพลง (Repertoire)
              </Link>
              <Link href="/members" className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
                <Users size={18} /> สมาชิก (Members)
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-zinc-800">
             <button className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white w-full">
                <Settings size={20} /> ตั้งค่า (Settings)
             </button>
          </div>
        </aside>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around p-3 z-50 safe-area-bottom">
            <Link href="/" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-blue-400">
              <Home size={20} /> <span className="text-[10px]">Home</span>
            </Link>
            <Link href="/live" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-green-400">
              <Activity size={20} /> <span className="text-[10px]">Live</span>
            </Link>
            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-purple-400">
              <BarChart3 size={20} /> <span className="text-[10px]">Stats</span>
            </Link>
            <Link href="/members" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-pink-400">
              <Users size={20} /> <span className="text-[10px]">Band</span>
            </Link>
        </div>

        <main className="flex-1 overflow-auto bg-black relative pb-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}