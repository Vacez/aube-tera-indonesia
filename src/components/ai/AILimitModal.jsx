import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Crown, 
  Key, 
  CheckCircle2, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  getCustomGeminiKey, 
  setCustomGeminiKey, 
  removeCustomGeminiKey 
} from '../../services/aiService';
import { COMPANY_CONFIG } from '../../config/company';

export const AILimitModal = ({ isOpen, onClose, onKeyUpdated }) => {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const [showKeyForm, setShowKeyForm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const refreshState = () => {
    const existingKey = getCustomGeminiKey();
    setHasSavedKey(Boolean(existingKey));
    setApiKeyInput(existingKey ? `${existingKey.substring(0, 8)}...${existingKey.substring(existingKey.length - 4)}` : '');
  };

  useEffect(() => {
    if (isOpen) {
      refreshState();
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = (e) => {
    e.preventDefault();
    if (!apiKeyInput || apiKeyInput.trim().length < 15) return;
    setCustomGeminiKey(apiKeyInput.trim());
    setSaveSuccess(true);
    refreshState();
    if (onKeyUpdated) onKeyUpdated();
    setTimeout(() => {
      setSaveSuccess(false);
      setShowKeyForm(false);
      onClose();
    }, 1200);
  };

  const handleRemoveKey = () => {
    removeCustomGeminiKey();
    setApiKeyInput('');
    setHasSavedKey(false);
    refreshState();
    if (onKeyUpdated) onKeyUpdated();
  };

  const waNumber = COMPANY_CONFIG.whatsapp?.number || '6282211499289';
  const getLocalizedWaMessage = () => {
    if (language === 'en') {
      return encodeURIComponent('Hello PT. AUBE TERA INDONESIA, I would like to subscribe to the AUBE AI plan / upgrade AI token capacity for my project.');
    }
    if (language === 'vi') {
      return encodeURIComponent('Xin chào PT. AUBE TERA INDONESIA, tôi muốn đăng ký gói AUBE AI / nâng cấp hạn mức token AI cho dự án của mình.');
    }
    if (language === 'ja') {
      return encodeURIComponent('PT. AUBE TERA INDONESIA ご担当者様、AUBE AIプランの購読およびAIトークン枠のアップグレードについて相談を希望します。');
    }
    return encodeURIComponent('Halo Tim PT. AUBE TERA INDONESIA, saya ingin berlangganan paket AUBE AI / upgrade kuota token AI untuk konsultasi proyek dan integrasi sistem saya.');
  };

  const waSubscribeUrl = `https://wa.me/${waNumber}?text=${getLocalizedWaMessage()}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md bg-slate-950/80 animate-fadeIn">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col ${
            isDark 
              ? 'bg-slate-900/95 border-amber-500/30 text-white shadow-amber-950/40' 
              : 'bg-white border-amber-200 text-slate-900 shadow-slate-200'
          }`}
        >
          {/* Ambient Glow Header */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-500" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full border transition-colors z-10 cursor-pointer ${
              isDark 
                ? 'border-slate-800 bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700' 
                : 'border-slate-200 bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Content Scrollable Area */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
            
            {/* Header Badge & Title */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                <span>{t('tokenLimitModal.badge')}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                {t('tokenLimitModal.title')}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                {t('tokenLimitModal.desc')}
              </p>
            </div>

            {/* Subscription Packages Card */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark 
                ? 'bg-gradient-to-b from-slate-950/80 to-slate-900 border-amber-500/20' 
                : 'bg-gradient-to-b from-amber-50/50 to-white border-amber-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {t('tokenLimitModal.subscribeTitle')}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  {t('tokenLimitModal.officialBadge')}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t('tokenLimitModal.benefit1')}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t('tokenLimitModal.benefit2')}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t('tokenLimitModal.benefit3')}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t('tokenLimitModal.benefit4')}</span>
                </div>
              </div>

              {/* Main Subscription CTA Button */}
              <a
                href={waSubscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{t('tokenLimitModal.subscribeWaBtn')}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            {/* Custom Gemini API Key Option (For Developers / User's Own Key) */}
            <div className={`p-4 rounded-2xl border text-xs space-y-3 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-200">
                  <Key className="w-4 h-4 text-cyan-400" />
                  <span>{t('tokenLimitModal.customKeyTitle')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowKeyForm(!showKeyForm)}
                  className="text-cyan-400 hover:underline font-bold text-[11px] cursor-pointer"
                >
                  {showKeyForm ? t('tokenLimitModal.closeInput') : (hasSavedKey ? t('tokenLimitModal.changeKey') : t('tokenLimitModal.useMyKey'))}
                </button>
              </div>

              {hasSavedKey && !showKeyForm && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t('tokenLimitModal.keyActive')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveKey}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold hover:underline cursor-pointer"
                  >
                    {t('tokenLimitModal.deleteKey')}
                  </button>
                </div>
              )}

              {showKeyForm && (
                <form onSubmit={handleSaveKey} className="space-y-2.5 pt-1">
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder={t('tokenLimitModal.keyPlaceholder')}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                    >
                      <span>{t('tokenLimitModal.getKeyHelp')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      {t('tokenLimitModal.saveKeyBtn')}
                    </button>
                  </div>
                </form>
              )}

              {saveSuccess && (
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-center font-bold text-xs animate-fadeIn">
                  {t('tokenLimitModal.keySavedMsg')}
                </div>
              )}
            </div>

            {/* Bottom Actions: Close Button */}
            <div className="flex items-center justify-end pt-2 border-t border-slate-800/60 text-xs">
              <button
                type="button"
                onClick={onClose}
                className={`px-5 py-2 rounded-xl border font-bold transition-colors cursor-pointer ${
                  isDark 
                    ? 'border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white' 
                    : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {t('tokenLimitModal.closeBtn')}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
