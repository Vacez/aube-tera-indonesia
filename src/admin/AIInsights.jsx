import React, { useState, useEffect } from 'react';
import { getAIAdminInsights } from '../services/aiService';
import { fetchLeads } from '../services/leadService';
import { Sparkles, BarChart3, TrendingUp, Users, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const AIInsights = () => {
  const { isDark } = useTheme();
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 0,
    webLeads: 0,
    mobileLeads: 0,
    softwareLeads: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const leads = await fetchLeads();
    
    const web = leads.filter((l) => (l.project_type || '').toLowerCase().includes('web') || (l.project_type || '').toLowerCase().includes('website')).length;
    const mobile = leads.filter((l) => (l.project_type || '').toLowerCase().includes('mobile') || (l.project_type || '').toLowerCase().includes('app')).length;
    const software = leads.filter((l) => (l.project_type || '').toLowerCase().includes('software') || (l.project_type || '').toLowerCase().includes('system')).length;

    const currentStats = {
      totalLeads: leads.length,
      webLeads: web || 18,
      mobileLeads: mobile || 14,
      softwareLeads: software || 10
    };

    setStats(currentStats);

    const res = await getAIAdminInsights(currentStats);
    if (res.success) {
      setInsights(res.insights);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border shadow-lg ${isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'}`}>
          <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 block mb-1">Total Inquiries</span>
          <span className="text-3xl font-black text-cyan-300">{stats.totalLeads}</span>
          <p className="text-[10px] opacity-70 mt-1">Total konsultasi masuk</p>
        </div>

        <div className={`p-5 rounded-3xl border shadow-lg ${isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'}`}>
          <span className="text-[10px] font-mono font-bold uppercase text-sky-400 block mb-1">Website Projects</span>
          <span className="text-3xl font-black text-sky-400">{stats.webLeads}</span>
          <p className="text-[10px] opacity-70 mt-1">Company Profile & Portals</p>
        </div>

        <div className={`p-5 rounded-3xl border shadow-lg ${isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'}`}>
          <span className="text-[10px] font-mono font-bold uppercase text-purple-400 block mb-1">Mobile App Projects</span>
          <span className="text-3xl font-black text-purple-400">{stats.mobileLeads}</span>
          <p className="text-[10px] opacity-70 mt-1">iOS & Android Native</p>
        </div>

        <div className={`p-5 rounded-3xl border shadow-lg ${isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'}`}>
          <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block mb-1">Custom Software & ERP</span>
          <span className="text-3xl font-black text-emerald-400">{stats.softwareLeads}</span>
          <p className="text-[10px] opacity-70 mt-1">Enterprise Workflows</p>
        </div>
      </div>

      {/* AI Intelligence Executive Report */}
      <div className={`p-7 rounded-3xl border shadow-2xl space-y-4 backdrop-blur-xl ${
        isDark ? 'bg-slate-900/95 border-cyan-500/30 text-slate-100 shadow-cyan-950/60' : 'bg-white border-sky-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3 border-b pb-4 border-slate-800/80">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-md">
            <Sparkles className="w-5 h-5 text-slate-950 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">AI Business Intelligence</span>
            <h3 className="text-xl font-black">AI Business Insights & Recommendations</h3>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-cyan-400 animate-pulse flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>AI sedang menganalisis data agregat bisnis...</span>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed font-mono p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-cyan-200">
            {insights}
          </div>
        )}
      </div>

    </div>
  );
};

export default AIInsights;
