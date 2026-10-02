import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const AubeAIButton = ({ onClick, isOpen, unreadCount = 0 }) => {
  const { isDark } = useTheme();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        type="button"
        onClick={onClick}
        className={`group relative flex items-center gap-3 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border cursor-pointer ${
          isOpen
            ? 'bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black border-cyan-300'
            : isDark
              ? 'bg-slate-900/95 text-cyan-300 border-cyan-500/40 shadow-cyan-950/80 hover:border-cyan-400 backdrop-blur-xl'
              : 'bg-white/95 text-sky-800 border-sky-300 shadow-sky-900/20 hover:border-sky-400 backdrop-blur-xl'
        }`}
        aria-label="Open AUBE AI Consultant"
      >
        {/* Glowing Aura Light */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-300 animate-pulse-glow" />

        <div className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-white p-1 border border-cyan-300 shadow-md shrink-0">
          <img src="/logo.png" alt="AUBE AI Logo" className="w-full h-full object-contain rounded-full" />
        </div>

        <div className="relative flex flex-col text-left">
          <span className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
            ✨ AUBE AI
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </span>
          <span className="text-[10px] font-bold opacity-80">AI Consultant</span>
        </div>

        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-slate-900 animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};
