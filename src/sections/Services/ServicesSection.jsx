import React, { useState } from 'react';
import { Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { getServicesData } from '../../data/services';
import { ServiceCard } from '../../components/ServiceCard/ServiceCard';
import { ServiceModal } from '../../components/ServiceModal/ServiceModal';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const ServicesSection = () => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const [selectedService, setSelectedService] = useState(null);
  const [direction, setDirection] = useState('forward');

  const servicesData = getServicesData(language);

  // Duplicate items for continuous seamless loop marquee
  const displayServices = servicesData.length > 0
    ? [...servicesData, ...servicesData, ...servicesData]
    : [];

  return (
    <section id="services" className={`py-24 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950/95 border-sky-500/15 text-slate-100' : 'bg-white/95 border-sky-100 text-slate-900'
    }`}>
      
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center sm:text-left max-w-2xl space-y-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
              isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-sky-50 border-sky-200 text-sky-700'
            }`}>
              <Layers className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
              <span>{t('services.badge')}</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {t('services.heading')} <span className={
                isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
              }>{t('services.headingAccent')}</span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('services.subtitle')}
            </p>
          </div>

          {/* Slide Direction Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDirection('reverse')}
              title="Arah Kiri"
              className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center ${
                direction === 'reverse'
                  ? isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' : 'bg-sky-100 text-sky-800 border-sky-300'
                  : isDark
                    ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-cyan-300'
                    : 'bg-white text-slate-600 border-sky-200 hover:text-sky-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setDirection('forward')}
              title="Arah Kanan"
              className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center ${
                direction === 'forward'
                  ? isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' : 'bg-sky-100 text-sky-800 border-sky-300'
                  : isDark
                    ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-cyan-300'
                    : 'bg-white text-slate-600 border-sky-200 hover:text-sky-700'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Full Width Continuous One-Direction Marquee Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Side Fade Gradients strictly scoped to marquee cards track */}
        <div className={`absolute top-0 bottom-0 left-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r ${
          isDark ? 'from-slate-950 via-slate-950/80 to-transparent' : 'from-white via-white/80 to-transparent'
        }`} />
        <div className={`absolute top-0 bottom-0 right-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l ${
          isDark ? 'from-slate-950 via-slate-950/80 to-transparent' : 'from-white via-white/80 to-transparent'
        }`} />
        <div 
          className={`flex gap-6 items-stretch ${
            direction === 'forward' ? 'animate-marquee' : 'animate-marquee-reverse'
          }`}
          style={{
            animationDuration: `${Math.max(30, servicesData.length * 7)}s`
          }}
        >
          {displayServices.map((service, idx) => (
            <div
              key={`${service.id}-${idx}`}
              className="w-[85vw] sm:w-[320px] md:w-[350px] shrink-0 flex flex-col"
            >
              <ServiceCard
                service={service}
                onClick={(srv) => setSelectedService(srv)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Service Modal Detail Popup */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};
