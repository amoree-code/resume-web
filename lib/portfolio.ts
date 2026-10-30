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
};
export type Experience = {
  company: string;
  role: string;
  dates: string;
  points: string[];
};

export type PortfolioData = {
  stats: Stat[];
  services: Service[];
  skillGroups: SkillGroup[];
  projects: Project[];
  experience: Experience[];
};

export function getPortfolioData(): PortfolioData {
  return portfolioData as PortfolioData;
}
