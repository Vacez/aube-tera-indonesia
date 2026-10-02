import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const AIQuickPrompts = ({ onSelectPrompt }) => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const promptsMap = {
    id: [
      { label: "💡 Saya punya ide aplikasi", query: "Saya memiliki ide aplikasi dan ingin berkonsultasi mengenai kebutuhan pembuatan aplikasi tersebut." },
      { label: "🌐 Saya ingin membuat website", query: "Saya ingin membuat website profesional untuk perusahaan/bisnis saya." },
      { label: "📱 Saya ingin membuat aplikasi mobile", query: "Saya butuh pembuat aplikasi mobile Android dan iOS." },
      { label: "🏢 Saya ingin digitalisasi bisnis", query: "Saya ingin melakukan digitalisasi sistem dan otomatisasi alur kerja operasional bisnis." },
      { label: "🤖 Saya ingin menggunakan AI", query: "Bagaimana cara memasukkan solusi AI ke dalam sistem bisnis kami?" }
    ],
    en: [
      { label: "💡 I have an app idea", query: "I have an application idea and would like to consult about developing it." },
      { label: "🌐 I want to build a website", query: "I want to create a professional corporate website for my business." },
      { label: "📱 I need a mobile app", query: "I need cross-platform mobile app development for Android & iOS." },
      { label: "🏢 Business digitalization", query: "I want to digitalize business workflows and operational systems." },
      { label: "🤖 Integrate AI technology", query: "How can we integrate AI solutions into our business system?" }
    ],
    vi: [
      { label: "💡 Tôi có ý tưởng ứng dụng", query: "Tôi có ý tưởng về một ứng dụng và muốn tư vấn về giải pháp phát triển." },
      { label: "🌐 Tôi muốn thiết kế website", query: "Tôi muốn tạo một website chuyên nghiệp cho doanh nghiệp của mình." },
      { label: "📱 Phát triển ứng dụng di động", query: "Tôi cần phát triển ứng dụng di động cho Android và iOS." },
      { label: "🏢 Chuyển đổi số doanh nghiệp", query: "Tôi muốn số hóa quy trình kinh doanh và tự động hóa hệ thống." },
      { label: "🤖 Tích hợp công nghệ AI", query: "Làm thế nào để tích hợp AI vào hệ thống doanh nghiệp của chúng tôi?" }
    ],
    ja: [
      { label: "💡 アプリのアイデアがある", query: "アプリ開発のアイデアがあり、要件や費用感について相談したいです。" },
      { label: "🌐 Webサイトを構築したい", query: "企業・事業向けのプロフェッショナルなWebサイトを制作したいです。" },
      { label: "📱 モバイルアプリを作りたい", query: "AndroidおよびiOS向けのモバイルアプリ開発を検討しています。" },
      { label: "🏢 業務のデジタル化・DX", query: "社内業務のデジタル化やワークフローの自動化システムを導入したいです。" },
      { label: "🤖 AI技術を導入したい", query: "当社のビジネスシステムにAI機能を組み込む方法を提案してください。" }
    ]
  };

  const prompts = promptsMap[language] || promptsMap['id'];

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {prompts.map((p, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelectPrompt(p.query)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer hover:scale-105 active:scale-95 shadow-xs ${
            isDark
              ? 'bg-slate-900/90 text-cyan-300 border-cyan-500/30 hover:bg-slate-800 hover:border-cyan-400'
              : 'bg-white text-sky-700 border-sky-200 hover:bg-sky-50 hover:border-sky-300'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};
