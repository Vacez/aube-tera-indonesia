import React, { useState, useEffect } from 'react';
import { FileText, Download, Sparkles, CheckCircle2, Layers, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { fetchProjectBriefs } from '../services/aiService';

export const ProjectBriefs = () => {
  const { isDark } = useTheme();
  const [briefs, setBriefs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBriefs = async () => {
    setLoading(true);
    try {
      const res = await fetchProjectBriefs();
      setBriefs(res.data || []);
    } catch (err) {
      console.error('Failed to load project briefs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBriefs();

    const handleUpdate = () => {
      loadBriefs();
    };

    window.addEventListener('aube_ai_session_updated', handleUpdate);
    return () => {
      window.removeEventListener('aube_ai_session_updated', handleUpdate);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase text-cyan-400">
            AI Generated Project Briefs ({briefs.length})
          </h3>
        </div>
        <button
          onClick={loadBriefs}
          disabled={loading}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-400'
              : 'bg-white border-slate-200 text-slate-700 hover:text-sky-600'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Sync Real-time</span>
        </button>
      </div>

      {loading && briefs.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400 font-mono">
          <RefreshCw className="w-5 h-5 mx-auto mb-2 animate-spin text-cyan-400" />
          Memuat daftar Project Brief...
        </div>
      ) : briefs.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400 font-mono">
          Belum ada Project Brief yang digenerate oleh AI.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {briefs.map((b) => (
            <div key={b.id} className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between transition-all ${
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
                <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {b.objective}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-sky-50 border-sky-100'}`}>
                    <span className="text-[9px] font-mono text-cyan-400 uppercase block font-bold">Platform</span>
                    <span className="font-bold text-xs truncate block">{b.platform}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-sky-50 border-sky-100'}`}>
                    <span className="text-[9px] font-mono text-cyan-400 uppercase block font-bold">Budget Range</span>
                    <span className="font-bold text-xs truncate block">{b.budget_range}</span>
                  </div>
                </div>

                {/* Features Pill Summary */}
                {b.core_features && b.core_features.length > 0 && (
                  <div className="mb-4 space-y-1.5">
                    <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block">
                      Core Features ({b.core_features.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {b.core_features.slice(0, 4).map((f, idx) => (
                        <span key={idx} className={`text-[10px] font-medium px-2 py-0.5 rounded-lg border ${
                          isDark ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-sky-100 text-slate-700'
                        }`}>
                          ✓ {f}
                        </span>
                      ))}
                      {b.core_features.length > 4 && (
                        <span className="text-[10px] font-mono text-cyan-400 self-center">
                          +{b.core_features.length - 4} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono opacity-60">
                  {new Date(b.created_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(b, null, 2));
                    const anchor = document.createElement('a');
                    anchor.setAttribute("href", dataStr);
                    anchor.setAttribute("download", `${(b.project_name || 'Project_Brief').replace(/\s+/g, '_')}.json`);
                    anchor.click();
                    anchor.remove();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold flex items-center gap-1.5 cursor-pointer hover:bg-cyan-500/30 transition-all text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download Brief
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectBriefs;
