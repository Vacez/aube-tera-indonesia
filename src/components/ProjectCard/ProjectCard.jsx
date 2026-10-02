import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const ProjectCard = ({ project, onClick }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onClick(project)}
      className={`group cursor-pointer rounded-3xl overflow-hidden flex flex-col justify-between border transition-all duration-300 relative shadow-lg ${
        isDark
          ? 'bg-slate-900/90 border-sky-500/20 hover:border-cyan-400/60 hover:shadow-cyan-950/60'
          : 'bg-white border-sky-200 shadow-sky-900/5 hover:border-sky-300 hover:shadow-xl'
      }`}
    >
      {/* Top Animated Glowing Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      <div>
        {/* Project Thumbnail Image with Zoom */}
        <div className="relative h-56 sm:h-60 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-950/85 text-cyan-300 backdrop-blur-md border border-cyan-400/40 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {project.categoryLabel}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <span className="text-xs text-slate-100 font-mono font-semibold bg-sky-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-400/40 shadow-sm">
              {project.badge}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-1 transition-colors flex items-center justify-between ${
            isDark ? 'text-slate-100 group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-sky-600'
          }`}>
            <span>{project.title}</span>
            <div className={`p-1.5 rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
              isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-sky-100 text-sky-700'
            }`}>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </h3>
          <p className={`text-xs font-semibold mb-3 ${
            isDark ? 'text-cyan-400' : 'text-sky-600'
          }`}>
            {project.subtitle}
          </p>
          <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {project.shortDesc}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <span key={idx} className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${
                isDark ? 'bg-slate-950 text-cyan-300 border-slate-800' : 'bg-sky-50 text-sky-700 border-sky-200'
              }`}>
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium ${
                isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
              }`}>
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick(project);
          }}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isDark
              ? 'bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-cyan-400 group-hover:text-slate-950 text-cyan-300 border-cyan-400/30'
              : 'bg-sky-50 group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-cyan-500 group-hover:text-white text-sky-700 border-sky-200'
          }`}
        >
          <span>{t('portfolio.viewDetails')}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
