import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowUpRight, Globe, ChevronDown, ChevronRight, Check, Sparkles, Sun, Moon,
  Home, Building2, Target, Briefcase, Layers, Cpu, GitBranch, ShieldCheck, 
  MessageSquareQuote, HelpCircle, Mail, Compass
} from 'lucide-react';
import { COMPANY_CONFIG, getWhatsAppUrl } from '../../config/company';
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
  const mobileMenuRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  // Full section links for mobile quick navigation dropdown
  const navLinks = [
    { id: 'home', label: t('nav.home'), href: '#home', icon: Home },
    { id: 'about', label: t('nav.about'), href: '#about', icon: Building2 },
    { id: 'vision-mission', label: t('nav.visionMission'), href: '#vision-mission', icon: Target },
    { id: 'services', label: t('nav.services'), href: '#services', icon: Briefcase },
    { id: 'technologies', label: t('nav.technologies') || 'Teknologi', href: '#technologies', icon: Cpu },
    { id: 'portfolio', label: t('nav.portfolio'), href: '#portfolio', icon: Layers },
    { id: 'process', label: t('nav.process'), href: '#process', icon: GitBranch },
    { id: 'why-choose-us', label: t('nav.whyUs') || 'Keunggulan', href: '#why-choose-us', icon: ShieldCheck },
    { id: 'testimonials', label: t('nav.testimonials'), href: '#testimonials', icon: MessageSquareQuote },
    { id: 'faq', label: t('nav.faq') || 'FAQ', href: '#faq', icon: HelpCircle },
    { id: 'contact', label: t('nav.contact'), href: '#contact', icon: Mail },
  ];

  // Primary links shown on desktop bar
  const desktopNavLinks = [
    { id: 'home', label: t('nav.home'), href: '#home' },
    { id: 'about', label: t('nav.about'), href: '#about' },
    { id: 'vision-mission', label: t('nav.visionMission'), href: '#vision-mission' },
    { id: 'services', label: t('nav.services'), href: '#services' },
    { id: 'portfolio', label: t('nav.portfolio'), href: '#portfolio' },
    { id: 'process', label: t('nav.process'), href: '#process' },
    { id: 'testimonials', label: t('nav.testimonials'), href: '#testimonials' },
    { id: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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

      const isOutsideMobileMenu = !mobileMenuRef.current || !mobileMenuRef.current.contains(e.target);
      const isOutsideMobileBtn = !mobileMenuBtnRef.current || !mobileMenuBtnRef.current.contains(e.target);
      if (isOutsideMobileMenu && isOutsideMobileBtn) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Smooth scroll handler for quick jump navigation
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-slate-950/85 backdrop-blur-2xl border-b border-sky-500/20 shadow-2xl shadow-sky-950/40 py-2.5 sm:py-3'
            : 'bg-white/85 backdrop-blur-2xl border-b border-sky-200 shadow-lg shadow-sky-900/5 py-2.5 sm:py-3'
          : isDark
            ? 'bg-slate-950/60 backdrop-blur-xl border-b border-sky-500/10 py-3 sm:py-4'
            : 'bg-slate-50/70 backdrop-blur-xl border-b border-sky-100 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Brand Logo with responsive text clipping */}
          <a href="#home" className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 group shrink min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white p-1 border-2 border-sky-400/60 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="PT. AUBE TERA INDONESIA" className="w-full h-full object-contain rounded-full" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`font-black text-xs sm:text-base tracking-wider truncate transition-colors ${
                isDark
                  ? 'bg-gradient-to-r from-slate-100 via-sky-200 to-cyan-300 bg-clip-text text-transparent group-hover:to-cyan-400'
                  : 'bg-gradient-to-r from-slate-900 via-sky-800 to-blue-700 bg-clip-text text-transparent group-hover:to-sky-600'
              }`}>
                {COMPANY_CONFIG.name}
              </span>
              <span className={`text-[8.5px] xs:text-[9.5px] sm:text-[10px] tracking-widest uppercase font-bold flex items-center gap-1 truncate ${
                isDark ? 'text-cyan-400' : 'text-sky-600'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
                <span className="truncate">{COMPANY_CONFIG.field}</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-0.5 xl:gap-1 p-1.5 rounded-full border backdrop-blur-xl transition-all shrink-0 ${
            isDark
              ? 'bg-slate-900/90 border-sky-500/20 shadow-inner'
              : 'bg-white/90 border-sky-200 shadow-xs'
          }`}>
            {desktopNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-2.5 xl:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap shrink-0 ${
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

          {/* Desktop Theme Switcher & Language Switcher */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            
            {/* Desktop Theme Toggle Button */}
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

            {/* Desktop Language Selector Dropdown */}
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

          {/* Mobile Actions: Theme, Language & Mobile Page Dropdown Menu */}
          <div className="flex lg:hidden items-center gap-1 xs:gap-1.5 sm:gap-2 shrink-0">
            
            {/* Mobile Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer shadow-xs active:scale-95 ${
                isDark
                  ? 'bg-slate-900 border-sky-500/30 text-amber-300 hover:bg-slate-800'
                  : 'bg-white border-sky-200 text-sky-600 hover:bg-sky-50'
              }`}
              aria-label="Toggle Theme Mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-sky-600" />}
            </button>

            {/* Mobile Language Selector Dropdown */}
            <div className="relative" ref={mobileLangRef}>
              <button
                type="button"
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-xs active:scale-95 ${
                  isDark
                    ? 'bg-slate-900 text-slate-200 border-sky-500/30'
                    : 'bg-white text-slate-700 border-sky-200'
                }`}
                aria-label="Select Language"
              >
                <Globe className={`w-3 h-3 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                <span className={`text-[11px] font-bold ${isDark ? 'text-cyan-300' : 'text-sky-700'}`}>{currentLangObj.label}</span>
                <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                } ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-44 border rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl animate-fadeIn ${
                  isDark ? 'bg-slate-900/95 border-sky-500/30 text-slate-200 shadow-cyan-950/80' : 'bg-white/95 border-sky-200 text-slate-700 shadow-sky-900/10'
                }`}>
                  <div className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase border-b mb-1 flex items-center justify-between ${
                    isDark ? 'text-cyan-400 border-slate-800' : 'text-sky-600 border-slate-100'
                  }`}>
                    <span>{t('nav.selectLanguage')}</span>
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left cursor-pointer transition-colors ${
                        language === lang.code
                          ? isDark ? 'bg-sky-500/20 font-bold text-cyan-300 border-l-2 border-cyan-400' : 'bg-sky-50 font-bold text-sky-700 border-l-2 border-sky-600'
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

            {/* Mobile Page Navigation Dropdown Button */}
            <button
              ref={mobileMenuBtnRef}
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setLangDropdownOpen(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 ${
                mobileMenuOpen
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-cyan-400 shadow-cyan-500/30'
                  : isDark
                    ? 'bg-slate-900 border-sky-500/30 text-slate-100 hover:border-cyan-400/50 hover:bg-slate-800'
                    : 'bg-white border-sky-200 text-slate-800 hover:border-sky-300 hover:bg-sky-50'
              }`}
              aria-label={t('nav.quickNav')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-3.5 h-3.5 text-white" />
                  <span className="font-extrabold text-[11px]">{t('nav.menu')}</span>
                </>
              ) : (
                <>
                  <Menu className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <span className={`font-extrabold text-[11px] ${isDark ? 'text-cyan-300' : 'text-sky-700'}`}>
                    {t('nav.menu')}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Page Navigation Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-x-0 top-[54px] sm:top-[64px] max-h-[calc(100vh-68px)] overflow-y-auto backdrop-blur-2xl border-b shadow-2xl transition-all animate-fadeIn z-50 ${
            isDark
              ? 'bg-slate-950/95 border-sky-500/25 text-slate-100 shadow-cyan-950/60'
              : 'bg-white/95 border-sky-200 text-slate-800 shadow-sky-900/15'
          }`}
        >
          <div className="max-w-lg mx-auto p-4 sm:p-6 space-y-3">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-2.5 border-b border-sky-500/15">
              <div className="flex items-center gap-2">
                <Compass className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-cyan-400' : 'text-sky-600'
                }`}>
                  {t('nav.quickNav')}
                </span>
              </div>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                isDark ? 'bg-slate-800 text-cyan-300 border border-slate-700' : 'bg-sky-50 text-sky-700 border border-sky-200'
              }`}>
                {navLinks.length} Menu
              </span>
            </div>

            {/* Navigation Links Grid / List */}
            <nav className="grid grid-cols-1 xs:grid-cols-2 gap-1.5">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-gradient-to-r from-sky-500/25 to-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-sm'
                          : 'bg-sky-50 border border-sky-300 text-sky-700 shadow-sm'
                        : isDark
                          ? 'bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-cyan-300'
                          : 'bg-slate-50/80 border border-slate-200/60 text-slate-700 hover:bg-sky-50 hover:text-sky-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        isActive
                          ? isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-sky-100 text-sky-700'
                          : isDark ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500 shadow-2xs'
                      }`}>
                        {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                      </div>
                      <span className="truncate">{link.label}</span>
                    </div>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0 ml-1"></span>
                    ) : (
                      <ChevronRight className={`w-3 h-3 opacity-40 shrink-0 ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Quick Action Footer in Dropdown */}
            <div className={`pt-3 border-t flex flex-col gap-2 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <a
                href={getWhatsAppUrl(`Halo Tim PT. AUBE TERA INDONESIA, saya ingin konsultasi terkait project sistem/website.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('nav.consultation')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
