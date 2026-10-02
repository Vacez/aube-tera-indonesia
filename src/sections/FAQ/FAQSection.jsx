import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { getFaqData } from '../../data/faq';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const FAQSection = () => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = getFaqData(language);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-24 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950 border-sky-500/15 text-slate-100' : 'bg-slate-50 border-sky-100 text-slate-900'
    }`}>
      
      {/* Background glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
      }`} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
            isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-white border-sky-200 text-sky-700'
          }`}>
            <HelpCircle className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
            <span>{t('faq.badge')}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {t('faq.heading')} <span className={
              isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
            }>{t('faq.headingAccent')}</span>
          </h2>

          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-2xl overflow-hidden border transition-all ${
                  isDark
                    ? 'bg-slate-900/80 border-sky-500/15 hover:border-cyan-400/40'
                    : 'bg-white border-sky-200 shadow-xs hover:border-sky-300 hover:shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors focus:outline-none cursor-pointer ${
                    isDark ? 'text-slate-100 hover:text-cyan-300' : 'text-slate-900 hover:text-sky-600'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border ${
                    isOpen
                      ? isDark ? 'rotate-180 bg-cyan-400 text-slate-950 border-cyan-400 shadow-md' : 'rotate-180 bg-sky-600 text-white border-sky-600 shadow-md'
                      : isDark ? 'bg-slate-900 border-cyan-500/30 text-slate-400' : 'bg-sky-50 border-sky-200 text-sky-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-6 sm:px-6 text-xs sm:text-sm leading-relaxed border-t pt-4 ${
                        isDark ? 'text-slate-300 border-slate-800' : 'text-slate-600 border-sky-100'
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
