"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BarChart3, Home, Music2, Settings, User, Users } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  // ฟังก์ชันช่วยเช็กว่าลิงก์นี้ Active อยู่ไหม
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Sidebar (Desktop Only) */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col hidden md:flex z-50">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Music AI
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Intelligent Rehearsal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive('/') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>
            <Home size={20} className={isActive('/') ? 'text-blue-400' : 'group-hover:text-blue-400 transition-colors'}/> หน้าแรก (Home)
          </Link>
          <Link href="/live" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive('/live') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>
            <Activity size={20} className={isActive('/live') ? 'text-green-400' : 'group-hover:text-green-400 transition-colors'}/> โหมดซ้อม (Live Monitor)
          </Link>
          <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive('/dashboard') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>
            <BarChart3 size={20} className={isActive('/dashboard') ? 'text-purple-400' : 'group-hover:text-purple-400 transition-colors'}/> ผลวิเคราะห์ (Analytics)
          </Link>
          
          <div className="pt-4 mt-4 border-t border-zinc-800">
            <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">My Band</p>
            <Link href="/repertoire" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all group ${isActive('/repertoire') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>
              <Music2 size={18} className={isActive('/repertoire') ? 'text-teal-400' : 'group-hover:text-teal-400'} /> รายชื่อเพลง (Repertoire)
            </Link>
            <Link href="/members" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all group ${isActive('/members') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>
              <Users size={18} className={isActive('/members') ? 'text-pink-400' : 'group-hover:text-pink-400'} /> สมาชิก (Members)
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-800">
           <button className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white w-full">
              <Settings size={20} /> ตั้งค่า (Settings)
           </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-between px-6 py-3 z-50 safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
          <Link href="/" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Home size={20} /> <span className="text-[9px] font-medium">Home</span>
          </Link>
          <Link href="/live" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/live') ? 'text-green-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Activity size={20} /> <span className="text-[9px] font-medium">Live</span>
          </Link>
          <Link href="/dashboard" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/dashboard') ? 'text-purple-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <BarChart3 size={20} /> <span className="text-[9px] font-medium">Stats</span>
          </Link>
          <Link href="/repertoire" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/repertoire') ? 'text-teal-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Music2 size={20} /> <span className="text-[9px] font-medium">Songs</span>
          </Link>
          <Link href="/members" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/members') ? 'text-pink-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Users size={20} /> <span className="text-[9px] font-medium">Band</span>
          </Link>
      </div>
    </>
  );
}