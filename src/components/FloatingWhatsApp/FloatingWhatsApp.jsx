import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_CONFIG, getWhatsAppUrl } from '../../config/company';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const FloatingWhatsApp = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className={`mb-3 relative max-w-xs backdrop-blur-xl border text-xs p-3.5 rounded-2xl shadow-xl animate-bounce duration-1000 ${
          isDark
            ? 'bg-slate-900/95 border-emerald-500/40 text-slate-200 shadow-emerald-950/50'
            : 'bg-white/95 border-emerald-400 text-slate-800 shadow-emerald-500/20'
        }`}>
          <button
            onClick={() => setShowTooltip(false)}
            className={`absolute -top-1.5 -right-1.5 rounded-full p-0.5 border cursor-pointer ${
              isDark
                ? 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                : 'bg-slate-100 text-slate-500 hover:text-slate-900 border-slate-300'
            }`}
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-emerald-500">{t('floatingWa.title')}</span>
          </div>
          <p className={`leading-relaxed text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {t('floatingWa.text')}
          </p>
          <div className={`absolute -bottom-2 right-5 w-4 h-4 border-r border-b rotate-45 ${
            isDark ? 'bg-slate-900 border-emerald-500/40' : 'bg-white border-emerald-400'
          }`}></div>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 group border border-emerald-300/40"
        aria-label={`Chat WhatsApp ${COMPANY_CONFIG.name} ${COMPANY_CONFIG.whatsapp.displayNumber}`}
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-pulse"></span>
        <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
      </a>
    </div>
  );
};
