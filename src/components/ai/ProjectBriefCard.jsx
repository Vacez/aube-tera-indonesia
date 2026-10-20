import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Send, 
  Check, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Cpu, 
  CheckSquare, 
  Square,
  Sliders,
  CheckCircle2,
  Pencil,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { Button } from '../Button/Button';
import { COMPANY_CONFIG } from '../../config/company';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const ProjectBriefCard = ({ brief, onSubmitLead }) => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [downloaded, setDownloaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Editable summary fields state
  const [editableFields, setEditableFields] = useState({
    project_name: brief?.project_name || '',
    business_type: brief?.business_type || '',
    objective: brief?.objective || '',
    platform: brief?.platform || '',
    target_users: brief?.target_users || '',
    technical_recommendation: brief?.technical_recommendation || ''
  });

  // Dynamic lists of features and integrations (allows adding new ones)
  const [coreFeaturesList, setCoreFeaturesList] = useState(() => brief?.core_features || []);
  const [adminFeaturesList, setAdminFeaturesList] = useState(() => brief?.admin_features || []);
  const [integrationsList, setIntegrationsList] = useState(() => brief?.integrations || []);

  // Selection states
  const [selectedCoreFeatures, setSelectedCoreFeatures] = useState(() => brief?.core_features || []);
  const [selectedAdminFeatures, setSelectedAdminFeatures] = useState(() => brief?.admin_features || []);
  const [selectedIntegrations, setSelectedIntegrations] = useState(() => brief?.integrations || []);

  // Inline inputs for adding new items
  const [showAddCore, setShowAddCore] = useState(false);
  const [newCoreInput, setNewCoreInput] = useState('');

  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminInput, setNewAdminInput] = useState('');

  const [showAddIntegration, setShowAddIntegration] = useState(false);
  const [newIntegrationInput, setNewIntegrationInput] = useState('');

  // Sync state if a new brief is generated or loaded
  useEffect(() => {
    if (brief) {
      setEditableFields({
        project_name: brief.project_name || '',
        business_type: brief.business_type || '',
        objective: brief.objective || '',
        platform: brief.platform || '',
        target_users: brief.target_users || '',
        technical_recommendation: brief.technical_recommendation || ''
      });
      const core = brief.core_features || [];
      const admin = brief.admin_features || [];
      const integ = brief.integrations || [];
      setCoreFeaturesList(core);
      setAdminFeaturesList(admin);
      setIntegrationsList(integ);
      setSelectedCoreFeatures(core);
      setSelectedAdminFeatures(admin);
      setSelectedIntegrations(integ);
    }
  }, [brief]);

  if (!brief) return null;

  const handleFieldChange = (key, value) => {
    setEditableFields(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Add / Delete item handlers
  const handleAddCoreFeature = (e) => {
    e?.preventDefault();
    const trimmed = newCoreInput.trim();
    if (!trimmed) return;
    if (!coreFeaturesList.includes(trimmed)) {
      setCoreFeaturesList(prev => [...prev, trimmed]);
    }
    if (!selectedCoreFeatures.includes(trimmed)) {
      setSelectedCoreFeatures(prev => [...prev, trimmed]);
    }
    setNewCoreInput('');
    setShowAddCore(false);
  };

  const handleDeleteCoreFeature = (feat, e) => {
    e.stopPropagation();
    setCoreFeaturesList(prev => prev.filter(f => f !== feat));
    setSelectedCoreFeatures(prev => prev.filter(f => f !== feat));
  };

  const handleAddAdminFeature = (e) => {
    e?.preventDefault();
    const trimmed = newAdminInput.trim();
    if (!trimmed) return;
    if (!adminFeaturesList.includes(trimmed)) {
      setAdminFeaturesList(prev => [...prev, trimmed]);
    }
    if (!selectedAdminFeatures.includes(trimmed)) {
      setSelectedAdminFeatures(prev => [...prev, trimmed]);
    }
    setNewAdminInput('');
    setShowAddAdmin(false);
  };

  const handleDeleteAdminFeature = (feat, e) => {
    e.stopPropagation();
    setAdminFeaturesList(prev => prev.filter(f => f !== feat));
    setSelectedAdminFeatures(prev => prev.filter(f => f !== feat));
  };

  const handleAddIntegration = (e) => {
    e?.preventDefault();
    const trimmed = newIntegrationInput.trim();
    if (!trimmed) return;
    if (!integrationsList.includes(trimmed)) {
      setIntegrationsList(prev => [...prev, trimmed]);
    }
    if (!selectedIntegrations.includes(trimmed)) {
      setSelectedIntegrations(prev => [...prev, trimmed]);
    }
    setNewIntegrationInput('');
    setShowAddIntegration(false);
  };

  const handleDeleteIntegration = (tech, e) => {
    e.stopPropagation();
    setIntegrationsList(prev => prev.filter(t => t !== tech));
    setSelectedIntegrations(prev => prev.filter(t => t !== tech));
  };

  // Toggle helpers
  const toggleCoreFeature = (feat) => {
    if (selectedCoreFeatures.includes(feat)) {
      setSelectedCoreFeatures(selectedCoreFeatures.filter(f => f !== feat));
    } else {
      setSelectedCoreFeatures([...selectedCoreFeatures, feat]);
    }
  };

  const toggleAllCore = () => {
    if (selectedCoreFeatures.length === coreFeaturesList.length) {
      setSelectedCoreFeatures([]);
    } else {
      setSelectedCoreFeatures([...coreFeaturesList]);
    }
  };

  const toggleAdminFeature = (feat) => {
    if (selectedAdminFeatures.includes(feat)) {
      setSelectedAdminFeatures(selectedAdminFeatures.filter(f => f !== feat));
    } else {
      setSelectedAdminFeatures([...selectedAdminFeatures, feat]);
    }
  };

  const toggleAllAdmin = () => {
    if (selectedAdminFeatures.length === adminFeaturesList.length) {
      setSelectedAdminFeatures([]);
    } else {
      setSelectedAdminFeatures([...adminFeaturesList]);
    }
  };

  const toggleIntegration = (tech) => {
    if (selectedIntegrations.includes(tech)) {
      setSelectedIntegrations(selectedIntegrations.filter(t => t !== tech));
    } else {
      setSelectedIntegrations([...selectedIntegrations, tech]);
    }
  };

  // Construct customized brief based on edited fields & checklist selections
  const getCustomizedBrief = () => ({
    ...brief,
    ...editableFields,
    core_features: selectedCoreFeatures,
    admin_features: selectedAdminFeatures,
    integrations: selectedIntegrations,
    all_recommended_core: coreFeaturesList,
    all_recommended_admin: adminFeaturesList,
    excluded_features: {
      core: coreFeaturesList.filter(f => !selectedCoreFeatures.includes(f)),
      admin: adminFeaturesList.filter(f => !selectedAdminFeatures.includes(f)),
      all: [
        ...coreFeaturesList.filter(f => !selectedCoreFeatures.includes(f)),
        ...adminFeaturesList.filter(f => !selectedAdminFeatures.includes(f))
      ]
    }
  });

  const handleDownloadBrief = () => {
    const customized = getCustomizedBrief();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customized, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Project_Brief_${(customized.project_name || 'AubeAI').replace(/\s+/g, '_')}_custom.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloaded(true);
  };

  const handleWhatsAppExport = () => {
    const customized = getCustomizedBrief();

    const greetings = {
      id: `Halo ${COMPANY_CONFIG.name},%0A%0ASaya telah melakukan analisis konsultasi dengan AUBE AI dan menyusun Project Brief serta memilih fitur yang dibutuhkan:`,
      en: `Hello ${COMPANY_CONFIG.name},%0A%0AI have consulted with AUBE AI and selected my required features for this Project Brief:`,
      vi: `Xin chào ${COMPANY_CONFIG.name},%0A%0ATôi đã thực hiện tư vấn với AUBE AI và lựa chọn các tính năng cần thiết cho dự án:`,
      ja: `PT. AUBE TERA INDONESIA 御中%0A%0AAUBE AI での要件分析を行い、必要な機能を選定したプロジェクト概要を作成しました:`
    };

    const closings = {
      id: `Saya ingin berkonsultasi lebih lanjut mengenai eksekusi fitur-fitur pilihan ini.`,
      en: `I would like to consult further regarding the execution and proposal for these chosen features.`,
      vi: `Tôi muốn được tư vấn thêm về việc triểnkai các tính năng đã chọn này.`,
      ja: `これらの選定機能に基づき、具体的な開発費用・スケジュールについて相談させていただけますでしょうか。`
    };

    const greeting = greetings[language] || greetings['id'];
    const closing = closings[language] || closings['id'];

    const coreList = selectedCoreFeatures.length > 0 
      ? selectedCoreFeatures.map(f => `%0A  • ${encodeURIComponent(f)}`).join('')
      : '%0A  (Tidak ada / Disesuaikan kemudian)';

    const adminList = selectedAdminFeatures.length > 0
      ? selectedAdminFeatures.map(f => `%0A  • ${encodeURIComponent(f)}`).join('')
      : '%0A  (Tidak ada)';

    const integrationList = selectedIntegrations.length > 0
      ? encodeURIComponent(selectedIntegrations.join(', '))
      : '-';

    const text = `${greeting}%0A%0A*PROJECT BRIEF SPESIFIKASI:*%0A- *Proyek:* ${encodeURIComponent(customized.project_name || brief.project_name)}%0A- *Tipe Bisnis:* ${encodeURIComponent(customized.business_type || brief.business_type)}%0A- *Platform:* ${encodeURIComponent(customized.platform || brief.platform)}%0A- *Arsitektur:* ${encodeURIComponent(customized.technical_recommendation || brief.technical_recommendation || '-')}%0A- *Kompleksitas:* ${encodeURIComponent(brief.complexity)}%0A- *Fitur Utama yang Dipilih (${selectedCoreFeatures.length}):*${coreList}%0A- *Fitur Admin Dashboard yang Dipilih (${selectedAdminFeatures.length}):*${adminList}%0A- *Teknologi & Integrasi:* ${integrationList}%0A- *Estimasi Timeline:* ${encodeURIComponent(brief.timeline_estimate || '-')}%0A- *Estimasi Budget:* ${encodeURIComponent(brief.budget_range || '-')}%0A%0A${closing}`;
    
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsapp.number}?text=${text}`, '_blank');
  };

  // Localized UI Texts
  const uiTexts = {
    id: {
      headerBadge: "Structured Specification",
      briefTitle: "PROJECT BRIEF",
      projectName: "Nama Proyek",
      businessType: "Tipe Bisnis",
      objective: "Tujuan Proyek",
      platform: "Rekomendasi Platform",
      targetUsers: "Target Pengguna",
      coreTitle: "Rekomendasi Fitur Utama",
      adminTitle: "Rekomendasi Fitur Admin Dashboard",
      techTitle: "Rekomendasi Arsitektur & Integrasi",
      hint: "💡 Klik pada setiap fitur untuk memilih (dipakai) atau membatalkan (dilewati) sesuai kebutuhan Anda.",
      included: "Dipakai",
      excluded: "Dilewati",
      selectAll: "Pilih Semua",
      deselectAll: "Batal Semua",
      downloadReady: "Brief Diunduh",
      downloadAction: "Unduh Brief (JSON)",
      waAction: "Kirim via WhatsApp",
      submitAction: "Kirim ke AUBE TERA",
      editBrief: "Edit Manual",
      doneEditing: "Selesai Edit",
      editingActiveHint: "Mode Edit Aktif: Ubah detail proyek, arsitektur, atau hapus/tambah fitur di bawah ini.",
      addCoreFeature: "Tambah Fitur",
      addAdminFeature: "Tambah Fitur Admin",
      addIntegration: "Tambah Teknologi / Integrasi",
      addPlaceholder: "Ketik nama fitur lalu tekan Enter...",
      addTechPlaceholder: "Contoh: Midtrans, Redis, Docker...",
      addButton: "Tambah",
      deleteTooltip: "Hapus",
      noAdminFeatures: "Belum ada fitur admin. Klik + Tambah untuk menambahkan."
    },
    en: {
      headerBadge: "Structured Specification",
      briefTitle: "PROJECT BRIEF",
      projectName: "Project Name",
      businessType: "Business Type",
      objective: "Project Objective",
      platform: "Recommended Platform",
      targetUsers: "Target Users",
      coreTitle: "Recommended Core Features",
      adminTitle: "Recommended Admin Dashboard Features",
      techTitle: "Technical Architecture & Integrations",
      hint: "💡 Click any feature to include (checked) or exclude (unchecked) based on your custom needs.",
      included: "Included",
      excluded: "Excluded",
      selectAll: "Select All",
      deselectAll: "Deselect All",
      downloadReady: "Brief Downloaded",
      downloadAction: "Download Brief (JSON)",
      waAction: "Export to WhatsApp",
      submitAction: "Submit to AUBE TERA",
      editBrief: "Manual Edit",
      doneEditing: "Done Editing",
      editingActiveHint: "Edit Mode Active: Modify project details, architecture, or add/remove features below.",
      addCoreFeature: "Add Feature",
      addAdminFeature: "Add Admin Feature",
      addIntegration: "Add Tech / Integration",
      addPlaceholder: "Type feature name and press Enter...",
      addTechPlaceholder: "e.g. Stripe, Redis, Docker...",
      addButton: "Add",
      deleteTooltip: "Delete",
      noAdminFeatures: "No admin features added yet. Click + Add to include some."
    },
    vi: {
      headerBadge: "Đặc tả Cấu trúc",
      briefTitle: "PROJECT BRIEF",
      projectName: "Tên Dự Án",
      businessType: "Loại Hình Kinh Doanh",
      objective: "Mục Tiêu Dự Án",
      platform: "Nền Tảng Khuyến Nghị",
      targetUsers: "Đối Tượng Người Dùng",
      coreTitle: "Tính Năng Cốt Lõi Khuyến Nghị",
      adminTitle: "Tính Năng Bảng Quản Trị Khuyến Nghị",
      techTitle: "Kiến Trúc Kỹ Thuật & Tích Hợp",
      hint: "💡 Nhấp vào từng tính năng để chọn (sử dụng) hoặc bỏ chọn (bỏ qua) theo nhu cầu của bạn.",
      included: "Đã chọn",
      excluded: "Bỏ qua",
      selectAll: "Chọn tất cả",
      deselectAll: "Bỏ chọn tất cả",
      downloadReady: "Đã Tải Brief",
      downloadAction: "Tải Brief (JSON)",
      waAction: "Gửi qua WhatsApp",
      submitAction: "Gửi tới AUBE TERA",
      editBrief: "Chỉnh sửa thủ công",
      doneEditing: "Xong chỉnh sửa",
      editingActiveHint: "Chế độ chỉnh sửa đang bật: Sửa thông tin dự án, kiến trúc hoặc thêm/xóa tính năng bên dưới.",
      addCoreFeature: "Thêm tính năng",
      addAdminFeature: "Thêm tính năng admin",
      addIntegration: "Thêm công nghệ / tích hợp",
      addPlaceholder: "Nhập tên tính năng rồi nhấn Enter...",
      addTechPlaceholder: "VD: Cổng thanh toán, Redis, Docker...",
      addButton: "Thêm",
      deleteTooltip: "Xóa",
      noAdminFeatures: "Chưa có tính năng quản trị. Nhấp + Thêm để bổ sung."
    },
    ja: {
      headerBadge: "構造化仕様書",
      briefTitle: "PROJECT BRIEF",
      projectName: "プロジェクト名",
      businessType: "事業分類",
      objective: "開発目標",
      platform: "推奨プラットフォーム",
      targetUsers: "想定ユーザー層",
      coreTitle: "推奨コア機能",
      adminTitle: "推奨管理画面機能",
      techTitle: "技術アーキテクチャ ＆ 連携システム",
      hint: "💡 各項目をクリックして、プロジェクトに「採用」または「除外」を自由に選択できます。",
      included: "採用",
      excluded: "除外",
      selectAll: "全選択",
      deselectAll: "全解除",
      downloadReady: "概要ダウンロード済",
      downloadAction: "概要をダウンロード (JSON)",
      waAction: "WhatsAppへ送信",
      submitAction: "AUBE TERAへ送信",
      editBrief: "手動編集",
      doneEditing: "編集完了",
      editingActiveHint: "編集モード有効: プロジェクト詳細、アーキテクチャの変更、機能の追加/削除が可能です。",
      addCoreFeature: "機能を追加",
      addAdminFeature: "管理機能を追加",
      addIntegration: "技術・連携を追加",
      addPlaceholder: "機能名を入力してEnter...",
      addTechPlaceholder: "例: Stripe, Redis, Docker...",
      addButton: "追加",
      deleteTooltip: "削除",
      noAdminFeatures: "管理機能はまだありません。「+ 追加」をクリックして追加できます。"
    }
  };

  const ui = uiTexts[language] || uiTexts['id'];
  const allCore = brief.core_features || [];
  const allAdmin = brief.admin_features || [];

  return (
    <div className={`rounded-3xl border p-5 sm:p-7 shadow-2xl my-4 backdrop-blur-xl transition-all ${
      isDark
        ? 'bg-slate-900/95 border-cyan-500/40 text-slate-100 shadow-cyan-950/60'
        : 'bg-white/95 border-sky-300 text-slate-800 shadow-sky-900/10'
    }`}>
      
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-5 border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">{ui.headerBadge}</span>
            <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{ui.briefTitle}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Manual Edit Toggle Button */}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
              isEditing
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 hover:bg-emerald-400'
                : isDark
                  ? 'bg-slate-800/90 hover:bg-slate-800 text-cyan-300 border-cyan-500/30 hover:border-cyan-400'
                  : 'bg-sky-100/80 hover:bg-sky-100 text-sky-800 border-sky-300 hover:border-sky-400'
            }`}
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{ui.doneEditing}</span>
              </>
            ) : (
              <>
                <Pencil className="w-3.5 h-3.5" />
                <span>{ui.editBrief}</span>
              </>
            )}
          </button>

          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
            brief.complexity === 'Advanced'
              ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
              : brief.complexity === 'Medium'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
          }`}>
            {brief.complexity || 'Medium'} Complexity
          </span>
        </div>
      </div>

      {/* Edit Mode Active Banner */}
      {isEditing && (
        <div className={`mb-4 px-4 py-2.5 rounded-2xl border flex items-center justify-between gap-2 text-xs font-semibold animate-fadeIn ${
          isDark
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          <div className="flex items-center gap-2">
            <Pencil className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{ui.editingActiveHint}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shrink-0"
          >
            {ui.doneEditing}
          </button>
        </div>
      )}

      {/* Brief Specifications Grid */}
      <div className="space-y-4 text-xs sm:text-sm">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Project Name Field */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isEditing 
              ? isDark ? 'bg-slate-900 border-cyan-500/50 ring-1 ring-cyan-500/30' : 'bg-sky-50 border-sky-400 ring-1 ring-sky-300'
              : isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">{ui.projectName}</span>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-slate-400 hover:text-cyan-400 p-0.5 rounded cursor-pointer transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              )}
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editableFields.project_name}
                onChange={(e) => handleFieldChange('project_name', e.target.value)}
                className={`w-full px-3 py-1.5 rounded-xl text-sm font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  isDark ? 'bg-slate-950 border-cyan-500/40 text-white' : 'bg-white border-sky-300 text-slate-900'
                }`}
                placeholder={ui.projectName}
              />
            ) : (
              <span 
                onClick={() => setIsEditing(true)}
                className="font-bold text-sm block cursor-pointer hover:text-cyan-300 transition-colors"
              >
                {editableFields.project_name || brief.project_name}
              </span>
            )}
          </div>

          {/* Business Type Field */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isEditing 
              ? isDark ? 'bg-slate-900 border-cyan-500/50 ring-1 ring-cyan-500/30' : 'bg-sky-50 border-sky-400 ring-1 ring-sky-300'
              : isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">{ui.businessType}</span>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-slate-400 hover:text-cyan-400 p-0.5 rounded cursor-pointer transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              )}
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editableFields.business_type}
                onChange={(e) => handleFieldChange('business_type', e.target.value)}
                className={`w-full px-3 py-1.5 rounded-xl text-sm font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  isDark ? 'bg-slate-950 border-cyan-500/40 text-white' : 'bg-white border-sky-300 text-slate-900'
                }`}
                placeholder={ui.businessType}
              />
            ) : (
              <span 
                onClick={() => setIsEditing(true)}
                className="font-bold text-sm block cursor-pointer hover:text-cyan-300 transition-colors"
              >
                {editableFields.business_type || brief.business_type}
              </span>
            )}
          </div>
        </div>

        {/* Project Objective Field */}
        <div className={`p-3.5 rounded-2xl border transition-all ${
          isEditing 
            ? isDark ? 'bg-slate-900 border-cyan-500/50 ring-1 ring-cyan-500/30' : 'bg-sky-50 border-sky-400 ring-1 ring-sky-300'
            : isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">{ui.objective}</span>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-slate-400 hover:text-cyan-400 p-0.5 rounded cursor-pointer transition-colors"
                title="Edit"
              >
                <Pencil className="w-3 h-3" />
              </button>
            )}
          </div>
          {isEditing ? (
            <textarea
              rows={3}
              value={editableFields.objective}
              onChange={(e) => handleFieldChange('objective', e.target.value)}
              className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border leading-relaxed resize-none transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                isDark ? 'bg-slate-950 border-cyan-500/40 text-white' : 'bg-white border-sky-300 text-slate-900'
              }`}
              placeholder={ui.objective}
            />
          ) : (
            <p 
              onClick={() => setIsEditing(true)}
              className="leading-relaxed font-medium cursor-pointer hover:text-cyan-300 transition-colors"
            >
              {editableFields.objective || brief.objective}
            </p>
          )}
        </div>

        {/* Platform & Target Users Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isEditing 
              ? isDark ? 'bg-slate-900 border-cyan-500/50 ring-1 ring-cyan-500/30' : 'bg-sky-50 border-sky-400 ring-1 ring-sky-300'
              : isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">{ui.platform}</span>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-slate-400 hover:text-cyan-400 p-0.5 rounded cursor-pointer transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              )}
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editableFields.platform}
                onChange={(e) => handleFieldChange('platform', e.target.value)}
                className={`w-full px-3 py-1.5 rounded-xl text-xs font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  isDark ? 'bg-slate-950 border-cyan-500/40 text-sky-400' : 'bg-white border-sky-300 text-sky-700'
                }`}
                placeholder={ui.platform}
              />
            ) : (
              <span 
                onClick={() => setIsEditing(true)}
                className="font-extrabold text-xs text-sky-400 block cursor-pointer hover:underline transition-all"
              >
                {editableFields.platform || brief.platform}
              </span>
            )}
          </div>

          <div className={`p-3.5 rounded-2xl border transition-all ${
            isEditing 
              ? isDark ? 'bg-slate-900 border-cyan-500/50 ring-1 ring-cyan-500/30' : 'bg-sky-50 border-sky-400 ring-1 ring-sky-300'
              : isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-sky-50/70 border-sky-100'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">{ui.targetUsers}</span>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-slate-400 hover:text-cyan-400 p-0.5 rounded cursor-pointer transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              )}
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editableFields.target_users}
                onChange={(e) => handleFieldChange('target_users', e.target.value)}
                className={`w-full px-3 py-1.5 rounded-xl text-xs font-medium border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  isDark ? 'bg-slate-950 border-cyan-500/40 text-white' : 'bg-white border-sky-300 text-slate-900'
                }`}
                placeholder={ui.targetUsers}
              />
            ) : (
              <span 
                onClick={() => setIsEditing(true)}
                className="font-medium text-xs block cursor-pointer hover:text-cyan-300 transition-colors"
              >
                {editableFields.target_users || brief.target_users}
              </span>
            )}
          </div>
        </div>

        {/* Interactive Checklist Notice Banner */}
        <div className={`px-4 py-2.5 rounded-2xl border flex items-center gap-2 text-xs font-semibold ${
          isDark 
            ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-300' 
            : 'bg-sky-50 border-sky-200 text-sky-800'
        }`}>
          <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{ui.hint}</span>
        </div>

        {/* Core Features Interactive Checklist */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">
                {ui.coreTitle}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                isDark ? 'bg-slate-950 border-cyan-400/30 text-cyan-300' : 'bg-sky-100 border-sky-300 text-sky-800'
              }`}>
                {selectedCoreFeatures.length} / {coreFeaturesList.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddCore(!showAddCore)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1 transition-all cursor-pointer ${
                  showAddCore
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : isDark
                      ? 'bg-slate-950/80 hover:bg-slate-900 text-cyan-300 border-cyan-500/30 hover:border-cyan-400'
                      : 'bg-white hover:bg-sky-50 text-sky-700 border-sky-300 hover:border-sky-400'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{ui.addCoreFeature}</span>
              </button>

              {coreFeaturesList.length > 0 && (
                <button
                  type="button"
                  onClick={toggleAllCore}
                  className={`text-[11px] font-semibold underline hover:opacity-80 transition-opacity cursor-pointer ${
                    isDark ? 'text-cyan-400' : 'text-sky-600'
                  }`}
                >
                  {selectedCoreFeatures.length === coreFeaturesList.length ? ui.deselectAll : ui.selectAll}
                </button>
              )}
            </div>
          </div>

          {/* Inline Add Core Feature Form */}
          {showAddCore && (
            <form onSubmit={handleAddCoreFeature} className="flex items-center gap-2 mb-3 p-2.5 rounded-xl border border-dashed border-cyan-400/60 bg-cyan-950/20 animate-fadeIn">
              <input
                type="text"
                autoFocus
                value={newCoreInput}
                onChange={(e) => setNewCoreInput(e.target.value)}
                placeholder={ui.addPlaceholder}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-sky-300 text-slate-900'
                }`}
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer transition-colors"
              >
                {ui.addButton}
              </button>
              <button
                type="button"
                onClick={() => { setShowAddCore(false); setNewCoreInput(''); }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {coreFeaturesList.map((feat, idx) => {
              const isSelected = selectedCoreFeatures.includes(feat);
              return (
                <div
                  key={idx}
                  onClick={() => toggleCoreFeature(feat)}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all duration-200 cursor-pointer group/feat ${
                    isSelected
                      ? isDark
                        ? 'bg-cyan-950/40 border-cyan-400/60 text-slate-100 shadow-md shadow-cyan-950/40'
                        : 'bg-sky-50 border-sky-400 text-slate-900 shadow-xs'
                      : isDark
                        ? 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700 opacity-60'
                        : 'bg-slate-50/80 border-slate-200 text-slate-400 hover:border-slate-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky-400 to-cyan-400 border-cyan-300 text-slate-950 shadow-xs'
                        : isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3] text-slate-950" />}
                    </div>
                    <span className={`text-xs font-semibold leading-relaxed truncate ${isSelected ? '' : 'line-through'}`}>
                      {feat}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                      isSelected
                        ? isDark ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40' : 'bg-sky-100 text-sky-800 border-sky-300'
                        : 'bg-slate-800/40 text-slate-500 border-slate-700'
                    }`}>
                      {isSelected ? ui.included : ui.excluded}
                    </span>

                    {isEditing && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteCoreFeature(feat, e)}
                        className="p-1 rounded-md text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
                        title={ui.deleteTooltip}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admin Dashboard Features Interactive Checklist */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">
                {ui.adminTitle}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                isDark ? 'bg-slate-950 border-cyan-400/30 text-cyan-300' : 'bg-sky-100 border-sky-300 text-sky-800'
              }`}>
                {selectedAdminFeatures.length} / {adminFeaturesList.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddAdmin(!showAddAdmin)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1 transition-all cursor-pointer ${
                  showAddAdmin
                    ? 'bg-sky-500 text-slate-950 border-sky-400'
                    : isDark
                      ? 'bg-slate-950/80 hover:bg-slate-900 text-sky-300 border-sky-500/30 hover:border-sky-400'
                      : 'bg-white hover:bg-sky-50 text-sky-700 border-sky-300 hover:border-sky-400'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{ui.addAdminFeature}</span>
              </button>

              {adminFeaturesList.length > 0 && (
                <button
                  type="button"
                  onClick={toggleAllAdmin}
                  className={`text-[11px] font-semibold underline hover:opacity-80 transition-opacity cursor-pointer ${
                    isDark ? 'text-cyan-400' : 'text-sky-600'
                  }`}
                >
                  {selectedAdminFeatures.length === adminFeaturesList.length ? ui.deselectAll : ui.selectAll}
                </button>
              )}
            </div>
          </div>

          {/* Inline Add Admin Feature Form */}
          {showAddAdmin && (
            <form onSubmit={handleAddAdminFeature} className="flex items-center gap-2 mb-3 p-2.5 rounded-xl border border-dashed border-sky-400/60 bg-sky-950/20 animate-fadeIn">
              <input
                type="text"
                autoFocus
                value={newAdminInput}
                onChange={(e) => setNewAdminInput(e.target.value)}
                placeholder={ui.addPlaceholder}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs border transition-all focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-sky-300 text-slate-900'
                }`}
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 cursor-pointer transition-colors"
              >
                {ui.addButton}
              </button>
              <button
                type="button"
                onClick={() => { setShowAddAdmin(false); setNewAdminInput(''); }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          )}

          {adminFeaturesList.length === 0 ? (
            <div className={`p-4 rounded-xl border border-dashed text-center text-xs ${
              isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
            }`}>
              <span>{ui.noAdminFeatures}</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {adminFeaturesList.map((feat, idx) => {
                const isSelected = selectedAdminFeatures.includes(feat);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleAdminFeature(feat)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all duration-200 cursor-pointer group/feat ${
                      isSelected
                        ? isDark
                          ? 'bg-sky-950/40 border-sky-400/60 text-slate-100 shadow-md shadow-sky-950/40'
                          : 'bg-sky-50 border-sky-400 text-slate-900 shadow-xs'
                        : isDark
                          ? 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700 opacity-60'
                          : 'bg-slate-50/80 border-slate-200 text-slate-400 hover:border-slate-300 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-sky-400 to-blue-500 border-sky-300 text-slate-950 shadow-xs'
                          : isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3] text-slate-950" />}
                      </div>
                      <span className={`text-xs font-semibold leading-relaxed truncate ${isSelected ? '' : 'line-through'}`}>
                        {feat}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                        isSelected
                          ? isDark ? 'bg-sky-400/20 text-sky-300 border-sky-400/40' : 'bg-sky-100 text-sky-800 border-sky-300'
                          : 'bg-slate-800/40 text-slate-500 border-slate-700'
                      }`}>
                        {isSelected ? ui.included : ui.excluded}
                      </span>

                      {isEditing && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteAdminFeature(feat, e)}
                          className="p-1 rounded-md text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
                          title={ui.deleteTooltip}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Technical Recommendation & Interactive Architecture / Integrations */}
        <div className={`p-4 rounded-2xl border transition-all ${
          isEditing 
            ? isDark ? 'bg-slate-900 border-cyan-400/50 ring-1 ring-cyan-500/30' : 'bg-sky-50 border-sky-400' 
            : isDark ? 'bg-sky-950/40 border-cyan-400/30' : 'bg-sky-50 border-sky-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-400">
              <Cpu className="w-4 h-4" />
              <span>{ui.techTitle}</span>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-slate-400 hover:text-cyan-400 p-0.5 rounded cursor-pointer transition-colors"
                title="Edit Arsitektur"
              >
                <Pencil className="w-3 h-3" />
              </button>
            )}
          </div>

          {isEditing ? (
            <textarea
              rows={2}
              value={editableFields.technical_recommendation}
              onChange={(e) => handleFieldChange('technical_recommendation', e.target.value)}
              className={`w-full px-3 py-1.5 rounded-xl text-xs font-medium border leading-relaxed resize-none mb-3 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                isDark ? 'bg-slate-950 border-cyan-500/40 text-white' : 'bg-white border-sky-300 text-slate-900'
              }`}
              placeholder="Deskripsi arsitektur teknis..."
            />
          ) : (
            <p 
              onClick={() => setIsEditing(true)}
              className="text-xs leading-relaxed font-semibold mb-3 cursor-pointer hover:text-cyan-300 transition-colors"
            >
              {editableFields.technical_recommendation || brief.technical_recommendation}
            </p>
          )}
          
          {/* Integrations Tags & Add Integration Inline Form */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-800/40">
            {integrationsList.map((tech, idx) => {
              const isSelected = selectedIntegrations.includes(tech);
              return (
                <div
                  key={idx}
                  onClick={() => toggleIntegration(tech)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? isDark
                        ? 'bg-slate-900 text-cyan-300 border-cyan-400/60 shadow-xs'
                        : 'bg-white text-sky-800 border-sky-400 shadow-xs'
                      : isDark
                        ? 'bg-slate-950/60 text-slate-500 border-slate-800 line-through'
                        : 'bg-slate-100 text-slate-400 border-slate-300 line-through'
                  }`}
                  title={isSelected ? 'Klik untuk membatalkan' : 'Klik untuk menyertakan'}
                >
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                  <span>{tech}</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteIntegration(tech, e)}
                      className="ml-1 text-slate-400 hover:text-red-400 transition-colors"
                      title="Hapus teknologi ini"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Add Integration Tag Trigger / Form */}
            {showAddIntegration ? (
              <form onSubmit={handleAddIntegration} className="inline-flex items-center gap-1 animate-fadeIn">
                <input
                  type="text"
                  autoFocus
                  value={newIntegrationInput}
                  onChange={(e) => setNewIntegrationInput(e.target.value)}
                  placeholder={ui.addTechPlaceholder}
                  className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono border transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                    isDark ? 'bg-slate-950 border-cyan-500/50 text-white' : 'bg-white border-sky-300 text-slate-900'
                  }`}
                />
                <button
                  type="submit"
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer"
                >
                  {ui.addButton}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddIntegration(false); setNewIntegrationInput(''); }}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddIntegration(true)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold border border-dashed transition-all cursor-pointer flex items-center gap-1 ${
                  isDark
                    ? 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/50'
                    : 'border-sky-400 text-sky-700 hover:bg-sky-100'
                }`}
              >
                <Plus className="w-3 h-3" />
                <span>{ui.addIntegration}</span>
              </button>
            )}
          </div>
        </div>

        {/* Open Questions */}
        {(brief.open_questions || []).length > 0 && (
          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-amber-950/30 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1 mb-1">
              <HelpCircle className="w-3.5 h-3.5" /> Items to Clarify during Tech Review
            </span>
            <ul className="space-y-1 pl-4 list-disc text-xs text-slate-300">
              {brief.open_questions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Action CTA Buttons */}
      <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          icon={Download}
          className={isDark ? 'bg-slate-950 text-cyan-300 border-slate-800 hover:border-cyan-400' : 'bg-white text-slate-700 border-sky-200'}
          onClick={handleDownloadBrief}
        >
          {downloaded ? ui.downloadReady : ui.downloadAction}
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Send}
            className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30 cursor-pointer"
            onClick={handleWhatsAppExport}
          >
            {ui.waAction}
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Sparkles}
            className="bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20 cursor-pointer"
            onClick={() => onSubmitLead(getCustomizedBrief())}
          >
            {ui.submitAction}
          </Button>
        </div>
      </div>

    </div>
  );
};
