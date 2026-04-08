import { useState, useEffect, useCallback } from 'react';
import './BootSequence.css';
import data from '../../data.json';

const getBootLines = () => {
  const brandName = data.brand?.name || 'NERMANA CO.';
  const brandVersion = data.brand?.version || 'V4.0.2';
  const cleanBrand = brandName.replace(/\s+/g, '_').toUpperCase();
  
  return [
    { text: `${cleanBrand}_OS ${brandVersion}`, delay: 0 },
    { text: 'INITIALIZING...', delay: 400 },
    { text: 'LOADING INTERFACE...', delay: 800 },
    { text: 'BIOMETRIC SCAN...', delay: 1200, status: '[OK]' },
    { text: 'ENCRYPTION: V4', delay: 1600, status: '[ACTIVE]' },
    { text: 'RENDERING HUD...', delay: 2000, status: '[OK]' },
    { text: 'SYSTEM:', delay: 2400, status: 'ONLINE' },
  ];
};

const PROGRESS_DELAY = 2800;
const ENTER_DELAY = 3500;

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(new Set());
  const [showProgress, setShowProgress] = useState(false);
  const [showEnter, setShowEnter] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const bootLines = getBootLines();

  useEffect(() => {
    /* Reveal each line with staggered delay */
    const timers = bootLines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => new Set([...prev, i]));
      }, line.delay)
    );

    /* Show progress bar */
    timers.push(setTimeout(() => setShowProgress(true), PROGRESS_DELAY));

    /* Show enter prompt */
    timers.push(setTimeout(() => setShowEnter(true), ENTER_DELAY));

    return () => timers.forEach(clearTimeout);
  }, [bootLines]);

  const handleEnter = useCallback(() => {
    setIsHidden(true);
    document.body.classList.remove('boot-active');
    setTimeout(() => onComplete?.(), 400);
  }, [onComplete]);

  /* Allow Enter key or click */
  useEffect(() => {
    if (!showEnter) return;

    const handleKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showEnter, handleEnter]);

  /* Allow skipping boot early by clicking anywhere or pressing Escape */
  useEffect(() => {
    const handleSkip = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleEnter();
      }
    };

    const handleClickSkip = (e) => {
      // Only skip if clicking outside the boot content area
      if (!e.target.closest('.boot-content')) {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleSkip);
    const overlay = document.querySelector('.boot-overlay');
    overlay?.addEventListener('click', handleClickSkip);

    return () => {
      window.removeEventListener('keydown', handleSkip);
      overlay?.removeEventListener('click', handleClickSkip);
    };
  }, [handleEnter]);

  return (
    <div
      className={`boot-overlay ${isHidden ? 'hidden' : ''}`}
      role="dialog"
      aria-label="System boot sequence"
    >
      <div className="boot-content">
        {bootLines.map((line, i) => (
          <div
            key={i}
            className={`boot-line ${visibleLines.has(i) ? 'visible' : ''}`}
          >
            {line.text}{' '}
            {line.status && <span className="boot-ok">{line.status}</span>}
          </div>
        ))}

        <div className={`boot-progress ${showProgress ? 'visible' : ''}`}>
          <div className="boot-progress-bar" />
        </div>

        {showEnter && (
          <div
            className="boot-line boot-enter visible"
            onClick={handleEnter}
            role="button"
            tabIndex={0}
            aria-label="Enter the experience"
          >
            [ ENTER_EXPERIENCE ]
          </div>
        )}

        {/* Skip hint - always visible during boot */}
        <div className="boot-skip-hint">
          Press ESC or click to skip
        </div>
      </div>
      <div className="boot-scanline" />
    </div>
  );
}
