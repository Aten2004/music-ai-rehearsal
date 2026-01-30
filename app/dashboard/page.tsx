"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Calendar, ChevronDown, User, TrendingUp, AlertTriangle, Music, Clock, Zap, Target, Filter } from 'lucide-react';

// --- Mock Data (ปรับเป็นภาษาไทย) ---
const MEMBERS_DATA: Record<string, any> = {
  "Mild (Vocals)": {
    role: "Vocals",
    radar: [
      { subject: 'Pitch (คีย์)', A: 78, fullMark: 100 },
      { subject: 'Timing (จังหวะ)', A: 90, fullMark: 100 },
      { subject: 'Dynamics (หนักเบา)', A: 95, fullMark: 100 },
      { subject: 'Pronounce (คำร้อง)', A: 85, fullMark: 100 },
      { subject: 'Stage Pres.', A: 92, fullMark: 100 },
    ],
    trend: [70, 75, 72, 80, 85, 88],
    feedback: [
       { type: 'crit', time: '0:45', msg: 'Pitch ตกตอนขึ้นเสียงสูง (High C note)' },
       { type: 'good', time: '2:10', msg: 'Control Vibrato ได้ดีเยี่ยม' }
    ]
  },
  "Pang (Guitar)": {
    role: "Guitar",
    radar: [
      { subject: 'Timing', A: 85, fullMark: 100 },
      { subject: 'Speed', A: 92, fullMark: 100 },
      { subject: 'Clarity', A: 70, fullMark: 100 }, 
      { subject: 'Posture', A: 60, fullMark: 100 },
      { subject: 'Theory', A: 80, fullMark: 100 },
    ],
    trend: [65, 72, 70, 85, 88, 92],
    feedback: [
       { type: 'crit', time: '2:45', msg: 'Solo เร็วกว่าจังหวะ (+150ms)' },
       { type: 'warn', time: 'All', msg: 'ข้อมือเกร็งเกินไป เสี่ยงบาดเจ็บ (High Tension)' }
    ]
  },
  "Nut (Bass)": {
    role: "Bass",
    radar: [
      { subject: 'Timing', A: 98, fullMark: 100 }, 
      { subject: 'Groove', A: 95, fullMark: 100 },
      { subject: 'Creativity', A: 70, fullMark: 100 },
      { subject: 'Posture', A: 90, fullMark: 100 },
      { subject: 'Tone', A: 85, fullMark: 100 },
    ],
    trend: [90, 91, 90, 92, 93, 94], 
    feedback: [
       { type: 'info', time: 'All', msg: 'รักษามาตรฐานได้ดีมาก (Consistent)' }
    ]
  },
  "Earth (Drums)": {
    role: "Drums",
    radar: [
      { subject: 'Tempo', A: 96, fullMark: 100 },
      { subject: 'Stamina', A: 85, fullMark: 100 },
      { subject: 'Fills', A: 80, fullMark: 100 },
      { subject: 'Dynamics', A: 70, fullMark: 100 },
      { subject: 'Independence', A: 90, fullMark: 100 },
    ],
    trend: [80, 82, 85, 85, 89, 94],
    feedback: [
       { type: 'good', time: '1:20', msg: 'ลูกส่ง (Fill-in) ลงจังหวะเป๊ะมาก' },
       { type: 'warn', time: '3:00', msg: 'เร่งจังหวะเล็กน้อยช่วง Solo' }
    ]
  },
  "Fern (Keys)": {
    role: "Keys",
    radar: [
      { subject: 'Chords', A: 95, fullMark: 100 },
      { subject: 'Timing', A: 88, fullMark: 100 },
      { subject: 'Sound Design', A: 92, fullMark: 100 },
      { subject: 'Improv', A: 75, fullMark: 100 },
      { subject: 'Technique', A: 85, fullMark: 100 },
    ],
    trend: [75, 78, 80, 82, 85, 87],
    feedback: [
       { type: 'warn', time: '0:15', msg: 'Synth ดังกลบเสียงร้องช่วง Intro' }
    ]
  }
};

export default function Dashboard() {
  // State
  const [selectedMember, setSelectedMember] = useState("Pang (Guitar)");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  
  // State สำหรับควบคุม Dropdown
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // ดึงข้อมูลตามสมาชิกที่เลือก
  const data = MEMBERS_DATA[selectedMember] || MEMBERS_DATA["Pang (Guitar)"];

  // ปิด Dropdown เมื่อคลิกที่อื่น (Optional improvement)
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // @ts-ignore
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsMemberDropdownOpen(false);
        setIsDateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);


  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 space-y-6 pb-24 md:pb-8" ref={wrapperRef}>
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-3">
             <TrendingUp className="text-blue-500"/> ผลการวิเคราะห์ (Analytics)
           </h1>
           <p className="text-zinc-400 text-sm mt-1">Session ล่าสุด: #42 "Zombie" Rehearsal</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto z-20">
          
          {/* Date Dropdown */}
          <div className="relative flex-1 md:flex-none">
            <button 
              onClick={() => { setIsDateDropdownOpen(!isDateDropdownOpen); setIsMemberDropdownOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm hover:bg-zinc-800 transition-colors text-zinc-300 min-w-[160px]"
            >
              <Calendar size={16} /> {dateRange} <ChevronDown size={14} className={`transition-transform ${isDateDropdownOpen ? 'rotate-180' : ''}`}/>
            </button>
            
            {isDateDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                 {['Last 7 Days', 'Last 30 Days', 'This Month', 'All Time'].map((range) => (
                    <div key={range} 
                      onClick={() => { setDateRange(range); setIsDateDropdownOpen(false); }}
                      className="px-4 py-3 hover:bg-zinc-800 cursor-pointer text-sm text-zinc-300 border-b border-zinc-800 last:border-0"
                    >
                      {range}
                    </div>
                 ))}
              </div>
            )}
          </div>
          
          {/* Member Dropdown */}
          <div className="relative flex-1 md:flex-none">
             <button 
                onClick={() => { setIsMemberDropdownOpen(!isMemberDropdownOpen); setIsDateDropdownOpen(false); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20 font-bold min-w-[180px]"
             >
               <User size={16} /> {selectedMember} <ChevronDown size={14} className={`transition-transform ${isMemberDropdownOpen ? 'rotate-180' : ''}`}/>
             </button>
             
             {isMemberDropdownOpen && (
               <div className="absolute right-0 mt-2 w-full md:w-56 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {Object.keys(MEMBERS_DATA).map(name => (
                    <div key={name} 
                      onClick={() => { setSelectedMember(name); setIsMemberDropdownOpen(false); }}
                      className="px-4 py-3 hover:bg-zinc-800 cursor-pointer text-sm border-b border-zinc-800 last:border-0 flex items-center justify-between group/item"
                    >
                      <span>{name}</span>
                      {selectedMember === name && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
                  ))}
               </div>
             )}
          </div>

        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Skill Stack */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl z-0">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-zinc-200">
            <Target size={20} className="text-purple-500"/> ทักษะส่วนบุคคล (Skill Stack)
          </h2>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.radar}>
                <PolarGrid stroke="#3f3f46" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={selectedMember} dataKey="A" stroke="#8b5cf6" strokeWidth={3} fill="#8b5cf6" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px' }}/>
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="absolute bottom-0 right-0 bg-zinc-950/80 p-2 rounded-lg border border-zinc-800 text-xs">
               <div className="text-zinc-500">Overall Rating</div>
               <div className="text-xl font-bold text-purple-400">
                  {(data.radar.reduce((a:number, b:any) => a + b.A, 0) / 5).toFixed(1)}/100
               </div>
            </div>
          </div>
        </div>

        {/* Card 2: Trend Line */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:col-span-2 backdrop-blur-sm shadow-xl z-0">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-zinc-200">
            <Zap size={20} className="text-yellow-500"/> พัฒนาการความสม่ำเสมอ (Consistency)
          </h2>
          <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.trend.map((s:number, i:number) => ({ day: `Week ${i+1}`, score: s }))}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="day" stroke="#52525b" tick={{fontSize: 12}} />
                  <YAxis stroke="#52525b" tick={{fontSize: 12}} domain={[50, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px' }}/>
                  <Area type="monotone" dataKey="score" stroke="#eab308" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 3: Feedback */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-zinc-200">
             <AlertTriangle size={20} className="text-red-500"/> จุดที่ต้องแก้ไขด่วน (Critical Feedback)
          </h2>
          <div className="space-y-3">
             {data.feedback.map((fb:any, i:number) => (
                <div key={i} className={`p-4 rounded-xl border flex gap-4 items-start transition-all hover:scale-[1.02] ${
                  fb.type === 'crit' ? 'bg-red-500/10 border-red-500/20' : 
                  fb.type === 'warn' ? 'bg-yellow-500/10 border-yellow-500/20' : 
                  'bg-green-500/10 border-green-500/20'
                }`}>
                   <div className={`mt-1 w-3 h-3 shrink-0 rounded-full ${
                      fb.type === 'crit' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : fb.type === 'warn' ? 'bg-yellow-500' : 'bg-green-500'
                   }`} />
                   <div>
                      <div className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                         <Clock size={12} className="text-zinc-500"/> {fb.time}
                         {fb.type === 'crit' && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">High Priority</span>}
                      </div>
                      <div className="text-zinc-400 text-sm mt-1">{fb.msg}</div>
                   </div>
                </div>
             ))}
             {data.feedback.length === 0 && <div className="text-zinc-500 text-center py-4">ไม่พบจุดผิดพลาดร้ายแรง (Great job!)</div>}
          </div>
        </div>

        {/* Card 4: Highlights */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-zinc-200">
             <Music size={20} className="text-blue-500"/> คลิปไฮไลท์ (Smart Highlights)
          </h2>
          <div className="grid grid-cols-2 gap-4">
             {[1, 2, 3, 4].map((clip) => (
               <div key={clip} className="group relative aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 cursor-pointer hover:border-blue-500 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <div className="absolute inset-0 bg-zinc-800 opacity-50"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                     <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-blue-500 group-hover:border-blue-500 transition-colors">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                     </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                     <div className="text-xs font-bold text-white flex justify-between">
                        <span>Clip #{clip}</span>
                        <span className="text-zinc-400 font-mono">00:1{clip}</span>
                     </div>
                     <div className="text-[10px] text-blue-400 mt-0.5">Focus: {clip % 2 === 0 ? 'Timing' : 'Solo'}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

      </div>

    </div>
  );
}