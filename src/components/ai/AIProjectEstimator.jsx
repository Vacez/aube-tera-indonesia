import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Check, ArrowRight, Loader2 } from 'lucide-react';
import { estimateAIProject } from '../../services/aiService';
import { Button } from '../Button/Button';
import { getWhatsAppUrl } from '../../config/company';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const getEstimatorProjectTypes = (lang = 'id') => {
  const types = {
    id: [
      { id: 'web_app', label: 'Web Application' },
      { id: 'mobile_app', label: 'Mobile Application' },
      { id: 'company_website', label: 'Company Website' },
      { id: 'ecommerce', label: 'E-Commerce' },
      { id: 'landing_page', label: 'Landing Page' },
      { id: 'custom_software', label: 'Custom Software' },
      { id: 'ai_solution', label: 'AI Solution' }
    ],
    en: [
      { id: 'web_app', label: 'Web Application' },
      { id: 'mobile_app', label: 'Mobile Application' },
      { id: 'company_website', label: 'Company Website' },
      { id: 'ecommerce', label: 'E-Commerce Store' },
      { id: 'landing_page', label: 'Landing Page' },
      { id: 'custom_software', label: 'Custom Software' },
      { id: 'ai_solution', label: 'AI Solution' }
    ],
    vi: [
      { id: 'web_app', label: 'Ứng dụng Web (Web App)' },
      { id: 'mobile_app', label: 'Ứng dụng Di động (Mobile App)' },
      { id: 'company_website', label: 'Website Doanh nghiệp' },
      { id: 'ecommerce', label: 'Thương mại điện tử' },
      { id: 'landing_page', label: 'Trang đích (Landing Page)' },
      { id: 'custom_software', label: 'Phần mềm theo yêu cầu' },
      { id: 'ai_solution', label: 'Giải pháp Trí tuệ AI' }
    ],
    ja: [
      { id: 'web_app', label: 'Webアプリケーション' },
      { id: 'mobile_app', label: 'モバイルアプリ (iOS/Android)' },
      { id: 'company_website', label: '企業コーポレートサイト' },
      { id: 'ecommerce', label: 'ECサイト・ネットショップ' },
      { id: 'landing_page', label: 'ランディングページ (LP)' },
      { id: 'custom_software', label: 'カスタム業務システム' },
      { id: 'ai_solution', label: 'AIソリューション開発' }
    ]
  };
  return types[lang] || types['id'];
};

export const getEstimatorFeatures = (lang = 'id') => {
  const features = {
    id: [
      { id: 'auth', label: 'Authentication (OTP / Login)' },
      { id: 'admin', label: 'Admin Dashboard & Panel' },
      { id: 'payment', label: 'Payment Gateway Integration' },
      { id: 'notif', label: 'Push Notification & Alert' },
      { id: 'chat', label: 'Live Chat Support & WA' },
      { id: 'gps', label: 'GPS & Location Tracking' },
      { id: 'api', label: 'API & Third-party Integration' },
      { id: 'analytics', label: 'Analytical & Reporting System' },
      { id: 'ai', label: 'AI / Machine Learning Engine' },
      { id: 'multirole', label: 'Multi-role User Management' },
      { id: 'i18n', label: 'Multi-language Support (i18n)' },
      { id: 'cloud', label: 'Cloud Storage & Backup Routine' }
    ],
    en: [
      { id: 'auth', label: 'Authentication (OTP / Login)' },
      { id: 'admin', label: 'Admin Dashboard & Panel' },
      { id: 'payment', label: 'Payment Gateway Integration' },
      { id: 'notif', label: 'Push Notification & Alert' },
      { id: 'chat', label: 'Live Chat Support & WA' },
      { id: 'gps', label: 'GPS & Location Tracking' },
      { id: 'api', label: 'API & Third-party Integration' },
      { id: 'analytics', label: 'Analytical & Reporting System' },
      { id: 'ai', label: 'AI / Machine Learning Engine' },
      { id: 'multirole', label: 'Multi-role User Management' },
      { id: 'i18n', label: 'Multi-language Support (i18n)' },
      { id: 'cloud', label: 'Cloud Storage & Backup Routine' }
    ],
    vi: [
      { id: 'auth', label: 'Xác thực tài khoản (OTP / Login)' },
      { id: 'admin', label: 'Bảng quản trị Admin Dashboard' },
      { id: 'payment', label: 'Tích hợp Cổng thanh toán trực tuyến' },
      { id: 'notif', label: 'Thông báo đẩy (Push Notification)' },
      { id: 'chat', label: 'Hỗ trợ Chat trực tiếp & WhatsApp' },
      { id: 'gps', label: 'Định vị GPS & Bản đồ vị trí' },
      { id: 'api', label: 'Tích hợp API đối tác bên thứ 3' },
      { id: 'analytics', label: 'Hệ thống Báo cáo & Phân tích số liệu' },
      { id: 'ai', label: 'Tích hợp AI / Machine Learning Engine' },
      { id: 'multirole', label: 'Phân quyền đa cấp người dùng' },
      { id: 'i18n', label: 'Hỗ trợ Đa ngôn ngữ (i18n)' },
      { id: 'cloud', label: 'Lưu trữ đám mây & Sao lưu định kỳ' }
    ],
    ja: [
      { id: 'auth', label: 'ユーザー認証機能 (OTP / ログイン)' },
      { id: 'admin', label: '管理者ダッシュボード・管理画面' },
      { id: 'payment', label: 'オンライン決済ゲートウェイ連携' },
      { id: 'notif', label: 'プッシュ通知・アラート配信' },
      { id: 'chat', label: 'チャットサポート・WA連携' },
      { id: 'gps', label: 'GPS・位置情報トラッキング' },
      { id: 'api', label: '外部API・サードパーティ連携' },
      { id: 'analytics', label: '分析・データ集計レポーティング' },
      { id: 'ai', label: 'AI・機械学習エンジン連携' },
      { id: 'multirole', label: 'マルチロール権限・ユーザー管理' },
      { id: 'i18n', label: '多言語対応 (i18n)' },
      { id: 'cloud', label: 'クラウドストレージ・自動バックアップ' }
    ]
  };
  return features[lang] || features['id'];
};

export const AIProjectEstimator = () => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const projectTypes = getEstimatorProjectTypes(language);
  const availableFeatures = getEstimatorFeatures(language);

  const [selectedTypeId, setSelectedTypeId] = useState('web_app');
  const [selectedFeatureIds, setSelectedFeatureIds] = useState(['auth', 'admin', 'analytics']);

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const toggleFeature = (featId) => {
    if (selectedFeatureIds.includes(featId)) {
      setSelectedFeatureIds(selectedFeatureIds.filter((id) => id !== featId));
    } else {
      setSelectedFeatureIds([...selectedFeatureIds, featId]);
    }
  };

  const currentProjectTypeObj = projectTypes.find(p => p.id === selectedTypeId) || projectTypes[0];

  const handleEstimate = async () => {
    setIsCalculating(true);
    const selectedFeatureLabels = availableFeatures
      .filter(f => selectedFeatureIds.includes(f.id))
      .map(f => f.label);

    const res = await estimateAIProject({
      projectType: currentProjectTypeObj.label,
      features: selectedFeatureLabels,
      language
    });
    if (res.success) {
      setResult(res.estimation);
    }
    setIsCalculating(false);
  };

  const getComplexityLabel = (complexity) => {
    if (complexity === 'Advanced') return t('estimator.complexityAdvanced');
    if (complexity === 'Medium') return t('estimator.complexityMedium');
    return t('estimator.complexityBasic');
  };

  return (
    <section id="ai-estimator" className={`py-24 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950/90 border-sky-500/15 text-slate-100' : 'bg-slate-50/90 border-sky-200 text-slate-900'
    }`}>
      
      {/* Background Lighting */}
      <div className={`absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
            isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-white border-sky-200 text-sky-700 shadow-sm'
          }`}>
            <Calculator className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
            <span>{t('estimator.badge')}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {t('estimator.title')} <span className={
              isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
            }>{t('estimator.titleAccent')}</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('estimator.subtitle')}
          </p>
        </div>

        {/* Interactive Estimator Layout (Grid 2 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls Column (7 cols) */}
          <div className={`lg:col-span-7 border p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 ${
            isDark ? 'bg-slate-900/95 border-sky-500/30 text-slate-100' : 'bg-white border-sky-200 text-slate-800'
          }`}>
            
            {/* Step 1: Select Project Type */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
                {t('estimator.step1')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedTypeId(type.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer ${
                      selectedTypeId === type.id
                        ? 'bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 border-cyan-300 shadow-md'
                        : isDark
                          ? 'bg-slate-950 text-slate-300 border-slate-800 hover:border-cyan-400/40'
                          : 'bg-slate-50 text-slate-700 border-sky-200 hover:bg-sky-50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Features */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
                {t('estimator.step2').replace('{count}', selectedFeatureIds.length)}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableFeatures.map((feat) => {
                  const isChecked = selectedFeatureIds.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium transition-all border text-left cursor-pointer ${
                        isChecked
                          ? isDark
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-bold'
                            : 'bg-sky-50 text-sky-800 border-sky-400 font-bold'
                          : isDark
                            ? 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                            : 'bg-slate-50 text-slate-600 border-sky-100 hover:bg-sky-50'
                      }`}
                    >
                      <span className="truncate pr-2">{feat.label}</span>
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-cyan-400 border-cyan-300 text-slate-950' : 'border-slate-600'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={isCalculating ? Loader2 : Sparkles}
              disabled={isCalculating}
              className="w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black shadow-xl shadow-cyan-500/20"
              onClick={handleEstimate}
            >
              {isCalculating ? t('estimator.btnCalculating') : t('estimator.btnCalculate')}
            </Button>

          </div>

          {/* Right Output Column (5 cols) */}
          <div className="lg:col-span-5">
            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`border p-6 sm:p-7 rounded-3xl shadow-2xl space-y-5 backdrop-blur-xl ${
                  isDark
                    ? 'bg-slate-900/95 border-cyan-500/30 text-slate-100 shadow-cyan-950/60'
                    : 'bg-white border-sky-200 text-slate-800 shadow-sky-900/15'
                }`}
              >
                <div className="flex items-center justify-between border-b pb-3 border-slate-800/80">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">{t('estimator.reportTitle')}</span>
                    <h3 className="text-lg font-black">{result.projectType}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    result.complexity === 'Advanced' ? 'bg-purple-500/20 text-purple-300 border-purple-400/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                  }`}>
                    {getComplexityLabel(result.complexity)} {t('estimator.complexitySuffix')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-sky-50 border-sky-100'}`}>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-0.5">{t('estimator.marketEstimate')}</span>
                    <span className="font-extrabold text-sm text-cyan-300">{result.estimatedBudgetRange}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-sky-50 border-sky-100'}`}>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-0.5">{t('estimator.timeEstimate')}</span>
                    <span className="font-extrabold text-sm text-cyan-300">{result.estimatedTimelineRange}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block mb-2">{t('estimator.teamRecommendation')}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.recommendedTeam.map((member, idx) => (
                      <span key={idx} className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                        isDark ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-sky-50 text-sky-800 border-sky-200'
                      }`}>
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border text-[11px] leading-relaxed ${
                  isDark ? 'bg-sky-950/40 border-cyan-400/30 text-sky-200' : 'bg-sky-50 border-sky-200 text-sky-900'
                }`}>
                  <span className="font-bold">⚠️ {t('estimator.disclaimerTitle')} </span>
                  <span>{result.disclaimer}</span>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  className="w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black shadow-lg"
                  onClick={() => {
                    const waText = t('estimator.waMessage')
                      .replace('{projectType}', result.projectType)
                      .replace('{budget}', result.estimatedBudgetRange);
                    window.open(getWhatsAppUrl(waText), '_blank');
                  }}
                >
                  {t('estimator.consultBtn')}
                </Button>

              </motion.div>
            ) : (
              <div className={`border p-8 rounded-3xl text-center space-y-4 shadow-xl ${
                isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-sky-200 text-slate-600'
              }`}>
                <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{t('estimator.readyTitle')}</h3>
                <p className="text-xs max-w-xs mx-auto">
                  {t('estimator.readyDesc')}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
