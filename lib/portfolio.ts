import portfolioData from '@/data/portfolio.json';

export type Stat = { num: string; label: string };
export type Service = { title: string; description: string };
export type SkillGroup = { label: string; items: string[] };
export type Project = {
  idx: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  link?: string;
  metric?: string;
  metricLabel?: string;
};
export type Experience = {
  company: string;
  role: string;
  dates: string;
  points: string[];
};

export type Education = { title: string; place: string; dates: string; note?: string };
export type SpokenLanguage = { name: string; level: string };

export type PortfolioData = {
  summary: string;
  education: Education[];
  spokenLanguages: SpokenLanguage[];
  stats: Stat[];
  services: Service[];
  skillGroups: SkillGroup[];
  projects: Project[];
  experience: Experience[];
};

export function getPortfolioData(): PortfolioData {
  return portfolioData as PortfolioData;
}
