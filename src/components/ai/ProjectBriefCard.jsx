import React, { useState } from 'react';
import { FileText, Download, Send, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, HelpCircle, Layers, Cpu } from 'lucide-react';
import { Button } from '../Button/Button';
import { COMPANY_CONFIG, getWhatsAppUrl } from '../../config/company';
import { useTheme } from '../../context/ThemeContext';

export const ProjectBriefCard = ({ brief, onSubmitLead }) => {
  const { isDark } = useTheme();
  const [downloaded, setDownloaded] = useState(false);

  if (!brief) return null;

  const handleDownloadBrief = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(brief, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Project_Brief_${(brief.project_name || 'AubeAI').replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloaded(true);
  };

  const handleWhatsAppExport = () => {
    const text = `Halo ${COMPANY_CONFIG.name},%0A%0ASaya telah melakukan analisis konsultasi dengan AUBE AI dan mendapatkan Project Brief berikut:%0A%0A*PROJECT BRIEF:*%0A- *Nama Proyek:* ${encodeURIComponent(brief.project_name)}%0A- *Tipe Bisnis:* ${encodeURIComponent(brief.business_type)}%0A- *Platform:* ${encodeURIComponent(brief.platform)}%0A- *Kompleksitas:* ${encodeURIComponent(brief.complexity)}%0A- *Fitur Utama:* ${encodeURIComponent((brief.core_features || []).join(', '))}%0A- *Estimasi Timeline:* ${encodeURIComponent(brief.timeline_estimate || '-')}%0A- *Estimasi Budget:* ${encodeURIComponent(brief.budget_range || '-')}%0A%0ASaya ingin berkonsultasi lebih lanjut mengenai eksekusi proyek ini.`;
    
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsapp.number}?text=${text}`, '_blank');
  };

  return (
    <div className={`rounded-3xl border p-5 sm:p-7 shadow-2xl my-4 backdrop-blur-xl transition-all ${
      isDark
        ? 'bg-slate-900/95 border-cyan-500/40 text-slate-100 shadow-cyan-950/60'
        : 'bg-white/95 border-sky-300 text-slate-800 shadow-sky-900/10'
    }`}>
      
      {/* Card Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-5 border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">Structured Specification</span>
            <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>PROJECT BRIEF</h3>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
          brief.complexity === 'Advanced'
            ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
            : brief.complexity === 'Medium'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
        }`}>
          {brief.complexity || 'Medium'} Complexity
        </span>
      </div>

      {/* Brief Specifications Grid */}
      <div className="space-y-4 text-xs sm:text-sm">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'}`}>
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block mb-0.5">Project Name</span>
            <span className="font-bold text-sm">{brief.project_name}</span>
          </div>

          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'}`}>
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block mb-0.5">Business Type</span>
            <span className="font-bold text-sm">{brief.business_type}</span>
          </div>
        </div>

        <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'}`}>
          <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block mb-1">Project Objective</span>
          <p className="leading-relaxed font-medium">{brief.objective}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'}`}>
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block mb-1">Recommended Platform</span>
            <span className="font-extrabold text-xs text-sky-400">{brief.platform}</span>
          </div>

          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'}`}>
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block mb-1">Target Users</span>
            <span className="font-medium text-xs">{brief.target_users}</span>
          </div>
        </div>

        {/* Features Lists */}
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block mb-2">Core Features & Functions</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(brief.core_features || []).map((feat, idx) => (
              <div key={idx} className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-200' : 'bg-white border-sky-200 text-slate-800'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Features */}
        {(brief.admin_features || []).length > 0 && (
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block mb-2">Admin Dashboard Features</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {brief.admin_features.map((feat, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                  isDark ? 'bg-slate-950/60 border-slate-800 text-slate-200' : 'bg-white border-sky-200 text-slate-800'
                }`}>
                  <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Recommendation & Integrations */}
        <div className={`p-4 rounded-2xl border ${isDark ? 'bg-sky-950/40 border-cyan-400/30' : 'bg-sky-50 border-sky-200'}`}>
          <div className="flex items-center gap-2 mb-2 text-xs font-extrabold text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>Technical Architecture Recommendation</span>
          </div>
          <p className="text-xs leading-relaxed font-semibold mb-2">{brief.technical_recommendation}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(brief.integrations || []).map((tech, idx) => (
              <span key={idx} className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border ${
                isDark ? 'bg-slate-900 text-cyan-300 border-slate-800' : 'bg-white text-sky-800 border-sky-200'
              }`}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Open Questions */}
        {(brief.open_questions || []).length > 0 && (
          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-amber-950/30 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1 mb-1">
              <HelpCircle className="w-3.5 h-3.5" /> Items to Clarify during Tech Review
            </span>
            <ul className="space-y-1 pl-4 list-disc text-xs text-slate-300">
              {brief.open_questions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Action CTA Buttons */}
      <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          icon={Download}
          className={isDark ? 'bg-slate-950 text-cyan-300 border-slate-800 hover:border-cyan-400' : 'bg-white text-slate-700 border-sky-200'}
          onClick={handleDownloadBrief}
        >
          {downloaded ? 'Brief Downloaded' : 'Download Brief (JSON)'}
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Send}
            className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30"
            onClick={handleWhatsAppExport}
          >
            Export to WhatsApp
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Sparkles}
            className="bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
            onClick={() => onSubmitLead(brief)}
          >
            Submit to AUBE TERA
          </Button>
        </div>
      </div>

    </div>
  );
};
