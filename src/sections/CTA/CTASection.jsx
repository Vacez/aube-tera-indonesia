import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { COMPANY_CONFIG, getWhatsAppUrl } from '../../config/company';
import { Button } from '../../components/Button/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const CTASection = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <section className={`py-20 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950 border-sky-500/15 text-slate-100' : 'bg-slate-50 border-sky-100 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border shadow-2xl backdrop-blur-2xl transition-all ${
            isDark
              ? 'bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border-cyan-400/40 shadow-cyan-950/80 text-slate-100'
              : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 border-sky-400 shadow-sky-900/15 text-white'
          }`}
        >
          {/* Background Ambient Lights */}
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none animate-pulse-glow ${
            isDark ? 'bg-cyan-500/20' : 'bg-sky-300/20'
          }`} />
          <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            isDark ? 'bg-sky-500/20' : 'bg-blue-300/20'
          }`} />

          <div className="relative z-10 max-w-3xl space-y-6 text-center sm:text-left">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md ${
              isDark ? 'bg-slate-950/80 border border-cyan-400/30 text-cyan-300' : 'bg-white/20 border border-white/40 text-white'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
              <span>PT. AUBE TERA INDONESIA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {t('cta.heading')}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-sky-100'
            }`}>
              {t('cta.subtitle')}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <Button
                variant="white"
                size="lg"
                icon={ArrowRight}
                className={
                  isDark
                    ? 'bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-black shadow-xl shadow-cyan-500/25 border border-cyan-300/40'
                    : 'bg-white text-slate-950 font-black hover:bg-sky-50 shadow-xl'
                }
                onClick={() => window.open(getWhatsAppUrl(), '_blank')}
              >
                {t('cta.buttonText')}
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={MessageSquare}
                className={
                  isDark
                    ? 'bg-slate-900/90 text-slate-200 border border-cyan-400/40 hover:bg-slate-800 hover:text-cyan-300 shadow-lg font-bold'
                    : 'bg-white/20 text-white border border-white/50 hover:bg-white hover:text-sky-800 font-bold'
                }
                onClick={() => {
                  const contactElem = document.getElementById('contact');
                  contactElem?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('cta.callUs')} {COMPANY_CONFIG.whatsapp.displayNumber}
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
