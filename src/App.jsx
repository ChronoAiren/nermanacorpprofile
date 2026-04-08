import { useState, useEffect } from 'react';
import BootSequence from './components/BootSequence/BootSequence';
import Navigation from './components/Navigation/Navigation';
import HeroSection from './components/HeroSection/HeroSection';
import ProjectsGallery from './components/ProjectsGallery/ProjectsGallery';
import AboutSection from './components/AboutSection/AboutSection';
import ContactSection from './components/ContactSection/ContactSection';

const BOOT_KEY = 'monolith-booted';

export default function App() {
  // Skip boot if user has seen it before (stored in localStorage)
  // or if they prefer reduced motion
  const [booted, setBooted] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return localStorage.getItem(BOOT_KEY) === 'true';
  });

  useEffect(() => {
    if (!booted) {
      document.body.classList.add('boot-active');
    }
  }, [booted]);

  const handleBootComplete = () => {
    setBooted(true);
    localStorage.setItem(BOOT_KEY, 'true');
    document.body.classList.remove('boot-active');
  };

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}

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
