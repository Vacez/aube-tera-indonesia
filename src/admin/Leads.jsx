import React, { useState, useEffect } from 'react';
import { fetchLeads, updateLeadStatus } from '../services/leadService';
import { Mail, Phone, Building, Calendar, CheckCircle2, Search, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Leads = () => {
  const { isDark } = useTheme();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    const data = await fetchLeads();
    setLeads(data);
    setLoading(false);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    await updateLeadStatus(leadId, newStatus);
    setLeads(leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.email || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return 'bg-sky-500/20 text-cyan-300 border-sky-500/30';
      case 'contacted':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'qualified':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'proposal':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'won':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'lost':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, email, perusahaan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-sky-200'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-cyan-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs border cursor-pointer ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-sky-200'
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-sky-200 text-slate-900'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b text-[11px] font-mono uppercase tracking-wider ${
              isDark ? 'bg-slate-950 border-slate-800 text-cyan-400' : 'bg-sky-50 border-sky-100 text-sky-800'
            }`}>
              <tr>
                <th className="p-4">Klien & Perusahaan</th>
                <th className="p-4">Tipe Proyek & Budget</th>
                <th className="p-4">Informasi Kontak</th>
                <th className="p-4">Status Pipeline</th>
                <th className="p-4">Tanggal Masuk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className={isDark ? 'hover:bg-slate-950/60' : 'hover:bg-sky-50/50'}>
                  <td className="p-4 font-bold">
                    <div className="text-sm font-extrabold">{lead.name}</div>
                    <div className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {lead.company || lead.business_type}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-sky-400 block">{lead.project_type}</span>
                    <span className="text-[11px] opacity-80">{lead.budget_range}</span>
                  </td>
                  <td className="p-4 space-y-1">
                    <div className="flex items-center gap-1.5 font-mono">
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>{lead.whatsapp}</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-80">
                      <Mail className="w-3 h-3 text-sky-400" />
                      <span>{lead.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer ${getStatusBadge(lead.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="p-4 text-[11px] font-mono opacity-80">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Leads;
