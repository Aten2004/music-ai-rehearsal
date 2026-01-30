import Link from 'next/link';
import { Activity, BarChart3, Mic2, PlayCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black text-white">
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center pt-20 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 animate-fade-in-up">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: AI Pitch Correction Analysis
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent mb-6 max-w-4xl tracking-tight">
          Elevate Your Band's Performance with AI.
        </h1>
        
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          ระบบวิเคราะห์การซ้อมดนตรีอัจฉริยะที่ช่วยให้คุณเห็นทุกจุดผิดพลาด
          <br className="hidden md:block"/> ด้วยเทคโนโลยี Computer Vision และ Audio Processing แบบ Real-time
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
          <Link href="/live" className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-full hover:bg-zinc-200 transition-all hover:scale-105">
            <Activity size={20} /> Start Rehearsal
          </Link>
          <Link href="/dashboard" className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-white font-bold py-4 rounded-full hover:bg-zinc-800 transition-all hover:scale-105">
            View Analytics <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 transition-all group">
           <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
             <Activity size={24} />
           </div>
           <h3 className="text-xl font-bold mb-2">Real-time Feedback</h3>
           <p className="text-zinc-400 text-sm">AI จับตาดูจังหวะและท่าทางของคุณขณะเล่น พร้อมแจ้งเตือนทันทีเมื่อมีความผิดพลาด</p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-all group">
           <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
             <BarChart3 size={24} />
           </div>
           <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
           <p className="text-zinc-400 text-sm">เก็บสถิติและสร้างกราฟพัฒนาการรายบุคคล (Stack) เพื่อให้เห็นจุดแข็งและจุดที่ต้องแก้</p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-green-500/50 transition-all group">
           <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
             <PlayCircle size={24} />
           </div>
           <h3 className="text-xl font-bold mb-2">Smart Highlights</h3>
           <p className="text-zinc-400 text-sm">ไม่ต้องนั่งหาคลิปเอง ระบบตัดช่วงที่เล่นพลาดหรือช่วงที่ดีที่สุดให้อัตโนมัติหลังซ้อมเสร็จ</p>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-zinc-900 mt-12 py-8 text-center text-zinc-600 text-sm">
        <p>© 2026 Senior Project Prototype. Computer Science, Thammasat University.</p>
      </div>
    </div>
  );
}