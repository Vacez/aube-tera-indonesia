import React from 'react';
import { Sparkles, User, Bot, CheckCircle2, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AIMessage = ({ message }) => {
  const { isDark } = useTheme();
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) return null;

  return (
    <div className={`flex items-start gap-3 my-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* Avatar Icon */}
      <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 shadow-md overflow-hidden ${
        isUser
          ? isDark ? 'bg-sky-500/20 text-cyan-300 border-cyan-400/40' : 'bg-sky-100 text-sky-800 border-sky-300'
          : 'bg-white border-cyan-300 p-0.5'
      }`}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <img src="/logo.png" alt="AUBE AI" className="w-full h-full object-contain rounded-full" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg backdrop-blur-md transition-all ${
        isUser
          ? 'bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-slate-950 font-semibold rounded-tr-none'
          : isDark
            ? 'bg-slate-900/90 text-slate-100 border border-sky-500/25 rounded-tl-none shadow-cyan-950/40'
            : 'bg-white text-slate-800 border border-sky-200 rounded-tl-none shadow-sky-900/5'
      }`}>
        
        {/* Header Name */}
        <div className={`text-[10px] font-mono font-bold mb-1 flex items-center gap-1.5 ${
          isUser ? 'text-slate-900/80 justify-end' : isDark ? 'text-cyan-400' : 'text-sky-700'
        }`}>
          <span>{isUser ? 'Anda' : '✨ AUBE AI'}</span>
          {!isUser && <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-semibold">Consultant</span>}
        </div>

        {/* Message Content */}
        <div className="whitespace-pre-wrap font-normal">
          {message.content}
        </div>

        {/* Timestamp */}
        {message.timestamp && (
          <div className={`text-[9px] font-mono mt-2 text-right ${
            isUser ? 'text-slate-900/70' : isDark ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {message.timestamp}
          </div>
        )}
      </div>

    </div>
  );
};
