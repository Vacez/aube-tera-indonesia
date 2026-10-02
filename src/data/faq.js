export const getFaqData = (lang = 'id') => {
  const faqs = {
    id: [
      {
        question: "Berapa biaya pembuatan website atau aplikasi?",
        answer: "Biaya investasi dikalkulasikan berdasarkan kompleksitas fitur, skala sistem, tingkat kustomisasi visual, serta alokasi infrastruktur. Kami menyediakan sesi konsultasi gratis terlebih dahulu untuk menentukan estimasi anggaran yang transparan."
      },
      {
        question: "Berapa lama waktu proses pembuatan aplikasi?",
        answer: "Durasi pengerjaan bervariasi bergantung pada ruang lingkup proyek. Website Company Profile umumnya membutuhkan waktu 1-2 minggu, sedangkan aplikasi mobile atau sistem informasi kustom memerlukan durasi 4-8 minggu dengan milestone terstruktur."
      },
      {
        question: "Apakah bisa membuat sistem kustom sesuai kebutuhan spesifik bisnis kami?",
        answer: "Tentu saja. Spesialisasi utama PT. AUBE TERA INDONESIA adalah Custom Software Development. Kami menganalisis alur kerja operasional bisnis Anda dari awal, lalu merancang arsitektur perangkat lunak yang 100% pas."
      },
      {
        question: "Apakah tersedia layanan maintenance dan dukungan purnajual?",
        answer: "Ya, setiap proyek yang dikembangkan dilengkapi dengan garansi pemeliharaan awal. Selain itu, kami menawarkan paket System Maintenance berkala untuk bug fixing, monitoring server 24/7, dan optimasi performa."
      },
      {
        question: "Apakah bisa melakukan redesign atau pembaruan sistem yang sudah ada?",
        answer: "Sangat bisa. Kami dapat melakukan audit kode & tampilan sistem lama Anda, lalu menyusun strategi pembaruan (refactoring), modernisasi UI/UX, atau integrasi API baru."
      },
      {
        question: "Apakah PT. AUBE TERA INDONESIA juga menyediakan domain, server, dan cloud hosting?",
        answer: "Ya, kami dapat membantu pengadaan domain resmi, SSL Certificate, konfigurasi Cloud Server (Vercel, AWS, DigitalOcean, VPS), hingga pengaturan email profesional perusahaan."
      },
      {
        question: "Apakah aplikasi mobile yang dibuat bisa dirilis untuk Android dan iOS bersamaan?",
        answer: "Bisa. Menggunakan teknologi Cross-Platform modern seperti Flutter atau React Native, kami dapat membangun aplikasi yang berjalan mulus di Android (Play Store) dan iOS (App Store) secara efisien."
      },
      {
        question: "Apakah tersedia sesi konsultasi awal sebelum membuat keputusan proyek?",
        answer: "Ya, kami menyediakan sesi Konsultasi Gratis tanpa ikatan. Anda dapat berdiskusi langsung dengan tim spesialis teknologi kami via WhatsApp."
      }
    ],

    en: [
      {
        question: "How much does it cost to build a website or mobile app?",
        answer: "Investment costs are calculated based on feature complexity, system scale, visual customization, and infrastructure needs. We provide a free initial consultation to help establish a transparent budget."
      },
      {
        question: "How long does the development process take?",
        answer: "Timeline varies depending on scope. Company Profile websites typically take 1–2 weeks, while custom mobile apps or enterprise information systems take 4–8 weeks with structured milestones."
      },
      {
        question: "Can you build custom systems aligned with our specific workflow?",
        answer: "Absolutely. PT. AUBE TERA INDONESIA specializes in Custom Software Development. We analyze your operational business workflow from scratch and engineer a 100% tailored software solution."
      },
      {
        question: "Do you offer post-launch maintenance and technical support?",
        answer: "Yes, every project includes an initial maintenance warranty. Additionally, we offer periodic System Maintenance packages for bug fixes, 24/7 server monitoring, performance tuning, and feature expansion."
      },
      {
        question: "Can you redesign or modernize an existing legacy system?",
        answer: "Yes, definitely. We conduct a full code & UI/UX audit of your existing system, followed by code refactoring, interface modernization, and seamless API integration."
      },
      {
        question: "Does PT. AUBE TERA INDONESIA provide domain, SSL, and cloud server setups?",
        answer: "Yes, we handle domain registration, SSL Certificates, Cloud Server deployment (Vercel, AWS, DigitalOcean, VPS), and corporate email configurations."
      },
      {
        question: "Can mobile apps be launched on both Android and iOS simultaneously?",
        answer: "Yes. Leveraging modern Cross-Platform frameworks like Flutter or React Native, we deliver high-performance apps that deploy seamlessly to both Google Play Store and Apple App Store."
      },
      {
        question: "Is there a free consultation session prior to committing to a project?",
        answer: "Yes, we offer free, no-obligation consultation sessions. You can discuss your project ideas directly with our technology specialists via WhatsApp."
      }
    ],

    vi: [
      {
        question: "Chi phí xây dựng website hoặc ứng dụng di động là bao nhiêu?",
        answer: "Chi phí được tính dựa trên độ phức tạp của tính năng, quy mô hệ thống, tùy chỉnh giao diện và hạ tầng. Chúng tôi cung cấp buổi tư vấn miễn phí để đưa ra dự toán ngân sách minh bạch."
      },
      {
        question: "Thời gian phát triển phần mềm mất bao lâu?",
        answer: "Thời gian tùy thuộc vào phạm vi dự án. Website Hồ sơ Công ty thường từ 1–2 tuần, trong khi ứng dụng di động hoặc hệ thống thông tin mất từ 4–8 tuần theo các cột mốc rõ ràng."
      },
      {
        question: "Công ty có thể xây dựng hệ thống tùy chỉnh theo quy trình riêng của chúng tôi không?",
        answer: "Tất nhiên. Chuyên môn chính của PT. AUBE TERA INDONESIA là Phát triển Phần mềm Theo yêu cầu. Chúng tôi phân tích quy trình vận hành của bạn và thiết kế kiến trúc phần mềm phù hợp 100%."
      },
      {
        question: "Công ty có dịch vụ bảo trì và hỗ trợ sau khi ra mắt không?",
        answer: "Có, mọi dự án đều đi kèm bảo hành bảo trì ban đầu. Ngoài ra, chúng tôi cung cấp các gói Bảo trì Hệ thống định kỳ để sửa lỗi, giám sát máy chủ 24/7 và nâng cấp tính năng."
      },
      {
        question: "Công ty có thể nâng cấp hoặc thiết kế lại hệ thống cũ của chúng tôi không?",
        answer: "Hoàn toàn có thể. Chúng tôi thực hiện kiểm toán mã nguồn & giao diện hệ thống hiện tại, sau đó lập chiến lược tái cấu trúc (refactoring), hiện đại hóa UI/UX hoặc tích hợp API mới."
      },
      {
        question: "PT. AUBE TERA INDONESIA có cung cấp tên miền, SSL và máy chủ đám mây không?",
        answer: "Có, chúng tôi hỗ trợ đăng ký tên miền chính thức, Chứng chỉ SSL, cấu hình Máy chủ Đám mây (Vercel, AWS, DigitalOcean, VPS) và thiết lập email doanh nghiệp."
      },
      {
        question: "Ứng dụng di động có thể phát hành cùng lúc trên Android và iOS không?",
        answer: "Có. Nhờ áp dụng các công nghệ Đa nền tảng (Cross-Platform) như Flutter hoặc React Native, chúng tôi phát triển ứng dụng hoạt động mượt mà trên cả Google Play Store và Apple App Store."
      },
      {
        question: "Có buổi tư vấn ban đầu trước khi quyết định thực hiện dự án không?",
        answer: "Có, chúng tôi cung cấp các buổi Tư vấn Miễn phí không ràng buộc. Bạn có thể trao đổi trực tiếp với đội ngũ chuyên gia công nghệ của chúng tôi qua WhatsApp."
      }
    ],

    ja: [
      {
        question: "Webサイトやアプリの制作費用はどのくらいですか？",
        answer: "機能の複雑さ、システム規模、デザインカスタマイズ度、必要なインフラ構成に基づき開発費用を算出します。透明性の高いお見積もりを作成するため、まずは無料の事前相談を実施しております。"
      },
      {
        question: "アプリ開発の納期はどのくらいかかりますか？",
        answer: "プロジェクトのスコープによって異なります。コーポレートサイトであれば通常1〜2週間程度、カスタムモバイルアプリや企業向け基幹システムは4〜8週間程度で段階的に開発を進めます。"
      },
      {
        question: "当社固有の業務フローに合わせたカスタム開発は可能ですか？",
        answer: "もちろんです。PT. AUBE TERA INDONESIA の最大の強みはカスタムソフトウェア開発です。貴社の業務プロセスを詳細にヒアリングし、100%業務にフィットするシステムをゼロから設計します。"
      },
      {
        question: "納品後の保守・運用アフターサポートはありますか？",
        answer: "はい、納品後の初期保守保証が含まれています。さらに、バグ修正、24時間365日のサーバー監視、パフォーマンス最適化、将来的な機能拡張に対応する定期保守パッケージもご用意しています。"
      },
      {
        question: "既存の旧システムの機能拡張やUIリニューアルは可能ですか？",
        answer: "可能です。既存システムのコードおよびUI/UX監査を行い、コードのリファクタリング、デザインのモダン化、新規API連携などのリニューアル計画をご提案いたします。"
      },
      {
        question: "ドメイン、SSL証明書、クラウドサーバーの手配も任せられますか？",
        answer: "はい、公式ドメイン取得、SSL証明書導入、クラウドサーバー（Vercel, AWS, DigitalOcean, VPS）の構築、企業メールの設定までトータルでサポートします。"
      },
      {
        question: "AndroidとiOSの両方に同時リリースできますか？",
        answer: "可能です。FlutterやReact Nativeなどの最新クロスプラットフォーム技術を採用することで、Android (Google Play) と iOS (App Store) の両方でスムーズに動作するアプリを効率的に開発します。"
      },
      {
        question: "正式発注の前に無料相談は可能ですか？",
        answer: "はい、完全無料・契約義務なしの事前相談セッションを行っております。WhatsAppにて当社の技術エンジニアと直接ご相談いただけます。"
      }
    ]
  };

  return faqs[lang] || faqs['id'];
};
