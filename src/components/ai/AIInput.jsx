import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Mic, MicOff } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const AIInput = ({ onSendMessage, isLoading }) => {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Clean up recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const startListening = () => {
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    
    if (!SpeechRecognition) {
      alert("Browser Anda belum mendukung pemindaian Mikrofon (Speech-to-Text). Silakan gunakan Google Chrome, Microsoft Edge, atau Safari.");
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'id' ? 'id-ID' : language === 'ja' ? 'ja-JP' : language === 'vi' ? 'vi-VN' : 'en-US';

      let capturedTranscript = '';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setText(transcript);
        capturedTranscript = transcript;
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (capturedTranscript.trim() && !isLoading) {
          onSendMessage(capturedTranscript.trim());
          setText('');
        }
      };

      recognition.start();
    } catch (err) {
      console.error('Speech start error:', err);
      setIsListening(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    }
    onSendMessage(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      {/* Microphone Speech-to-Text Button */}
      <button
        type="button"
        onClick={startListening}
        disabled={isLoading}
        title={isListening ? "Hentikan Mikrofon" : "Tanyakan Lewat Mikrofon / Suara"}
        className={`p-3 rounded-2xl transition-all border cursor-pointer shrink-0 flex items-center justify-center ${
          isListening
            ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse shadow-lg shadow-rose-950/50'
            : isDark
              ? 'bg-slate-900 text-cyan-300 border-slate-800 hover:border-cyan-400/40 hover:bg-slate-800'
              : 'bg-white text-sky-700 border-sky-200 hover:bg-sky-50 shadow-xs'
        }`}
      >
        {isListening ? (
          <MicOff className="w-4 h-4 text-rose-400 animate-bounce" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </button>

      {/* Input Field Box */}
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isListening ? "🎙️ Bicara sekarang... (otomatis terkirim saat selesai)" : t('aiChat.inputPlaceholder')}
          disabled={isLoading}
          className={`w-full pl-4 pr-12 py-3 rounded-2xl text-xs sm:text-sm focus:outline-none transition-all border ${
            isListening
              ? 'border-rose-400/60 ring-2 ring-rose-400/30 bg-rose-950/10'
              : isDark
                ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                : 'bg-slate-50 border-sky-200 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
          }`}
        />

        {/* Submit Button */}
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
      </div>
    </form>
  );
};
