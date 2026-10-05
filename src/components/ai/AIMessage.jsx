import React, { useState, useEffect } from 'react';
import { User, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { detectMessageLanguage } from '../../services/aiService';

export const AIMessage = ({ message, autoSpeak }) => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const isUser = message?.role === 'user';
  const isSystem = message?.role === 'system';
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speaking if component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle auto-speak for new AI responses if enabled
  useEffect(() => {
    if (!isUser && !isSystem && autoSpeak && message?.content) {
      speakMessage();
    }
  }, [message?.content, autoSpeak]);

  const speakMessage = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Browser Anda belum mendukung pemutaran Suara (Text-to-Speech).");
      return;
    }

    if (window.speechSynthesis.speaking && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown symbols from text before reading
    const cleanText = (message?.content || '')
      .replace(/[*_#`~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, '. ');

    // Dynamically detect target language of this specific message
    const msgLang = message?.detectedLang || detectMessageLanguage(message?.content, language);

    const langLocaleMap = {
      id: 'id-ID',
      en: 'en-US',
      vi: 'vi-VN',
      ja: 'ja-JP'
    };

    const targetLocale = langLocaleMap[msgLang] || 'id-ID';
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = targetLocale;
    utterance.rate = 1.0;

    // Pick matching voice if available in browser
    if (typeof window !== 'undefined' && window.speechSynthesis.getVoices) {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find(v => 
          v.lang.toLowerCase() === targetLocale.toLowerCase() ||
          v.lang.toLowerCase().replace('_', '-').startsWith(targetLocale.toLowerCase()) ||
          v.lang.toLowerCase().startsWith(msgLang)
        );
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  if (isSystem || !message) return null;

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
      <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg backdrop-blur-md transition-all relative ${
        isUser
          ? 'bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 text-slate-950 font-semibold rounded-tr-none'
          : isDark
            ? 'bg-slate-900/90 text-slate-100 border border-sky-500/25 rounded-tl-none shadow-cyan-950/40'
            : 'bg-white text-slate-800 border border-sky-200 rounded-tl-none shadow-sky-900/5'
      }`}>
        
        {/* Header Name & Voice Button */}
        <div className={`text-[10px] font-mono font-bold mb-1.5 flex items-center justify-between gap-1.5 ${
          isUser ? 'text-slate-900/80 justify-end' : isDark ? 'text-cyan-400' : 'text-sky-700'
        }`}>
          <div className="flex items-center gap-1.5">
            <span>{isUser ? 'Anda' : '✨ AUBE AI'}</span>
            {!isUser && <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 font-semibold">Consultant</span>}
          </div>

          {!isUser && (
            <button
              type="button"
              onClick={speakMessage}
              title={isSpeaking ? "Hentikan Suara" : "Dengarkan Suara AUBE AI"}
              className={`p-1 rounded-md border transition-all cursor-pointer flex items-center gap-1 text-[10px] ${
                isSpeaking
                  ? 'bg-cyan-400 text-slate-950 border-cyan-300 animate-pulse font-bold'
                  : isDark
                    ? 'bg-slate-800/90 text-cyan-300 border-cyan-400/30 hover:bg-slate-800 hover:border-cyan-400'
                    : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3 h-3 text-slate-950" />
                  <span className="text-[9px] font-bold">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3" />
                  <span className="hidden sm:inline text-[9px] font-medium">Baca Suara</span>
                </>
              )}
            </button>
          )}
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
