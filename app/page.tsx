import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
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
      <About skillGroups={skillGroups} services={services} />
      <Marquee items={services} />
      <Work projects={projects} />
      <Experience experience={experience} />
      <Contact />
      <Footer />
    </div>
  );
}
