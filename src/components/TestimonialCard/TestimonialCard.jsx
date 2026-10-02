import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const TestimonialCard = ({ testimonial }) => {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group border transition-all duration-300 ${
      isDark
        ? 'bg-slate-900/80 border-sky-500/15 hover:border-cyan-400/40'
        : 'bg-white border-sky-200 shadow-sm hover:border-sky-300 hover:shadow-md'
    }`}>
      <Quote className={`absolute top-6 right-6 w-12 h-12 transition-colors pointer-events-none ${
        isDark ? 'text-slate-800/60 group-hover:text-cyan-500/20' : 'text-sky-100 group-hover:text-sky-200'
      }`} />

      <div>
        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Content */}
        <p className={`text-sm leading-relaxed italic mb-6 relative z-10 font-normal ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          "{testimonial.content}"
        </p>
      </div>

      {/* Author Details */}
      <div className={`flex items-center gap-3.5 pt-4 border-t ${
        isDark ? 'border-slate-800' : 'border-sky-100'
      }`}>
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className={`w-11 h-11 rounded-full object-cover border-2 shadow-md ${
            isDark ? 'border-cyan-400/50' : 'border-sky-300'
          }`}
        />
        <div>
          <h4 className={`text-sm font-bold transition-colors ${
            isDark ? 'text-slate-100 group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-sky-600'
          }`}>
            {testimonial.name}
          </h4>
          <p className={`text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {testimonial.role} — <span className={`font-semibold ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}>{testimonial.company}</span>
          </p>
          <span className={`text-[10px] font-mono font-bold mt-0.5 block ${
            isDark ? 'text-cyan-400' : 'text-sky-600'
          }`}>
            {testimonial.projectType}
          </span>
        </div>
      </div>
    </div>
  );
};
