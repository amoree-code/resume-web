// Single source of truth for the site's identity: metadata, JSON-LD, sitemap,
// robots and llms.txt all read from here so the name and links never drift apart.

export const SITE_URL = 'https://cv-ameer.vercel.app';

// Bump when the page content changes — drives sitemap <lastmod> and ProfilePage dateModified.
export const LAST_UPDATED = '2026-11-15';

// Verified profiles only.
export const PROFILES = {
  github: 'https://github.com/amoree-code',
  linkedin: 'https://www.linkedin.com/in/ameer-abdulkareem',
} as const;

export const PERSON = {
  name: 'Ameer Abdulkareem Jabbar Lami',
  // Genuine spellings and shortenings of the same name only.
  alternateName: ['Ameer Abdulkareem Lami', 'Ameer Jabbar Lami', 'Amir Abdulkarim Jabbar'],
  jobTitle: 'Front-End Specialized Full-Stack Developer',
  shortTitle: 'Full-Stack Developer',
  city: 'Baghdad',
  country: 'Iraq',
  countryCode: 'IQ',
  email: 'ameer.abdulkareem.lami@gmail.com',
  telephone: '+9647777665783',
  sameAs: Object.values(PROFILES),
  knowsAbout: [
    'Front-end engineering',
    'Full-stack web development',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Vue.js',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Tailwind CSS',
    'shadcn/ui',
    'WebSocket',
    'Real-time web applications',
    'Enterprise dashboards',
    'Role-based access control',
    'Government digital platforms',
    'SaaS applications',
    'Arabic RTL interfaces',
    'Internationalization (i18n)',
  ],
} as const;

export const SITE_TITLE = `${PERSON.name} | ${PERSON.shortTitle}`;
export const SITE_DESCRIPTION =
  'Ameer Abdulkareem Jabbar Lami is a front-end specialized full-stack developer in Baghdad, Iraq, building React, Next.js and TypeScript dashboards for government platforms and real-time SaaS.';

export const IDS = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  profilePage: `${SITE_URL}/#profilepage`,
} as const;
