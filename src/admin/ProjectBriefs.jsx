import React, { useState } from 'react';
import { FileText, Download, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ProjectBriefs = () => {
  const { isDark } = useTheme();

  const briefs = [
    {
      id: 'brief_1',
      project_name: 'Fashion E-Commerce & Retail App',
      business_type: 'Retail / Fashion',
      objective: 'Membangun aplikasi mobile iOS & Android terpadu dengan payment gateway dan push notification.',
      platform: 'Flutter Mobile App + Web Admin Dashboard',
      complexity: 'Medium',
      budget_range: 'Rp 30 - 60 Juta',
      timeline_estimate: '6 Minggu',
      created_at: new Date().toISOString()
    },
    {
      id: 'brief_2',
      project_name: 'School Management & SPP Gateway',
      business_type: 'Pendidikan / Sekolah',
      objective: 'Sistem Informasi Sekolah terpadu untuk Raport Online, SPP, dan Absensi Guru.',
      platform: 'Web Application (Laravel + React)',
      complexity: 'Medium',
      budget_range: 'Rp 25 - 50 Juta',
      timeline_estimate: '8 Minggu',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {briefs.map((b) => (
          <div key={b.id} className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">{b.business_type}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {b.complexity} Complexity
                </span>
              </div>
              <h3 className="text-lg font-extrabold mb-2">{b.project_name}</h3>
              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{b.objective}</p>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-sky-50 border-sky-100'}`}>
                  <span className="text-[9px] font-mono text-cyan-400 uppercase block font-bold">Platform</span>
                  <span className="font-bold text-xs">{b.platform}</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-sky-50 border-sky-100'}`}>
                  <span className="text-[9px] font-mono text-cyan-400 uppercase block font-bold">Budget Range</span>
                  <span className="font-bold text-xs">{b.budget_range}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono opacity-60">Created: {new Date(b.created_at).toLocaleDateString()}</span>
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(b, null, 2));
                  const anchor = document.createElement('a');
                  anchor.setAttribute("href", dataStr);
                  anchor.setAttribute("download", `${b.project_name}.json`);
                  anchor.click();
                }}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold flex items-center gap-1.5 cursor-pointer hover:bg-cyan-500/30"
              >
                <Download className="w-3.5 h-3.5" /> Download Brief
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectBriefs;
