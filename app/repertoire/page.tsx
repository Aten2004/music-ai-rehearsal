"use client";
import React, { useState } from 'react';
import { Play, Pause, CheckCircle2, AlertCircle, Clock, Search, Plus, Trash2, Music } from 'lucide-react';

// ข้อมูลตั้งต้น (Mock Data)
const INITIAL_SONGS = [
  { id: 1, title: "Zombie", artist: "The Cranberries", key: "Em", bpm: 84, status: "Ready", progress: 95, isPlaying: false },
  { id: 2, title: "Don't Look Back In Anger", artist: "Oasis", key: "C", bpm: 82, status: "Rehearsing", progress: 60, isPlaying: false },
  { id: 3, title: "Creep", artist: "Radiohead", key: "G", bpm: 92, status: "Issues", progress: 40, isPlaying: false },
  { id: 4, title: "Sweet Child O' Mine", artist: "Guns N' Roses", key: "D", bpm: 125, status: "New", progress: 10, isPlaying: false },
];

export default function RepertoirePage() {
  const [songs, setSongs] = useState(INITIAL_SONGS);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // ฟังก์ชันเพิ่มเพลง (จำลอง)
  const handleAddSong = () => {
    const mockSongs = [
        { title: "Smells Like Teen Spirit", artist: "Nirvana", key: "Fm", bpm: 116 },
        { title: "Enter Sandman", artist: "Metallica", key: "Em", bpm: 123 },
        { title: "Yellow", artist: "Coldplay", key: "B", bpm: 87 },
        { title: "In the End", artist: "Linkin Park", key: "Dm", bpm: 105 }
    ];
    const randomSong = mockSongs[Math.floor(Math.random() * mockSongs.length)];

    const newSong = {
      id: Date.now(), // Unique ID
      ...randomSong,
      status: "New",
      progress: 0,
      isPlaying: false
    };
    setSongs([newSong, ...songs]);
  };

  // ฟังก์ชันลบเพลง
  const handleDelete = (id: number) => {
    if (confirm("ต้องการลบเพลงนี้ใช่ไหม?")) {
      setSongs(songs.filter(s => s.id !== id));
    }
  };

  // ฟังก์ชันกด Play (เล่นทีละเพลง)
  const togglePlay = (id: number) => {
    setSongs(songs.map(song => 
        song.id === id ? { ...song, isPlaying: !song.isPlaying } : { ...song, isPlaying: false }
    ));
  };

  // Logic กรองและค้นหา
  const filteredSongs = songs.filter(song => {
    const matchesFilter = filter === "All" || song.status === filter;
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 pb-24 md:pb-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2 flex items-center gap-2">
            <Music className="text-teal-500"/> คลังเพลง (Repertoire)
          </h1>
          <p className="text-zinc-400 text-sm">จัดการรายชื่อเพลงและติดตามสถานะ ({filteredSongs.length} เพลง)</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-2.5 text-zinc-500" size={18}/>
             <input 
                type="text" 
                placeholder="ค้นหาเพลง..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors"
             />
          </div>
          <button 
            onClick={handleAddSong}
            className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-zinc-200 whitespace-nowrap flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Plus size={16}/> <span className="hidden sm:inline">Add Song</span>
          </button>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex gap-2 mb-6 text-sm overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
         {['All', 'Ready', 'Rehearsing', 'Issues', 'New'].map(status => (
           <button 
             key={status}
             onClick={() => setFilter(status)}
             className={`px-4 py-1.5 rounded-full border transition-all whitespace-nowrap text-xs md:text-sm ${
               filter === status ? 'bg-zinc-100 text-black border-white font-bold' : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
             }`}
           >
             {status}
           </button>
         ))}
      </div>

      {/* Song List Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden min-h-[300px]">
        {filteredSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
                <Search size={48} className="mb-4 opacity-20"/>
                <p>ไม่พบเพลงที่ค้นหา</p>
                <button onClick={() => {setFilter("All"); setSearchTerm("")}} className="text-green-400 text-sm mt-2 hover:underline">ล้างตัวกรอง</button>
            </div>
        ) : (
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="text-zinc-500 text-xs uppercase border-b border-zinc-800 bg-zinc-900/80 whitespace-nowrap">
                <th className="p-4 font-medium">Song Title</th>
                <th className="p-4 font-medium hidden md:table-cell">Key & BPM</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium hidden lg:table-cell">Progress</th>
                <th className="p-4 font-medium text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
                {filteredSongs.map((song) => (
                <tr key={song.id} className={`transition-colors group ${song.isPlaying ? 'bg-green-500/5' : 'hover:bg-zinc-800/50'}`}>
                    {/* Song Info */}
                    <td className="p-4 max-w-[200px]">
                        <div className={`font-bold transition-colors truncate ${song.isPlaying ? 'text-green-400' : 'text-white'}`}>{song.title}</div>
                        <div className="text-xs text-zinc-500 truncate">{song.artist}</div>
                    </td>
                    
                    {/* Key & BPM (Hidden on Mobile) */}
                    <td className="p-4 hidden md:table-cell whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-zinc-300">
                            <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs border border-zinc-700 min-w-[30px] text-center">{song.key}</span>
                            <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs border border-zinc-700">{song.bpm} BPM</span>
                        </div>
                    </td>
                    
                    {/* Status Badge */}
                    <td className="p-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold border ${
                            song.status === 'Ready' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            song.status === 'Issues' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            song.status === 'Rehearsing' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                            {song.status === 'Ready' && <CheckCircle2 size={12}/>}
                            {song.status === 'Issues' && <AlertCircle size={12}/>}
                            {song.status === 'Rehearsing' && <Clock size={12}/>}
                            {song.status}
                        </div>
                    </td>
                    
                    {/* Progress Bar (Hidden on Small Screens) */}
                    <td className="p-4 hidden lg:table-cell w-1/4">
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-1000 ${
                                    song.progress > 80 ? 'bg-green-500' : song.progress < 50 ? 'bg-red-500' : 'bg-yellow-500'
                                }`} style={{width: `${song.progress}%`}}></div>
                            </div>
                            <span className="text-xs text-zinc-500 w-8">{song.progress}%</span>
                        </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                            <button 
                                onClick={() => togglePlay(song.id)}
                                className={`p-2 rounded-full transition-all hover:scale-110 active:scale-95 ${song.isPlaying ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-white text-black hover:bg-zinc-200'}`}
                            >
                                {song.isPlaying ? <Pause size={14} fill="currentColor"/> : <Play size={14} fill="currentColor" className="ml-0.5"/>}
                            </button>
                            <button 
                                onClick={() => handleDelete(song.id)}
                                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>
        )}
      </div>
    </div>
  );
}