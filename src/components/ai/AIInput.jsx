import React, { useState } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const AIInput = ({ onSendMessage, isLoading }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('aiChat.inputPlaceholder')}
        disabled={isLoading}
        className={`w-full pl-4 pr-12 py-3 rounded-2xl text-xs sm:text-sm focus:outline-none transition-all border ${
          isDark
            ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
            : 'bg-slate-50 border-sky-200 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
        }`}
      />

      <button
        type="submit"
        disabled={!text.trim() || isLoading}
        className={`absolute right-2.5 p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
          !text.trim() || isLoading
            ? 'opacity-40 cursor-not-allowed bg-slate-700 text-slate-400'
            : 'bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 shadow-md hover:scale-105 active:scale-95'
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
        ) : (
          <Send className="w-4 h-4 text-slate-950" />
        )}
      </button>
    </form>
  );
};
