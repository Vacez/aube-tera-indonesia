import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code2, ArrowUpRight, Globe, ChevronDown, Check, Sparkles, Sun, Moon } from 'lucide-react';
import { COMPANY_CONFIG, getWhatsAppUrl } from '../../config/company';
import { Button } from '../Button/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const { t, language, setLanguage, currentLangObj, LANGUAGES } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const desktopLangRef = useRef(null);
  const mobileLangRef = useRef(null);

  const navLinks = [
    { id: 'home', label: t('nav.home'), href: '#home' },
    { id: 'about', label: t('nav.about'), href: '#about' },
    { id: 'vision-mission', label: t('nav.visionMission'), href: '#vision-mission' },
    { id: 'services', label: t('nav.services'), href: '#services' },
    { id: 'portfolio', label: t('nav.portfolio'), href: '#portfolio' },
    { id: 'process', label: t('nav.process'), href: '#process' },
    { id: 'testimonials', label: t('nav.testimonials'), href: '#testimonials' },
    { id: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isOutsideDesktop = !desktopLangRef.current || !desktopLangRef.current.contains(e.target);
      const isOutsideMobile = !mobileLangRef.current || !mobileLangRef.current.contains(e.target);
      if (isOutsideDesktop && isOutsideMobile) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-slate-950/85 backdrop-blur-2xl border-b border-sky-500/20 shadow-2xl shadow-sky-950/40 py-3'
            : 'bg-white/85 backdrop-blur-2xl border-b border-sky-200 shadow-lg shadow-sky-900/5 py-3'
          : isDark
            ? 'bg-slate-950/60 backdrop-blur-xl border-b border-sky-500/10 py-4'
            : 'bg-slate-50/70 backdrop-blur-xl border-b border-sky-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1 border-2 border-sky-400/60 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="PT. AUBE TERA INDONESIA" className="w-full h-full object-contain rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-base tracking-wider transition-colors ${
                isDark
                  ? 'bg-gradient-to-r from-slate-100 via-sky-200 to-cyan-300 bg-clip-text text-transparent group-hover:to-cyan-400'
                  : 'bg-gradient-to-r from-slate-900 via-sky-800 to-blue-700 bg-clip-text text-transparent group-hover:to-sky-600'
              }`}>
                {COMPANY_CONFIG.name}
              </span>
              <span className={`text-[10px] tracking-widest uppercase font-bold flex items-center gap-1 ${
                isDark ? 'text-cyan-400' : 'text-sky-600'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                {COMPANY_CONFIG.field}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-xl transition-all ${
            isDark
              ? 'bg-slate-900/90 border-sky-500/20 shadow-inner'
              : 'bg-white/90 border-sky-200 shadow-xs'
          }`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25'
                        : 'bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                      : isDark
                        ? 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Theme Switcher & Language Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 ${
                isDark
                  ? 'bg-slate-900 border-sky-500/30 text-amber-300 hover:border-cyan-400/50 hover:bg-slate-800'
                  : 'bg-white border-sky-200 text-sky-600 hover:border-sky-300 hover:bg-sky-50'
              }`}
              aria-label="Toggle Theme Mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={desktopLangRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all shadow-md cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-sky-500/30 hover:border-cyan-400/50'
                    : 'bg-white hover:bg-sky-50 text-slate-700 border-sky-200 hover:border-sky-300'
                }`}
                aria-label="Select Language"
              >
                <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{currentLangObj.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                } ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 border rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl animate-fadeIn ${
                  isDark
                    ? 'bg-slate-900/95 border-sky-500/30 shadow-cyan-950/80 text-slate-300'
                    : 'bg-white/95 border-sky-200 shadow-sky-900/10 text-slate-700'
                }`}>
                  <div className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase border-b mb-1 flex items-center justify-between ${
                    isDark ? 'text-cyan-400 border-slate-800' : 'text-sky-600 border-slate-100'
                  }`}>
                    <span>{t('nav.selectLanguage')}</span>
                    <Sparkles className={`w-3 h-3 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                        language === lang.code
                          ? isDark
                            ? 'bg-sky-500/20 font-bold text-cyan-300 border-l-2 border-cyan-400'
                            : 'bg-sky-50 font-bold text-sky-700 border-l-2 border-sky-600'
                          : isDark
                            ? 'text-slate-300 hover:bg-slate-800 hover:text-cyan-300'
                            : 'text-slate-700 hover:bg-sky-50/80 hover:text-sky-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                          isDark ? 'bg-slate-800 text-cyan-300' : 'bg-sky-100 text-sky-700'
                        }`}>{lang.label}</span>
                        <span>{lang.name}</span>
                      </div>
                      {language === lang.code && <Check className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions: Theme, Language & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            
            {/* Mobile Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-sky-500/30 text-amber-300'
                  : 'bg-white border-sky-200 text-sky-600'
              }`}
              aria-label="Toggle Theme Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>

            {/* Mobile Language Trigger */}
            <div className="relative" ref={mobileLangRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 text-slate-200 border-sky-500/30'
                    : 'bg-white text-slate-700 border-sky-200'
                }`}
              >
                <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                <span className={`text-[11px] font-bold ${isDark ? 'text-cyan-400' : 'text-sky-600'}`}>{currentLangObj.label}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                } ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-44 border rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl ${
                  isDark ? 'bg-slate-900/95 border-sky-500/30 text-slate-200' : 'bg-white/95 border-sky-200 text-slate-700'
                }`}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left cursor-pointer ${
                        language === lang.code
                          ? isDark ? 'bg-sky-500/20 font-bold text-cyan-300' : 'bg-sky-50 font-bold text-sky-700'
                          : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-sky-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                          isDark ? 'bg-slate-800 text-cyan-300' : 'bg-sky-100 text-sky-700'
                        }`}>{lang.label}</span>
                        <span>{lang.name}</span>
                      </div>
                      {language === lang.code && <Check className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border focus:outline-none ${
                isDark ? 'bg-slate-900 border-sky-500/30 text-slate-200' : 'bg-white border-sky-200 text-slate-700'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-sky-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className={`lg:hidden fixed inset-x-0 top-[65px] backdrop-blur-2xl border-b shadow-2xl p-6 transition-all animate-fadeIn ${
          isDark
            ? 'bg-slate-950/95 border-sky-500/20 text-slate-100'
            : 'bg-white/95 border-sky-200 text-slate-800'
        }`}>
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeSection === link.id
                    ? isDark
                      ? 'bg-sky-500/20 border border-cyan-400/40 text-cyan-300'
                      : 'bg-sky-50 border border-sky-200 text-sky-700'
                    : isDark
                      ? 'text-slate-300 hover:bg-slate-900 hover:text-cyan-300'
                      : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

