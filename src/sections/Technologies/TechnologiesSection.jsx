import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import * as Icons from 'lucide-react';
import { TECH_STACK_DATA } from '../../data/technologies';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const TechnologiesSection = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const getCategoryTitle = (cat) => {
    if (cat.includes('Frontend')) return t('technologies.frontend');
    if (cat.includes('Backend')) return t('technologies.backend');
    if (cat.includes('Mobile')) return t('technologies.mobile');
    if (cat.includes('Database')) return t('technologies.database');
    return cat;
  };

  return (
    <section className={`py-20 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950 border-sky-500/15 text-slate-100' : 'bg-slate-50 border-sky-100 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
            isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-white border-sky-200 text-sky-700'
          }`}>
            <Cpu className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
            <span>{t('technologies.badge')}</span>
          </div>

          <h2 className={`text-3xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {t('technologies.heading')} <span className={
              isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
            }>{t('technologies.headingAccent')}</span>
          </h2>

          <p className={`text-xs sm:text-sm leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('technologies.subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_STACK_DATA.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className={`rounded-3xl p-6 border transition-all ${
                isDark
                  ? 'bg-slate-900/80 border-sky-500/15 hover:border-cyan-400/40'
                  : 'bg-white border-sky-200 shadow-sm hover:border-sky-300'
              }`}
            >
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 border-b pb-2.5 flex items-center justify-between ${
                isDark ? 'text-cyan-400 border-slate-800' : 'text-sky-700 border-sky-100'
              }`}>
                <span>{getCategoryTitle(group.category)}</span>
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  isDark ? 'bg-cyan-400' : 'bg-sky-500'
                }`}></span>
              </h3>

              <div className="space-y-2.5">
                {group.items.map((tech, techIdx) => {
                  const IconComp = Icons[tech.icon] || Icons.Code;
                  return (
                    <div
                      key={techIdx}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs ${
                        isDark
                          ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-400/40'
                          : 'bg-sky-50/60 border-sky-100 hover:border-sky-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComp className={`w-4 h-4 shrink-0 ${
                          isDark ? 'text-cyan-400' : 'text-sky-600'
                        }`} />
                        <span className={`font-semibold ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}>{tech.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                        isDark ? 'bg-slate-800 text-cyan-300 border-slate-700' : 'bg-white text-sky-700 border-sky-200'
                      }`}>
                        {tech.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
