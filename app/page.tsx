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
  name: 'Amir Abdulkarim Jabbar',
  jobTitle: 'Front-end Developer',
  email: 'mailto:amir.abdulkarim.jabbar@gmail.com',
  telephone: '+9647777665783',
  url: 'https://amir.dev',
  sameAs: [],
};

export default function Home() {
  const { skillGroups, services, projects, experience } = getPortfolioData();

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SectionIndicator />
      <Header />
      <Hero />
      <About services={services} />
      <Languages skillGroups={skillGroups} />
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px 90px' }}>
        <Workspace />
      </section>
      <Marquee items={services.map((s) => s.title)} />
      <Experience experience={experience} />
      <Work projects={projects} />
      <Contact />
      <Footer />
    </div>
  );
}
