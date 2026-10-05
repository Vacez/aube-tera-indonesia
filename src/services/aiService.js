import { supabase, isSupabaseConfigured, getSessionId } from '../lib/supabase';
import { COMPANY_CONFIG } from '../config/company';

/**
 * Helper to dynamically detect the target language of the user's message (en, vi, ja, id)
 */
export const detectMessageLanguage = (message = '', siteLanguage = 'id') => {
  if (!message || typeof message !== 'string') return siteLanguage;
  const lowerMsg = message.toLowerCase().trim();

  // 1. Japanese check (Hiragana, Katakana, Kanji)
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(message)) {
    return 'ja';
  }

  // 2. Vietnamese check (Accented letters or Vietnamese specific words)
  const hasViAccents = /[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(message);
  const viKeywords = ['tôi', 'bạn', 'chào', 'xin', 'cần', 'muốn', 'tạo', 'làm', 'web', 'trang', 'ứng dụng', 'bao nhiêu', 'giá', 'dịch vụ', 'công ty'];
  const viHits = viKeywords.filter(w => lowerMsg.includes(w)).length;
  if (hasViAccents || (viHits >= 2 && !lowerMsg.includes('saya') && !lowerMsg.includes('mau'))) {
    return 'vi';
  }

  // 3. Indonesian keywords
  const idKeywords = [
    'saya', 'kami', 'anda', 'kamu', 'ingin', 'mau', 'buat', 'membuat', 'bikin',
    'berapa', 'harga', 'biaya', 'layanan', 'fitur', 'apakah', 'bisa', 'halo',
    'terima', 'kasih', 'selamat', 'pagi', 'siang', 'malam', 'toko', 'sekolah',
    'perusahaan', 'bagaimana', 'sistem', 'tolong', 'bantu', 'mengenai', 'solusi'
  ];
  const idHits = idKeywords.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(lowerMsg)).length;

  // 4. English keywords
  const enKeywords = [
    'i', 'you', 'we', 'my', 'your', 'our', 'want', 'need', 'would', 'like',
    'to', 'create', 'build', 'make', 'design', 'develop', 'website', 'web',
    'app', 'application', 'mobile', 'for', 'business', 'corporate', 'company',
    'price', 'cost', 'how', 'much', 'what', 'is', 'are', 'can', 'please',
    'tell', 'me', 'about', 'service', 'services', 'features', 'help', 'hello',
    'hi', 'good', 'morning', 'evening', 'thanks', 'thank'
  ];
  const enHits = enKeywords.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(lowerMsg)).length;

  if (enHits > idHits && enHits >= 2) return 'en';
  if (idHits > enHits && idHits >= 1) return 'id';
  if (enHits >= 1 && idHits === 0) return 'en';

  // Fallback to website selected language if input language is short or neutral
  return siteLanguage || 'id';
};

/**
 * Send a message to AUBE AI via Supabase Edge Function
 */
export const sendAIMessage = async ({ message, history = [], conversationId = null, language = 'id' }) => {
  const sessionId = getSessionId();
  const detectedLang = detectMessageLanguage(message, language);

  // If Supabase Edge Function is configured, invoke Edge Function
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.functions.invoke('aube-ai', {
        body: {
          action: 'chat',
          session_id: sessionId,
          conversation_id: conversationId,
          user_language: detectedLang,
          detected_language: detectedLang,
          site_language: language,
          message,
          messages_history: history
        }
      });

      if (error) throw error;
      if (data && data.success && data.message) {
        const edgeResLang = detectMessageLanguage(data.message, detectedLang);
        // If edge function response language matches detected input language, return it!
        if (edgeResLang === detectedLang || (detectedLang === 'id' && edgeResLang === 'id')) {
          return {
            success: true,
            message: data.message,
            detectedLanguage: detectedLang,
            conversationId: data.conversation_id || conversationId
          };
        }
        console.warn(`Edge function returned ${edgeResLang} instead of ${detectedLang}. Falling back to local multi-language engine.`);
      }
    } catch (err) {
      console.warn('Edge function invoke warning, using intelligent consultant engine fallback:', err);
    }
  }

  // Local Intelligent Consultant Fallback Engine
  await new Promise((r) => setTimeout(r, 600));
  const lowerMsg = message.toLowerCase();

  let reply = '';

  if (detectedLang === 'en') {
    if (lowerMsg.includes('cost') || lowerMsg.includes('price') || lowerMsg.includes('how much') || lowerMsg.includes('budget')) {
      reply = `Pricing at PT. AUBE TERA INDONESIA is transparent and tailored to your requirement scope.

Reference budget ranges:
- **Corporate Website / Profile**: Rp 3 - 15 Million (~$200 - $1,000 USD)
- **Web Application / Admin Dashboard**: Rp 15 - 75 Million (~$1,000 - $5,000 USD)
- **Mobile App (Android & iOS)**: Rp 15 - 100+ Million (~$1,000 - $7,000+ USD)
- **Custom Enterprise Software / ERP**: Rp 25 - 100+ Million

Final pricing is determined after our engineering team reviews your technical requirement document. Would you like me to draft a Project Brief?`;
    } else if (lowerMsg.includes('mobile') || lowerMsg.includes('app') || lowerMsg.includes('android') || lowerMsg.includes('ios')) {
      reply = `PT. AUBE TERA INDONESIA provides **Mobile App Development** using Flutter & React Native (iOS & Android) as well as Native Kotlin/Swift.

Key capabilities we offer:
1. User Authentication & OTP Security
2. Push Notifications & Real-time Messaging
3. Payment Gateway & GPS Mapping Integration

Is your app intended for public consumers (B2C) or internal enterprise operations (B2B)?`;
    } else if (lowerMsg.includes('website') || lowerMsg.includes('create') || lowerMsg.includes('feature') || lowerMsg.includes('company') || lowerMsg.includes('web')) {
      reply = `Hello! PT. AUBE TERA INDONESIA specializes in engineering modern, high-standard corporate websites and web applications.

Key features we regularly integrate into company websites include:
1. **Responsive & Premium Sky-Clean UI/UX Design**: Pixel-perfect layout for desktop, tablet, and mobile devices.
2. **Interactive AI Digital Assistant**: Automated customer inquiries and real-time project brief generation.
3. **Admin Dashboard / CMS**: Easy content management for company updates, portfolio, and services.
4. **Security & Performance**: End-to-end SSL protection, SEO optimization, and fast loading speeds.

Would you like to discuss specific custom features or generate a Project Brief for your website?`;
    } else {
      reply = `Thank you! I am AUBE AI, the official AI Digital Consultant for PT. AUBE TERA INDONESIA.

To help us design the right software solution:
- What is the main objective or key features required for your software/website?
- What is your target launch timeline?`;
    }
  } else if (detectedLang === 'vi') {
    if (lowerMsg.includes('giá') || lowerMsg.includes('bao nhiêu') || lowerMsg.includes('chi phí')) {
      reply = `Báo giá tại PT. AUBE TERA INDONESIA được điều chỉnh minh bạch theo yêu cầu cụ thể của dự án:

- **Website Doanh nghiệp**: Rp 3 - 15 Triệu (~$200 - $1,000 USD)
- **Ứng dụng Web / Admin Dashboard**: Rp 15 - 75 Triệu
- **Ứng dụng Di động (Android & iOS)**: Rp 15 - 100+ Triệu

Giá chính thức sẽ được xác định sau khi đội ngũ kỹ sư của chúng tôi xem xét tài liệu yêu cầu. Bạn có muốn lập bảng Tóm tắt Dự án (Project Brief) không?`;
    } else {
      reply = `Xin chào! Tôi là AUBE AI, cố vấn kỹ thuật số chính thức của PT. AUBE TERA INDONESIA.

Chúng tôi chuyên thiết kế và xây dựng:
1. **Phát triển Website Doanh nghiệp & E-Commerce**
2. **Ứng dụng Di động (Android & iOS)**
3. **Hệ thống Quản trị Web & Admin Dashboard**
4. **Tích hợp Trợ lý AI & Chatbot**

Hãy chia sẻ yêu cầu của dự án để tôi tư vấn giải pháp phù hợp nhất!`;
    }
  } else if (detectedLang === 'ja') {
    if (lowerMsg.includes('価格') || lowerMsg.includes('費用') || lowerMsg.includes('いくら') || lowerMsg.includes('料金')) {
      reply = `PT. AUBE TERA INDONESIAの開発費用は、プロジェクト要件に応じて透明性を持って算出されます：

- **コーポレートサイト**: 300万〜1,500万ルピア（約2万〜10万円）
- **Webアプリケーション / ダッシュボード**: 1,500万〜7,500万ルピア
- **モバイルアプリ (iOS / Android)**: 1,500万〜1億ルピア+

要件の確認後、詳細な正式見積もりをお出しいたします。`;
    } else {
      reply = `こんにちは！PT. AUBE TERA INDONESIAの公式AIコンサルタント「AUBE AI」です。

弊社では以下の開発を行っております：
1. **Webサイト・コーポレートサイト開発**
2. **モバイルアプリ開発（iOS/Android）**
3. **Webアプリケーション＆管理ダッシュボード**
4. **AI・チャットボット統合**

ご要望やアイデアがございましたら、お気軽にお知らせください！`;
    }
  } else {
    // Indonesian (default / 'id')
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
    } else if (lowerMsg.includes('android') || lowerMsg.includes('ios') || lowerMsg.includes('mobile') || lowerMsg.includes('aplikasi')) {
      reply = `Tentu! PT. AUBE TERA INDONESIA menyediakan layanan **Mobile App Development** berbasis Flutter & React Native (iOS & Android) maupun Native Kotlin/Swift.

Apakah aplikasi mobile yang ingin Anda buat memerlukan fitur seperti:
1. Login akun & autentikasi pengguna?
2. Notifikasi (Push Notifications)?
3. Integrasi Peta/GPS atau Payment Gateway?`;
    } else if (lowerMsg.includes('website') || lowerMsg.includes('buat') || lowerMsg.includes('bikin') || lowerMsg.includes('web')) {
      reply = `Halo! Terima kasih telah tertarik untuk bekerja sama dengan PT. AUBE TERA INDONESIA. Kami sangat senang dan siap membantu Anda merancang serta membangun website korporat (*corporate website*) yang profesional, modern, dan kredibel untuk mendukung pertumbuhan bisnis Anda.

Fitur unggulan yang dapat kami integrasikan:
1. **Desain UI/UX Responsive & Sky-Clean**: Tampilan indah di semua ukuran layar.
2. **Asisten AI Interaktif**: Konsultasi otomatis & pembuatan Project Brief.
3. **Admin Dashboard / CMS**: Kelola konten portofolio dan layanan dengan mudah.
4. **Keamanan SSL & SEO Optimization**: Kecepatan maksimal dan siap diindeks Google.

Apakah Anda ingin mendiskusikan fitur khusus atau membuat Project Brief otomatis sekarang?`;
    } else {
      reply = `Terima kasih! Saya telah mencatat kebutuhan proyek Anda. 

Untuk membantu merancang spesifikasi yang tepat:
- Apa target utama atau fitur kunci yang wajib ada dalam sistem ini?
- Kapan rencana target peluncuran (timeline) proyek yang Anda harapkan?`;
    }
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

