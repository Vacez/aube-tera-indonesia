import React, { useState, useEffect } from 'react';
import { MessageSquare, Bot, User, Clock, ChevronRight, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { fetchAIConversations } from '../services/aiService';

export const AIConversations = () => {
  const { isDark } = useTheme();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState(null);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const res = await fetchAIConversations();
      const list = res.data || [];
      setConversations(list);
      if (list.length > 0) {
        setSelectedConv(prev => {
          if (!prev) return list[0];
          const found = list.find(c => c.id === prev.id);
          return found || list[0];
        });
      } else {
        setSelectedConv(null);
      }
    } catch (err) {
      console.error('Failed to load AI conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();

    const handleUpdate = () => {
      loadConversations();
    };

    window.addEventListener('aube_ai_session_updated', handleUpdate);
    return () => {
      window.removeEventListener('aube_ai_session_updated', handleUpdate);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Header with reload button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase text-cyan-400">
            AI Consultation Trajectories ({conversations.length})
          </h3>
        </div>
        <button
          onClick={loadConversations}
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Session List */}
        <div className={`md:col-span-5 rounded-3xl border p-4 space-y-3 ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'
        }`}>
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Sessions History</span>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">{conversations.length} Active</span>
          </div>

          {loading && conversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">
              <RefreshCw className="w-5 h-5 mx-auto mb-2 animate-spin text-cyan-400" />
              Memuat riwayat percakapan...
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">
              Belum ada riwayat percakapan AI yang tersimpan.
            </div>
          ) : (
            <div className="max-h-[500px] overflow-y-auto space-y-2 pr-1">
              {conversations.map((c) => {
                const isSelected = selectedConv?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedConv(c)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-950/40'
                        : isDark ? 'bg-slate-950 border-slate-800 hover:bg-slate-800/60' : 'bg-slate-50 border-sky-100 hover:bg-sky-50'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="text-xs font-bold truncate">{c.title}</h4>
                        {c.project_brief && (
                          <span className="shrink-0 px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                            Brief
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] opacity-70 font-mono block">
                        {c.messages_count || c.messages?.length || 0} pesan • {new Date(c.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Message Trajectory Inspector */}
        <div className={`md:col-span-7 rounded-3xl border p-6 space-y-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'
        }`}>
          {selectedConv ? (
            <>
              <div className="border-b pb-3 border-slate-800/80 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold">{selectedConv.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">Session ID: {selectedConv.id}</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      • {new Date(selectedConv.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                {selectedConv.project_brief && (
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3 text-cyan-300" /> Brief Generated
                  </span>
                )}
              </div>

              {/* Associated Brief Summary If Available */}
              {selectedConv.project_brief && (
                <div className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                  isDark ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200' : 'bg-sky-50 border-sky-200 text-sky-900'
                }`}>
                  <div className="flex items-center justify-between font-bold text-[11px]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      {selectedConv.project_brief.project_name || 'Project Brief'}
                    </span>
                    <span className="font-mono text-[10px]">{selectedConv.project_brief.platform}</span>
                  </div>
                  <p className="text-[11px] opacity-80 leading-relaxed">
                    {selectedConv.project_brief.objective}
                  </p>
                </div>
              )}

              {/* Messages list */}
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
                {(selectedConv.messages || []).map((m, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-sky-500/20 border-sky-400/40 text-cyan-300 ml-6'
                      : isDark ? 'bg-slate-950 border-slate-800 text-slate-200 mr-6' : 'bg-slate-50 border-sky-100 text-slate-800 mr-6'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 flex items-center gap-1">
                        {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                        {m.role}
                      </span>
                      {m.timestamp && <span className="text-[9px] font-mono text-slate-500">{m.timestamp}</span>}
                    </div>
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 font-mono">
              Pilih salah satu sesi percakapan di sebelah kiri untuk melihat riwayat pesan.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AIConversations;
