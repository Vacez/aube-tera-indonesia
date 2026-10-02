/**
|--------------------------------------------------------------------------
| DATA TAHAPAN ALUR KERJA (DEVELOPMENT PROCESS)
|--------------------------------------------------------------------------
*/

export const getProcessStepsData = (lang = 'id') => {
  const steps = {
    id: [
      {
        step: "01",
        title: "Diskusi & Analisis",
        desc: "Menganalisis kebutuhan bisnis, menentukan skop proyek, dan menyusun spesifikasi awal.",
        icon: "MessageSquare",
        details: "Sesi konseling awal tanpa biaya untuk merumuskan ekspektasi dan requirement awal sistem."
      },
      {
        step: "02",
        title: "Perancangan UI/UX",
        desc: "Merancang wireframe, tata letak, dan prototipe interaktif untuk pengalaman pengguna terbaik.",
        icon: "FileSearch",
        details: "Menyusun Product Requirement Document (PRD) dan roadmap timeline eksekusi yang transparan."
      },
      {
        step: "03",
        title: "Pengembangan Kode",
        desc: "Proses koding sistem frontend & backend mengacu pada clean code dan keamanan.",
        icon: "Figma",
        details: "Pembuatan prototype interaktif Figma agar Anda dapat merasakan alur aplikasi sebelum coding."
      },
      {
        step: "04",
        title: "Pengujian Kualitas",
        desc: "Uji coba komprehensif (QA & Testing) untuk memastikan bebas dari bug dan responsif.",
        icon: "Code",
        details: "Proses rekayasa perangkat lunak dengan metode Agile dan laporan progres rutin."
      },
      {
        step: "05",
        title: "Deployment & Release",
        desc: "Peluncuran aplikasi ke server cloud, App Store, atau Play Store secara mulus.",
        icon: "CheckCircle2",
        details: "User Acceptance Testing (UAT) dan pengujian beban (load testing) untuk jaminan kualitas."
      },
      {
        step: "06",
        title: "Perawatan & Support",
        desc: "Pemeliharaan berkala, optimasi performa, serta garansi dukungan teknis.",
        icon: "Rocket",
        details: "Konfigurasi SSL, domain, server cloud, dan pendampingan serah terima sistem."
      }
    ],

    en: [
      {
        step: "01",
        title: "Discovery & Analysis",
        desc: "Analyzing business requirements, defining scope, and creating project blueprints.",
        icon: "MessageSquare",
        details: "Free initial discovery session to outline requirements and architecture expectations."
      },
      {
        step: "02",
        title: "UI/UX Architecture",
        desc: "Designing wireframes, interactive prototypes, and modern interfaces.",
        icon: "FileSearch",
        details: "Creating detailed Product Requirement Documents (PRD) and transparent execution roadmaps."
      },
      {
        step: "03",
        title: "Code Development",
        desc: "Writing clean, scalable code following strict architecture standards.",
        icon: "Figma",
        details: "Figma interactive prototyping allowing you to experience user flows before engineering."
      },
      {
        step: "04",
        title: "Quality Assurance",
        desc: "Rigorous QA testing for bug-free, cross-device responsiveness.",
        icon: "Code",
        details: "Agile development sprints paired with transparent bi-weekly progress demonstrations."
      },
      {
        step: "05",
        title: "Deployment & Launch",
        desc: "Seamless launch to cloud servers, App Store, or Google Play Store.",
        icon: "CheckCircle2",
        details: "User Acceptance Testing (UAT) and load stress testing guaranteeing maximum stability."
      },
      {
        step: "06",
        title: "Maintenance & SLA",
        desc: "Post-launch updates, performance optimization, and SLA monitoring.",
        icon: "Rocket",
        details: "Domain, SSL, cloud server configuration, and comprehensive post-release handoff."
      }
    ],

    vi: [
      {
        step: "01",
        title: "Khảo sát & Phân tích",
        desc: "Phân tích yêu cầu kinh doanh, xác định phạm vi và lập kế hoạch chi tiết.",
        icon: "MessageSquare",
        details: "Tư vấn miễn phí ban đầu để thống nhất mục tiêu và kiến trúc phần mềm."
      },
      {
        step: "02",
        title: "Thiết kế UI/UX",
        desc: "Xây dựng sơ đồ và mẫu thử tương tác hiện đại.",
        icon: "FileSearch",
        details: "Lập Tài liệu Yêu cầu Sản phẩm (PRD) và lộ trình triển khai minh bạch."
      },
      {
        step: "03",
        title: "Lập trình Mã nguồn",
        desc: "Viết code chuẩn hóa, tối ưu hiệu suất và bảo mật.",
        icon: "Figma",
        details: "Tạo mẫu thử Figma tương tác giúp bạn trải nghiệm trước khi lập trình."
      },
      {
        step: "04",
        title: "Kiểm thử Chất lượng",
        desc: "Kiểm tra kỹ lưỡng đảm bảo không có lỗi phát sinh.",
        icon: "Code",
        details: "Phát triển theo mô hình Agile cùng các báo cáo tiến độ định kỳ."
      },
      {
        step: "05",
        title: "Triển khai & Phát hành",
        desc: "Đưa ứng dụng lên máy chủ cloud hoặc kho ứng dụng.",
        icon: "CheckCircle2",
        details: "Kiểm thử chấp nhận của người dùng (UAT) và kiểm tra chịu tải."
      },
      {
        step: "06",
        title: "Bảo trì & Hỗ trợ",
        desc: "Bảo trì định kỳ và hỗ trợ kỹ thuật lâu dài.",
        icon: "Rocket",
        details: "Cấu hình tên miền, SSL, máy chủ đám mây và bàn giao toàn diện."
      }
    ],

    ja: [
      {
        step: "01",
        title: "ヒアリング・要件定義",
        desc: "ビジネス課題を分析し、要件と設計図を策定します。",
        icon: "MessageSquare",
        details: "無料の初期ヒアリングを行い、システム仕様と要件を明確にします。"
      },
      {
        step: "02",
        title: "UI/UXデザイン",
        desc: "ワイヤーフレームとインタラクティブプロトタイプを制作。",
        icon: "FileSearch",
        details: "製品要件定義書 (PRD) と透明性の高い開発ロードマップを作成します。"
      },
      {
        step: "03",
        title: "システム開発",
        desc: "クリーンコードとセキュリティを重視したコーディング。",
        icon: "Figma",
        details: "開発前にアプリの操作感を体験できるFigmaプロトタイプを制作。"
      },
      {
        step: "04",
        title: "品質テスト (QA)",
        desc: "徹底的なテストでバグを排除し応答性を確保。",
        icon: "Code",
        details: "アジャイル開発手法と定期的な進捗デモレポートによる確実な進行。"
      },
      {
        step: "05",
        title: "納品・リリース",
        desc: "クラウドサーバーやアプリストアへのスムーズなリリース。",
        icon: "CheckCircle2",
        details: "受入テスト (UAT) および負荷テストを実施し高い安定性を保証。"
      },
      {
        step: "06",
        title: "保守・運用サポート",
        desc: "定期メンテナンスと迅速なカスタマーサポート。",
        icon: "Rocket",
        details: "ドメイン・SSL・クラウド構築、および手厚い引き継ぎサポート。"
      }
    ]
  };

  return steps[lang] || steps['id'];
};

export const PROCESS_STEPS = getProcessStepsData('id');
