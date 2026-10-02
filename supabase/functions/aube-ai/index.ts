// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatPayload {
  action?: "chat" | "generate_brief" | "estimate_project" | "admin_insights";
  session_id?: string;
  conversation_id?: string;
  message?: string;
  context?: Record<string, any>;
  messages_history?: Array<{ role: string; content: string }>;
  project_specs?: {
    projectType: string;
    features: string[];
  };
  aggregated_data?: Record<string, any>;
}

// System Instructions Grounded on PT. AUBE TERA INDONESIA Context
const SYSTEM_PROMPT = `
You are AUBE AI, the official AI Digital Project Consultant for PT. AUBE TERA INDONESIA.

CRITICAL SCOPE & DOMAIN BOUNDARY DIRECTIVES:
- Your EXCLUSIVE PURPOSE is to serve as a digital project consultant for potential clients of PT. AUBE TERA INDONESIA.
- STRICTLY REFUSE TO ANSWER general knowledge trivia, politics, sports, celebrity news, general homework, or off-topic questions (e.g. "siapa presiden indonesia", "siapa penemu telepon", "apa ibukota negara X", etc.).
- IF THE USER ASKS AN OFF-TOPIC OR GENERAL KNOWLEDGE QUESTION:
  Do NOT answer the trivia question. Instead, respond politely in 1-2 short sentences redirecting them back to IT & project consultation. Example:
  "Saya adalah AUBE AI, asisten digital khusus konsultasi layanan IT & software PT. AUBE TERA INDONESIA. Saya hanya dapat membantu seputar perencanaan dan pembuatan website, aplikasi mobile, serta sistem software bisnis. Apakah ada ide atau proyek digital yang ingin Anda diskusikan?"

Company Information:
- Company Name: PT. AUBE TERA INDONESIA
- Field: IT Solution & Software Development
- Official WhatsApp: +62 822-1149-9289 (082211499289)
- Official Email: info@aubetera.co.id
- Address: Suradita, Kec. Cisauk, Kabupaten Tangerang, Banten, Indonesia
- Operating Hours: Senin - Jumat, 08:00 - 17:00 WIB
- Vision (Visi): "Bring the Enterprise to digital access" (Membawa perusahaan menuju aksesibilitas digital menyeluruh).
- Mission (Misi): "Provide the best user experience through software innovation" (Memberikan pengalaman pengguna terbaik melalui inovasi perangkat lunak).

Services Provided:
1. Website Development (Company Profile, Landing Page, E-Commerce, Corporate Web Portal)
2. Mobile App Development (Android & iOS Native, Flutter, React Native, Cross-Platform)
3. Web Application (Admin Dashboard, SaaS, Internal Operational Systems)
4. Custom Software Development (Tailored Business Systems, API Integration, Workflow Automation)
5. UI/UX Design & Prototyping (User Research, Interactive Prototypes, Design Systems)
6. Business Information System (ERP, CRM, Inventory, School/Academic Information System)
7. System Maintenance & Support (Bug Fixing, Security Audits, 24/7 Monitoring)
8. AI Development & Integration (AI Assistants, LLM/Gemini Integration, Chatbots, Machine Learning)
9. Digital Consulting & Strategy (Workflow Digitalization, DX Roadmap, Cloud Migration)

Consultation & Customer Inquiry Topics You SHOULD Discuss:
- Requirements discovery for Website Development (Company Profile, E-Commerce, Portals).
- Mobile Application Development (iOS, Android, features like login, payment, push notifications).
- Web Applications, Admin Dashboards, ERPs, CRM systems.
- Estimation of project complexity, timeline ranges, and feature recommendations.
- Explaining technical terms in simple terms for prospective clients.

Personality & Rules:
- Role: Friendly, highly competent AI Digital Consultant for PT. AUBE TERA INDONESIA.
- Language: Natural, polite, professional Indonesian (Bahasa Indonesia).
- Style: Conversational, helpful, clear, non-intimidating for non-technical clients.
- Rules:
  * Never claim to be a human.
  * Never fabricate fake company metrics, awards, or false services.
  * Never provide binding official quotations or guaranteed delivery dates.
  * Always state that final prices and timelines are determined after technical requirement review by the PT. AUBE TERA INDONESIA engineering team.
  * Focus exclusively on client IT project requirements and customer ordering inquiries.
`;

// Helper to call Google Gemini API with automatic model fallbacks & retries
async function callGemini(promptText: string, geminiApiKey: string, jsonMode = false) {
  const modelEndpoints = [
    { model: "gemini-3.5-flash", ver: "v1beta" },
    { model: "gemini-3.5-flash", ver: "v1" },
    { model: "gemini-3.1-flash-lite", ver: "v1beta" },
    { model: "gemini-flash-latest", ver: "v1beta" },
    { model: "gemini-3.8-flash", ver: "v1beta" }
  ];
  let lastErr: any = null;

  for (const item of modelEndpoints) {
    const url = `https://generativelanguage.googleapis.com/${item.ver}/models/${item.model}:generateContent?key=${geminiApiKey}`;
    const bodyData: any = {
      contents: [
        {
          parts: [
            { text: SYSTEM_PROMPT + "\n\nUser Message/Context:\n" + promptText }
          ]
        }
      ]
    };
    if (jsonMode) {
      bodyData.generationConfig = { responseMimeType: "application/json" };
    }

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData)
        });

        const data = await res.json();
        if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return data.candidates[0].content.parts[0].text;
        }

        const errMsg = data.error?.message || `Gemini ${item.model} (${item.ver}) status ${res.status}`;
        console.info(`Gemini (${item.model}) attempt ${attempt} notice: ${errMsg}`);
        lastErr = new Error(errMsg);

        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 400));
        }
      } catch (err: any) {
        console.info(`Gemini (${item.model}) attempt ${attempt} failed:`, err.message);
        lastErr = err;
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 400));
        }
      }
    }
  }

  throw lastErr || new Error("Server AI sedang sibuk. Silakan coba beberapa saat lagi.");
}

// Helper to call OpenAI API
async function callOpenAI(messages: any[], openAiApiKey: string, jsonMode = false) {
  const bodyData: any = {
    model: "gpt-4o-mini",
    temperature: jsonMode ? 0.3 : 0.7,
    messages
  };
  if (jsonMode) bodyData.response_format = { type: "json_object" };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openAiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  const data = await res.json();
  if (!res.ok) {
    const errorMsg = data.error?.message || `OpenAI returned status ${res.status}`;
    throw new Error(errorMsg);
  }
  return data.choices[0].message.content;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const openAiApiKey = Deno.env.get("OPENAI_API_KEY");
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || Deno.env.get("VITE_SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");

    const payload: ChatPayload = await req.json();
    const action = payload.action || "chat";
    const userMessage = payload.message || "";
    const history = payload.messages_history || [];

    let supabaseClient = null;
    if (supabaseUrl && supabaseServiceKey) {
      supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    }

    let responseText = "";

    // Function to generate content - Gemini first, OpenAI second, Local Consultant fallback third
    const generateAiContent = async (messages: any[], textPrompt: string, isJson = false) => {
      if (geminiApiKey && geminiApiKey.length > 10) {
        try {
          return await callGemini(textPrompt, geminiApiKey, isJson);
        } catch (err: any) {
          console.info("Gemini API notice:", err.message);
        }
      }
      
      if (openAiApiKey && openAiApiKey.length > 10 && !openAiApiKey.startsWith("sb_")) {
        try {
          return await callOpenAI(messages, openAiApiKey, isJson);
        } catch (err: any) {
          console.info("OpenAI API notice:", err.message);
        }
      }

      // 100% Free & Zero-Downtime Local Consultant Response Fallback
      return generateLocalConsultantResponse(textPrompt, isJson);
    };

    // Helper for clean JSON parsing from AI response
    const cleanAndParseJson = (str: string) => {
      try {
        const cleaned = str.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
        return JSON.parse(cleaned);
      } catch (e) {
        const match = str.match(/\{[\s\S]*\}/);
        if (match) {
          return JSON.parse(match[0]);
        }
        throw e;
      }
    };

    // ACTION: CHAT
    if (action === "chat") {
      const openAiMsgs = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: userMessage }
      ];

      const fullPrompt = history.map(h => `${h.role}: ${h.content}`).join("\n") + `\nUser: ${userMessage}`;
      responseText = await generateAiContent(openAiMsgs, fullPrompt, false);

      if (supabaseClient && payload.conversation_id) {
        try {
          const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(payload.conversation_id);
          if (isUuid) {
            await supabaseClient.from("ai_messages").insert([
              { conversation_id: payload.conversation_id, role: "user", content: userMessage },
              { conversation_id: payload.conversation_id, role: "assistant", content: responseText }
            ]);
          }
        } catch (dbErr) {
          console.warn("Could not persist message to DB (non-fatal):", dbErr);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: responseText,
          conversation_id: payload.conversation_id || "conv_" + Date.now()
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ACTION: GENERATE BRIEF
    if (action === "generate_brief") {
      const briefPromptStr = `
Analyze the conversation history and return ONLY a valid JSON object strictly matching:
{
  "project_name": "Project name",
  "business_type": "Business type",
  "objective": "Primary goals",
  "target_users": "Target audience",
  "platform": "Web App / Mobile App / Web + Mobile",
  "user_roles": ["Role 1", "Role 2"],
  "core_features": ["Feature 1", "Feature 2"],
  "admin_features": ["Admin Feature 1"],
  "integrations": ["Payment Gateway", "WhatsApp API"],
  "technical_recommendation": "Tech stack recommendation",
  "complexity": "Basic" | "Medium" | "Advanced",
  "timeline_estimate": "e.g. 4 - 8 minggu",
  "budget_range": "Estimated budget",
  "open_questions": ["Question 1"]
}
History: ${JSON.stringify(history)}
`;
      const briefMsgs = [
        { role: "system", content: SYSTEM_PROMPT + "\n" + briefPromptStr },
        ...history,
        { role: "user", content: "Generate the JSON project brief." }
      ];

      const rawJsonStr = await generateAiContent(briefMsgs, briefPromptStr, true);
      const briefJson = cleanAndParseJson(rawJsonStr);

      return new Response(
        JSON.stringify({ success: true, project_brief: briefJson }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ACTION: ESTIMATE PROJECT
    if (action === "estimate_project") {
      const specs = payload.project_specs || { projectType: "Web Application", features: [] };
      const estPromptStr = `
Analyze project specifications: Type "${specs.projectType}", Features: [${specs.features.join(", ")}].
Return JSON matching:
{
  "projectType": "${specs.projectType}",
  "complexity": "Basic" | "Medium" | "Advanced",
  "recommendedPlatform": "Platform recommendation",
  "estimatedBudgetRange": "Budget range",
  "estimatedTimelineRange": "Timeline range",
  "featureCount": ${specs.features.length},
  "recommendedTeam": ["PM", "UI/UX", "Developer"],
  "technicalHighlights": ["Highlight 1"],
  "disclaimer": "Estimasi ini merupakan gambaran pasaran awal. Harga dan timeline final ditentukan setelah analisis spesifikasi kebutuhan oleh tim PT. AUBE TERA INDONESIA."
}
`;
      const estMsgs = [
        { role: "system", content: SYSTEM_PROMPT + "\n" + estPromptStr },
        { role: "user", content: "Output JSON estimation." }
      ];

      const rawJsonStr = await generateAiContent(estMsgs, estPromptStr, true);
      const estimationJson = cleanAndParseJson(rawJsonStr);

      return new Response(
        JSON.stringify({ success: true, estimation: estimationJson }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid action" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );

  } catch (err: any) {
    console.error("AUBE AI Fallback handling notice:", err);
    return new Response(
      JSON.stringify({
        success: true,
        message: generateLocalConsultantResponse(payload.message || "", false),
        conversation_id: payload.conversation_id || "conv_" + Date.now()
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function generateLocalConsultantResponse(userMessage: string, isJson = false): string {
  if (isJson) {
    return JSON.stringify({
      project_name: "Konsultasi Transformasi Digital",
      business_type: "Perusahaan / Instansi / Bisnis Retail",
      objective: "Membangun sistem perangkat lunak modern untuk meningkatkan efisiensi operasional dan pertumbuhan bisnis.",
      target_users: "Pelanggan Umum & Tim Internal Perusahaan",
      platform: "Web Application + Mobile App",
      user_roles: ["User / Customer", "Staff Operations", "Super Admin"],
      core_features: [
        "Autentikasi & Keamanan Terenkripsi",
        "Katalog Produk / Solusi Interaktif",
        "Dashboard Management & Reporting",
        "Integrasi Payment Gateway & WhatsApp Gateway"
      ],
      admin_features: [
        "Analytical Revenue Dashboard",
        "Manajemen Pengguna, Hak Akses & Laporan Keuangan"
      ],
      integrations: ["Payment Gateway (Midtrans/Xendit)", "WhatsApp Gateway API", "Cloud Server Vercel/AWS"],
      technical_recommendation: "React / Next.js + Node.js + PostgreSQL + Flutter Mobile",
      complexity: "Medium",
      timeline_estimate: "4 - 8 Minggu",
      budget_range: "Rp 15 - 35 Juta",
      open_questions: [
        "Apakah sudah memiliki dokumen spesifikasi kebutuhan atau wireframe awal?",
        "Apakah sistem perlu dihubungkan dengan database/software yang sudah berjalan?"
      ]
    });
  }

  const lowerMsg = userMessage.toLowerCase();

  if (lowerMsg.includes("langkah") || lowerMsg.includes("tahapan") || lowerMsg.includes("cara") || lowerMsg.includes("proses") || lowerMsg.includes("alur") || lowerMsg.includes("tahap")) {
    return `Berikut adalah **6 Langkah Mudah** membuat website atau aplikasi bersama **PT. AUBE TERA INDONESIA**:

1. 📋 **Diskusi & Analisis Kebutuhan**:
   - Ceritakan ide proyek Anda di sini bersama **AUBE AI** atau hubungi WhatsApp kami **+62 822-1149-9289**.
   - Kami menganalisis kebutuhan bisnis, fitur utama, dan menyusun draft *Project Brief*.

2. 🎨 **Perancangan UI/UX & Prototipe**:
   - Desain wireframe, antarmuka sky-clean yang estetik, dan prototipe interaktif sebelum masuk tahap koding.

3. 💻 **Pengembangan Kode (Development)**:
   - Koding frontend & backend menggunakan React, Next.js, Node.js, atau Flutter dengan standar *Clean Code*.

4. 🧪 **Pengujian Kualitas (QA & Testing)**:
   - Uji coba komprehensif untuk menjamin sistem bebas bug, cepat, dan responsif di seluruh perangkat.

5. 🚀 **Deployment & Peluncuran**:
   - Peluncuran aplikasi ke server cloud (Vercel/AWS) atau App Store / Play Store secara mulus.

6. 🛡️ **Garansi & Dukungan Teknis**:
   - Pendampingan tim teknis purna jual, garansi bebas bug, dan pemeliharaan jangka panjang.

Apakah Anda ingin membuat *Project Brief* otomatis untuk proyek website Anda sekarang?`;
  }

  if (lowerMsg.includes("website") || lowerMsg.includes("web") || lowerMsg.includes("landing")) {
    return `PT. AUBE TERA INDONESIA menghadirkan layanan **Website Development** berstandar internasional yang cepat, aman, dan responsif.

Kami dapat membangun:
- **Company Profile Interaktif** (Rp 3 - 7 Juta)
- **Website Corporate / Web Portal** (Rp 7 - 15 Juta)
- **E-Commerce & Toko Online Complex** (Rp 15 - 30 Juta+)

Apakah Anda sudah memiliki konsep desain atau referensi website yang disukai? Tim desainer & developer kami siap membantu merancangnya.`;
  }

  if (lowerMsg.includes("mobile") || lowerMsg.includes("android") || lowerMsg.includes("ios") || lowerMsg.includes("aplikasi")) {
    return `Layanan **Mobile App Development** PT. AUBE TERA INDONESIA mencakup pengembangan aplikasi Android & iOS berbasis **Flutter** dan **React Native** (Cross-Platform) maupun Native Kotlin/Swift.

Fitur umum yang dapat kami integrasikan:
1. Autentikasi Pengguna & OTP
2. Push Notifications & Real-time Chat
3. Payment Gateway & GPS Mapping

Apakah aplikasi ini diperuntukkan untuk pelanggan umum (B2C) atau kebutuhan internal perusahaan (B2B)?`;
  }

  if (lowerMsg.includes("biaya") || lowerMsg.includes("harga") || lowerMsg.includes("budget") || lowerMsg.includes("berapa")) {
    return `Estimasi anggaran di PT. AUBE TERA INDONESIA bersifat transparan dan dapat disesuaikan dengan skala proyek (*requirement*):

- **Website Corporate**: Rp 3 - 15 Juta
- **Aplikasi Web / Admin Dashboard**: Rp 15 - 75 Juta
- **Mobile App (Android & iOS)**: Rp 15 - 100 Juta+
- **Custom Software & ERP**: Rp 25 - 100 Juta+
- **AI Integration**: Rp 15 - 75 Juta+

Harga final akan ditentukan secara presisi setelah dokumen spesifikasi kebutuhan dikaji oleh tim engineer kami. Ingin kami bantu buatkan *Project Brief*-nya secara otomatis?`;
  }

  if (lowerMsg.includes("ai") || lowerMsg.includes("bot") || lowerMsg.includes("chatbot") || lowerMsg.includes("gpt")) {
    return `PT. AUBE TERA INDONESIA menyediakan layanan **AI Development & Integration** untuk mentransformasi operasional bisnis Anda.

Solusi AI yang kami bangun:
- **Chatbot & Asisten Digital AI 24/7**
- **Integrasi LLM (Gemini 1.5/3.8 & OpenAI API)**
- **Machine Learning & Analytics Prediktif**
- **Automasi Alur Kerja Cerdas**

Apakah ada fitur AI khusus yang ingin Anda integrasikan ke dalam sistem bisnis Anda?`;
  }

  return `Halo! Saya AUBE AI, konsultan digital resmi PT. AUBE TERA INDONESIA.

Kami siap membantu perencanaan dan pembuatan:
1. 🌐 **Website Development** (Company Profile, E-Commerce, Portal)
2. 📱 **Mobile App Development** (Android & iOS)
3. 💻 **Web Application & Admin Dashboard**
4. 🤖 **AI Development & Chatbot Integration**
5. 📊 **Business Information System & ERP**

Ceritakan ide atau kebutuhan sistem yang ingin Anda bangun, dan saya akan memberikan rekomendasi solusi & estimasi teknisnya!`;
}
