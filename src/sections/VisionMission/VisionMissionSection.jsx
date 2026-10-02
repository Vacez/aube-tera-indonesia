import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Eye, Rocket, Target, ShieldCheck, Users, Zap, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const VisionMissionSection = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const coreValueIcons = [Target, ShieldCheck, Users, Zap];

  return (
    <section id="vision-mission" className={`py-24 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950/95 border-sky-500/15 text-slate-100' : 'bg-slate-50/70 border-sky-100 text-slate-900'
    }`}>
      
      {/* Background Lighting Elements */}
      <div className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
      }`} />
      <div className={`absolute bottom-10 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-indigo-500/10' : 'bg-blue-400/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
            isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-white border-sky-200 text-sky-700 shadow-sm'
          }`}>
            <Compass className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
            <span>{t('visionMission.badge')}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {t('visionMission.heading')} <span className={
              isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
            }>{t('visionMission.headingAccent')}</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('visionMission.subtitle')}
          </p>
        </div>

        {/* Dual Cards Grid: Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Visi Perusahaan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-7 sm:p-9 rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-all duration-300 ${
              isDark
                ? 'bg-slate-900/90 border-sky-500/30 hover:border-cyan-400/60 shadow-cyan-950/40'
                : 'bg-white border-sky-200 hover:border-sky-300 shadow-sky-900/5'
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/0 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                  isDark
                    ? 'bg-gradient-to-tr from-cyan-500/20 via-sky-500/20 to-blue-600/30 border-cyan-400/40 text-cyan-300'
                    : 'bg-gradient-to-tr from-sky-100 to-cyan-50 border-sky-300 text-sky-700'
                }`}>
                  <Eye className="w-7 h-7" />
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  isDark ? 'bg-slate-950 border-slate-800 text-cyan-400' : 'bg-sky-50 border-sky-200 text-sky-700'
                }`}>
                  {t('visionMission.visionTag')}
                </span>
              </div>

              <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {t('visionMission.visionTitle')}
              </h3>

              <p className={`text-sm leading-relaxed mb-6 font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                "{t('visionMission.visionText')}"
              </p>
            </div>

            {/* Vision Pillars */}
            <div className="space-y-3 pt-4 border-t border-slate-800/40">
              {(t('visionMission.visionPillars') || []).map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`p-1 rounded-full shrink-0 mt-0.5 ${
                    isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-sky-100 text-sky-600'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{pillar.title}</h4>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Misi Perusahaan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-7 sm:p-9 rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-all duration-300 ${
              isDark
                ? 'bg-slate-900/90 border-sky-500/30 hover:border-cyan-400/60 shadow-cyan-950/40'
                : 'bg-white border-sky-200 hover:border-sky-300 shadow-sky-900/5'
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-sky-500/0 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                  isDark
                    ? 'bg-gradient-to-tr from-sky-500/20 via-cyan-500/20 to-indigo-600/30 border-cyan-400/40 text-cyan-300'
                    : 'bg-gradient-to-tr from-sky-100 to-blue-50 border-sky-300 text-sky-700'
                }`}>
                  <Rocket className="w-7 h-7" />
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  isDark ? 'bg-slate-950 border-slate-800 text-cyan-400' : 'bg-sky-50 border-sky-200 text-sky-700'
                }`}>
                  {t('visionMission.missionTag')}
                </span>
              </div>

              <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {t('visionMission.missionTitle')}
              </h3>

              <p className={`text-sm leading-relaxed mb-6 font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {t('visionMission.missionText')}
              </p>
            </div>

            {/* Mission Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800/40">
              {(t('visionMission.missionPoints') || []).map((point, idx) => (
                <div key={idx} className={`p-3 rounded-2xl border flex items-start gap-2.5 transition-all ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-sky-50/50 border-sky-100'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{point.title}</h4>
                    <p className={`text-[10px] leading-relaxed mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom Section: Core Values */}
        <div className="mt-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className={`text-2xl font-extrabold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              {t('visionMission.coreValuesTitle')}
            </h3>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('visionMission.coreValuesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t('visionMission.coreValues') || []).map((val, idx) => {
              const IconComp = coreValueIcons[idx % coreValueIcons.length] || Award;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 shadow-lg ${
                    isDark
                      ? 'bg-slate-900/80 border-sky-500/20 hover:border-cyan-400/50 hover:shadow-cyan-950/50'
                      : 'bg-white border-sky-200 hover:border-sky-300 shadow-sky-900/5 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 ${
                    isDark ? 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' : 'bg-sky-100 border-sky-200 text-sky-700'
                  }`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className={`text-sm font-bold mb-1.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {val.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
