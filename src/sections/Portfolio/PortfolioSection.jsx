import React, { useState } from 'react';
import { FolderGit2, ArrowLeft, ArrowRight } from 'lucide-react';
import { getPortfolioCategories, getPortfolioProjects } from '../../data/portfolio';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { ProjectModal } from '../../components/ProjectModal/ProjectModal';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const PortfolioSection = () => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [direction, setDirection] = useState('forward');

  const categories = getPortfolioCategories(language);
  const projects = getPortfolioProjects(language);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Duplicate items for continuous seamless loop marquee
  const displayProjects = filteredProjects.length > 0 
    ? [...filteredProjects, ...filteredProjects, ...filteredProjects]
    : [];

  return (
    <section id="portfolio" className={`py-24 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950/90 border-sky-500/15 text-slate-100' : 'bg-white/90 border-sky-100 text-slate-900'
    }`}>
      
      {/* Background ambient lighting */}
      <div className={`absolute top-1/3 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
      }`} />

      {/* Side Fade Gradients for seamless infinite loop */}
      <div className={`absolute top-0 bottom-0 left-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-r ${
        isDark ? 'from-slate-950 via-slate-950/90 to-transparent' : 'from-white via-white/90 to-transparent'
      }`} />
      <div className={`absolute top-0 bottom-0 right-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-l ${
        isDark ? 'from-slate-950 via-slate-950/90 to-transparent' : 'from-white via-white/90 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
            isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-sky-50 border-sky-200 text-sky-700'
          }`}>
            <FolderGit2 className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
            <span>{t('portfolio.badge')}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {t('portfolio.heading')} <span className={
              isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
            }>{t('portfolio.headingAccent')}</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Filter Tabs & Direction Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 max-w-full overflow-x-auto py-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-300'
                      : isDark
                        ? 'bg-slate-900 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-400/40'
                        : 'bg-white text-slate-700 hover:text-sky-700 border border-sky-200 hover:bg-sky-50 shadow-xs'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
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
      <div className="w-full overflow-hidden py-4">
        <div 
          className={`flex gap-6 items-stretch ${
            direction === 'forward' ? 'animate-marquee' : 'animate-marquee-reverse'
          }`}
          style={{
            animationDuration: `${Math.max(25, filteredProjects.length * 8)}s`
          }}
        >
          {displayProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="w-[85vw] sm:w-[350px] md:w-[380px] shrink-0 flex flex-col"
            >
              <ProjectCard
                project={project}
                onClick={(proj) => setSelectedProject(proj)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
