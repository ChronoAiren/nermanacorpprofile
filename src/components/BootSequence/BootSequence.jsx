import { useState, useEffect, useCallback } from 'react';
import './BootSequence.css';

const BOOT_LINES = [
  { text: 'MONOLITH_OS V4.0.2', delay: 0 },
  { text: 'INITIALIZING KERNEL...', delay: 250 },
  { text: 'LOADING NEURAL_INTERFACE...', delay: 550 },
  { text: 'SCANNING BIOMETRIC DATA...', delay: 900, status: '[OK]' },
  { text: 'ENCRYPTION_LEVEL: V4', delay: 1200, status: '[ACTIVE]' },
  { text: 'RENDERING HUD COMPONENTS...', delay: 1500, status: '[OK]' },
  { text: 'SYSTEM_STATUS:', delay: 1800, status: 'ONLINE' },
];

const PROGRESS_DELAY = 2100;
const ENTER_DELAY = 2800;

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(new Set());
  const [showProgress, setShowProgress] = useState(false);
  const [showEnter, setShowEnter] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    /* Reveal each line with staggered delay */
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => new Set([...prev, i]));
      }, line.delay)
    );

    /* Show progress bar */
    timers.push(setTimeout(() => setShowProgress(true), PROGRESS_DELAY));

    /* Show enter prompt */
    timers.push(setTimeout(() => setShowEnter(true), ENTER_DELAY));

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = useCallback(() => {
    setIsHidden(true);
    document.body.classList.remove('boot-active');
    setTimeout(() => onComplete?.(), 800);
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

  return (
    <div
      className={`boot-overlay ${isHidden ? 'hidden' : ''}`}
      role="dialog"
      aria-label="System boot sequence"
    >
      <div className="boot-content">
        {BOOT_LINES.map((line, i) => (
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
      </div>
      <div className="boot-scanline" />
    </div>
  );
}
