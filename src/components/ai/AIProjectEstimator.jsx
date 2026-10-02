import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Check, Cpu, Clock, Layers, DollarSign, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { estimateAIProject } from '../../services/aiService';
import { Button } from '../Button/Button';
import { getWhatsAppUrl } from '../../config/company';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const AIProjectEstimator = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const projectTypes = [
    'Company Website',
    'Landing Page',
    'E-Commerce',
    'Web Application',
    'Mobile Application',
    'Custom Software',
    'AI Solution'
  ];

  const availableFeatures = [
    'Authentication (OTP / Login)',
    'Admin Dashboard',
    'Payment Gateway Integration',
    'Push Notification',
    'Live Chat Support',
    'GPS & Location Tracking',
    'API & Third-party Integration',
    'Analytical & Reporting System',
    'AI / Machine Learning Engine',
    'Multi-role User Management',
    'Multi-language Support (i18n)',
    'Cloud Storage & Backup Routine'
  ];

  const [selectedType, setSelectedType] = useState('Web Application');
  const [selectedFeatures, setSelectedFeatures] = useState([
    'Authentication (OTP / Login)',
    'Admin Dashboard',
    'Analytical & Reporting System'
  ]);

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const toggleFeature = (feat) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleEstimate = async () => {
    setIsCalculating(true);
    const res = await estimateAIProject({
      projectType: selectedType,
      features: selectedFeatures
    });
    if (res.success) {
      setResult(res.estimation);
    }
    setIsCalculating(false);
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
            <span>AI Feature #3</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            AI Project <span className={
              isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
            }>Estimator</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Pilih jenis proyek dan fitur yang Anda butuhkan. Mesin AI kami akan menganalisis kompleksitas, estimasi pasaran, serta komposisi tim yang direkomendasikan secara instant.
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
                1. Pilih Tipe Proyek:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer ${
                      selectedType === type
                        ? 'bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 border-cyan-300 shadow-md'
                        : isDark
                          ? 'bg-slate-950 text-slate-300 border-slate-800 hover:border-cyan-400/40'
                          : 'bg-slate-50 text-slate-700 border-sky-200 hover:bg-sky-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Features */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
                2. Pilih Fitur yang Dibutuhkan ({selectedFeatures.length} Dipilih):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => toggleFeature(feat)}
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
                      <span className="truncate pr-2">{feat}</span>
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
              {isCalculating ? 'Aube AI Menganalisis Spesifikasi...' : 'Jalankan Analisis AI Estimator'}
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
                    <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">AI Analysis Report</span>
                    <h3 className="text-lg font-black">{result.projectType}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    result.complexity === 'Advanced' ? 'bg-purple-500/20 text-purple-300 border-purple-400/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                  }`}>
                    {result.complexity} Complexity
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-sky-50 border-sky-100'}`}>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-0.5">Estimasi Pasaran</span>
                    <span className="font-extrabold text-sm text-cyan-300">{result.estimatedBudgetRange}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-sky-50 border-sky-100'}`}>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-0.5">Estimasi Waktu</span>
                    <span className="font-extrabold text-sm text-cyan-300">{result.estimatedTimelineRange}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block mb-2">Rekomendasi Tim Software House</span>
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
                  <span className="font-bold">⚠️ Catatan Resmi: </span>
                  <span>{result.disclaimer}</span>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  className="w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black shadow-lg"
                  onClick={() => window.open(getWhatsAppUrl(`Halo PT. AUBE TERA INDONESIA, saya telah mencoba AI Estimator untuk project ${result.projectType} dengan estimasi budget ${result.estimatedBudgetRange}. Saya ingin berkonsultasi lebih lanjut.`), '_blank')}
                >
                  Konsultasi Hasil Estimasi Ini (WhatsApp)
                </Button>

              </motion.div>
            ) : (
              <div className={`border p-8 rounded-3xl text-center space-y-4 shadow-xl ${
                isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-sky-200 text-slate-600'
              }`}>
                <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Siap Menganalisis Estimasi Proyek</h3>
                <p className="text-xs max-w-xs mx-auto">
                  Pilih tipe proyek dan fitur di sebelah kiri, kemudian klik tombol untuk melihat analisis estimasi AUBE AI.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
