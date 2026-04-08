import { useState, useEffect } from 'react';
import BootSequence from './components/BootSequence/BootSequence';
import Navigation from './components/Navigation/Navigation';
import HeroSection from './components/HeroSection/HeroSection';
import ProjectsGallery from './components/ProjectsGallery/ProjectsGallery';
import AboutSection from './components/AboutSection/AboutSection';
import ContactSection from './components/ContactSection/ContactSection';

export default function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    document.body.classList.add('boot-active');
  }, []);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {/* Persistent HUD overlays */}
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <Navigation />

      <main>
        <HeroSection />
        <ProjectsGallery />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
