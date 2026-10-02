import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Map, ExternalLink, Info } from 'lucide-react';
import { COMPANY_CONFIG } from '../../config/company';
import { Button } from '../../components/Button/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const SERVICE_BUDGET_MAP = {
  'Website Development': [
    { value: 'Rp 3 - 7 Juta', label: 'Rp 3 - 7 Juta (Company Profile / Landing Page)' },
    { value: 'Rp 7 - 15 Juta', label: 'Rp 7 - 15 Juta (Website Corporate / Web Portal)' },
    { value: 'Rp 15 - 30 Juta', label: 'Rp 15 - 30 Juta (E-Commerce / Toko Online Complex)' },
    { value: '> Rp 30 Juta', label: '> Rp 30 Juta (Portal Korporat Enterprise)' }
  ],
  'Mobile App Development': [
    { value: 'Rp 15 - 30 Juta', label: 'Rp 15 - 30 Juta (Aplikasi Mobile Basic / MVP)' },
    { value: 'Rp 30 - 60 Juta', label: 'Rp 30 - 60 Juta (Aplikasi Android & iOS Skala Menengah)' },
    { value: 'Rp 60 - 100 Juta', label: 'Rp 60 - 100 Juta (Aplikasi Mobile Complex + Payment Gateway)' },
    { value: '> Rp 100 Juta', label: '> Rp 100 Juta (Ekosistem Mobile App Enterprise)' }
  ],
  'Web Application': [
    { value: 'Rp 15 - 35 Juta', label: 'Rp 15 - 35 Juta (Admin Dashboard / SaaS Basic)' },
    { value: 'Rp 35 - 75 Juta', label: 'Rp 35 - 75 Juta (Aplikasi Web Internal / Workflows)' },
    { value: 'Rp 75 - 150 Juta', label: 'Rp 75 - 150 Juta (SaaS Platform Scale-Up)' },
    { value: '> Rp 150 Juta', label: '> Rp 150 Juta (Enterprise Web System Platform)' }
  ],
  'Custom Software': [
    { value: 'Rp 25 - 50 Juta', label: 'Rp 25 - 50 Juta (Custom Module / Automasi Alur Kerja)' },
    { value: 'Rp 50 - 100 Juta', label: 'Rp 50 - 100 Juta (Custom Core Software Perusahaan)' },
    { value: 'Rp 100 - 200 Juta', label: 'Rp 100 - 200 Juta (Arsitektur Multi-Sistem & Integrasi API)' },
    { value: '> Rp 200 Juta', label: '> Rp 200 Juta (Software Enterprise Skala Besar)' }
  ],
  'UI/UX Design': [
    { value: 'Rp 5 - 12 Juta', label: 'Rp 5 - 12 Juta (Landing Page / App UI MVP)' },
    { value: 'Rp 12 - 25 Juta', label: 'Rp 12 - 25 Juta (Full App UI/UX Design & Prototype Interaktif)' },
    { value: 'Rp 25 - 50 Juta', label: 'Rp 25 - 50 Juta (Sistem UI/UX Kompleks + Design System)' },
    { value: '> Rp 50 Juta', label: '> Rp 50 Juta (UI/UX Audit & Redesign Enterprise)' }
  ],
  'Information System': [
    { value: 'Rp 10 - 25 Juta', label: 'Rp 10 - 25 Juta (Sistem Informasi Sekolah / Inventory UMKM)' },
    { value: 'Rp 25 - 50 Juta', label: 'Rp 25 - 50 Juta (Sistem Informasi Klinik / Akademik / ERP Basic)' },
    { value: 'Rp 50 - 100 Juta', label: 'Rp 50 - 100 Juta (Sistem ERP / CRM / HRIS Terintegrasi)' },
    { value: '> Rp 100 Juta', label: '> Rp 100 Juta (Full Integrated Enterprise System)' }
  ],
  'System Maintenance': [
    { value: 'Rp 2 - 5 Juta / Bulan', label: 'Rp 2 - 5 Juta / Bulan (Maintenance Basic & Routine Backup)' },
    { value: 'Rp 5 - 15 Juta / Bulan', label: 'Rp 5 - 15 Juta / Bulan (Standard SLA & Regular Feature Updates)' },
    { value: 'Rp 15 - 30 Juta / Bulan', label: 'Rp 15 - 30 Juta / Bulan (Dedicated Tech Support & Server Monitoring)' },
    { value: '> Rp 30 Juta / Bulan', label: '> Rp 30 Juta / Bulan (24/7 Enterprise Support & DevOps Infrastructure)' }
  ],
  'AI Development': [
    { value: 'Rp 15 - 35 Juta', label: 'Rp 15 - 35 Juta (Integrasi Chatbot AI / LLM API Basic)' },
    { value: 'Rp 35 - 75 Juta', label: 'Rp 35 - 75 Juta (Custom AI Model / Fine-Tuning & Knowledge Base)' },
    { value: 'Rp 75 - 150 Juta', label: 'Rp 75 - 150 Juta (Ekosistem AI Enterprise / Machine Learning Pipeline)' },
    { value: '> Rp 150 Juta', label: '> Rp 150 Juta (Enterprise Custom AI Architecture & Automation)' }
  ],
  'Digital Consulting': [
    { value: 'Rp 10 - 25 Juta', label: 'Rp 10 - 25 Juta (Audit Digital & Roadmap Perencanaan DX)' },
    { value: 'Rp 25 - 50 Juta', label: 'Rp 25 - 50 Juta (Pendampingan Transformation Workflow & IT Architecture)' },
    { value: 'Rp 50 - 100 Juta', label: 'Rp 50 - 100 Juta (Konsultasi Skala Besar Enterprise & Cloud Migration)' },
    { value: '> Rp 100 Juta', label: '> Rp 100 Juta (Full Spectrum Digital Transformation Retainer)' }
  ]
};

export const ContactSection = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Website Development',
    budget: 'Rp 3 - 7 Juta',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'service') {
      const budgetOptions = SERVICE_BUDGET_MAP[value] || SERVICE_BUDGET_MAP['Website Development'];
      setFormData({
        ...formData,
        service: value,
        budget: budgetOptions[0].value
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prefilled WhatsApp message to 082211499289
    const text = `Halo ${COMPANY_CONFIG.name},%0A%0ASaya ingin mengajukan permintaan konsultasi proyek:%0A- *Nama:* ${encodeURIComponent(formData.name)}%0A- *Email:* ${encodeURIComponent(formData.email)}%0A- *No. WhatsApp:* ${encodeURIComponent(formData.phone)}%0A- *Perusahaan/Instansi:* ${encodeURIComponent(formData.company || '-')}%0A- *Layanan:* ${encodeURIComponent(formData.service)}%0A- *Estimasi Budget:* ${encodeURIComponent(formData.budget)}%0A- *Pesan/Kebutuhan:* ${encodeURIComponent(formData.message)}`;
    
    const waUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp.number}?text=${text}`;
    setSubmitted(true);
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className={`py-24 relative overflow-hidden border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-950/95 border-sky-500/15 text-slate-100' : 'bg-white/95 border-sky-100 text-slate-900'
    }`}>
      
      {/* Background Lights */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
      }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-indigo-500/10' : 'bg-blue-400/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs ${
            isDark ? 'bg-slate-900 border-cyan-500/30 text-cyan-300' : 'bg-sky-50 border-sky-200 text-sky-700'
          }`}>
            <MessageSquare className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
            <span>{t('contact.badge')}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {t('contact.heading')} <span className={
              isDark ? 'bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent'
            }>{t('contact.headingAccent')}</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Layout Grid (2 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Consultation Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-7 border p-6 sm:p-8 rounded-3xl shadow-2xl relative transition-all ${
              isDark ? 'bg-slate-900/90 border-sky-500/30 text-slate-100' : 'bg-white border-sky-200 text-slate-800'
            }`}
          >
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{t('contact.submittedTitle')}</h3>
                <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t('contact.submittedDesc')}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className={isDark ? 'bg-slate-900 text-slate-200 border-slate-700 hover:border-cyan-400' : 'bg-white text-slate-700 border-sky-200 hover:border-sky-300'}
                  onClick={() => setSubmitted(false)}
                >
                  {t('contact.submitAnother')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nama */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t('contact.fullName')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 transition-colors ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-400 focus:ring-cyan-400' : 'bg-slate-50 border-sky-200 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 transition-colors ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-400 focus:ring-cyan-400' : 'bg-slate-50 border-sky-200 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.phonePlaceholder')}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 transition-colors ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-400 focus:ring-cyan-400' : 'bg-slate-50 border-sky-200 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                    />
                  </div>

                  {/* Perusahaan */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t('contact.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('contact.companyPlaceholder')}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 transition-colors ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-400 focus:ring-cyan-400' : 'bg-slate-50 border-sky-200 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Jenis Layanan */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t('contact.serviceType')}
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 transition-colors cursor-pointer ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-400 focus:ring-cyan-400' : 'bg-slate-50 border-sky-200 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Web Application">Web Application (Dashboard/SaaS)</option>
                      <option value="Custom Software">Custom Software Development</option>
                      <option value="UI/UX Design">UI/UX Design & Prototype</option>
                      <option value="Information System">Sistem Informasi Sekolah/Bisnis</option>
                      <option value="System Maintenance">System Maintenance & Optimization</option>
                      <option value="AI Development">AI Development & Integration</option>
                      <option value="Digital Consulting">Digital Consulting & Strategy</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t('contact.budgetRange')}
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 transition-colors cursor-pointer ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-400 focus:ring-cyan-400' : 'bg-slate-50 border-sky-200 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                    >
                      {(SERVICE_BUDGET_MAP[formData.service] || SERVICE_BUDGET_MAP['Website Development']).map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Note Estimasi Harga / Requirement */}
                <div className={`p-3.5 rounded-2xl border flex items-start gap-3 text-[11px] leading-relaxed transition-all ${
                  isDark ? 'bg-sky-950/40 border-sky-500/30 text-sky-200/90' : 'bg-sky-50/80 border-sky-200 text-sky-900'
                }`}>
                  <Info className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <div>
                    <span className="font-extrabold">{t('contact.priceNoteTitle')} </span>
                    <span>{t('contact.priceNote')}</span>
                  </div>
                </div>

                {/* Pesan */}
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 transition-colors ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-400 focus:ring-cyan-400' : 'bg-slate-50 border-sky-200 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-2 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                  icon={Send}
                >
                  {t('contact.submitBtn')}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Right Column: Company Info & Google Maps Embed (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Details Card */}
            <div className={`border rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl transition-all ${
              isDark ? 'bg-slate-900/90 border-sky-500/30 text-slate-100' : 'bg-white border-sky-200 text-slate-800'
            }`}>
              <div>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-sky-700'}`}>{t('contact.officeInfoTitle')}</span>
                <h3 className={`text-xl font-extrabold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {COMPANY_CONFIG.name}
                </h3>
                <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`}>
                  {COMPANY_CONFIG.field}
                </p>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className={`flex items-start gap-3.5 p-3 rounded-2xl border ${
                  isDark ? 'bg-slate-950/90 border-slate-800 text-slate-300' : 'bg-sky-50/60 border-sky-100 text-slate-700'
                }`}>
                  <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <div>
                    <h4 className={`font-bold mb-0.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{t('contact.officeAddress')}:</h4>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{COMPANY_CONFIG.address}</p>
                  </div>
                </div>

                <div className={`flex items-start gap-3.5 p-3 rounded-2xl border ${
                  isDark ? 'bg-slate-950/90 border-slate-800 text-slate-300' : 'bg-sky-50/60 border-sky-100 text-slate-700'
                }`}>
                  <Mail className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <div>
                    <h4 className={`font-bold mb-0.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{t('contact.emailAddress')}:</h4>
                    <p className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{COMPANY_CONFIG.email}</p>
                  </div>
                </div>

                <div className={`flex items-start gap-3.5 p-3 rounded-2xl border ${
                  isDark ? 'bg-slate-950/90 border-slate-800 text-slate-300' : 'bg-sky-50/60 border-sky-100 text-slate-700'
                }`}>
                  <Phone className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <div>
                    <h4 className={`font-bold mb-0.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{t('contact.waSupport')}:</h4>
                    <p className={`font-black text-sm ${isDark ? 'text-cyan-300' : 'text-sky-700'}`}>{COMPANY_CONFIG.whatsapp.displayNumber}</p>
                  </div>
                </div>

                <div className={`flex items-start gap-3.5 p-3 rounded-2xl border ${
                  isDark ? 'bg-slate-950/90 border-slate-800 text-slate-300' : 'bg-sky-50/60 border-sky-100 text-slate-700'
                }`}>
                  <Clock className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <div>
                    <h4 className={`font-bold mb-0.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{t('contact.operatingHours')}:</h4>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{COMPANY_CONFIG.operatingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Card */}
            <div className={`border rounded-3xl p-5 shadow-2xl space-y-4 transition-all ${
              isDark ? 'bg-slate-900/90 border-sky-500/30' : 'bg-white border-sky-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Map className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{t('contact.mapsTitle')}</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                  isDark ? 'bg-slate-950 text-cyan-400 border-slate-800' : 'bg-sky-50 text-sky-700 border-sky-200'
                }`}>
                  Google Maps
                </span>
              </div>

              {/* Embedded Google Map iframe */}
              <div className={`w-full h-52 rounded-2xl overflow-hidden border shadow-inner relative group ${
                isDark ? 'border-slate-800' : 'border-sky-100'
              }`}>
                <iframe
                  title="PT. AUBE TERA INDONESIA Google Maps"
                  src="https://maps.google.com/maps?q=-6.3497222,106.6278889&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`w-full h-full ${isDark ? 'filter invert opacity-80 contrast-125' : ''}`}
                />
              </div>

              {/* Direct Link Button to User's Google Maps URL */}
              <a
                href={COMPANY_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-cyan-300 text-slate-950 text-xs font-black transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-slate-950" />
                <span>{t('contact.openInMapsBtn')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
