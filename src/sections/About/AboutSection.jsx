import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Users, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { COMPANY_CONFIG, getWhatsAppUrl } from '../../config/company';
import { Button } from '../../components/Button/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const AboutSection = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <section id="about" className={`py-24 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950/90 border-sky-500/15 text-slate-100' : 'bg-white/90 border-sky-100 text-slate-900'
    }`}>
      
      {/* Corporate Building Background Image Overlay */}
      <div 
        className={`absolute inset-0 bg-cover bg-center pointer-events-none transition-all duration-700 ${
          isDark ? 'opacity-15 mix-blend-luminosity' : 'opacity-10 mix-blend-multiply'
        }`}
        style={{
          backgroundImage: "url('/corporate_building_bg.jpg')"
        }}
      />
      <div className={`absolute inset-0 pointer-events-none ${
        isDark ? 'bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-slate-950/95' : 'bg-gradient-to-b from-white/95 via-slate-50/90 to-white/95'
      }`} />

      {/* Ambient Cyber Lighting Orbs */}
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
      }`} />
      <div className={`absolute bottom-0 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-indigo-500/10' : 'bg-blue-400/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Features (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
              isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-sky-50 border-sky-200 text-sky-700'
            }`}>
              <Users className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
              <span>{t('about.badge')}</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {t('about.heading')} <span className={
                isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
              }>{t('about.headingAccent')}</span>
            </h2>

            <p className={`text-base leading-relaxed font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {t('about.paragraph1')}
            </p>
            <p className={`text-sm leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t('about.paragraph2')}
            </p>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {(t('about.features') || []).map((feature, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
                  isDark
                    ? 'bg-slate-900/80 border-sky-500/20 hover:border-cyan-400/40'
                    : 'bg-white border-sky-200 shadow-sm hover:border-sky-300'
                }`}>
                  <div className={`p-1 rounded-full shrink-0 mt-0.5 border ${
                    isDark ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30' : 'bg-sky-100 text-sky-700 border-sky-300'
                  }`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{feature.title}</h4>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                className="bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                onClick={() => window.open(getWhatsAppUrl(), '_blank')}
              >
                {t('hero.btnConsult')}
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Statistics Grid & Visual Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Top Visual Tech Highlight Card */}
            <div className={`p-6 rounded-3xl border shadow-2xl relative overflow-hidden transition-all ${
              isDark ? 'bg-slate-900/90 border-sky-500/30 shadow-cyan-950/80' : 'bg-white border-sky-200 shadow-sky-900/10'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isDark ? 'text-cyan-400' : 'text-sky-700'
                }`}>
                  <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  Digital Transformation
                </span>
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${
                  isDark ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' : 'bg-sky-100 border-sky-300 text-sky-700'
                }`}>
                  <Cpu className="w-4 h-4" />
                </div>
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{t('about.visionTitle')}</h3>
              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('about.visionDesc')}
              </p>
              <div className="w-full h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 rounded-full"></div>
            </div>

            {/* Statistic Cards */}
            <div className="grid grid-cols-2 gap-4">
              {COMPANY_CONFIG.stats.map((stat) => (
                <div
                  key={stat.id}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    isDark
                      ? 'bg-slate-900/80 border-sky-500/20 hover:border-cyan-400/40'
                      : 'bg-white border-sky-200 shadow-sm hover:border-sky-300'
                  }`}
                >
                  <span className={
                    isDark
                      ? 'text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 block mb-1'
                      : 'text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 block mb-1'
                  }>
                    {stat.value}
                  </span>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {t(`hero.stats.${stat.id}`)}
                  </h4>
                  <p className={`text-[10px] font-mono font-semibold ${
                    isDark ? 'text-cyan-400/90' : 'text-sky-700'
                  }`}>
                    {t(`hero.stats.${stat.id}Desc`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
