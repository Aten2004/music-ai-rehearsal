"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Activity, AlertCircle, Play, Square, Mic, Video, ChevronDown, Circle, Music, Settings2, RefreshCw } from 'lucide-react';

// ข้อมูลสมาชิก (ตำแหน่งเริ่มต้น)
const FULL_BAND_MEMBERS = [
  { id: 1, name: "Mild", role: "Vocals", x: 42, y: 15, width: 16, height: 35 },
  { id: 2, name: "Pang", role: "Guitar", x: 15, y: 30, width: 18, height: 40 },
  { id: 3, name: "Fern", role: "Keys", x: 68, y: 35, width: 22, height: 30 },
  { id: 4, name: "Nut", role: "Bass", x: 28, y: 25, width: 18, height: 40 },
  { id: 5, name: "Earth", role: "Drums", x: 45, y: 40, width: 20, height: 30 },
];

// รายชื่อเพลงจำลอง
const SONG_LIST = [
  "Zombie - The Cranberries",
  "Don't Look Back In Anger - Oasis",
  "Creep - Radiohead",
  "Sweet Child O' Mine - Guns N' Roses"
];

export default function LiveMonitor() {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  
  // Song Selection State
  const [selectedSong, setSelectedSong] = useState(SONG_LIST[0]);
  const [isSongDropdownOpen, setIsSongDropdownOpen] = useState(false);

  // Simulation State
  const [metrics, setMetrics] = useState(FULL_BAND_MEMBERS.map(m => ({ 
    ...m, bpm: 120, accuracy: 100, warning: null as string | null,
    currentX: m.x, currentY: m.y // ใช้สำหรับ animate การขยับตัว
  })));
  const [logs, setLogs] = useState<{time: string, msg: string, type: 'info'|'warn'|'good'}[]>([]);
  
  // Ref สำหรับ Auto-scroll logs
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll function
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Simulation Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
        
        setMetrics(prev => prev.map(m => {
          // 1. Simulate BPM & Accuracy fluctuation
          let newBpm = 120 + (Math.random() * 2 - 1);
          let newAccuracy = Math.min(100, m.accuracy + 0.1);
          let warning = null;
          
          // Random Events
          if (Math.random() > 0.98) {
             warning = "Tempo Drift (จังหวะแกว่ง)";
             newBpm += 4;
          }

          // 2. Simulate Movement (Drift) - ทำให้กรอบขยับไปมาเหมือนคนโยกตัว
          const driftX = (Math.random() - 0.5) * 0.5; // ขยับซ้ายขวาเล็กน้อย
          const driftY = (Math.random() - 0.5) * 0.2; // ขยับขึ้นลงเล็กน้อย
          const newX = Math.max(0, Math.min(90, m.currentX + driftX)); // กันหลุดขอบ
          const newY = Math.max(0, Math.min(90, m.currentY + driftY));

          return { 
            ...m, 
            bpm: Math.round(newBpm), 
            accuracy: newAccuracy, 
            warning,
            currentX: newX,
            currentY: newY
          };
        }));

        // 3. Generate Random Logs (ภาษาไทย)
        if (Math.random() > 0.8) {
           const timeStr = new Date().toLocaleTimeString('th-TH', { hour12: false, minute: '2-digit', second: '2-digit' });
           const logTypes = [
             {msg: "Guitar: Off beat slightly (หลุดจังหวะนิดหน่อย)", type: 'warn'}, 
             {msg: "Drums: Good Fill-in (ลูกส่งดีมาก)", type: 'good'}, 
             {msg: "Vocals: Pitch Perfect (คีย์เป๊ะ)", type: 'good'},
             {msg: "Bass: Sync Stable (คุมจังหวะนิ่ง)", type: 'info'}
           ] as const;
           const randomLog = logTypes[Math.floor(Math.random() * logTypes.length)];
           setLogs(prev => [...prev.slice(-49), { time: timeStr, ...randomLog }]); // เก็บแค่ 50 logs ล่าสุด
        }
      }, 1000); // Update ทุก 1 วินาที
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStop = () => {
    setIsRecording(false);
  };

  const handleReset = () => {
    setIsRecording(false);
    setDuration(0);
    setLogs([]);
    setMetrics(FULL_BAND_MEMBERS.map(m => ({ ...m, bpm: 120, accuracy: 100, warning: null, currentX: m.x, currentY: m.y })));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col lg:flex-row bg-black text-white p-3 md:p-6 gap-4 overflow-y-auto lg:overflow-hidden pb-24 md:pb-6" onClick={() => setIsSongDropdownOpen(false)}>
      
      {/* Left Column: Video Feed & Controls */}
      <div className="flex-1 flex flex-col gap-4 h-full min-h-min">
         
         {/* Control Bar */}
        <div className="bg-zinc-900 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center border border-zinc-800 shadow-xl gap-4 z-20">
          
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            
            {/* Song Selector */}
            <div className="relative flex flex-col min-w-[200px]">
               <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-1">เพลงที่เล่นอยู่ (Current Song)</span>
               <button 
                  onClick={(e) => { e.stopPropagation(); setIsSongDropdownOpen(!isSongDropdownOpen); }}
                  className="flex items-center gap-2 text-base md:text-lg font-bold text-white hover:text-blue-400 transition-colors truncate"
               >
                 <Music size={18} className="text-blue-500 shrink-0"/> 
                 <span className="truncate max-w-[200px] text-left">{selectedSong}</span> 
                 <ChevronDown size={14} className={`transition-transform duration-200 ${isSongDropdownOpen ? 'rotate-180' : ''}`} />
               </button>

               {/* Dropdown Menu */}
               {isSongDropdownOpen && (
                 <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-950 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
                    {SONG_LIST.map((song) => (
                      <button 
                        key={song}
                        onClick={() => { setSelectedSong(song); setIsSongDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-zinc-800 text-sm border-b border-zinc-800 last:border-0 flex items-center justify-between"
                      >
                        <span className="truncate">{song}</span>
                        {selectedSong === song && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>}
                      </button>
                    ))}
                 </div>
               )}
            </div>
            
            <div className="hidden md:block h-10 w-px bg-zinc-700 mx-2"></div>
            
            {/* Timer & Actions */}
            <div className="flex items-center gap-3 bg-black/20 p-1.5 rounded-xl border border-white/5">
              <div className="text-2xl font-mono font-bold w-24 text-center text-zinc-200 tabular-nums tracking-widest">
                {formatTime(duration)}
              </div>
              
              <button 
                onClick={() => isRecording ? handleStop() : setIsRecording(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all text-sm shadow-lg active:scale-95 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-green-500/20'
                }`}
              >
                {isRecording ? <><Square size={14} fill="currentColor"/> หยุด (STOP)</> : <><Play size={14} fill="currentColor"/> เริ่ม (START)</>}
              </button>

              <button 
                onClick={handleReset}
                className="p-2.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all active:scale-95"
                title="รีเซ็ตเวลา (Reset)"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Video Area (Responsive Aspect Ratio) */}
        <div className="flex-1 bg-zinc-950 relative rounded-2xl border border-zinc-800 overflow-hidden group shadow-2xl w-full aspect-video max-h-[70vh]">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700"></div>
          
          {/* Placeholder Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/10 font-bold text-4xl md:text-6xl lg:text-8xl select-none pointer-events-none tracking-tighter">
              LIVE FEED
            </div>
          </div>
          
          {/* Recording Indicator */}
          {isRecording && (
             <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 text-white px-3 py-1.5 rounded-md font-bold text-xs shadow-lg animate-pulse z-10 backdrop-blur-sm border border-red-400/30">
               <Circle size={8} fill="currentColor" /> REC
             </div>
          )}

          {/* AI Bounding Boxes (Tracking) */}
          {metrics.map((member) => (
            <div 
              key={member.id} 
              className={`absolute border-2 rounded-xl transition-all duration-[1000ms] ease-in-out backdrop-blur-[2px] ${
                member.warning 
                  ? 'border-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                  : 'border-green-400 bg-green-400/5 hover:bg-green-400/10'
              }`}
              style={{ 
                // ใช้ค่า currentX/Y ที่มีการ Drift เล็กน้อยเพื่อความสมจริง
                top: `${member.currentY}%`, 
                left: `${member.currentX}%`, 
                width: `${member.width}%`, 
                height: `${member.height}%` 
              }}
            >
              {/* Info Label Floating above box */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                <div className={`flex flex-col items-center px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md border transition-colors duration-300 ${
                  member.warning ? 'bg-red-950/90 border-red-500 text-white' : 'bg-zinc-900/80 border-zinc-600 text-white'
                }`}>
                   <div className="font-bold text-xs md:text-sm flex items-center gap-1.5">
                      {member.name} 
                      {member.warning && <AlertCircle size={12} className="text-red-400 animate-bounce"/>}
                   </div>
                   <div className="flex gap-2 text-[10px] md:text-xs text-zinc-300 font-mono mt-0.5">
                      <span>BPM:{member.bpm}</span>
                      <span className={member.accuracy > 90 ? 'text-green-400' : 'text-yellow-400'}>{member.accuracy.toFixed(0)}%</span>
                   </div>
                </div>
                {/* Connecting Line */}
                <div className={`w-0.5 h-3 mx-auto ${member.warning ? 'bg-red-500' : 'bg-zinc-600'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Stats & Logs */}
      <div className="w-full lg:w-80 flex flex-col gap-4 lg:h-full shrink-0">
           
           {/* Band Sync Stats Card */}
           <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-lg">
              <h3 className="text-zinc-400 text-xs font-bold uppercase mb-4 flex justify-between items-center tracking-wider">
                <span>ความพร้อมของวง (Band Sync)</span> 
                <button className="text-zinc-600 hover:text-white transition-colors"><Settings2 size={14}/></button>
              </h3>
              
              <div className="flex justify-between items-end mb-2">
                 <span className={`text-5xl font-bold tracking-tighter ${isRecording ? 'text-green-400' : 'text-zinc-600'}`}>
                    {isRecording ? '94%' : '--'}
                 </span>
                 <div className="text-right">
                    <span className="block text-[10px] text-zinc-500 uppercase">ความนิ่ง (Stability)</span>
                    <span className="text-xs font-bold text-white">ดีเยี่ยม (Excellent)</span>
                 </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-4">
                 <div 
                    className="bg-gradient-to-r from-green-600 to-green-400 h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                    style={{width: isRecording ? '94%' : '0%'}}
                 ></div>
              </div>

              {/* Sub-stats grid */}
              <div className="grid grid-cols-2 gap-2">
                 <div className="bg-black/40 p-2 rounded-lg border border-zinc-800/50">
                    <div className="text-[10px] text-zinc-500 uppercase">จังหวะ (Tempo)</div>
                    <div className="text-sm font-bold text-blue-400">Steady (มั่นคง)</div>
                 </div>
                 <div className="bg-black/40 p-2 rounded-lg border border-zinc-800/50">
                    <div className="text-[10px] text-zinc-500 uppercase">คีย์เสียง (Pitch)</div>
                    <div className="text-sm font-bold text-yellow-400">Var <span className="text-[10px]">+0.2</span></div>
                 </div>
              </div>
           </div>

           {/* Live Event Log Panel */}
           <div className="flex-1 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col min-h-[250px] shadow-lg">
              <div className="p-3 px-4 border-b border-zinc-800 bg-zinc-900/80 flex justify-between items-center sticky top-0 backdrop-blur-sm z-10">
                 <span className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                   <Activity size={14} className="text-blue-500"/> AI EVENT LOGS
                 </span>
                 <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRecording ? 'bg-green-400' : 'bg-zinc-500'}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isRecording ? 'bg-green-500' : 'bg-zinc-600'}`}></span>
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold">{isRecording ? 'LIVE' : 'IDLE'}</span>
                 </div>
              </div>
              
              {/* Log List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-xs scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {!isRecording && logs.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-700 gap-2">
                        <Activity size={24} className="opacity-20"/>
                        <span className="italic text-xs">รอเริ่มการซ้อม... (Waiting)</span>
                    </div>
                )}
                
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2 animate-in slide-in-from-left-2 fade-in duration-300 border-l-2 border-zinc-800 pl-2 py-0.5 hover:bg-zinc-900/30 rounded-r transition-colors">
                    <span className="text-zinc-600 shrink-0 select-none text-[10px] mt-0.5 opacity-70">[{log.time}]</span>
                    <span className={`leading-tight ${
                        log.type === 'warn' ? 'text-red-400' : 
                        log.type === 'good' ? 'text-green-400' : 'text-zinc-300'
                    }`}>
                      {log.msg}
                    </span>
                  </div>
                ))}
                {/* Invisible element to auto-scroll to */}
                <div ref={logsEndRef} />
              </div>
           </div>
      </div>
    </div>
  );
}