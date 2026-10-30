import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Languages from './components/languages';
import Workspace from './components/workspace';
import Marquee from './components/marquee';
import SectionIndicator from './components/section-indicator';
import Work from './components/work';
import Experience from './components/experience';
import Contact from './components/contact';
import Footer from './components/footer';
import { getPortfolioData } from '@/lib/portfolio';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ameer Abdulkareem Jabbar Lami',
  jobTitle: 'Front-end Developer',
  email: 'mailto:ameer.abdulkareem.lami@gmail.com',
  telephone: '+9647777665783',
  url: 'https://cv-ameer.vercel.app',
  sameAs: ['https://github.com/amoree-code', 'https://www.linkedin.com/in/ameer-abdulkareem'],
};

export default function Home() {
  const { stats, skillGroups, services, projects, experience, education, spokenLanguages, focus } =
    getPortfolioData();

  return (
    <div style={{ minHeight: '100svh', overflowX: 'clip' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SectionIndicator />
      <Header />
      <Hero stats={stats} />
      <About services={services} />
      <Languages skillGroups={skillGroups} />
      <section className="container" style={{ paddingBottom: 'var(--section-y)' }}>
        <Workspace />
      </section>
      <Marquee items={services.map((s) => s.title)} />
      <Experience
        experience={experience}
        education={education}
        spokenLanguages={spokenLanguages}
        focus={focus}
      />
      <Work projects={projects} />
      <Contact />
      <Footer />
    </div>
  );
}
