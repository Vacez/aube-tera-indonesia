import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Local storage fallback key for offline leads
const LOCAL_LEADS_KEY = 'aube_local_leads';

/**
 * Submit a lead captured from AUBE AI consultation or contact form
 */
export const submitLead = async (leadData) => {
  const payload = {
    name: leadData.name || 'Anonymous',
    email: leadData.email || '',
    whatsapp: leadData.whatsapp || leadData.phone || '',
    company: leadData.company || '',
    business_type: leadData.business_type || leadData.businessType || '-',
    project_type: leadData.project_type || leadData.projectType || 'Software Consultation',
    budget_range: leadData.budget_range || leadData.budgetRange || '-',
    timeline: leadData.timeline || '-',
    project_description: leadData.project_description || leadData.message || '',
    ai_summary: leadData.ai_summary || leadData.aiSummary || '',
    recommended_solution: leadData.recommended_solution || leadData.recommendedSolution || '',
    project_complexity: leadData.project_complexity || 'Medium',
    status: 'new'
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([payload])
        .select();

      if (error) throw error;
      return { success: true, lead: data[0] };
    } catch (err) {
      console.warn('Supabase lead submit fallback:', err);
    }
  }

  // Local fallback queue
  const existing = JSON.parse(localStorage.getItem(LOCAL_LEADS_KEY) || '[]');
  const newLead = {
    ...payload,
    id: 'lead_local_' + Date.now(),
    created_at: new Date().toISOString()
  };
  existing.unshift(newLead);
  localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(existing));

  return { success: true, lead: newLead };
};

/**
 * Fetch all leads for Admin Dashboard
 */
export const fetchLeads = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase fetch leads fallback:', err);
    }
  }

  // Return local storage leads + sample leads
  const localLeads = JSON.parse(localStorage.getItem(LOCAL_LEADS_KEY) || '[]');
  const defaultLeads = [
    {
      id: 'lead_101',
      name: 'Budi Santoso',
      email: 'budi@ptmaju.co.id',
      whatsapp: '081234567890',
      company: 'PT Maju Jaya Retail',
      business_type: 'E-Commerce / Fashion',
      project_type: 'Mobile Application',
      budget_range: 'Rp 30 - 60 Juta',
      timeline: '6 Minggu',
      project_description: 'Aplikasi belanja pakaian online dengan payment gateway dan push notification.',
      ai_summary: 'Klien membutuhkan aplikasi mobile iOS & Android untuk katalog produk dan pembayaran online.',
      recommended_solution: 'Flutter Cross-Platform Mobile App + Admin Dashboard',
      project_complexity: 'Medium',
      status: 'new',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: 'lead_102',
      name: 'Siti Rahmawati',
      email: 'siti@sekolahbangsa.sch.id',
      whatsapp: '087812345678',
      company: 'Yayasan Pendidikan Bangsa',
      business_type: 'Pendidikan / Sekolah',
      project_type: 'Information System',
      budget_range: 'Rp 25 - 50 Juta',
      timeline: '8 Minggu',
      project_description: 'Sistem Informasi Sekolah terpadu untuk Raport Online, SPP, dan Absensi Guru.',
      ai_summary: 'Klien membutuhkan Sistem Informasi Sekolah terpusat dengan multi-role login (Siswa, Guru, Admin).',
      recommended_solution: 'Sistem Informasi Sekolah & Akademik Terintegrasi',
      project_complexity: 'Medium',
      status: 'qualified',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 'lead_103',
      name: 'Hendra Wijaya',
      email: 'hendra@logistikcepat.com',
      whatsapp: '081987654321',
      company: 'CV Logistik Nusantara',
      business_type: 'Transportasi & Logistik',
      project_type: 'Custom Software',
      budget_range: 'Rp 50 - 100 Juta',
      timeline: '12 Minggu',
      project_description: 'Software armada pengiriman armada truk dan sistem lacak posisi real-time GPS.',
      ai_summary: 'Klien membutuhkan Custom ERP Logistik & GPS Lacak Pengiriman.',
      recommended_solution: 'Custom Enterprise ERP & Fleet Tracking System',
      project_complexity: 'Advanced',
      status: 'proposal',
      created_at: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ];

  return [...localLeads, ...defaultLeads];
};

/**
 * Update lead status in Supabase DB / local storage
 */
export const updateLeadStatus = async (leadId, status) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', leadId);

      if (!error) return { success: true };
    } catch (err) {
      console.warn('Update lead status fallback:', err);
    }
  }

  // Update in local storage
  const localLeads = JSON.parse(localStorage.getItem(LOCAL_LEADS_KEY) || '[]');
  const updated = localLeads.map((l) => (l.id === leadId ? { ...l, status } : l));
  localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(updated));
  return { success: true };
};
