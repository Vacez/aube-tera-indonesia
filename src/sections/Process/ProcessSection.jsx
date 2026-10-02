import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';
import * as Icons from 'lucide-react';
import { getProcessStepsData } from '../../data/process';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const ProcessSection = () => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const processSteps = getProcessStepsData(language);

  return (
    <section id="process" className={`py-24 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950/95 border-sky-500/15 text-slate-100' : 'bg-slate-50 border-sky-100 text-slate-900'
    }`}>
      
      {/* Background glow */}
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
            isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-white border-sky-200 text-sky-700'
          }`}>
            <GitCommit className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
            <span>{t('process.badge')}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {t('process.heading')} <span className={
              isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
            }>{t('process.headingAccent')}</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('process.subtitle')}
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          
          {/* Glowing Connector Line */}
          <div className={`hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r -translate-y-12 z-0 opacity-50 ${
            isDark ? 'from-cyan-500 via-sky-400 to-indigo-500' : 'from-sky-400 via-cyan-500 to-blue-600'
          }`} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 relative z-10">
            {processSteps.slice(0, 6).map((stepItem, idx) => {
              const IconComp = Icons[stepItem.icon] || Icons.Code;
              return (
                <motion.div
                  key={stepItem.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`group rounded-3xl p-5 flex flex-col justify-between border transition-all duration-300 ${
                    isDark
                      ? 'bg-slate-900/80 border-sky-500/15 hover:border-cyan-400/40 hover:bg-slate-900'
                      : 'bg-white border-sky-200 shadow-sm hover:border-sky-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Step Badge & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-mono text-2xl font-black bg-gradient-to-r bg-clip-text text-transparent ${
                        isDark ? 'from-cyan-400 to-sky-300' : 'from-sky-600 to-blue-700'
                      }`}>
                        {stepItem.step}
                      </span>
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shadow-md ${
                        isDark ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950' : 'bg-sky-100 border-sky-300 text-sky-700 group-hover:bg-sky-600 group-hover:text-white'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className={`text-base font-bold mb-2 transition-colors ${
                      isDark ? 'text-slate-100 group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-sky-600'
                    }`}>
                      {stepItem.title}
                    </h3>

                    <p className={`text-xs leading-relaxed mb-3 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {stepItem.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
