import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Sparkles, Layers, ShieldCheck, Zap, ArrowRight, Activity, Code } from 'lucide-react';
import { Button } from '../Button/Button';
import { getWhatsAppUrl } from '../../config/company';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const ProjectModal = ({ project, onClose }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Animated Dark Backdrop */}
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

        {/* Animated Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 z-10 transition-all ${
            isDark
              ? 'bg-slate-900/95 border-cyan-500/30 shadow-cyan-950/70 text-slate-200'
              : 'bg-white border-sky-200 shadow-sky-900/20 text-slate-800'
          }`}
        >
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition-all z-20 border cursor-pointer hover:rotate-90 duration-300 ${
              isDark
                ? 'bg-slate-950 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border-slate-800'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border-slate-200'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Category Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold border shadow-xs ${
              isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' : 'bg-sky-100 text-sky-800 border-sky-300'
            }`}>
              {project.categoryLabel}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              isDark ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              {project.badge}
            </span>
          </div>

          <h2 className={`text-2xl sm:text-4xl font-black mb-2 tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {project.title}
          </h2>
          <p className={`text-xs sm:text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {project.subtitle}
          </p>

          {/* Hero Interactive Image Banner with Overlay Effects */}
          <div className={`relative h-64 sm:h-84 rounded-2xl overflow-hidden mb-6 border shadow-lg group ${
            isDark ? 'border-sky-500/30' : 'border-sky-200'
          }`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            
            {/* Live Tech Stack Pills Banner */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 z-10">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className={`px-3 py-1 rounded-lg text-xs font-mono font-bold backdrop-blur-md border shadow-md ${
                  isDark ? 'bg-slate-950/85 text-cyan-300 border-cyan-400/40' : 'bg-white/95 text-sky-800 border-sky-300'
                }`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tab Navigation for Detailed Inspection */}
          <div className="flex border-b mb-6 overflow-x-auto gap-2 text-xs font-bold transition-colors ${
            isDark ? 'border-slate-800' : 'border-sky-100'
          }">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 transition-all border-b-2 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'overview'
                  ? isDark
                    ? 'border-cyan-400 text-cyan-300 font-extrabold'
                    : 'border-sky-600 text-sky-700 font-extrabold'
                  : isDark
                    ? 'border-transparent text-slate-400 hover:text-slate-200'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t('projectModal.overviewTitle')}</span>
            </button>

            <button
              onClick={() => setActiveTab('features')}
              className={`pb-3 px-4 transition-all border-b-2 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'features'
                  ? isDark
                    ? 'border-cyan-400 text-cyan-300 font-extrabold'
                    : 'border-sky-600 text-sky-700 font-extrabold'
                  : isDark
                    ? 'border-transparent text-slate-400 hover:text-slate-200'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('portfolio.modalKeyFeatures')}</span>
            </button>

            <button
              onClick={() => setActiveTab('impact')}
              className={`pb-3 px-4 transition-all border-b-2 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'impact'
                  ? isDark
                    ? 'border-cyan-400 text-cyan-300 font-extrabold'
                    : 'border-sky-600 text-sky-700 font-extrabold'
                  : isDark
                    ? 'border-transparent text-slate-400 hover:text-slate-200'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('portfolio.modalImpact')}</span>
            </button>
          </div>

          {/* Animated Tab Content Body */}
          <div className="mb-8 min-h-[160px]">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {project.overview}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-amber-950/30 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
                  }`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                      isDark ? 'text-amber-400' : 'text-amber-800'
                    }`}>
                      <Zap className="w-3.5 h-3.5" />
                      {t('projectModal.challengeTitle')}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{project.challenge}</p>
                  </div>
                  <div className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
                  }`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-800'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t('projectModal.solutionTitle')}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{project.solution}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className={`flex items-start gap-3 p-3.5 rounded-2xl border text-xs font-medium shadow-xs ${
                      isDark ? 'bg-slate-950/70 text-slate-200 border-sky-500/25' : 'bg-sky-50/60 text-slate-800 border-sky-200'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === 'impact' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {project.results.map((res, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border flex flex-col justify-between shadow-md ${
                    isDark ? 'bg-gradient-to-tr from-sky-950/40 to-slate-900 border-cyan-400/30' : 'bg-gradient-to-tr from-sky-50 to-white border-sky-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isDark ? 'text-cyan-400' : 'text-sky-700'
                      }`}>Impact Metric #{idx + 1}</span>
                      <Activity className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                    </div>
                    <p className={`text-xs font-bold leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{res}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Action Footer Call-to-Action Banner */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ${
            isDark ? 'bg-slate-950/80 border-sky-500/30' : 'bg-slate-50 border-sky-200'
          }`}>
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{t('projectModal.interestedTitle')}</h4>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Konsultasikan skema sistem serupa secara gratis dengan tim engineer kami.</p>
            </div>
            <Button
              variant="primary"
              size="md"
              className="shrink-0 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20 cursor-pointer"
              icon={ExternalLink}
              onClick={() => window.open(getWhatsAppUrl(`Halo PT. AUBE TERA INDONESIA, saya tertarik mendiskusikan pembuatan sistem serupa dengan proyek ${project.title}.`), '_blank')}
            >
              {t('projectModal.consultBtn')}
            </Button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
