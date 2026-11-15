import { getPortfolioData } from '@/lib/portfolio';
import { RESUME_URL } from '@/lib/contact';
import { PERSON, PROFILES, SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

// llms.txt (llmstxt.org proposal): a plain-Markdown summary for language-model tools.
// Supplementary only — the page, its JSON-LD and the sitemap remain the source of truth,
// and this file is generated from the same data so it cannot drift from them.
export const dynamic = 'force-static';

export function GET() {
  const d = getPortfolioData();

  const lines = [
    `# ${PERSON.name}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    d.summary,
    '',
    `Also written as: ${PERSON.alternateName.join(', ')}.`,
    '',
    '## Profile',
    '',
    `- Role: ${PERSON.jobTitle}`,
    `- Location: ${PERSON.city}, ${PERSON.country}`,
    `- [Portfolio](${SITE_URL}): this site`,
    `- [GitHub](${PROFILES.github}): public repositories`,
    `- [LinkedIn](${PROFILES.linkedin}): professional profile`,
    `- [Resume](${RESUME_URL}): current CV (PDF)`,
    `- [Email](mailto:${PERSON.email})`,
    `- Spoken languages: ${d.spokenLanguages.map((l) => `${l.name} (${l.level})`).join(', ')}`,
    '',
    '## Skills',
    '',
    ...d.skillGroups.map((g) => `- ${g.label}: ${g.items.join(', ')}`),
    '',
    '## Experience',
    '',
    ...d.experience.flatMap((e) => [
      `### ${e.role}, ${e.company} (${e.dates})`,
      '',
      ...e.points.map((p) => `- ${p}`),
      '',
    ]),
    '## Projects',
    '',
    ...d.projects.flatMap((p) => [
      `### ${p.title} (${p.category})`,
      '',
      p.desc,
      '',
      ...(p.metric ? [`- Scale: ${p.metric} ${p.metricLabel}`] : []),
      `- Stack: ${p.tags.join(', ')}`,
      ...(p.link ? [`- [Live site](${p.link})`] : []),
      '',
    ]),
    '## Education',
    '',
    ...d.education.map((e) => `- ${e.title}, ${e.place} (${e.dates})${e.note ? ` — ${e.note}` : ''}`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
