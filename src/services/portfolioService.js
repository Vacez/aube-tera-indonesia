import { getPortfolioProjects } from '../data/portfolio';

/**
 * Recommend portfolio projects based on user business type & inquiry text
 */
export const recommendPortfolioProjects = (userQuery, lang = 'id') => {
  const allProjects = getPortfolioProjects(lang);
  const q = userQuery.toLowerCase();

  const matched = allProjects.filter((proj) => {
    const text = (proj.title + ' ' + proj.subtitle + ' ' + proj.shortDesc + ' ' + proj.categoryLabel + ' ' + (proj.techStack || []).join(' ')).toLowerCase();
    
    if (q.includes('sekolah') || q.includes('siswa') || q.includes('edukasi')) {
      return text.includes('sistem') || text.includes('dashboard') || text.includes('informasi');
    }
    if (q.includes('toko') || q.includes('e-commerce') || q.includes('belanja') || q.includes('retail')) {
      return text.includes('e-commerce') || text.includes('mobile') || text.includes('marketplace');
    }
    if (q.includes('mobile') || q.includes('aplikasi hp') || q.includes('android') || q.includes('ios')) {
      return proj.category === 'mobile';
    }
    if (q.includes('website') || q.includes('company profile') || q.includes('landing page')) {
      return proj.category === 'web';
    }
    return true;
  });

  return matched.slice(0, 3);
};
