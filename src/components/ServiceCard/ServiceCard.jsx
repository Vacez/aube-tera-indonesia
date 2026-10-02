import React from 'react';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const ServiceCard = ({ service, onClick }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const IconComponent = Icons[service.icon] || Icons.Code2;

  return (
    <div className={`group rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative border transition-all duration-300 ${
      isDark
        ? 'bg-slate-900/80 border-sky-500/15 hover:border-cyan-400/40 hover:bg-slate-900'
        : 'bg-white border-sky-200 shadow-sm hover:border-sky-300 hover:shadow-md'
    }`}>
      
      {/* Top cyan neon line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div>
        {/* Header Icon + Tag */}
        <div className="flex items-center justify-between mb-6">
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-sky-500 group-hover:to-cyan-400 group-hover:text-slate-950 transition-all duration-300 shadow-md ${
            isDark ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400' : 'bg-sky-100 border-sky-300 text-sky-700'
          }`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border transition-colors ${
            isDark ? 'bg-slate-900 text-cyan-300 border-cyan-400/30 group-hover:border-cyan-400/60' : 'bg-sky-50 text-sky-700 border-sky-200'
          }`}>
            {service.tag}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className={`text-xl font-bold mb-2.5 transition-colors ${
          isDark ? 'text-slate-100 group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-sky-600'
        }`}>
          {service.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {service.shortDesc}
        </p>

        {/* Highlight Bullets */}
        <ul className="space-y-2 mb-6">
          {service.items.slice(0, 3).map((item, idx) => (
            <li key={idx} className={`flex items-center gap-2 text-xs font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full shadow-xs ${
                isDark ? 'bg-cyan-400' : 'bg-sky-500'
              }`}></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer CTA Link */}
      <button
        type="button"
        onClick={() => onClick(service)}
        className={`w-full pt-4 border-t flex items-center justify-between text-xs font-bold transition-colors group/btn cursor-pointer ${
          isDark ? 'border-slate-800 text-cyan-400 hover:text-cyan-300' : 'border-sky-100 text-sky-600 hover:text-sky-700'
        }`}
      >
        <span>{t('services.detailsBtn')}</span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border ${
          isDark
            ? 'bg-slate-900 group-hover/btn:bg-cyan-400 group-hover/btn:text-slate-950 border-cyan-400/40'
            : 'bg-sky-100 group-hover/btn:bg-sky-600 group-hover/btn:text-white border-sky-300'
        }`}>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
