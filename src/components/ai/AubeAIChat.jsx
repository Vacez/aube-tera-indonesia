import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  FileText, 
  Loader2, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Plus,
  History,
  Trash2,
  Clock,
  ChevronRight,
  MessageSquare,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';
import { AIMessage } from './AIMessage';
import { AIInput } from './AIInput';
import { AIQuickPrompts } from './AIQuickPrompts';
import { ProjectBriefCard } from './ProjectBriefCard';
import { AILimitModal } from './AILimitModal';
import { sendAIMessage, generateProjectBrief, detectMessageLanguage, getAiQuotaStatus } from '../../services/aiService';
import { submitLead } from '../../services/leadService';
import { Button } from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const AubeAIChat = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const messagesEndRef = useRef(null);

  const getInitialMessage = useCallback(() => ({
    role: 'assistant',
    content: t('aiChat.welcomeMsg'),
    detectedLang: language,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }), [t, language]);

  const [messages, setMessages] = useState(() => [{
    role: 'assistant',
    content: t('aiChat.welcomeMsg'),
    detectedLang: language,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }]);

  const prevLangRef = useRef(language);

  // Update initial message when language changes if no user conversation started yet
  useEffect(() => {
    if (prevLangRef.current !== language) {
      prevLangRef.current = language;
      setMessages(prev => {
        if (prev.length === 1 && prev[0].role === 'assistant') {
          return [getInitialMessage()];
        }
        return prev;
      });
    }
  }, [language, getInitialMessage]);

  const [conversationId, setConversationId] = useState(() => 'sess_' + Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [projectBrief, setProjectBrief] = useState(null);
  const [customizedBrief, setCustomizedBrief] = useState(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  // Auto-Voice Assistant State (Enabled by default for two-way voice call)
  const [isAutoVoice, setIsAutoVoice] = useState(true);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // AI Quota & Limit Modal State
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [quotaStatus, setQuotaStatus] = useState(() => getAiQuotaStatus());

  const updateQuotaStatus = () => {
    setQuotaStatus(getAiQuotaStatus());
  };
  
  // History Drawer State
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  const [savedSessions, setSavedSessions] = useState(() => {
    try {
      const stored = localStorage.getItem('aube_ai_history_sessions');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Could not load chat history:', e);
      return [];
    }
  });

  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    budgetRange: 'Rp 15 - 35 Juta',
    timeline: '4 - 8 Minggu'
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to persist current session to history and broadcast updates
  const persistCurrentSession = (updatedMessages, currentBrief = null, explicitId = null) => {
    if (!updatedMessages || updatedMessages.length <= 1) return; // don't save empty welcome message

    const activeId = explicitId || conversationId || ('sess_' + Date.now());
    const firstUserMsg = updatedMessages.find(m => m.role === 'user')?.content || 'Konsultasi Proyek IT';
    const title = firstUserMsg.length > 38 ? firstUserMsg.substring(0, 38) + '...' : firstUserMsg;
    const briefToSave = currentBrief !== undefined && currentBrief !== null ? currentBrief : (customizedBrief || projectBrief);

    const newSession = {
      id: activeId,
      title,
      messages: updatedMessages,
      projectBrief: briefToSave,
      updatedAt: new Date().toISOString()
    };

    setSavedSessions(prev => {
      const filtered = prev.filter(s => s.id !== activeId);
      const updated = [newSession, ...filtered].slice(0, 30); // keep last 30 sessions
      try {
        localStorage.setItem('aube_ai_history_sessions', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('aube_ai_session_updated', { detail: newSession }));
      } catch (e) {
        console.warn('Failed to store history in localStorage:', e);
      }
      return updated;
    });
  };

  // Keep savedSessions in sync whenever drawer opens or modal is opened
  useEffect(() => {
    if (isOpen || showHistoryDrawer) {
      try {
        const stored = localStorage.getItem('aube_ai_history_sessions');
        if (stored) {
          setSavedSessions(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Could not reload chat history:', e);
      }
    }
  }, [isOpen, showHistoryDrawer]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleCloseChat = () => {
    if (messages.length > 1) {
      persistCurrentSession(messages, customizedBrief || projectBrief, conversationId);
    }
    onClose();
  };

  if (!isOpen) return null;

  // Handler: Obrolan Baru (New Chat)
  const handleNewChat = () => {
    if (messages.length > 1) {
      persistCurrentSession(messages, customizedBrief || projectBrief, conversationId);
    }
    const newId = 'sess_' + Date.now();
    setConversationId(newId);
    setMessages([getInitialMessage()]);
    setProjectBrief(null);
    setCustomizedBrief(null);
    setErrorMsg(null);
    setShowHistoryDrawer(false);
  };

  // Handler: Refresh Obrolan (Reset current conversation)
  const handleRefreshChat = () => {
    if (messages.length > 1) {
      persistCurrentSession(messages, customizedBrief || projectBrief, conversationId);
    }
    const newId = 'sess_' + Date.now();
    setConversationId(newId);
    setMessages([getInitialMessage()]);
    setProjectBrief(null);
    setCustomizedBrief(null);
    setErrorMsg(null);
  };

  // Handler: Select Session from History
  const handleSelectSession = (session) => {
    if (messages.length > 1 && conversationId !== session.id) {
      persistCurrentSession(messages, customizedBrief || projectBrief, conversationId);
    }
    setMessages(session.messages || [getInitialMessage()]);
    setConversationId(session.id);
    setProjectBrief(session.projectBrief || null);
    setCustomizedBrief(session.projectBrief || null);
    setShowHistoryDrawer(false);
    setErrorMsg(null);
  };

  // Handler: Delete Session from History
  const handleDeleteSession = (sessionId, e) => {
    e.stopPropagation();
    setSavedSessions(prev => {
      const updated = prev.filter(s => s.id !== sessionId);
      try {
        localStorage.setItem('aube_ai_history_sessions', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('aube_ai_session_updated', { detail: { deletedId: sessionId } }));
      } catch (err) {
        console.warn('Failed to delete history session:', err);
      }
      return updated;
    });
  };

  const handleSendMessage = async (text) => {
    setErrorMsg(null);
    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const res = await sendAIMessage({
        message: text,
        history: newHistory.map((m) => ({ role: m.role, content: m.content })),
        conversationId,
        language
      });

      if (res.limitReached || res.isQuotaExhausted) {
        setShowLimitModal(true);
        const limitNoticeMsg = {
          role: 'assistant',
          content: `⚠️ **${t('tokenLimitModal.title')}**\n\n${t('tokenLimitModal.desc')}`,
          detectedLang: language,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const finalHistory = [...newHistory, limitNoticeMsg];
        setMessages(finalHistory);
        return;
      }

      if (res.success) {
        const assistantMsg = {
          role: 'assistant',
          content: res.message,
          detectedLang: res.detectedLanguage || detectMessageLanguage(res.message, language),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const finalHistory = [...newHistory, assistantMsg];
        setMessages(finalHistory);
        const activeId = res.conversationId || conversationId || ('sess_' + Date.now());
        if (conversationId !== activeId) {
          setConversationId(activeId);
        }

        // Auto persist session to localStorage with stable activeId
        persistCurrentSession(finalHistory, customizedBrief || projectBrief, activeId);
      } else {
        throw new Error(res.error || 'Failed to receive response');
      }
    } catch (err) {
      console.error('AUBE AI Send Error:', err);
      if (err.isQuotaExhausted || (err.message && (err.message.toLowerCase().includes('quota') || err.message.includes('429')))) {
        setShowLimitModal(true);
      }
      setErrorMsg('Maaf, AUBE AI sedang mengalami gangguan. Silakan coba beberapa saat lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBrief = async () => {
    setIsGeneratingBrief(true);
    setErrorMsg(null);
    try {
      const res = await generateProjectBrief({
        history: messages.map((m) => ({ role: m.role, content: m.content })),
        conversationId
      });

      if (res.success && res.brief) {
        setProjectBrief(res.brief);
        persistCurrentSession(messages, res.brief, conversationId);
      } else {
        throw new Error('Could not generate brief');
      }
    } catch (err) {
      console.error('AUBE AI Brief Error:', err);
      setErrorMsg('Gagal membuat Project Brief. Coba tambahkan detail percakapan terlebih dahulu.');
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  const handleLeadFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const activeBrief = customizedBrief || projectBrief;
      const coreSelected = activeBrief?.core_features?.join(', ') || '';
      const adminSelected = activeBrief?.admin_features?.join(', ') || '';
      const excludedCore = activeBrief?.excluded_features?.core?.length 
        ? ` (Dilewati: ${activeBrief.excluded_features.core.join(', ')})` 
        : '';
      const excludedAdmin = activeBrief?.excluded_features?.admin?.length 
        ? ` (Dilewati: ${activeBrief.excluded_features.admin.join(', ')})` 
        : '';

      const summaryParts = [
        activeBrief?.project_name ? `Nama Proyek: ${activeBrief.project_name} (${activeBrief.business_type || 'N/A'})` : '',
        activeBrief?.objective || messages[messages.length - 1]?.content,
        coreSelected ? `Fitur Utama Dipilih: ${coreSelected}${excludedCore}` : '',
        adminSelected ? `Fitur Admin Dipilih: ${adminSelected}${excludedAdmin}` : ''
      ].filter(Boolean).join('\n\n');

      await submitLead({
        ...leadForm,
        project_type: activeBrief?.platform || 'Web/Mobile App',
        project_description: summaryParts || messages[messages.length - 1]?.content,
        ai_summary: activeBrief?.objective || 'AI Consultation session',
        recommended_solution: activeBrief?.technical_recommendation || 'Custom IT Solution',
        project_complexity: activeBrief?.complexity || 'Medium'
      });
      setLeadSubmitted(true);
      setTimeout(() => {
        setShowLeadModal(false);
        setLeadSubmitted(false);
      }, 2500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseChat}
          className={`fixed inset-0 ${
            isDark ? 'bg-slate-950/85 backdrop-blur-xl' : 'bg-slate-900/65 backdrop-blur-md'
          }`}
        />

        {/* Main Chat Panel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-2xl h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden z-10 transition-all ${
            isDark
              ? 'bg-slate-900/95 border-cyan-500/30 text-slate-100 shadow-cyan-950/80'
              : 'bg-white/95 border-sky-200 text-slate-800 shadow-sky-900/20'
          }`}
        >
          
          {/* Header Bar */}
          <div className={`p-4 sm:p-5 border-b flex items-center justify-between z-10 ${
            isDark
              ? 'bg-slate-950/90 border-slate-800/80 text-white'
              : 'bg-slate-50/90 border-sky-100 text-slate-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1 border-2 border-cyan-400 shadow-md shrink-0 flex items-center justify-center">
                <img src="/logo.png" alt="AUBE AI Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base tracking-wider flex items-center gap-2">
                  ✨ AUBE AI
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">Online</span>
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t('aiChat.subtitle')}
                </p>
              </div>
            </div>

            {/* Header Actions: Obrolan Baru, Refresh, Riwayat, Close */}
            <div className="flex items-center gap-1.5">
              
              {/* Button: Obrolan Baru */}
              <button
                type="button"
                onClick={handleNewChat}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-xs ${
                  isDark
                    ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30'
                    : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
                }`}
                title={t('aiChat.newChat')}
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('aiChat.newChat')}</span>
              </button>

              {/* Button: Refresh Obrolan */}
              <button
                type="button"
                onClick={handleRefreshChat}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isDark ? 'bg-slate-900 text-slate-300 hover:text-cyan-300 border-slate-800' : 'bg-white text-slate-600 hover:text-sky-600 border-sky-200'
                }`}
                title={t('aiChat.refreshChat')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Button: Riwayat Obrolan */}
              <button
                type="button"
                onClick={() => setShowHistoryDrawer(!showHistoryDrawer)}
                className={`p-2 rounded-full border transition-all cursor-pointer relative ${
                  showHistoryDrawer
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : isDark ? 'bg-slate-900 text-slate-300 hover:text-cyan-300 border-slate-800' : 'bg-white text-slate-600 hover:text-sky-600 border-sky-200'
                }`}
                title={t('aiChat.historyTitle')}
              >
                <History className="w-4 h-4" />
                {savedSessions.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                )}
              </button>

              {/* Button: Mode Voice Output Auto */}
              <button
                type="button"
                onClick={() => setIsAutoVoice(!isAutoVoice)}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isAutoVoice
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md animate-pulse'
                    : isDark ? 'bg-slate-900 text-slate-400 hover:text-cyan-300 border-slate-800' : 'bg-white text-slate-600 hover:text-sky-600 border-sky-200'
                }`}
                title={isAutoVoice ? "Matikan Auto Voice Output" : "Aktifkan Auto Voice Output (Suara AI)"}
              >
                {isAutoVoice ? <Volume2 className="w-4 h-4 text-cyan-300" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Button: Close Modal */}
              <button
                onClick={handleCloseChat}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isDark ? 'bg-slate-900 text-slate-300 hover:text-white border-slate-800' : 'bg-white text-slate-600 hover:text-slate-900 border-sky-200'
                }`}
                aria-label="Close AUBE AI chat"
              >
                <X className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* History Drawer Overlay Slide-over */}
          {showHistoryDrawer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 border-b space-y-3 z-20 ${
                isDark ? 'bg-slate-950/95 border-slate-800 text-slate-200' : 'bg-slate-100 border-sky-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {t('aiChat.historyTitle')} ({savedSessions.length})
                </span>
                <button
                  type="button"
                  onClick={() => setShowHistoryDrawer(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {savedSessions.length === 0 ? (
                <p className="text-xs text-slate-400 py-2 font-mono">{t('aiChat.noHistory')}</p>
              ) : (
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {savedSessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => handleSelectSession(session)}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        conversationId === session.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                          : isDark ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-sky-200 hover:bg-sky-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <MessageSquare className="w-4 h-4 shrink-0 text-cyan-400" />
                        <div className="truncate">
                          <div className="font-bold truncate">{session.title}</div>
                          <div className="text-[10px] opacity-60 font-mono">
                            {session.messages?.length || 0} msgs • {new Date(session.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSession(session.id, e)}
                          className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                          title={t('aiChat.clearHistory')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-cyan-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* Quick Prompt Chips */}
            <div className="mb-2">
              <AIQuickPrompts onSelectPrompt={handleSendMessage} />
            </div>

            {/* Conversation Messages */}
            {messages.map((msg, index) => (
              <AIMessage 
                key={index} 
                message={msg} 
                autoSpeak={isAutoVoice && index === messages.length - 1} 
              />
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-3 my-3 text-xs text-cyan-400 font-mono animate-pulse">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <span>AUBE AI...</span>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{t('aiChat.errorMsg')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSendMessage(messages[messages.length - 1]?.content || 'Halo')}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/30 hover:bg-rose-500/50 text-white font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Retry
                </button>
              </div>
            )}

            {/* Generated Project Brief Result Card */}
            {projectBrief && (
              <ProjectBriefCard
                brief={projectBrief}
                onSubmitLead={(customized) => {
                  if (customized) {
                    setCustomizedBrief(customized);
                    persistCurrentSession(messages, customized, conversationId);
                  }
                  setShowLeadModal(true);
                }}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer Controls */}
          <div className={`p-4 border-t space-y-3 ${
            isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/90 border-sky-100'
          }`}>
            
            {/* Generate Project Brief Action Button */}
            {messages.length >= 3 && !projectBrief && (
              <Button
                variant="outline"
                size="sm"
                icon={isGeneratingBrief ? Loader2 : FileText}
                disabled={isGeneratingBrief}
                className={`w-full py-2 ${
                  isDark ? 'bg-sky-950/80 text-cyan-300 border-cyan-400/40 hover:bg-sky-900/80' : 'bg-white text-sky-700 border-sky-200 hover:bg-sky-50'
                }`}
                onClick={handleGenerateBrief}
              >
                {isGeneratingBrief ? t('aiChat.generatingBrief') : `⚡ ${t('aiChat.generateBriefBtn')}`}
              </Button>
            )}

            {/* Input Component */}
            <AIInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>

        </motion.div>

        {/* Lead Capture Modal */}
        {showLeadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-slate-950/80 animate-fadeIn">
            <div className={`relative w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl ${
              isDark ? 'bg-slate-900 border-cyan-500/30 text-white' : 'bg-white border-sky-200 text-slate-900'
            }`}>
              <button
                type="button"
                onClick={() => setShowLeadModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full border border-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {leadSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold">{t('aiChat.leadSuccessTitle')}</h3>
                  <p className="text-xs text-slate-400">{t('aiChat.leadSuccessDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleLeadFormSubmit} className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold">{t('aiChat.leadModalTitle')}</h3>
                    <p className="text-xs text-slate-400">{t('aiChat.leadModalDesc')}</p>
                    {customizedBrief && (
                      <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>
                          {(customizedBrief.core_features?.length || 0) + (customizedBrief.admin_features?.length || 0)} Fitur Rekomendasi Terpilih
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">{t('aiChat.leadFullName')}</label>
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder={t('aiChat.leadNamePlaceholder')}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-sky-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">{t('aiChat.leadPhone')}</label>
                    <input
                      type="tel"
                      required
                      value={leadForm.whatsapp}
                      onChange={(e) => setLeadForm({ ...leadForm, whatsapp: e.target.value })}
                      placeholder={t('aiChat.leadPhonePlaceholder')}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-sky-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">{t('aiChat.leadEmail')}</label>
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder={t('aiChat.leadEmailPlaceholder')}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-sky-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">{t('aiChat.leadCompany')}</label>
                    <input
                      type="text"
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      placeholder={t('aiChat.leadCompanyPlaceholder')}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs border ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-sky-200'
                      }`}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black mt-2"
                  >
                    {t('aiChat.leadSubmitBtn')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* AI Quota Limit & Subscription Modal */}
        <AILimitModal
          isOpen={showLimitModal}
          onClose={() => setShowLimitModal(false)}
          onKeyUpdated={updateQuotaStatus}
        />

      </div>
    </AnimatePresence>
  );
};
