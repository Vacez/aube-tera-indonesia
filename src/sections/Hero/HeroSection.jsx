import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Smartphone, Layers, Terminal, Cpu, ShieldCheck, Zap, Activity } from 'lucide-react';
import { COMPANY_CONFIG, getWhatsAppUrl } from '../../config/company';
import { Button } from '../../components/Button/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { TechMarquee } from '../../components/TechMarquee/TechMarquee';
import WebThreads from '../../components/WebThreads/WebThreads';

export const HeroSection = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <section id="home" className={`relative pt-32 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-cyber-grid border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950 border-sky-500/15 text-slate-100' : 'bg-slate-50 border-sky-200 text-slate-900'
    }`}>
      
      {/* Dynamic React Bits WebThreads Animated Background */}
      <div className="absolute inset-0 pointer-events-auto z-0 opacity-80 overflow-hidden">
        <WebThreads
          color1={isDark ? '#06b6d4' : '#0284c7'}
          color2={isDark ? '#818cf8' : '#6366f1'}
          color3={isDark ? '#ffffff' : '#e0f2fe'}
          speed={0.25}
          threadCount={7}
          frequency={4.5}
          spread={0.2}
          taper={1.1}
          position={0.5}
          fanMode="center"
          glow={0.03}
          falloff={0.55}
          thickness={1.2}
          brightness={isDark ? 0.75 : 0.6}
          opacity={isDark ? 0.85 : 0.65}
          mirror={true}
          shimmer={true}
          grain={true}
          grainIntensity={0.04}
          mouseInteraction={true}
          mouseStrength={0.4}
          backgroundColor={isDark ? '#050811' : '#f8fafc'}
          lightMode={!isDark}
        />
      </div>

      {/* Real Corporate IT Software Office Background Wallpaper */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none z-0 ${
          isDark ? 'opacity-15 mix-blend-luminosity' : 'opacity-10 mix-blend-multiply'
        }`}
        style={{
          backgroundImage: "url('/corporate_it_bg.jpg')"
        }}
      />
      <div className={`absolute inset-0 pointer-events-none z-0 ${
        isDark 
          ? 'bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/95' 
          : 'bg-gradient-to-b from-white/75 via-slate-50/80 to-slate-50/95'
      }`} />

      {/* Futuristic Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-cyan pointer-events-none z-0" />
      <div className={`absolute top-24 right-12 w-96 h-96 rounded-full blur-3xl pointer-events-none animate-pulse-glow z-0 ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
      }`} />
      <div className={`absolute bottom-12 left-12 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 ${
        isDark ? 'bg-indigo-500/10' : 'bg-blue-400/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          
          {/* Left Column: Text & CTA (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Brand Pill & Official Slogan */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide backdrop-blur-md transition-all ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-950/80 via-sky-950/80 to-slate-900/90 border border-cyan-400/40 text-cyan-300 shadow-lg shadow-cyan-950/60'
                  : 'bg-gradient-to-r from-sky-50 via-cyan-50 to-white border border-sky-300 text-sky-800 shadow-md shadow-sky-900/5'
              }`}>
                <Sparkles className={`w-3.5 h-3.5 animate-spin-slow ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                <span className="font-black tracking-wider uppercase text-[11px]">{t('company.slogan') || COMPANY_CONFIG.slogan}</span>
              </div>

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all ${
                isDark
                  ? 'bg-slate-900/80 border border-slate-800 text-slate-300'
                  : 'bg-white/80 border border-slate-200 text-slate-600'
              }`}>
                <span>{t('hero.badge')}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {t('hero.heading1')} <br className="hidden sm:inline" />
              <span className={
                isDark
                  ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent animate-gradient-x'
                  : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent animate-gradient-x'
              }>
                {t('hero.headingAccent')}
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t('hero.description')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-black shadow-xl shadow-cyan-500/25 border border-cyan-300/40"
                onClick={() => window.open(getWhatsAppUrl(), '_blank')}
              >
                {t('hero.btnConsult')}
              </Button>

              <Button
                variant="white"
                size="lg"
                className={
                  isDark
                    ? 'bg-slate-900/90 text-slate-200 border border-sky-500/30 hover:bg-slate-800 hover:border-cyan-400/60 shadow-lg font-bold'
                    : 'bg-white text-slate-700 border border-sky-200 hover:bg-sky-50 hover:border-sky-300 shadow-md font-bold'
                }
                onClick={() => {
                  const elem = document.getElementById('portfolio');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('hero.btnPortfolio')}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className={`pt-8 border-t ${isDark ? 'border-slate-800/80' : 'border-sky-200/80'}`}>
              <p className={`text-xs font-bold uppercase tracking-wider mb-4 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2 ${
                isDark ? 'text-cyan-400/90' : 'text-sky-700'
              }`}>
                <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                {t('hero.trustBadgesTitle')}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {(t('hero.trustBadges') || COMPANY_CONFIG.trustBadges).map((badge, idx) => (
                  <div key={idx} className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold shadow-xs transition-colors ${
                    isDark
                      ? 'bg-slate-900/80 border-sky-500/15 text-slate-300 hover:border-cyan-400/40'
                      : 'bg-white/90 border-sky-200 text-slate-700 hover:border-sky-300'
                  }`}>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                    <span className="truncate">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Futuristic Cyber Code Visual (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Window Container */}
            <div className={`relative rounded-3xl p-4 shadow-2xl backdrop-blur-2xl animate-float-slow transition-all ${
              isDark
                ? 'bg-slate-900/90 border border-sky-500/30 shadow-cyan-950/80'
                : 'bg-white/95 border border-sky-200 shadow-sky-900/10'
            }`}>
              
              {/* Window Controls Header */}
              <div className={`flex items-center justify-between px-3 py-2 border-b mb-4 ${
                isDark ? 'border-slate-800' : 'border-sky-100'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className={`text-[11px] font-mono flex items-center gap-1.5 font-bold ${
                  isDark ? 'text-cyan-400/90' : 'text-sky-700'
                }`}>
                  <Terminal className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  aubetera-core.ts
                </span>
              </div>

              {/* Code & Architecture Visual Window */}
              <div className="space-y-3 font-mono text-xs p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 shadow-inner overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-cyan-400 border-b border-slate-800/80 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    // Digital Ecosystem Architecture
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    200 OK • 12ms
                  </span>
                </div>
                <pre className="text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                  <code className="text-cyan-400">import</code> &#123; Cloud, Security, Scalability &#125; <code className="text-cyan-400">from</code> <code className="text-amber-300">'@aubetera/engine'</code>;<br/>
                  <br/>
                  <code className="text-purple-400">export const</code> system = <code className="text-sky-300">createSolution</code>(&#123;<br/>
                  &nbsp;&nbsp;partner: <code className="text-emerald-300">"{COMPANY_CONFIG.shortName}"</code>,<br/>
                  &nbsp;&nbsp;techStack: [<code className="text-amber-300">'React'</code>, <code className="text-amber-300">'Node'</code>, <code className="text-amber-300">'Flutter'</code>],<br/>
                  &nbsp;&nbsp;security: <code className="text-cyan-300">'AES-256 Protocol'</code>,<br/>
                  &nbsp;&nbsp;status: <code className="text-emerald-400">'Deployed & Online'</code><br/>
                  &#125;);
                </pre>
              </div>

              {/* Floating Cards Overlays */}
              <div className={`absolute -top-6 -right-6 p-3.5 rounded-2xl border shadow-2xl hidden sm:flex items-center gap-3 animate-float-reverse backdrop-blur-xl ${
                isDark
                  ? 'bg-slate-900/95 border-cyan-400/40 shadow-cyan-950/80 text-slate-100'
                  : 'bg-white/95 border-sky-300 shadow-sky-900/10 text-slate-800'
              }`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDark ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' : 'bg-sky-100 border-sky-300 text-sky-700'
                }`}>
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Mobile Apps</h4>
                  <p className={`text-[10px] font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-sky-600'}`}>iOS & Android Native</p>
                </div>
              </div>

              <div className={`absolute -bottom-6 -left-6 p-3.5 rounded-2xl border shadow-2xl hidden sm:flex items-center gap-3 backdrop-blur-xl ${
                isDark
                  ? 'bg-slate-900/95 border-sky-400/40 shadow-cyan-950/80 text-slate-100'
                  : 'bg-white/95 border-sky-300 shadow-sky-900/10 text-slate-800'
              }`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDark ? 'bg-sky-500/20 border-sky-400/40 text-sky-300' : 'bg-sky-100 border-sky-300 text-sky-700'
                }`}>
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Cloud Infrastructure</h4>
                  <p className="text-[10px] font-mono text-emerald-500 font-bold">99.99% High Uptime</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Dynamic Infinite Tech Stack Marquee Slider */}
      <TechMarquee />
    </section>
  );
};

