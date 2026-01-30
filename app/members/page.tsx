"use client";
import React, { useState } from 'react';
import { User, Mic, Guitar, Drum, Music, TrendingUp, MoreVertical, Plus, Trash, UserPlus, X } from 'lucide-react';

// ข้อมูลตั้งต้น
const INITIAL_MEMBERS = [
  { id: 1, name: "Mild", role: "Vocals", status: "Active", attendance: 95, avgScore: 88, imgColor: "bg-pink-500" },
  { id: 2, name: "Pang", role: "Guitar", status: "Active", attendance: 80, avgScore: 75, imgColor: "bg-blue-500" },
  { id: 3, name: "Nut", role: "Bass", status: "Late Often", attendance: 60, avgScore: 92, imgColor: "bg-yellow-500" },
  { id: 4, name: "Earth", role: "Drums", status: "Active", attendance: 100, avgScore: 85, imgColor: "bg-green-500" },
  { id: 5, name: "Fern", role: "Keys", status: "Busy", attendance: 50, avgScore: 82, imgColor: "bg-purple-500" },
];

export default function MembersPage() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // เพิ่มสมาชิก (สุ่ม Mock)
  const handleInvite = () => {
    const mockNames = ["Alex", "John", "Sarah", "Mike", "Benz", "Toon"];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const roles = ["Saxophone", "Guitar 2", "Percussion", "Manager"];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const colors = ["bg-indigo-500", "bg-orange-500", "bg-teal-500"];
    
    const newMember = {
      id: Date.now(),
      name: randomName,
      role: randomRole,
      status: "New",
      attendance: 0,
      avgScore: 0,
      imgColor: colors[Math.floor(Math.random() * colors.length)]
    };
    setMembers([...members, newMember]);
  };

  // ลบสมาชิก
  const handleRemove = (id: number) => {
    if(confirm("ยืนยันการลบสมาชิกออกจากวง?")) {
        setMembers(members.filter(m => m.id !== id));
        setOpenMenuId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 pb-24 md:pb-8" onClick={() => setOpenMenuId(null)}>
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
            สมาชิกในวง (Members)
          </h1>
          <p className="text-zinc-400 text-sm">จัดการข้อมูลสมาชิก ({members.length} คน)</p>
        </div>
        <button 
            onClick={(e) => { e.stopPropagation(); handleInvite(); }}
            className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-white/10"
        >
          <UserPlus size={18}/> <span className="hidden sm:inline">Invite</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition-all group relative animate-in fade-in zoom-in-95 duration-300">
            
            {/* Options Menu Button */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === member.id ? null : member.id);
                }}
                className={`absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 transition-colors ${openMenuId === member.id ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
            >
              <MoreVertical size={20} />
            </button>

            {/* Dropdown Menu */}
            {openMenuId === member.id && (
                <div className="absolute top-12 right-4 w-32 bg-zinc-950 border border-zinc-700 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                        Edit Profile
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleRemove(member.id); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                    >
                        <Trash size={14}/> Remove
                    </button>
                </div>
            )}

            {/* Profile Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${member.imgColor} flex items-center justify-center text-xl md:text-2xl font-bold shadow-lg ring-2 ring-black`}>
                {member.name[0]}
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                    {member.name} 
                    {member.status === 'New' && <span className="text-[10px] bg-blue-500 px-1.5 py-0.5 rounded text-white">NEW</span>}
                </h2>
                <div className="flex items-center gap-1 text-sm text-zinc-400">
                   {member.role === 'Vocals' && <Mic size={14} />}
                   {member.role.includes('Guitar') && <Guitar size={14} />}
                   {member.role.includes('Bass') && <Music size={14} />}
                   {member.role.includes('Drum') && <Drum size={14} />}
                   {member.role}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Attendance</div>
                <div className={`text-xl font-bold ${member.attendance > 80 ? 'text-green-400' : member.attendance === 0 ? 'text-zinc-500' : 'text-red-400'}`}>
                  {member.attendance}%
                </div>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider">Avg Score</div>
                <div className={`text-xl font-bold ${member.avgScore === 0 ? 'text-zinc-500' : 'text-blue-400'}`}>
                    {member.avgScore}
                </div>
              </div>
            </div>

            {/* Footer Status */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                member.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                member.status === 'Busy' ? 'bg-zinc-700/50 text-zinc-400 border-zinc-700' : 
                member.status === 'New' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {member.status}
              </span>
              <button className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors group/link">
                View Analytics <TrendingUp size={12} className="group-hover/link:translate-x-0.5 transition-transform"/>
              </button>
            </div>

          </div>
        ))}
        
        {/* Empty State / Add Button */}
        <button 
            onClick={handleInvite}
            className="border-2 border-dashed border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 hover:bg-zinc-900/50 transition-all min-h-[200px]"
        >
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Plus size={24} />
            </div>
            <span className="font-bold">Add New Member</span>
        </button>

      </div>
    </div>
  );
}