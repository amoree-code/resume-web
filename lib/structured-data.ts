import type { PortfolioData } from '@/lib/portfolio';
import { IDS, LAST_UPDATED, PERSON, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site';

// Schema.org graph for the home page: ProfilePage → Person, inside the WebSite.
// Every fact comes from lib/site.ts or data/portfolio.json — nothing here is invented.
export function buildJsonLd(data: PortfolioData) {
  const current = data.experience.find((e) => e.dates.includes('Present'));

  const person = {
    '@type': 'Person',
    '@id': IDS.person,
    name: PERSON.name,
    alternateName: PERSON.alternateName,
    jobTitle: PERSON.jobTitle,
    description: data.summary,
    url: SITE_URL,
    mainEntityOfPage: { '@id': IDS.profilePage },
    email: `mailto:${PERSON.email}`,
    telephone: PERSON.telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: PERSON.city,
      addressCountry: PERSON.countryCode,
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: PERSON.shortTitle,
      occupationLocation: { '@type': 'City', name: `${PERSON.city}, ${PERSON.country}` },
      skills: data.skillGroups.flatMap((g) => g.items).join(', '),
    },
    ...(current && {
      worksFor: { '@type': 'Organization', name: current.company },
    }),
    alumniOf: data.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.place })),
    knowsAbout: PERSON.knowsAbout,
    knowsLanguage: data.spokenLanguages.map((l) => l.name),
    sameAs: PERSON.sameAs,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': IDS.website,
        url: SITE_URL,
        name: PERSON.name,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': IDS.person },
      },
      {
        '@type': 'ProfilePage',
        '@id': IDS.profilePage,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        isPartOf: { '@id': IDS.website },
        dateModified: LAST_UPDATED,
        mainEntity: { '@id': IDS.person },
        about: { '@id': IDS.person },
        primaryImageOfPage: `${SITE_URL}/opengraph-image`,
      },
      person,
    ],
  };
}

// JSON.stringify does not escape "<"; do it so the payload can never close the <script> tag.
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
