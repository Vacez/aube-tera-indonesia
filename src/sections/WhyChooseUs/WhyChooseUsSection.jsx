import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Sparkles, Zap } from 'lucide-react';
import { getWhyChooseUsData } from '../../data/whyChooseUs';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const WhyChooseUsSection = () => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const itemsData = getWhyChooseUsData(language);

  return (
    <section className={`py-24 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950 border-sky-500/15 text-slate-100' : 'bg-slate-50 border-sky-100 text-slate-900'
    }`}>
      
      {/* Background ambient lighting */}
      <div className={`absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
      }`} />
      <div className={`absolute bottom-10 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-sky-500/10' : 'bg-blue-400/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
            isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-white border-sky-200 text-sky-700'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
            <span>{t('whyChooseUs.badge')}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {t('whyChooseUs.heading')} <span className={
              isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
            }>{t('whyChooseUs.headingAccent')}</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('whyChooseUs.subtitle')}
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsData.map((item, idx) => {
            const IconComp = Icons[item.icon] || Icons.ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 ${
                  isDark
                    ? 'bg-slate-900/80 border-sky-500/15 hover:border-cyan-400/40 hover:bg-slate-900'
                    : 'bg-white border-sky-200 shadow-sm hover:border-sky-300 hover:shadow-md'
                }`}
              >
                {/* Top Glowing Beam */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  <div className={`w-12 h-12 rounded-2xl border mb-6 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-sky-500 group-hover:to-cyan-400 group-hover:text-slate-950 transition-all duration-300 flex items-center justify-center shadow-md ${
                    isDark ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400' : 'bg-sky-100 border-sky-300 text-sky-700'
                  }`}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className={`text-xl font-bold mb-2.5 transition-colors ${
                    isDark ? 'text-slate-100 group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-sky-600'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
