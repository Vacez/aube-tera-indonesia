import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Map, ExternalLink, Info } from 'lucide-react';
import { COMPANY_CONFIG } from '../../config/company';
import { Button } from '../../components/Button/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const getContactServiceOptions = (lang = 'id') => {
  const options = {
    id: [
      { value: 'Website Development', label: 'Website Development' },
      { value: 'Mobile App Development', label: 'Mobile App Development' },
      { value: 'Web Application', label: 'Web Application (Dashboard/SaaS)' },
      { value: 'Custom Software', label: 'Custom Software Development' },
      { value: 'UI/UX Design', label: 'UI/UX Design & Prototype' },
      { value: 'Information System', label: 'Sistem Informasi Sekolah/Bisnis' },
      { value: 'System Maintenance', label: 'System Maintenance & Optimization' },
      { value: 'AI Development', label: 'AI Development & Integration' },
      { value: 'Digital Consulting', label: 'Digital Consulting & Strategy' }
    ],
    en: [
      { value: 'Website Development', label: 'Website Development' },
      { value: 'Mobile App Development', label: 'Mobile App Development' },
      { value: 'Web Application', label: 'Web Application (Dashboard/SaaS)' },
      { value: 'Custom Software', label: 'Custom Software Development' },
      { value: 'UI/UX Design', label: 'UI/UX Design & Prototype' },
      { value: 'Information System', label: 'Enterprise & School Information System' },
      { value: 'System Maintenance', label: 'System Maintenance & Optimization' },
      { value: 'AI Development', label: 'AI Development & Integration' },
      { value: 'Digital Consulting', label: 'Digital Consulting & Strategy' }
    ],
    vi: [
      { value: 'Website Development', label: 'Phát triển Website' },
      { value: 'Mobile App Development', label: 'Phát triển Ứng dụng Di động' },
      { value: 'Web Application', label: 'Ứng dụng Web (Dashboard/SaaS)' },
      { value: 'Custom Software', label: 'Phát triển Phần mềm Theo yêu cầu' },
      { value: 'UI/UX Design', label: 'Thiết kế UI/UX & Bản mẫu' },
      { value: 'Information System', label: 'Hệ thống Thông tin Doanh nghiệp/Trường học' },
      { value: 'System Maintenance', label: 'Bảo trì & Tối ưu hóa Hệ thống' },
      { value: 'AI Development', label: 'Phát triển & Tích hợp AI' },
      { value: 'Digital Consulting', label: 'Tư vấn Chuyển đổi Số' }
    ],
    ja: [
      { value: 'Website Development', label: 'Webサイト制作 (コーポレート/LP/EC)' },
      { value: 'Mobile App Development', label: 'モバイルアプリ開発 (iOS / Android)' },
      { value: 'Web Application', label: 'Webアプリケーション (ダッシュボード/SaaS)' },
      { value: 'Custom Software', label: 'カスタムソフトウェア開発 (専用設計)' },
      { value: 'UI/UX Design', label: 'UI/UXデザイン ＆ プロトタイピング' },
      { value: 'Information System', label: '業務基幹情報システム (ERP/校務/管理)' },
      { value: 'System Maintenance', label: 'システム保守・監視 ＆ 性能最適化' },
      { value: 'AI Development', label: 'AI開発 ＆ ソリューション統合' },
      { value: 'Digital Consulting', label: 'DX推進 ＆ デジタルコンサルティング' }
    ]
  };
  return options[lang] || options['id'];
};

export const getBudgetOptions = (service, lang = 'id') => {
  const isJa = lang === 'ja';
  const isEn = lang === 'en';
  const isVi = lang === 'vi';

  const map = {
    'Website Development': [
      { 
        value: 'Rp 3 - 7 Juta', 
        label: isJa ? 'Rp 3〜7 Juta (約3〜7万円 / コーポレート・LP)' 
             : isEn ? 'Rp 3 - 7 Million (Company Profile / Landing Page)'
             : isVi ? '3 - 7 Triệu IDR (Website Giới thiệu / Landing Page)'
             : 'Rp 3 - 7 Juta (Company Profile / Landing Page)' 
      },
      { 
        value: 'Rp 7 - 15 Juta', 
        label: isJa ? 'Rp 7〜15 Juta (企業Webポータル / 高機能サイト)' 
             : isEn ? 'Rp 7 - 15 Million (Corporate Website / Web Portal)'
             : isVi ? '7 - 15 Triệu IDR (Website Doanh nghiệp / Cổng thông tin)'
             : 'Rp 7 - 15 Juta (Website Corporate / Web Portal)' 
      },
      { 
        value: 'Rp 15 - 30 Juta', 
        label: isJa ? 'Rp 15〜30 Juta (ECサイト / オンラインショップ複合型)' 
             : isEn ? 'Rp 15 - 30 Million (Complex E-Commerce Store)'
             : isVi ? '15 - 30 Triệu IDR (Thương mại Điện tử / Cửa hàng Trực tuyến)'
             : 'Rp 15 - 30 Juta (E-Commerce / Toko Online Complex)' 
      },
      { 
        value: '> Rp 30 Juta', 
        label: isJa ? '> Rp 30 Juta (エンタープライズWeb基盤)' 
             : isEn ? '> Rp 30 Million (Enterprise Corporate Portal)'
             : isVi ? '> 30 Triệu IDR (Hệ thống Cổng Thông tin Doanh nghiệp lớn)'
             : '> Rp 30 Juta (Portal Korporat Enterprise)' 
      }
    ],
    'Mobile App Development': [
      { 
        value: 'Rp 15 - 30 Juta', 
        label: isJa ? 'Rp 15〜30 Juta (ベーシックモバイルアプリ / MVP)' 
             : isEn ? 'Rp 15 - 30 Million (Basic Mobile App / MVP)'
             : isVi ? '15 - 30 Triệu IDR (Ứng dụng Di động Cơ bản / MVP)'
             : 'Rp 15 - 30 Juta (Aplikasi Mobile Basic / MVP)' 
      },
      { 
        value: 'Rp 30 - 60 Juta', 
        label: isJa ? 'Rp 30〜60 Juta (中規模Android ＆ iOSアプリ)' 
             : isEn ? 'Rp 30 - 60 Million (Mid-scale Android & iOS App)'
             : isVi ? '30 - 60 Triệu IDR (Ứng dụng Android & iOS Quy mô Vừa)'
             : 'Rp 30 - 60 Juta (Aplikasi Android & iOS Skala Menengah)' 
      },
      { 
        value: 'Rp 60 - 100 Juta', 
        label: isJa ? 'Rp 60〜100 Juta (高機能アプリ ＋ 決済ゲートウェイ)' 
             : isEn ? 'Rp 60 - 100 Million (Complex App + Payment Gateway)'
             : isVi ? '60 - 100 Triệu IDR (Ứng dụng Nâng cao + Cổng Thanh toán)'
             : 'Rp 60 - 100 Juta (Aplikasi Mobile Complex + Payment Gateway)' 
      },
      { 
        value: '> Rp 100 Juta', 
        label: isJa ? '> Rp 100 Juta (エンタープライズモバイルエコシステム)' 
             : isEn ? '> Rp 100 Million (Enterprise Mobile App Ecosystem)'
             : isVi ? '> 100 Triệu IDR (Hệ sinh thái Di động Doanh nghiệp lớn)'
             : '> Rp 100 Juta (Ekosistem Mobile App Enterprise)' 
      }
    ],
    'Web Application': [
      { 
        value: 'Rp 15 - 35 Juta', 
        label: isJa ? 'Rp 15〜35 Juta (管理ダッシュボード / 基本SaaS)' 
             : isEn ? 'Rp 15 - 35 Million (Admin Dashboard / Basic SaaS)'
             : isVi ? '15 - 35 Triệu IDR (Bảng Điều khiển Quản trị / SaaS Cơ bản)'
             : 'Rp 15 - 35 Juta (Admin Dashboard / SaaS Basic)' 
      },
      { 
        value: 'Rp 35 - 75 Juta', 
        label: isJa ? 'Rp 35〜75 Juta (社内業務Webアプリ / ワークフロー)' 
             : isEn ? 'Rp 35 - 75 Million (Internal Business App / Workflows)'
             : isVi ? '35 - 75 Triệu IDR (Ứng dụng Nội bộ Doanh nghiệp)'
             : 'Rp 35 - 75 Juta (Aplikasi Web Internal / Workflows)' 
      },
      { 
        value: 'Rp 75 - 150 Juta', 
        label: isJa ? 'Rp 75〜150 Juta (拡張型SaaSプラットフォーム)' 
             : isEn ? 'Rp 75 - 150 Million (Scale-Up SaaS Platform)'
             : isVi ? '75 - 150 Triệu IDR (Nền tảng SaaS Mở rộng)'
             : 'Rp 75 - 150 Juta (SaaS Platform Scale-Up)' 
      },
      { 
        value: '> Rp 150 Juta', 
        label: isJa ? '> Rp 150 Juta (エンタープライズWeb基幹システム)' 
             : isEn ? '> Rp 150 Million (Enterprise Web System Platform)'
             : isVi ? '> 150 Triệu IDR (Nền tảng Hệ thống Web Doanh nghiệp lớn)'
             : '> Rp 150 Juta (Enterprise Web System Platform)' 
      }
    ],
    'Custom Software': [
      { 
        value: 'Rp 25 - 50 Juta', 
        label: isJa ? 'Rp 25〜50 Juta (専用カスタムモジュール / 自動化)' 
             : isEn ? 'Rp 25 - 50 Million (Custom Module / Automation)'
             : isVi ? '25 - 50 Triệu IDR (Mô-đun Tùy chỉnh / Tự động hóa)'
             : 'Rp 25 - 50 Juta (Custom Module / Automasi Alur Kerja)' 
      },
      { 
        value: 'Rp 50 - 100 Juta', 
        label: isJa ? 'Rp 50〜100 Juta (企業専用基幹ソフトウェア)' 
             : isEn ? 'Rp 50 - 100 Million (Custom Core Business Software)'
             : isVi ? '50 - 100 Triệu IDR (Phần mềm Lõi Tùy chỉnh)'
             : 'Rp 50 - 100 Juta (Custom Core Software Perusahaan)' 
      },
      { 
        value: 'Rp 100 - 200 Juta', 
        label: isJa ? 'Rp 100〜200 Juta (複数システム連携 ＆ API統合)' 
             : isEn ? 'Rp 100 - 200 Million (Multi-System Architecture & API Integration)'
             : isVi ? '100 - 200 Triệu IDR (Kiến trúc Đa Hệ thống & Tích hợp API)'
             : 'Rp 100 - 200 Juta (Arsitektur Multi-Sistem & Integrasi API)' 
      },
      { 
        value: '> Rp 200 Juta', 
        label: isJa ? '> Rp 200 Juta (大規模エンタープライズ開発)' 
             : isEn ? '> Rp 200 Million (Large-scale Enterprise Software)'
             : isVi ? '> 200 Triệu IDR (Phần mềm Doanh nghiệp Quy mô lớn)'
             : '> Rp 200 Juta (Software Enterprise Skala Besar)' 
      }
    ],
    'UI/UX Design': [
      { 
        value: 'Rp 5 - 12 Juta', 
        label: isJa ? 'Rp 5〜12 Juta (LP / アプリUI MVP設計)' 
             : isEn ? 'Rp 5 - 12 Million (Landing Page / App UI MVP)'
             : isVi ? '5 - 12 Triệu IDR (Thiết kế Landing Page / UI MVP)'
             : 'Rp 5 - 12 Juta (Landing Page / App UI MVP)' 
      },
      { 
        value: 'Rp 12 - 25 Juta', 
        label: isJa ? 'Rp 12〜25 Juta (フルUI/UX設計 ＆ インタラクティブ試作)' 
             : isEn ? 'Rp 12 - 25 Million (Full App UI/UX & Interactive Prototype)'
             : isVi ? '12 - 25 Triệu IDR (Thiết kế Toàn diện & Bản mẫu Tương tác)'
             : 'Rp 12 - 25 Juta (Full App UI/UX Design & Prototype Interaktif)' 
      },
      { 
        value: 'Rp 25 - 50 Juta', 
        label: isJa ? 'Rp 25〜50 Juta (複合UI/UX設計 ＋ デザインシステム)' 
             : isEn ? 'Rp 25 - 50 Million (Complex UI/UX + Design System)'
             : isVi ? '25 - 50 Triệu IDR (Hệ thống UI/UX Phức hợp & Design System)'
             : 'Rp 25 - 50 Juta (Sistem UI/UX Kompleks + Design System)' 
      },
      { 
        value: '> Rp 50 Juta', 
        label: isJa ? '> Rp 50 Juta (エンタープライズUI/UXリニューアル)' 
             : isEn ? '> Rp 50 Million (Enterprise UI/UX Audit & Redesign)'
             : isVi ? '> 50 Triệu IDR (Kiểm toán & Tái thiết kế UI/UX Doanh nghiệp)'
             : '> Rp 50 Juta (UI/UX Audit & Redesign Enterprise)' 
      }
    ],
    'Information System': [
      { 
        value: 'Rp 10 - 25 Juta', 
        label: isJa ? 'Rp 10〜25 Juta (校務システム / 中小企業在庫管理)' 
             : isEn ? 'Rp 10 - 25 Million (School Info System / SMB Inventory)'
             : isVi ? '10 - 25 Triệu IDR (Hệ thống Trường học / Kho hàng)'
             : 'Rp 10 - 25 Juta (Sistem Informasi Sekolah / Inventory UMKM)' 
      },
      { 
        value: 'Rp 25 - 50 Juta', 
        label: isJa ? 'Rp 25〜50 Juta (クリニック電子カルテ / 基本ERP)' 
             : isEn ? 'Rp 25 - 50 Million (Clinic System / Academic / Basic ERP)'
             : isVi ? '25 - 50 Triệu IDR (Hệ thống Phòng khám / ERP Cơ bản)'
             : 'Rp 25 - 50 Juta (Sistem Informasi Klinik / Akademik / ERP Basic)' 
      },
      { 
        value: 'Rp 50 - 100 Juta', 
        label: isJa ? 'Rp 50〜100 Juta (統合ERP / CRM / 人事給与HRIS)' 
             : isEn ? 'Rp 50 - 100 Million (Integrated ERP / CRM / HRIS)'
             : isVi ? '50 - 100 Triệu IDR (ERP / CRM / HRIS Tích hợp)'
             : 'Rp 50 - 100 Juta (Sistem ERP / CRM / HRIS Terintegrasi)' 
      },
      { 
        value: '> Rp 100 Juta', 
        label: isJa ? '> Rp 100 Juta (完全統合型エンタープライズ基幹システム)' 
             : isEn ? '> Rp 100 Million (Full Integrated Enterprise System)'
             : isVi ? '> 100 Triệu IDR (Hệ thống Doanh nghiệp Toàn diện)'
             : '> Rp 100 Juta (Full Integrated Enterprise System)' 
      }
    ],
    'System Maintenance': [
      { 
        value: 'Rp 2 - 5 Juta / Bulan', 
        label: isJa ? 'Rp 2〜5 Juta / 月 (基本保守 ＆ 定期バックアップ)' 
             : isEn ? 'Rp 2 - 5 Million / Month (Basic Maintenance & Routine Backup)'
             : isVi ? '2 - 5 Triệu IDR / Tháng (Bảo trì Cơ bản & Sao lưu Định kỳ)'
             : 'Rp 2 - 5 Juta / Bulan (Maintenance Basic & Routine Backup)' 
      },
      { 
        value: 'Rp 5 - 15 Juta / Bulan', 
        label: isJa ? 'Rp 5〜15 Juta / 月 (標準SLA ＆ 定期機能アップデート)' 
             : isEn ? 'Rp 5 - 15 Million / Month (Standard SLA & Regular Feature Updates)'
             : isVi ? '5 - 15 Triệu IDR / Tháng (SLA Tiêu chuẩn & Cập nhật Tính năng)'
             : 'Rp 5 - 15 Juta / Bulan (Standard SLA & Regular Feature Updates)' 
      },
      { 
        value: 'Rp 15 - 30 Juta / Bulan', 
        label: isJa ? 'Rp 15〜30 Juta / 月 (専任技術支援 ＆ サーバー常時監視)' 
             : isEn ? 'Rp 15 - 30 Million / Month (Dedicated Tech Support & Server Monitoring)'
             : isVi ? '15 - 30 Triệu IDR / Tháng (Hỗ trợ Kỹ thuật Riêng & Giám sát Máy chủ)'
             : 'Rp 15 - 30 Juta / Bulan (Dedicated Tech Support & Server Monitoring)' 
      },
      { 
        value: '> Rp 30 Juta / Bulan', 
        label: isJa ? '> Rp 30 Juta / 月 (24時間365日エンタープライズDevOps保守)' 
             : isEn ? '> Rp 30 Million / Month (24/7 Enterprise Support & DevOps Infrastructure)'
             : isVi ? '> 30 Triệu IDR / Tháng (Hỗ trợ 24/7 & Hạ tầng DevOps)'
             : '> Rp 30 Juta / Bulan (24/7 Enterprise Support & DevOps Infrastructure)' 
      }
    ],
    'AI Development': [
      { 
        value: 'Rp 15 - 35 Juta', 
        label: isJa ? 'Rp 15〜35 Juta (AIチャットボット / LLM API連携)' 
             : isEn ? 'Rp 15 - 35 Million (AI Chatbot / Basic LLM API Integration)'
             : isVi ? '15 - 35 Triệu IDR (Chatbot AI / Tích hợp LLM API Cơ bản)'
             : 'Rp 15 - 35 Juta (Integrasi Chatbot AI / LLM API Basic)' 
      },
      { 
        value: 'Rp 35 - 75 Juta', 
        label: isJa ? 'Rp 35〜75 Juta (カスタムAIモデル / ファインチューニング)' 
             : isEn ? 'Rp 35 - 75 Million (Custom AI Model / Fine-Tuning & Knowledge Base)'
             : isVi ? '35 - 75 Triệu IDR (Mô hình AI Tùy chỉnh / Fine-Tuning)'
             : 'Rp 35 - 75 Juta (Custom AI Model / Fine-Tuning & Knowledge Base)' 
      },
      { 
        value: 'Rp 75 - 150 Juta', 
        label: isJa ? 'Rp 75〜150 Juta (企業向けAI / 機械学習パイプライン)' 
             : isEn ? 'Rp 75 - 150 Million (Enterprise AI Ecosystem / Machine Learning Pipeline)'
             : isVi ? '75 - 150 Triệu IDR (Hệ sinh thái AI / Đường ống Machine Learning)'
             : 'Rp 75 - 150 Juta (Ekosistem AI Enterprise / Machine Learning Pipeline)' 
      },
      { 
        value: '> Rp 150 Juta', 
        label: isJa ? '> Rp 150 Juta (エンタープライズ独自AI基盤 ＆ 自動化)' 
             : isEn ? '> Rp 150 Million (Enterprise Custom AI Architecture & Automation)'
             : isVi ? '> 150 Triệu IDR (Kiến trúc AI Doanh nghiệp & Tự động hóa Toàn diện)'
             : '> Rp 150 Juta (Enterprise Custom AI Architecture & Automation)' 
      }
    ],
    'Digital Consulting': [
      { 
        value: 'Rp 10 - 25 Juta', 
        label: isJa ? 'Rp 10〜25 Juta (デジタル診断 ＆ DXロードマップ策定)' 
             : isEn ? 'Rp 10 - 25 Million (Digital Audit & DX Roadmap Planning)'
             : isVi ? '10 - 25 Triệu IDR (Đánh giá Số & Lộ trình Chuyển đổi)'
             : 'Rp 10 - 25 Juta (Audit Digital & Roadmap Perencanaan DX)' 
      },
      { 
        value: 'Rp 25 - 50 Juta', 
        label: isJa ? 'Rp 25〜50 Juta (業務変革支援 ＆ ITアーキテクチャ設計)' 
             : isEn ? 'Rp 25 - 50 Million (Workflow Transformation & IT Architecture)'
             : isVi ? '25 - 50 Triệu IDR (Tư vấn Tái cấu trúc Quy trình & Kiến trúc CNTT)'
             : 'Rp 25 - 50 Juta (Pendampingan Transformation Workflow & IT Architecture)' 
      },
      { 
        value: 'Rp 50 - 100 Juta', 
        label: isJa ? 'Rp 50〜100 Juta (エンタープライズ大規模DX ＆ クラウド移行)' 
             : isEn ? 'Rp 50 - 100 Million (Large-scale Enterprise DX & Cloud Migration)'
             : isVi ? '50 - 100 Triệu IDR (Chuyển đổi Số Quy mô lớn & Di chuyển Đám mây)'
             : 'Rp 50 - 100 Juta (Konsultasi Skala Besar Enterprise & Cloud Migration)' 
      },
      { 
        value: '> Rp 100 Juta', 
        label: isJa ? '> Rp 100 Juta (包括的デジタル変革顧問リテイナー)' 
             : isEn ? '> Rp 100 Million (Full Spectrum Digital Transformation Retainer)'
             : isVi ? '> 100 Triệu IDR (Dịch vụ Tư vấn Chuyển đổi Số Toàn diện)'
             : '> Rp 100 Juta (Full Spectrum Digital Transformation Retainer)' 
      }
    ]
  };

  return map[service] || map['Website Development'];
};

export const ContactSection = () => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const serviceOptions = getContactServiceOptions(language);

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
      const currentBudgetOptions = getBudgetOptions(value, language);
      setFormData({
        ...formData,
        service: value,
        budget: currentBudgetOptions[0]?.value || 'Rp 3 - 7 Juta'
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Localized prefilled WhatsApp message
    let text;
    if (language === 'ja') {
      text = `${COMPANY_CONFIG.name} 様,%0A%0AWebサイトよりプロジェクト相談のお問い合わせを送信します:%0A- *お名前:* ${encodeURIComponent(formData.name)}%0A- *メール:* ${encodeURIComponent(formData.email)}%0A- *WhatsApp:* ${encodeURIComponent(formData.phone)}%0A- *企業名/団体名:* ${encodeURIComponent(formData.company || '-')}%0A- *ご希望サービス:* ${encodeURIComponent(formData.service)}%0A- *ご予算目安:* ${encodeURIComponent(formData.budget)}%0A- *ご相談内容/要件:* ${encodeURIComponent(formData.message)}`;
    } else if (language === 'en') {
      text = `Hello ${COMPANY_CONFIG.name},%0A%0AI would like to submit a project consultation request:%0A- *Name:* ${encodeURIComponent(formData.name)}%0A- *Email:* ${encodeURIComponent(formData.email)}%0A- *WhatsApp:* ${encodeURIComponent(formData.phone)}%0A- *Company/Institution:* ${encodeURIComponent(formData.company || '-')}%0A- *Service:* ${encodeURIComponent(formData.service)}%0A- *Estimated Budget:* ${encodeURIComponent(formData.budget)}%0A- *Message/Requirements:* ${encodeURIComponent(formData.message)}`;
    } else if (language === 'vi') {
      text = `Xin chào ${COMPANY_CONFIG.name},%0A%0ATôi muốn gửi yêu cầu tư vấn dự án:%0A- *Họ tên:* ${encodeURIComponent(formData.name)}%0A- *Email:* ${encodeURIComponent(formData.email)}%0A- *Số WhatsApp:* ${encodeURIComponent(formData.phone)}%0A- *Công ty/Đơn vị:* ${encodeURIComponent(formData.company || '-')}%0A- *Dịch vụ:* ${encodeURIComponent(formData.service)}%0A- *Ngân sách dự kiến:* ${encodeURIComponent(formData.budget)}%0A- *Yêu cầu:* ${encodeURIComponent(formData.message)}`;
    } else {
      text = `Halo ${COMPANY_CONFIG.name},%0A%0ASaya ingin mengajukan permintaan konsultasi proyek:%0A- *Nama:* ${encodeURIComponent(formData.name)}%0A- *Email:* ${encodeURIComponent(formData.email)}%0A- *No. WhatsApp:* ${encodeURIComponent(formData.phone)}%0A- *Perusahaan/Instansi:* ${encodeURIComponent(formData.company || '-')}%0A- *Layanan:* ${encodeURIComponent(formData.service)}%0A- *Estimasi Budget:* ${encodeURIComponent(formData.budget)}%0A- *Pesan/Kebutuhan:* ${encodeURIComponent(formData.message)}`;
    }
    
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
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
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
                      {getBudgetOptions(formData.service, language).map((option, idx) => (
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
                    <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('contact.officeAddressValue') || COMPANY_CONFIG.address}</p>
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
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{t('contact.operatingHoursValue') || COMPANY_CONFIG.operatingHours}</p>
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
