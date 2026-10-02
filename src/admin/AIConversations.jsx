import React, { useState } from 'react';
import { MessageSquare, Bot, User, Clock, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const AIConversations = () => {
  const { isDark } = useTheme();

  const conversations = [
    {
      id: 'conv_1',
      title: 'Konsultasi E-Commerce Toko Pakaian',
      messages_count: 6,
      created_at: new Date().toISOString(),
      messages: [
        { role: 'assistant', content: 'Halo! Saya AUBE AI, asisten digital PT. AUBE TERA INDONESIA. Ceritakan ide atau masalah yang ingin Anda selesaikan.' },
        { role: 'user', content: 'Saya punya toko pakaian dan ingin membuat aplikasi mobile Android & iOS.' },
        { role: 'assistant', content: 'Tentu! Kami sering membangun platform e-commerce dan aplikasi retail modern. Apakah Anda butuh integrasi Payment Gateway?' }
      ]
    },
    {
      id: 'conv_2',
      title: 'Konsultasi Sistem Informasi Sekolah',
      messages_count: 8,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      messages: [
        { role: 'assistant', content: 'Halo! Saya AUBE AI. Ada yang bisa dibantu?' },
        { role: 'user', content: 'Saya punya sekolah dan ingin sistem untuk siswa dan guru.' },
        { role: 'assistant', content: 'Untuk kebutuhan tersebut, solusi yang sangat relevan adalah Sistem Informasi Sekolah & Akademik.' }
      ]
    }
  ];

  const [selectedConv, setSelectedConv] = useState(conversations[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      
      {/* Session List */}
      <div className={`md:col-span-5 rounded-3xl border p-4 space-y-3 ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'
      }`}>
        <h3 className="text-xs font-mono font-bold uppercase text-cyan-400 px-2 py-1">Active AI Sessions</h3>
        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedConv(c)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              selectedConv.id === c.id
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                : isDark ? 'bg-slate-950 border-slate-800 hover:bg-slate-800/60' : 'bg-slate-50 border-sky-100 hover:bg-sky-50'
            }`}
          >
            <div>
              <h4 className="text-xs font-bold">{c.title}</h4>
              <span className="text-[10px] opacity-70 font-mono">{c.messages_count} messages • {new Date(c.created_at).toLocaleDateString()}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </div>
        ))}
      </div>

      {/* Message Trajectory Inspector */}
      <div className={`md:col-span-7 rounded-3xl border p-6 space-y-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'
      }`}>
        <div className="border-b pb-3 border-slate-800">
          <h3 className="text-sm font-extrabold">{selectedConv.title}</h3>
          <span className="text-[10px] font-mono text-cyan-400">ID: {selectedConv.id}</span>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {selectedConv.messages.map((m, idx) => (
            <div key={idx} className={`p-3 rounded-2xl border text-xs leading-relaxed ${
              m.role === 'user'
                ? 'bg-sky-500/20 border-sky-400/40 text-cyan-300 ml-6'
                : isDark ? 'bg-slate-950 border-slate-800 text-slate-200 mr-6' : 'bg-slate-50 border-sky-100 text-slate-800 mr-6'
            }`}>
              <span className="text-[10px] font-mono font-bold uppercase block mb-1 text-cyan-400">{m.role}</span>
              <p>{m.content}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AIConversations;
