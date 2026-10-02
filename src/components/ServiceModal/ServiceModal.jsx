import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Cpu, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../Button/Button';
import { getWhatsAppUrl } from '../../config/company';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const ServiceModal = ({ service, onClose }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className={`fixed inset-0 ${
            isDark ? 'bg-slate-950/85 backdrop-blur-2xl' : 'bg-slate-900/65 backdrop-blur-md'
          }`}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-3xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-3xl shadow-2xl z-10 transition-colors duration-300 ${
            isDark
              ? 'bg-slate-900/95 border border-cyan-500/30 text-slate-200 shadow-cyan-950/70'
              : 'bg-white border border-sky-200 text-slate-800 shadow-sky-900/20'
          }`}
        >
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition-all border cursor-pointer hover:rotate-90 duration-300 ${
              isDark
                ? 'bg-slate-950 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border-slate-800'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border-slate-300'
            }`}
            aria-label="Close service modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold border shadow-xs flex items-center gap-1.5 ${
              isDark
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'bg-sky-100 text-sky-800 border-sky-300'
            }`}>
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {service.tag}
            </span>
          </div>

          <h2 className={`text-2xl sm:text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {service.title}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed mb-6 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {service.fullDesc}
          </p>

          {/* Key Scope Items */}
          <div className="mb-6">
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-cyan-400' : 'text-sky-700'}`}>
              {t('services.modalTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.items.map((item, idx) => (
                <div key={idx} className={`flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-medium shadow-xs ${
                  isDark
                    ? 'bg-slate-950/70 border-sky-500/20 text-slate-200'
                    : 'bg-sky-50/70 border-sky-200 text-slate-800'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits & Tech Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                isDark ? 'text-emerald-400' : 'text-emerald-800'
              }`}>
                <ShieldCheck className="w-4 h-4" /> {t('services.keyBenefits')}
              </h4>
              <ul className="space-y-2">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className={`text-xs flex items-center gap-2 font-medium ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`}></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-sky-950/40 border-sky-500/30' : 'bg-sky-50/70 border-sky-200'
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                isDark ? 'text-cyan-400' : 'text-sky-700'
              }`}>
                <Cpu className="w-4 h-4" /> {t('services.technologies')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.techUsed.map((tech, idx) => (
                  <span key={idx} className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border shadow-xs ${
                    isDark
                      ? 'bg-slate-900 text-cyan-300 border-sky-500/30'
                      : 'bg-white text-sky-800 border-sky-200'
                  }`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Footer */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark ? 'bg-slate-950/80 border-sky-500/20' : 'bg-slate-50 border-sky-200'
          }`}>
            <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('serviceModal.consultNotice')}</p>
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              className="shrink-0 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black"
              onClick={() => window.open(getWhatsAppUrl(`Halo PT. AUBE TERA INDONESIA, saya ingin berkonsultasi mengenai layanan ${service.title}.`), '_blank')}
            >
              {t('services.consultBtn')}
            </Button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
