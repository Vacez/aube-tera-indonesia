export const getServicesData = (lang = 'id') => {
  const data = {
    id: [
      {
        id: "website-development",
        title: "Website Development",
        shortDesc: "Pembuatan website profesional untuk Company Profile, Landing Page, E-Commerce, dan Portal Korporat.",
        fullDesc: "Kami merancang dan mengembangkan website yang cepat, aman, SEO-friendly, dan memiliki tampilan visual premium yang meninggalkan kesan kuat bagi pengunjung Anda.",
        icon: "Globe",
        tag: "Popular",
        items: ["Company Profile Interaktif", "Landing Page Konversi Tinggi", "E-Commerce & Toko Online", "Corporate Web Portal"],
        techUsed: ["React", "Next.js", "Tailwind CSS", "Vite", "WordPress/Headless"],
        benefits: ["Desain Responsive Multi-device", "Optimasi Kecepatan & SEO", "CMS Mudah Digunakan", "Keamanan SSL & Proteksi DDoS"]
      },
      {
        id: "mobile-app-development",
        title: "Mobile App Development",
        shortDesc: "Pengembangan aplikasi smartphone Android & iOS yang intuitif, cepat, dan kaya fitur.",
        fullDesc: "Solusi aplikasi mobile native & cross-platform yang dirancang khusus untuk memberikan kenyamanan pengguna dan stabilitas performa maksimal.",
        icon: "Smartphone",
        tag: "High Demand",
        items: ["Aplikasi Android (Play Store)", "Aplikasi iOS (App Store)", "Cross-Platform (Flutter / React Native)", "Push Notification & GPS Integration"],
        techUsed: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase"],
        benefits: ["UI/UX Mobile Native", "Performa Ringan & Cepat", "Offline Mode Support", "Integrasi Payment Gateway"]
      },
      {
        id: "web-application",
        title: "Web Application",
        shortDesc: "Sistem aplikasi web kompleks seperti Admin Dashboard, SaaS, dan Internal Business Tools.",
        fullDesc: "Membangun sistem berbasis web untuk mengelola workflow bisnis, memproses data skala besar, dan mempermudah operasional tim harian Anda.",
        icon: "LayoutDashboard",
        tag: "Enterprise",
        items: ["Dashboard Analytical & Reporting", "Software as a Service (SaaS)", "Internal Operational System", "Business Management Portal"],
        techUsed: ["React", "Vue", "Node.js", "Laravel", "PostgreSQL"],
        benefits: ["Skalabilitas Tinggi", "Multi-role Authentication", "Real-time Analytics", "Rest API Standardized"]
      },
      {
        id: "custom-software",
        title: "Custom Software Development",
        shortDesc: "Pengembangan software custom tailored-fit sesuai alur proses bisnis unik organisasi Anda.",
        fullDesc: "Setiap bisnis memiliki proses yang unik. Kami membuat sistem dari nol yang dirancang khusus mengikuti spesifikasi dan kebutuhan operasional perusahaan Anda.",
        icon: "Code2",
        tag: "Tailored",
        items: ["Sistem Sesuai Kebutuhan Bisnis", "Automasi Workflow & Dokumen", "Integrasi System API & Third-party", "Legacy Code Refactoring"],
        techUsed: ["Node.js", "Python", "Golang", "Laravel", "Docker"],
        benefits: ["100% Sesuai Alur Bisnis", "Kepemilikan Source Code", "Fleksibilitas Pengubahan Modul", "Integrasi Tanpa Hambatan"]
      },
      {
        id: "ui-ux-design",
        title: "UI/UX Design & Prototyping",
        shortDesc: "Riset pengguna, wireframing, UI visual design, dan interactive prototyping modern.",
        fullDesc: "Kami menggabungkan estetika visual kelas atas dengan analisis psikologi pengguna untuk menghasilkan antarmuka aplikasi yang estetik dan mudah digunakan.",
        icon: "Palette",
        tag: "Design Focus",
        items: ["User Research & Personas", "Wireframing & Architecture", "Interactive High-Fidelity Prototype", "Design System & Styleguide"],
        techUsed: ["Figma", "Adobe XD", "Framer", "Protopie"],
        benefits: ["User-Centered Interface", "Mengurangi Churn Rate", "Meningkatkan User Engagement", "Siap Diserahterimakan ke Developer"]
      },
      {
        id: "business-information-system",
        title: "Business Information System",
        shortDesc: "Sistem informasi terpadu: ERP, CRM, Inventory, Keuangan, HR, dan Sistem Sekolah/Instansi.",
        fullDesc: "Solusi terpusat untuk mengelola seluruh sumber daya perusahaan, stok barang, manajemen keuangan, SDM, hingga sistem pendidikan terintegrasi.",
        icon: "Database",
        tag: "Management",
        items: ["Enterprise Resource Planning (ERP)", "Customer Relationship Management (CRM)", "Inventory & Supply Chain System", "Sistem Informasi Sekolah & Akademik"],
        techUsed: ["Laravel", "Node.js", "PostgreSQL", "MySQL", "Redis"],
        benefits: ["Data Terintegrasi Satu Pintu", "Laporan Keuangan Otomatis", "Manajemen Hak Akses", "Keamanan Data Terjamin"]
      },
      {
        id: "system-maintenance",
        title: "System Maintenance & Support",
        shortDesc: "Layanan pemeliharaan, bug fixing, optimasi kecepatan, monitoring, dan pengamanan sistem.",
        fullDesc: "Menjaga aplikasi dan website Anda tetap beroperasi 24/7 tanpa duka downtime, terlindungi dari ancaman siber, dan siap diperbarui seiring waktu.",
        icon: "ShieldCheck",
        tag: "Reliable",
        items: ["Bug Fixing & Code Audit", "Server & Database Optimization", "Security Patch & Backup Routine", "Regular Feature Development"],
        techUsed: ["Docker", "Linux", "AWS/Vercel", "Monitoring Tools", "Git"],
        benefits: ["Garansi SLA & Response Time", "Pencegahan Server Down", "Pembersihan Vulnerability", "Laporan Maintenance Berkala"]
      },
      {
        id: "ai-development",
        title: "AI Development & Integration",
        shortDesc: "Pengembangan & integrasi solusi AI, Chatbot Cerdas, Machine Learning, dan LLM/Gemini API.",
        fullDesc: "Kami mengintegrasikan kecerdasan buatan (Artificial Intelligence) ke dalam sistem bisnis Anda untuk otomatisasi proses, analisis prediksi, dan layanan pelanggan 24/7.",
        icon: "Bot",
        tag: "Featured AI",
        items: ["Chatbot & Digital Assistant AI", "Integrasi Gemini / OpenAI API", "Machine Learning & Predictive Analysis", "Automasi Proses Bisnis Cerdas"],
        techUsed: ["Python", "TensorFlow / PyTorch", "Gemini 1.5/3.8 Flash", "LangChain", "FastAPI"],
        benefits: ["Efisiensi Respons Pelanggan 24/7", "Otomatisasi Analisis Data Kompleks", "Penghematan Biaya Operasional", "Personalisasi Pengalaman Pengguna"]
      },
      {
        id: "digital-consulting",
        title: "Digital Consulting & Strategy",
        shortDesc: "Konsultasi strategi digitalisasi bisnis, otomatisasi alur kerja, dan modernisasi infrastruktur.",
        fullDesc: "Membantu perusahaan bertransisi dari proses manual/paper-based menuju ekosistem digital yang efisien, cepat, dan transparan.",
        icon: "Cpu",
        tag: "Strategic",
        items: ["Digitalization Audit & Roadmap", "Workflow & Automation Planning", "Cloud Infrastructure Migration", "Team Digital Upskilling"],
        techUsed: ["Cloud Services", "Automation Tools", "Microservices", "REST APIs"],
        benefits: ["Efisiensi Biaya Operasional", "Kecepatan Pengambilan Keputusan", "Skalabilitas Bisnis Masa Depan", "Keunggulan Kompetitif"]
      }
    ],

    en: [
      {
        id: "website-development",
        title: "Website Development",
        shortDesc: "Professional website development for Company Profiles, Landing Pages, E-Commerce, and Corporate Portals.",
        fullDesc: "We design and develop fast, secure, SEO-friendly websites with premium visuals that leave a lasting impression on your visitors.",
        icon: "Globe",
        tag: "Popular",
        items: ["Interactive Company Profile", "High-Conversion Landing Page", "E-Commerce & Online Store", "Corporate Web Portal"],
        techUsed: ["React", "Next.js", "Tailwind CSS", "Vite", "WordPress/Headless"],
        benefits: ["Responsive Multi-device Design", "Speed & SEO Optimization", "Easy-to-use CMS", "SSL Security & DDoS Protection"]
      },
      {
        id: "mobile-app-development",
        title: "Mobile App Development",
        shortDesc: "Intuitive, fast, and feature-rich Android & iOS smartphone application development.",
        fullDesc: "Native & cross-platform mobile app solutions tailored for maximum user comfort and performance stability.",
        icon: "Smartphone",
        tag: "High Demand",
        items: ["Android Application (Play Store)", "iOS Application (App Store)", "Cross-Platform (Flutter / React Native)", "Push Notification & GPS Integration"],
        techUsed: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase"],
        benefits: ["Native Mobile UI/UX", "Lightweight & Fast Performance", "Offline Mode Support", "Payment Gateway Integration"]
      },
      {
        id: "web-application",
        title: "Web Application",
        shortDesc: "Complex web application systems such as Admin Dashboards, SaaS, and Internal Business Tools.",
        fullDesc: "Building web-based systems to manage business workflows, process large-scale data, and streamline daily team operations.",
        icon: "LayoutDashboard",
        tag: "Enterprise",
        items: ["Analytical & Reporting Dashboard", "Software as a Service (SaaS)", "Internal Operational System", "Business Management Portal"],
        techUsed: ["React", "Vue", "Node.js", "Laravel", "PostgreSQL"],
        benefits: ["High Scalability", "Multi-role Authentication", "Real-time Analytics", "Standardized REST API"]
      },
      {
        id: "custom-software",
        title: "Custom Software Development",
        shortDesc: "Tailored-fit custom software development aligned with your organization's unique business processes.",
        fullDesc: "Every business has unique processes. We engineer custom software from scratch following your company's specific requirements.",
        icon: "Code2",
        tag: "Tailored",
        items: ["Custom Business Logic Systems", "Workflow & Document Automation", "API & Third-party Integrations", "Legacy Code Refactoring"],
        techUsed: ["Node.js", "Python", "Golang", "Laravel", "Docker"],
        benefits: ["100% Fit to Business Logic", "Full Source Code Ownership", "Flexible Module Scaling", "Seamless API Integrations"]
      },
      {
        id: "ui-ux-design",
        title: "UI/UX Design & Prototyping",
        shortDesc: "User research, wireframing, visual UI design, and modern interactive prototyping.",
        fullDesc: "We blend top-class visual aesthetics with user psychology analysis to produce intuitive and beautiful app interfaces.",
        icon: "Palette",
        tag: "Design Focus",
        items: ["User Research & Personas", "Wireframing & Architecture", "Interactive High-Fidelity Prototypes", "Design System & Styleguide"],
        techUsed: ["Figma", "Adobe XD", "Framer", "Protopie"],
        benefits: ["User-Centered Interface", "Reduced Churn Rate", "Enhanced User Engagement", "Developer Handover Ready"]
      },
      {
        id: "business-information-system",
        title: "Business Information System",
        shortDesc: "Integrated information systems: ERP, CRM, Inventory, Finance, HR, and School Systems.",
        fullDesc: "Centralized solutions to manage all enterprise resources, inventory, financial tracking, HR, and education systems.",
        icon: "Database",
        tag: "Management",
        items: ["Enterprise Resource Planning (ERP)", "Customer Relationship Management (CRM)", "Inventory & Supply Chain System", "Academic & School Information System"],
        techUsed: ["Laravel", "Node.js", "PostgreSQL", "MySQL", "Redis"],
        benefits: ["Unified Centralized Data", "Automated Financial Reporting", "Role-Based Access Control", "Guaranteed Data Security"]
      },
      {
        id: "system-maintenance",
        title: "System Maintenance & Support",
        shortDesc: "Maintenance, bug fixing, speed optimization, monitoring, and security patch services.",
        fullDesc: "Keeping your applications and websites operating 24/7 with zero unexpected downtime and protected against cyber threats.",
        icon: "ShieldCheck",
        tag: "Reliable",
        items: ["Bug Fixing & Code Audit", "Server & Database Optimization", "Security Patch & Routine Backup", "Regular Feature Enhancements"],
        techUsed: ["Docker", "Linux", "AWS/Vercel", "Monitoring Tools", "Git"],
        benefits: ["SLA & Quick Response Guarantee", "Server Down Prevention", "Vulnerability Cleanup", "Periodic Maintenance Reports"]
      },
      {
        id: "ai-development",
        title: "AI Development & Integration",
        shortDesc: "Development & integration of AI solutions, Smart Chatbots, Machine Learning, and LLM/Gemini APIs.",
        fullDesc: "We embed Artificial Intelligence into your business systems for workflow automation, predictive analytics, and 24/7 automated customer support.",
        icon: "Bot",
        tag: "Featured AI",
        items: ["AI Chatbots & Digital Assistants", "Gemini / OpenAI API Integration", "Machine Learning & Predictive Analytics", "Intelligent Process Automation"],
        techUsed: ["Python", "TensorFlow / PyTorch", "Gemini 1.5/3.8 Flash", "LangChain", "FastAPI"],
        benefits: ["24/7 Instant Customer Support", "Automated Complex Data Processing", "Reduced Operational Overhead", "Hyper-personalized User Experiences"]
      },
      {
        id: "digital-consulting",
        title: "Digital Consulting & Strategy",
        shortDesc: "Strategic guidance for business digitalization, workflow automation, and cloud infrastructure.",
        fullDesc: "Helping companies transition from paper-based manual workflows into an efficient, fast, and transparent digital ecosystem.",
        icon: "Cpu",
        tag: "Strategic",
        items: ["Digitalization Audit & Roadmap", "Workflow & Automation Planning", "Cloud Infrastructure Migration", "Team Digital Upskilling"],
        techUsed: ["Cloud Services", "Automation Tools", "Microservices", "REST APIs"],
        benefits: ["Operational Cost Efficiency", "Faster Decision Making", "Future Business Scalability", "Competitive Edge"]
      }
    ],

    vi: [
      {
        id: "website-development",
        title: "Phát triển Website",
        shortDesc: "Xây dựng website chuyên nghiệp cho Hồ sơ Công ty, Trang đích, Thương mại Điện tử và Cổng thông tin.",
        fullDesc: "Chúng tôi thiết kế và phát triển các website nhanh chóng, an toàn, chuẩn SEO với giao diện sang trọng và thu hút.",
        icon: "Globe",
        tag: "Phổ biến",
        items: ["Hồ sơ Công ty Tương tác", "Trang đích Tỷ lệ Chuyển đổi cao", "Thương mại Điện tử & Cửa hàng Online", "Cổng thông tin Doanh nghiệp"],
        techUsed: ["React", "Next.js", "Tailwind CSS", "Vite", "WordPress/Headless"],
        benefits: ["Thiết kế Tương thích Đa thiết bị", "Tối ưu hóa Tốc độ & SEO", "CMS Dễ dàng Sử dụng", "Bảo mật SSL & Chống DDoS"]
      },
      {
        id: "mobile-app-development",
        title: "Phát triển Ứng dụng Di động",
        shortDesc: "Phát triển ứng dụng Android & iOS trực quan, nhanh chóng và giàu tính năng.",
        fullDesc: "Giải pháp ứng dụng di động native & cross-platform được thiết kế tối ưu mang lại sự thoải mái cho người dùng và hiệu suất ổn định.",
        icon: "Smartphone",
        tag: "Nhu cầu cao",
        items: ["Ứng dụng Android (Play Store)", "Ứng dụng iOS (App Store)", "Cross-Platform (Flutter / React Native)", "Thông báo Đẩy & Tích hợp GPS"],
        techUsed: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase"],
        benefits: ["UI/UX Di động Native", "Hiệu suất Nhẹ & Nhanh", "Hỗ trợ Chế độ Offline", "Tích hợp Cổng Thanh toán"]
      },
      {
        id: "web-application",
        title: "Ứng dụng Web",
        shortDesc: "Hệ thống ứng dụng web phức tạp như Bảng điều khiển Quản trị, SaaS và Công cụ Nội bộ.",
        fullDesc: "Xây dựng hệ thống ứng dụng web quản lý quy trình làm việc, xử lý dữ liệu lớn và tối ưu vận hành nhóm.",
        icon: "LayoutDashboard",
        tag: "Doanh nghiệp",
        items: ["Bảng điều khiển Báo cáo & Phân tích", "Phần mềm dạng Dịch vụ (SaaS)", "Hệ thống Vận hành Nội bộ", "Cổng Quản lý Doanh nghiệp"],
        techUsed: ["React", "Vue", "Node.js", "Laravel", "PostgreSQL"],
        benefits: ["Khả năng Mở rộng Cao", "Xác thực Đa vai trò", "Phân tích Thời gian thực", "Chuẩn hóa REST API"]
      },
      {
        id: "custom-software",
        title: "Phát triển Phần mềm Theo yêu cầu",
        shortDesc: "Phát triển phần mềm tùy chỉnh phù hợp với quy trình kinh doanh độc đáo của tổ chức bạn.",
        fullDesc: "Mỗi doanh nghiệp có quy trình riêng. Chúng tôi phát triển hệ thống từ đầu theo đúng yêu cầu và mục tiêu của bạn.",
        icon: "Code2",
        tag: "Tùy chỉnh",
        items: ["Hệ thống Theo Yêu cầu Kinh doanh", "Tự động hóa Quy trình & Tài liệu", "Tích hợp API & Bên thứ ba", "Nâng cấp Mã nguồn Cũ"],
        techUsed: ["Node.js", "Python", "Golang", "Laravel", "Docker"],
        benefits: ["100% Phù hợp Quy trình", "Sở hữu Toàn bộ Mã nguồn", "Linh hoạt Mở rộng Mô-đun", "Tích hợp Không rào cản"]
      },
      {
        id: "ui-ux-design",
        title: "Thiết kế UI/UX & Mẫu thử",
        shortDesc: "Nghiên cứu người dùng, tạo wireframe, thiết kế giao diện đồ họa và mẫu thử tương tác.",
        fullDesc: "Chúng tôi kết hợp thẩm mỹ thị giác đẳng cấp với phân tích tâm lý người dùng để tạo giao diện ứng dụng đẹp mắt, dễ sử dụng.",
        icon: "Palette",
        tag: "Trọng tâm Thiết kế",
        items: ["Nghiên cứu Người dùng & Chân dung", "Tạo Wireframe & Kiến trúc", "Mẫu thử Tương tác Chất lượng cao", "Hệ thống Thiết kế & Styleguide"],
        techUsed: ["Figma", "Adobe XD", "Framer", "Protopie"],
        benefits: ["Giao diện Lấy Người dùng làm Trọng tâm", "Giảm Tỷ lệ Rời bỏ", "Tăng Tương tác Người dùng", "Sẵn sàng Bàn giao Lập trình"]
      },
      {
        id: "business-information-system",
        title: "Hệ thống Thông tin Doanh nghiệp",
        shortDesc: "Hệ thống thông tin tích hợp: ERP, CRM, Quản lý Kho, Tài chính, HR và Trường học.",
        fullDesc: "Giải pháp tập trung quản lý toàn bộ nguồn lực công ty, tồn kho, tài chính, nhân sự và giáo dục.",
        icon: "Database",
        tag: "Quản lý",
        items: ["Quản trị Nguồn lực Doanh nghiệp (ERP)", "Quản lý Quan hệ Khách hàng (CRM)", "Hệ thống Kho & Chuỗi Cung ứng", "Hệ thống Quản lý Trường học & Học thuật"],
        techUsed: ["Laravel", "Node.js", "PostgreSQL", "MySQL", "Redis"],
        benefits: ["Dữ liệu Tích hợp Một cửa", "Báo cáo Tài chính Tự động", "Quản lý Quyền Truy cập", "Bảo mật Dữ liệu Tuyệt đối"]
      },
      {
        id: "system-maintenance",
        title: "Bảo trì & Hỗ trợ Hệ thống",
        shortDesc: "Dịch vụ bảo trì, sửa lỗi, tối ưu tốc độ, giám sát và vá lỗi bảo mật hệ thống.",
        fullDesc: "Đảm bảo website và ứng dụng của bạn hoạt động 24/7 không bị gián đoạn và được bảo vệ trước mối đe dọa mạng.",
        icon: "ShieldCheck",
        tag: "Tin cậy",
        items: ["Sửa Lỗi & Kiểm tra Mã nguồn", "Tối ưu Máy chủ & Cơ sở Dữ liệu", "Vá lỗi Bảo mật & Sao lưu Định kỳ", "Nâng cấp Tính năng Thường xuyên"],
        techUsed: ["Docker", "Linux", "AWS/Vercel", "Monitoring Tools", "Git"],
        benefits: ["Cam kết SLA & Phản hồi Nhanh", "Ngăn ngừa Sự cố Máy chủ", "Xử lý Lỗ hổng Bảo mật", "Báo cáo Bảo trì Định kỳ"]
      },
      {
        id: "ai-development",
        title: "Phát triển & Tích hợp AI",
        shortDesc: "Phát triển và tích hợp giải pháp AI, Chatbot Thông minh, Machine Learning và LLM/Gemini API.",
        fullDesc: "Chúng tôi tích hợp Trí tuệ Nhân tạo (AI) vào hệ thống kinh doanh của bạn để tự động hóa quy trình, phân tích dự báo và hỗ trợ 24/7.",
        icon: "Bot",
        tag: "AI Nổi bật",
        items: ["Chatbot & Trợ lý Số AI", "Tích hợp Gemini / OpenAI API", "Machine Learning & Phân tích Dự báo", "Tự động hóa Quy trình Thông minh"],
        techUsed: ["Python", "TensorFlow / PyTorch", "Gemini 1.5/3.8 Flash", "LangChain", "FastAPI"],
        benefits: ["Hỗ trợ Khách hàng 24/7 Nhanh chóng", "Tự động hóa Xử lý Dữ liệu Phức tạp", "Tiết kiệm Chi phí Vận hành", "Cá nhân hóa Trải nghiệm Người dùng"]
      },
      {
        id: "digital-consulting",
        title: "Tư vấn Digital & Chiến lược Số",
        shortDesc: "Tư vấn chiến lược số hóa, tự động hóa quy trình làm việc và hiện đại hóa hạ tầng.",
        fullDesc: "Hỗ trợ doanh nghiệp chuyển đổi từ quy trình thủ công sang hệ sinh thái số hiệu quả, nhanh chóng và minh bạch.",
        icon: "Cpu",
        tag: "Chiến lược",
        items: ["Đánh giá & Lộ trình Số hóa", "Kế hoạch Tự động hóa Quy trình", "Chuyển dịch Hạ tầng Đám mây", "Nâng cao Năng lực Số cho Đội ngũ"],
        techUsed: ["Cloud Services", "Automation Tools", "Microservices", "REST APIs"],
        benefits: ["Tối ưu Chi phí Vận hành", "Quyết định Nhanh chóng", "Mở rộng Kinh doanh Tương lai", "Lợi thế Cạnh tranh"]
      }
    ],

    ja: [
      {
        id: "website-development",
        title: "Webサイト制作",
        shortDesc: "コーポレートサイト、LP、ECサイト、企業ポータルの制作。",
        fullDesc: "高速で安全、SEOに最適化されたプレミアムなWebサイトをデザイン・構築し、ブランドイメージを高めます。",
        icon: "Globe",
        tag: "人気",
        items: ["インタラクティブな会社案内", "高コンバージョンLP", "ECサイト ＆ オンラインショップ", "企業向けWebポータル"],
        techUsed: ["React", "Next.js", "Tailwind CSS", "Vite", "WordPress/Headless"],
        benefits: ["レスポンシブ多端末対応", "高速化 ＆ SEO最適化", "使いやすいCMS", "SSLセキュリティ ＆ DDoS対策"]
      },
      {
        id: "mobile-app-development",
        title: "モバイルアプリ開発",
        shortDesc: "直感的で高速、多機能なAndroid & iOSスマートフォンアプリの開発。",
        fullDesc: "使いやすさと安定したパフォーマンスを提供するネイティブ＆クロスプラットフォームアプリ開発。",
        icon: "Smartphone",
        tag: "高見込み",
        items: ["Androidアプリ (Play Store)", "iOSアプリ (App Store)", "クロスプラットフォーム (Flutter/React Native)", "プッシュ通知 ＆ GPS連携"],
        techUsed: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase"],
        benefits: ["ネイティブUI/UX", "軽量 ＆ 高速パフォーマンス", "オフラインモード対応", "決済ゲートウェイ連携"]
      },
      {
        id: "web-application",
        title: "Webアプリケーション開発",
        shortDesc: "管理ダッシュボード、SaaS、社内業務ツールなどの複雑なWebシステム。",
        fullDesc: "業務ワークフローの管理や大規模データの処理を効率化するWebベースのシステムを構築します。",
        icon: "LayoutDashboard",
        tag: "エンタープライズ",
        items: ["分析 ＆ 報告ダッシュボード", "SaaS (Software as a Service)", "社内業務運用システム", "ビジネス管理ポータル"],
        techUsed: ["React", "Vue", "Node.js", "Laravel", "PostgreSQL"],
        benefits: ["高い拡張性 (Scalability)", "マルチロール権限認証", "リアルタイムデータ分析", "標準化REST API"]
      },
      {
        id: "custom-software",
        title: "カスタムソフトウェア開発",
        shortDesc: "貴社独自の業務フローに合わせたオーダーメイドのシステム開発。",
        fullDesc: "あらゆるビジネスの固有要件に合わせ、ゼロから専用システムをカスタマイズ構築します。",
        icon: "Code2",
        tag: "オーダーメイド",
        items: ["業務要件に合わせた専用設計", "ワークフロー ＆ 書類自動化", "API ＆ サードパーティ連携", "レガシーコードリファクタリング"],
        techUsed: ["Node.js", "Python", "Golang", "Laravel", "Docker"],
        benefits: ["100%業務にフィット", "ソースコード完全所有権", "柔軟なモジュール拡張", "スムーズなシステム連携"]
      },
      {
        id: "ui-ux-design",
        title: "UI/UXデザイン ＆ プロトタイプ",
        shortDesc: "ユーザーリサーチ、ワイヤーフレーム、モダンなUIデザイン、プロトタイプ制作。",
        fullDesc: "洗練されたデザイン美とユーザー心理分析を融合し、美しく直感的に使えるUI/UXを設計します。",
        icon: "Palette",
        tag: "デザイン重視",
        items: ["ユーザーリサーチ ＆ ペルソナ設定", "ワイヤーフレーム ＆ 構造設計", "高精度インタラクティブプロトタイプ", "デザインシステム ＆ スタイルガイド"],
        techUsed: ["Figma", "Adobe XD", "Framer", "Protopie"],
        benefits: ["ユーザー中心インターフェース", "離脱率 (Churn Rate) の低減", "エンゲージメント向上", "エンジニアへの即時引き継ぎ可"]
      },
      {
        id: "business-information-system",
        title: "基幹情報システム (ERP/CRM)",
        shortDesc: "ERP、CRM、在庫管理、財務、人事、学校管理などの統合情報システム。",
        fullDesc: "企業リソース、在庫、財務、人事を一元管理するクラウドセントラルソリューション。",
        icon: "Database",
        tag: "マネジメント",
        items: ["基幹業務計画 (ERP)", "顧客関係管理 (CRM)", "在庫 ＆ サプライチェーン管理", "学校 ＆ 学務情報システム"],
        techUsed: ["Laravel", "Node.js", "PostgreSQL", "MySQL", "Redis"],
        benefits: ["一元化されたデータ管理", "財務レポート自動生成", "アクセス権限管理", "強固なデータセキュリティ"]
      },
      {
        id: "system-maintenance",
        title: "システム保守 ＆ サポート",
        shortDesc: "システム保守、バグ修正、速度最適化、監視、セキュリティ対策。",
        fullDesc: "貴社のWebサイトやアプリを24時間365日安定稼働させ、サイバー脅威から護ります。",
        icon: "ShieldCheck",
        tag: "信頼性",
        items: ["バグ修正 ＆ コード監査", "サーバー ＆ DB最適化", "セキュリティパッチ ＆ 定期バックアップ", "新機能の定期追加"],
        techUsed: ["Docker", "Linux", "AWS/Vercel", "Monitoring Tools", "Git"],
        benefits: ["SLA ＆ 迅速レスポンス保証", "サーバーダウンの未然防止", "脆弱性クリーンアップ", "定期保守レポート発行"]
      },
      {
        id: "ai-development",
        title: "AI開発 ＆ ソリューション統合",
        shortDesc: "AIソリューション、AIチャットボット、機械学習、LLM/Gemini APIの開発・統合。",
        fullDesc: "人工知能（AI）を貴社のビジネスシステムに組み込み、業務プロセスの自動化、予測分析、24時間365日の自動カスタマーサポートを実現します。",
        icon: "Bot",
        tag: "AIフィーチャー",
        items: ["AIチャットボット ＆ デジタルアシスタント", "Gemini / OpenAI API 連携", "機械学習 ＆ 予測データ分析", "インテリジェント業務自動化"],
        techUsed: ["Python", "TensorFlow / PyTorch", "Gemini 1.5/3.8 Flash", "LangChain", "FastAPI"],
        benefits: ["24時間365日の迅速カスタマーサポート", "複雑なデータ処理の自動化", "運用コストの削減", "パーソナライズされたユーザー体験"]
      },
      {
        id: "digital-consulting",
        title: "Digital Consulting ＆ DX戦略",
        shortDesc: "ビジネスのデジタル化戦略、業務自動化、クラウドインフラ移行の支援。",
        fullDesc: "アナログ業務を効率的で迅速かつ透明性の高いデジタルエコシステムへ移行させます。",
        icon: "Cpu",
        tag: "戦略的",
        items: ["デジタル化診断 ＆ ロードマップ", "業務自動化計画", "クラウドインフラ移行", "チームのデジタルスキル育成"],
        techUsed: ["Cloud Services", "Automation Tools", "Microservices", "REST APIs"],
        benefits: ["運用コスト削減", "意思決定の迅速化", "将来のビジネス拡張性", "競合優位性の確保"]
      }
    ]
  };

  return data[lang] || data['id'];
};
