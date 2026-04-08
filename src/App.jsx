import { useState, useEffect } from 'react';
import BootSequence from './components/BootSequence/BootSequence';
import Navigation from './components/Navigation/Navigation';
import HeroSection from './components/HeroSection/HeroSection';
import ProjectsGallery from './components/ProjectsGallery/ProjectsGallery';
import AboutSection from './components/AboutSection/AboutSection';
import ContactSection from './components/ContactSection/ContactSection';

const BOOT_KEY = 'monolith-booted';

// Detect low-end devices and apply optimizations
const detectLowEnd = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const deviceMemory = navigator.deviceMemory || 4;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = connection?.saveData || false;
  
  return prefersReducedMotion || deviceMemory < 4 || hardwareConcurrency < 4 || saveData;
};

export default function App() {
  // Detect low-end device on mount
  const [isLowEnd, setIsLowEnd] = useState(false);
  
  useEffect(() => {
    const lowEnd = detectLowEnd();
    setIsLowEnd(lowEnd);
    if (lowEnd) {
      document.body.classList.add('low-end-mode');
    }
  }, []);

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

      {/* Persistent HUD overlays - hidden on low-end devices */}
      {!isLowEnd && (
        <>
          <div className="scanline-overlay" aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />
        </>
      )}

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
