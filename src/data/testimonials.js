export const getTestimonialsData = (lang = 'id') => {
  const testimonials = {
    id: [
      {
        id: "testi-1",
        name: "Bambang Kurniawan",
        role: "CEO & Co-Founder",
        company: "PT Solusi Finansial Utama",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "PT. AUBE TERA INDONESIA berhasil mengembangkan sistem manajemen kas internal kami dengan sangat efisien. Alur kerja yang tadinya rumit kini dapat dipantau dalam satu dashboard yang bersih dan intuitif.",
        projectType: "Web Application & ERP"
      },
      {
        id: "testi-2",
        name: "Dr. Hj. Ratna Sari",
        role: "Kepala Yayasan",
        company: "Yayasan Edukasi Vacez",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "Sistem informasi sekolah yang dibuatkan oleh tim Aube Tera sangat membantu 1.200 wali murid kami. Pengurusan e-Rapor dan absensi menjadi jauh lebih transparan dan tepat waktu.",
        projectType: "Sistem Informasi Sekolah"
      },
      {
        id: "testi-3",
        name: "Rizky Pratama, S.T.",
        role: "Operational Manager",
        company: "Logistik Nusantara Express",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "Tim Aube Tera sangat responsif dan memahami seluk-beluk teknis arsitektur cloud. Hasil aplikasi Android dan iOS kami berjalan lancar tanpa ada kendala fatal saat spike trafik.",
        projectType: "Mobile App Development"
      },
      {
        id: "testi-4",
        name: "Amanda Clarissa",
        role: "Head of Marketing",
        company: "StyleHub Indonesia",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "Redesign website corporate dan landing page e-commerce kami membuat rasio konversi meningkat lebih dari 35%. Estetika visualnya benar-benar terasa modern dan premium!",
        projectType: "UI/UX & Web Development"
      }
    ],

    en: [
      {
        id: "testi-1",
        name: "Bambang Kurniawan",
        role: "CEO & Co-Founder",
        company: "PT Solusi Finansial Utama",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "PT. AUBE TERA INDONESIA successfully engineered our internal cash management system with outstanding efficiency. Complex workflows are now easily monitored in a clean dashboard.",
        projectType: "Web Application & ERP"
      },
      {
        id: "testi-2",
        name: "Dr. Hj. Ratna Sari",
        role: "Head of Foundation",
        company: "Vacez Education Foundation",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "The school information system built by the Aube Tera team has empowered 1,200 parents. Electronic report cards and daily attendance tracking are now transparent and delivered on time.",
        projectType: "School Information System"
      },
      {
        id: "testi-3",
        name: "Rizky Pratama, S.T.",
        role: "Operational Manager",
        company: "Nusantara Logistics Express",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "The Aube Tera team was highly responsive and mastered cloud architecture. Our Android and iOS apps run seamlessly without crashes even during high traffic spikes.",
        projectType: "Mobile App Development"
      },
      {
        id: "testi-4",
        name: "Amanda Clarissa",
        role: "Head of Marketing",
        company: "StyleHub Indonesia",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "Redesigning our corporate website and e-commerce landing pages boosted our conversion rate by over 35%. The visual aesthetic feels truly modern and premium!",
        projectType: "UI/UX & Web Development"
      }
    ],

    vi: [
      {
        id: "testi-1",
        name: "Bambang Kurniawan",
        role: "CEO & Đồng sáng lập",
        company: "PT Solusi Finansial Utama",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "PT. AUBE TERA INDONESIA đã phát triển hệ thống quản lý dòng tiền nội bộ của chúng tôi rất hiệu quả. Quy trình từng phức tạp nay dễ dàng theo dõi trên bảng điều khiển trực quan.",
        projectType: "Ứng dụng Web & ERP"
      },
      {
        id: "testi-2",
        name: "Dr. Hj. Ratna Sari",
        role: "Chủ tịch Quỹ",
        company: "Quỹ Giáo dục Vacez",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "Hệ thống thông tin trường học do Aube Tera xây dựng đã hỗ trợ 1.200 phụ huynh học sinh. Báo cáo điểm và điểm danh hàng ngày trở nên minh bạch và đúng tiến độ.",
        projectType: "Hệ thống Thông tin Trường học"
      },
      {
        id: "testi-3",
        name: "Rizky Pratama, S.T.",
        role: "Giám đốc Vận hành",
        company: "Logistics Nusantara Express",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "Đội ngũ Aube Tera phản hồi rất nhanh và làm chủ kiến trúc đám mây. Ứng dụng Android và iOS của chúng tôi chạy mượt mà ngay cả khi lưu lượng truy cập tăng vọt.",
        projectType: "Phát triển Ứng dụng Di động"
      },
      {
        id: "testi-4",
        name: "Amanda Clarissa",
        role: "Trưởng phòng Marketing",
        company: "StyleHub Indonesia",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "Việc thiết kế lại website doanh nghiệp và trang đích thương mại điện tử giúp tỷ lệ chuyển đổi tăng hơn 35%. Thẩm mỹ thị giác thực sự hiện đại và sang trọng!",
        projectType: "UI/UX & Phát triển Web"
      }
    ],

    ja: [
      {
        id: "testi-1",
        name: "Bambang Kurniawan",
        role: "CEO ＆ 共同創業者",
        company: "PT Solusi Finansial Utama",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "PT. AUBE TERA INDONESIA は当社の社内資金管理システムを非常に効率的に構築してくれました。以前は複雑だったフローが、見やすいダッシュボードで一元管理できるようになりました。",
        projectType: "Webアプリ ＆ ERP"
      },
      {
        id: "testi-2",
        name: "Dr. Hj. Ratna Sari",
        role: "理事長",
        company: "Vacez 教育財団",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "Aube Tera チームが制作した校務システムは1,200名の保護者から大好評です。デジタル成績表や出欠管理の透明性が高まり、校務が迅速になりました。",
        projectType: "学校情報システム"
      },
      {
        id: "testi-3",
        name: "Rizky Pratama, S.T.",
        role: "運行管理マネージャー",
        company: "Nusantara 物流エクスプレス",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "Aube Tera のエンジニアはレスポンスが早く、クラウド技術に長けています。開発されたAndroid・iOSアプリはアクセス集中時にも落とされず安定稼働しています。",
        projectType: "モバイルアプリ開発"
      },
      {
        id: "testi-4",
        name: "Amanda Clarissa",
        role: "マーケティング責任者",
        company: "StyleHub Indonesia",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        content: "コーポレートサイトとECランディングページのリニューアルにより、コンバージョン率が35%以上向上しました。モダンで洗練されたデザインに感謝しています！",
        projectType: "UI/UX ＆ Web開発"
      }
    ]
  };

  return testimonials[lang] || testimonials['id'];
};
