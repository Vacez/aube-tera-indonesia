/**
 * FILE CONFIGURASI PERUSAHAAN PT. AUBE TERA INDONESIA
 * Seluruh data berikut merupakan data terpusat yang dapat diubah sesuai kebutuhan rill perusahaan.
 */

export const COMPANY_CONFIG = {
  name: "PT. AUBE TERA INDONESIA",
  shortName: "AUBE TERA",
  field: "IT Solution & Software Development",
  tagline: "Transformasikan Ide Menjadi Solusi Digital",
  description: "PT. AUBE TERA INDONESIA membantu bisnis, instansi, dan organisasi membangun website, aplikasi mobile, dan sistem informasi modern yang scalable, aman, serta siap pakai.",
  
  // Kontak Perusahaan Resmi
  email: "info@aubetera.co.id",
  whatsapp: {
    number: "6282211499289",
    displayNumber: "+62 822-1149-9289",
    defaultMessage: "Halo PT. AUBE TERA INDONESIA, saya ingin berkonsultasi mengenai kebutuhan pembuatan aplikasi/website.",
  },
  address: "Suradita, Kec. Cisauk, Kabupaten Tangerang, Banten, Indonesia",
  googleMapsUrl: "https://maps.app.goo.gl/QxD5AwBBi5CH5ZFn7",
  operatingHours: "Senin - Jumat, 08:00 - 17:00 WIB",

  // Social Media Links
  socials: {
    instagram: "https://instagram.com/aubetera.id",
    linkedin: "https://linkedin.com/company/aubetera",
    facebook: "https://facebook.com/aubetera",
    tiktok: "https://tiktok.com/@aubetera",
    github: "https://github.com/aubetera",
  },

  // Trust Statistics
  stats: [
    { id: "projects", value: "50+", label: "Project Completed", desc: "Aplikasi & Website Berhasil Dirilis" },
    { id: "clients", value: "30+", label: "Satisfied Clients", desc: "Perusahaan, UMKM & Instansi" },
    { id: "experience", value: "5+", label: "Years Experience", desc: "Pengalaman Rekayasa Perangkat Lunak" },
    { id: "solutions", value: "10+", label: "Digital Solutions", desc: "Solusi Spesifik Lintas Sektor" },
  ],

  // Guarantees / Trust Badges
  trustBadges: [
    "Custom Development",
    "Modern Technology",
    "Responsive Design",
    "Dedicated Support"
  ]
};

// Helper function to build direct WhatsApp URL
export const getWhatsAppUrl = (customMessage) => {
  const msg = encodeURIComponent(customMessage || COMPANY_CONFIG.whatsapp.defaultMessage);
  return `https://wa.me/${COMPANY_CONFIG.whatsapp.number}?text=${msg}`;
};
