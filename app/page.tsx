import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Languages from './components/languages';
import Workspace from './components/workspace';
import Marquee from './components/marquee';
import SectionIndicator from './components/section-indicator';
import Work from './components/work';
import Experience from './components/experience';
import Education from './components/education';
import Contact from './components/contact';
import Footer from './components/footer';
import { getPortfolioData } from '@/lib/portfolio';
import { buildJsonLd, serializeJsonLd } from '@/lib/structured-data';

export default function Home() {
  const data = getPortfolioData();
  const { stats, skillGroups, services, projects, experience, education, spokenLanguages } = data;

  return (
    <div style={{ minHeight: '100svh', overflowX: 'clip' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd(data)) }}
      />
      <SectionIndicator />
      <Header />
      <main id="main">
        <Hero stats={stats} />
        <About services={services} />
        <Languages skillGroups={skillGroups} />
        <section className="container" style={{ paddingBottom: 'var(--section-y)' }}>
          <Workspace />
        </section>
        <Marquee items={services.map((s) => s.title)} />
        <Experience experience={experience} />
        <Work projects={projects} />
        <Education education={education} spokenLanguages={spokenLanguages} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
