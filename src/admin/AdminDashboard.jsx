import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  FileText, 
  Users, 
  Sparkles, 
  X, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Zap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { fetchLeads } from '../services/leadService';
import { fetchAIConversations, fetchProjectBriefs } from '../services/aiService';
import Leads from './Leads';
import ProjectBriefs from './ProjectBriefs';
import AIConversations from './AIConversations';
import AIInsights from './AIInsights';

export function AdminDashboard({ isOpen, onClose }) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('insights'); // 'insights' | 'leads' | 'briefs' | 'conversations'
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalConversations: 0,
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    totalBriefs: 0,
    conversionRate: '0%'
  });

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const [leadsRes, convsRes, briefsRes] = await Promise.all([
        fetchLeads(),
        fetchAIConversations(),
        fetchProjectBriefs()
      ]);

      const leads = leadsRes.data || [];
      const convs = convsRes.data || [];
      const briefs = briefsRes.data || [];

      const totalLeads = leads.length;
      const newLeads = leads.filter(l => l.status === 'new').length;
      const qualifiedLeads = leads.filter(l => ['qualified', 'proposal', 'won'].includes(l.status)).length;
      const totalBriefs = briefs.length;
      const totalConversations = convs.length;

      const rate = totalConversations > 0 ? ((totalLeads / totalConversations) * 100).toFixed(1) + '%' : '0%';

      setStats({
        totalConversations,
        totalLeads,
        newLeads,
        qualifiedLeads,
        totalBriefs,
        conversionRate: rate
      });
    } catch (err) {
      console.error('Failed to load metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadMetrics();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-start p-3 sm:p-6 animate-fadeIn">
      {/* Modal Box */}
      <div className={`w-full max-w-7xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col min-h-[85vh] my-auto transition-all ${
        isDark
          ? 'bg-slate-950/95 border-sky-500/25 shadow-cyan-950/40 text-slate-100'
          : 'bg-white border-sky-200 shadow-sky-900/10 text-slate-900'
      }`}>

        {/* Top Header Bar */}
        <div className={`p-5 sm:p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          isDark ? 'border-sky-500/20 bg-slate-900/50' : 'border-sky-100 bg-slate-50/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-lg shadow-sky-500/20 font-black">
              <ShieldCheck className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">AI Command Center</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  Admin Portal
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                PT. AUBE TERA INDONESIA — Real-time AI Lead Qualification & Insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={loadMetrics}
              disabled={loading}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-sky-500/30 text-slate-300 hover:text-cyan-300 hover:border-cyan-400'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-sky-600'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
            <button
              onClick={onClose}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-sky-500/30 text-slate-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/40'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Key Performance Metric Bar */}
        <div className={`p-4 sm:p-6 border-b grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 ${
          isDark ? 'border-sky-500/10 bg-slate-950/40' : 'border-sky-100 bg-sky-50/40'
        }`}>
          {/* Card 1 */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-sky-500/15' : 'bg-white border-sky-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
              <span>Conversations</span>
              <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-sky-400">{stats.totalConversations}</div>
            <div className="text-[10px] text-slate-400">Total sessions</div>
          </div>

          {/* Card 2 */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-sky-500/15' : 'bg-white border-sky-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
              <span>Project Briefs</span>
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400">{stats.totalBriefs}</div>
            <div className="text-[10px] text-slate-400">Generated</div>
          </div>

          {/* Card 3 */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-sky-500/15' : 'bg-white border-sky-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
              <span>Total Leads</span>
              <Users className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-400">{stats.totalLeads}</div>
            <div className="text-[10px] text-slate-400">Submissions</div>
          </div>

          {/* Card 4 */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-sky-500/15' : 'bg-white border-sky-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
              <span>New Leads</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-400">{stats.newLeads}</div>
            <div className="text-[10px] text-slate-400">Awaiting contact</div>
          </div>

          {/* Card 5 */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-sky-500/15' : 'bg-white border-sky-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
              <span>Qualified</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">{stats.qualifiedLeads}</div>
            <div className="text-[10px] text-slate-400">Pipeline ready</div>
          </div>

          {/* Card 6 */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-sky-500/15' : 'bg-white border-sky-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
              <span>Conversion Rate</span>
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-400">{stats.conversionRate}</div>
            <div className="text-[10px] text-slate-400">Visitor to Lead</div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className={`px-4 sm:px-6 pt-3 border-b flex gap-2 overflow-x-auto ${
          isDark ? 'border-sky-500/20 bg-slate-900/30' : 'border-sky-100 bg-white'
        }`}>
          {[
            { id: 'insights', label: 'AI Business Insights', icon: Sparkles },
            { id: 'leads', label: 'Leads & Inquiries', icon: Users },
            { id: 'briefs', label: 'Project Briefs', icon: FileText },
            { id: 'conversations', label: 'AI Conversations', icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'border-cyan-400 text-cyan-300 bg-sky-500/10'
                      : 'border-sky-600 text-sky-700 bg-sky-50'
                    : isDark
                      ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (isDark ? 'text-cyan-400' : 'text-sky-600') : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {activeTab === 'insights' && <AIInsights />}
          {activeTab === 'leads' && <Leads />}
          {activeTab === 'briefs' && <ProjectBriefs />}
          {activeTab === 'conversations' && <AIConversations />}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
