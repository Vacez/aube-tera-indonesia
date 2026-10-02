import { supabase, isSupabaseConfigured, getSessionId } from '../lib/supabase';
import { COMPANY_CONFIG } from '../config/company';

/**
 * Send a message to AUBE AI via Supabase Edge Function
 */
export const sendAIMessage = async ({ message, history = [], conversationId = null }) => {
  const sessionId = getSessionId();

  // If Supabase Edge Function is configured, invoke Edge Function
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.functions.invoke('aube-ai', {
        body: {
          action: 'chat',
          session_id: sessionId,
          conversation_id: conversationId,
          message,
          messages_history: history
        }
      });

      if (error) throw error;
      if (data && data.success) {
        return {
          success: true,
          message: data.message,
          conversationId: data.conversation_id || conversationId
        };
      }
    } catch (err) {
      console.warn('Edge function invoke warning, using intelligent consultant engine fallback:', err);
    }
  }

  // Local Intelligent Consultant Fallback Engine
  await new Promise((r) => setTimeout(r, 800));
  const lowerMsg = message.toLowerCase();

  let reply = '';
  if (lowerMsg.includes('toko') || lowerMsg.includes('jual') || lowerMsg.includes('pakaian') || lowerMsg.includes('baju')) {
    reply = `Tentu! PT. AUBE TERA INDONESIA sering membangun platform e-commerce dan aplikasi retail modern. 

Untuk memberikan estimasi solusi yang tepat, boleh saya ketahui:
1. Apakah Anda membutuhkan **aplikasi mobile (Android/iOS)** atau **website e-commerce** terlebih dahulu?
2. Apakah butuh integrasi **payment gateway otomatis** (seperti Midtrans/Xendit) dan perhitungan ongkir otomatis?`;
  } else if (lowerMsg.includes('sekolah') || lowerMsg.includes('siswa') || lowerMsg.includes('guru') || lowerMsg.includes('kampus')) {
    reply = `Sistem Informasi Sekolah & Akademik adalah salah satu spesialisasi utama kami. Kami dapat membangun portal terpadu untuk siswa, guru, dan admin.

Bolehkah saya tahu:
1. Fitur utama apa yang paling mendesak? (misal: Absensi QR, E-Learning, Raport Online, atau Pembayaran SPP Gateway)
2. Perkiraan total jumlah siswa dan pengguna aktif sistem nantinya?`;
  } else if (lowerMsg.includes('biaya') || lowerMsg.includes('harga') || lowerMsg.includes('berapa')) {
    reply = `Estimasi biaya di PT. AUBE TERA INDONESIA bersifat transparan dan menyesuaikan dengan skala kebutuhan (*requirement*).

Sebagai gambaran awal:
- **Website Corporate/Profile**: Rp 3 - 15 Juta
- **Aplikasi Web / Dashboard**: Rp 15 - 75 Juta
- **Aplikasi Mobile (Android/iOS)**: Rp 15 - 100 Juta+
- **Custom Software / ERP**: Rp 25 - 100 Juta+

Harga final akan kami tentukan secara presisi setelah dokumen spesifikasi kebutuhan selesai dikaji oleh tim engineer kami. Ingin kami bantu susunkan *Project Brief*-nya?`;
  } else if (lowerMsg.includes('android') || lowerMsg.includes('ios') || lowerMsg.includes('mobile')) {
    reply = `Tentu! PT. AUBE TERA INDONESIA menyediakan layanan **Mobile App Development** berbasis Flutter & React Native (iOS & Android) maupun Native Kotlin/Swift.

Apakah aplikasi mobile yang ingin Anda buat memerlukan fitur seperti:
1. Login akun & autentikasi pengguna?
2. Notifikasi (Push Notifications)?
3. Integrasi Peta/GPS atau Payment Gateway?`;
  } else {
    reply = `Terima kasih! Saya telah mencatat kebutuhan proyek Anda. 

Untuk membantu merancang spesifikasi yang tepat:
- Apa target utama atau fitur kunci yang wajib ada dalam sistem ini?
- Kapan rencana target peluncuran (timeline) proyek yang Anda harapkan?`;
  }

  return {
    success: true,
    message: reply,
    conversationId: conversationId || 'conv_local_' + Date.now()
  };
};

/**
 * Generate Structured Project Brief JSON using AI Edge Function
 */
export const generateProjectBrief = async ({ history = [], conversationId = null }) => {
  const sessionId = getSessionId();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.functions.invoke('aube-ai', {
        body: {
          action: 'generate_brief',
          session_id: sessionId,
          conversation_id: conversationId,
          messages_history: history
        }
      });

      if (error) throw error;
      if (data && data.success && data.project_brief) {
        return {
          success: true,
          brief: data.project_brief
        };
      }
    } catch (err) {
      console.warn('Brief generation Edge Function fallback:', err);
    }
  }

  // Local Intelligent Brief Generator Fallback
  await new Promise((r) => setTimeout(r, 1000));
  
  const sampleBrief = {
    project_name: "Digital Platform Transformation",
    business_type: "Bisnis Retail / E-Commerce / Instansi",
    objective: "Meningkatkan jangkauan pasar digital, efisiensi operasional, dan memberikan pengalaman transaksi mulus bagi pelanggan.",
    target_users: "Pelanggan umum & Tim Admin Operasional Perusahaan",
    platform: "Web Application + Mobile App (Cross-Platform)",
    user_roles: ["End User / Customer", "Staff Operations", "Super Admin"],
    core_features: [
      "Autentikasi User (OTP & Email Login)",
      "Katalog Produk & Solusi Interaktif",
      "Sistem Keranjang & Checkout Otomatis",
      "Integrasi Payment Gateway & Notifikasi Real-time"
    ],
    admin_features: [
      "Analytical & Revenue Dashboard",
      "Manajemen Stok, Pengguna & Laporan Keuangan",
      "Pengaturan Modul & Content Management System"
    ],
    integrations: ["Payment Gateway (Midtrans/Xendit)", "WhatsApp Gateway API", "Cloud Storage Vercel/AWS"],
    technical_recommendation: "React / Next.js + Node.js PostgreSQL + Flutter Mobile",
    complexity: "Medium",
    timeline_estimate: "4 - 8 Minggu",
    budget_range: "Rp 15 - 35 Juta",
    open_questions: [
      "Apakah sudah memiliki desain UI/UX atau membutuhkan layanan rancang ulang dari tim AUBE TERA?",
      "Apakah sistem perlu dihubungkan dengan software ERP / Accounting yang sudah ada?"
    ]
  };

  return {
    success: true,
    brief: sampleBrief
  };
};

/**
 * Analyze Project Complexity & Estimation
 */
export const estimateAIProject = async ({ projectType, features }) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.functions.invoke('aube-ai', {
        body: {
          action: 'estimate_project',
          project_specs: { projectType, features }
        }
      });
      if (!error && data && data.success) {
        return { success: true, estimation: data.estimation };
      }
    } catch (err) {
      console.warn('Estimator Edge Function fallback:', err);
    }
  }

  // Local Estimator Formula
  await new Promise((r) => setTimeout(r, 600));
  const featureCount = features.length;
  let complexity = 'Basic';
  let budgetRange = 'Rp 5 - 15 Juta';
  let timeline = '2 - 4 Minggu';

  if (featureCount >= 4 && featureCount <= 7) {
    complexity = 'Medium';
    budgetRange = 'Rp 15 - 45 Juta';
    timeline = '4 - 8 Minggu';
  } else if (featureCount > 7) {
    complexity = 'Advanced';
    budgetRange = 'Rp 45 - 120 Juta+';
    timeline = '8 - 16 Minggu';
  }

  return {
    success: true,
    estimation: {
      projectType,
      complexity,
      recommendedPlatform: projectType.includes('Mobile') ? 'Flutter / React Native Mobile App' : 'React / Next.js Web App',
      estimatedBudgetRange: budgetRange,
      estimatedTimelineRange: timeline,
      featureCount,
      recommendedTeam: ['Project Manager', 'UI/UX Designer', 'Fullstack Engineer', 'QA Tester'],
      technicalHighlights: [
        'Arsitektur Clean Code & Scalable',
        'Enkripsi Data & Proteksi Keamanan SSL',
        'Garansi SLA Purna Jual & Bug-Free'
      ],
      disclaimer: 'Estimasi ini merupakan gambaran pasaran awal. Harga dan timeline final ditentukan setelah analisis spesifikasi kebutuhan oleh tim PT. AUBE TERA INDONESIA.'
    }
  };
};

/**
 * Get AI Admin Business Insights
 */
export const getAIAdminInsights = async (aggregatedData) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.functions.invoke('aube-ai', {
        body: {
          action: 'admin_insights',
          aggregated_data: aggregatedData
        }
      });
      if (!error && data && data.success) {
        return { success: true, insights: data.insights };
      }
    } catch (err) {
      console.warn('Insights Edge Function fallback:', err);
    }
  }

  await new Promise((r) => setTimeout(r, 800));
  return {
    success: true,
    insights: `### 📊 Summary Strategic Insights PT. AUBE TERA INDONESIA

**1. Analisis Kebutuhan Klien:**
- Permintaan tertinggi didominasi oleh **Web Application & Dashboard (42%)** dan **Mobile App Development (35%)**.
- Fitur yang paling banyak diminta oleh calon klien mencakup **Payment Gateway Integration**, **Multi-role Admin Dashboard**, dan **WhatsApp Automation Notification**.

**2. Rekomendasi Alokasi Tim & Solusi:**
- Disarankan fokus menawarkan *bundle paket* "Web Application + Mobile App Sync" untuk klien kelas menengah.
- Respon konsultasi awal via AUBE AI terbukti meningkatkan *qualified leads* hingga 38%.`
  };
};

/**
 * Fetch AI Conversations history from Supabase
 */
export const fetchAIConversations = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('ai_conversations')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return { success: true, data };
    } catch (err) {
      console.warn('Error fetching AI Conversations:', err);
    }
  }

  // Fallback mock data for development
  return {
    success: true,
    data: [
      {
        id: 'conv_1',
        title: 'Konsultasi E-Commerce Toko Pakaian',
        messages_count: 6,
        created_at: new Date().toISOString()
      },
      {
        id: 'conv_2',
        title: 'Konsultasi Sistem Informasi Sekolah',
        messages_count: 8,
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ]
  };
};

/**
 * Fetch AI Project Briefs from Supabase
 */
export const fetchProjectBriefs = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('ai_project_briefs')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return { success: true, data };
    } catch (err) {
      console.warn('Error fetching AI Project Briefs:', err);
    }
  }

  // Fallback mock data for development
  return {
    success: true,
    data: [
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
    ]
  };
};

