import { useRef, useEffect, useState } from 'react';
import { useReveal, useCounter, useTypewriter } from '../../hooks/useAnimations';
import './HeroSection.css';

const HERO_TEXT = 'Accessing encrypted nodes. Visual transmission active. Awaiting user input.';

export default function HeroSection() {
  const [metaRef, metaVisible] = useReveal();
  const [titleRef, titleVisible] = useReveal();
  const [subtitleRef, subtitleVisible] = useReveal();
  const [descRef, descVisible] = useReveal();
  const [actionsRef, actionsVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [visualRef, visualVisible] = useReveal();
  const [scrollRef, scrollVisible] = useReveal();

  const [typedText, typingDone] = useTypewriter(HERO_TEXT, 35, descVisible);
  const projectCount = useCounter(47, 1500, statsVisible);
  const uptimeCount = useCounter(12480, 2000, statsVisible);
  const deployCount = useCounter(203, 1500, statsVisible);

  const [scanPercent, setScanPercent] = useState(0);

  /* Portrait scan percentage animation */
  useEffect(() => {
    if (!visualVisible) return;
    let val = 0;
    const interval = setInterval(() => {
      val += 1;
      if (val > 100) {
        clearInterval(interval);
        return;
      }
      setScanPercent(val);
    }, 30);
    return () => clearInterval(interval);
  }, [visualVisible]);

  /* Make HUD corners visible when in view */
  const hudRef = useRef(null);
  useEffect(() => {
    if (visualVisible && hudRef.current) {
      hudRef.current.classList.add('visible');
    }
  }, [visualVisible]);

  return (
    <section id="home" className="section section-home">
      <div className="hero-grid">
        <div className="hero-content">
          <div
            ref={metaRef}
            className={`hero-meta reveal-element ${metaVisible ? 'revealed' : ''}`}
          >
            <span className="meta-label">[ IDENTITY_FILE ]</span>
            <span className="meta-separator" />
            <span className="meta-value blink-cursor">ACCESSING</span>
          </div>

          <h1
            ref={titleRef}
            className={`hero-title reveal-element ${titleVisible ? 'revealed' : ''}`}
          >
            <span className="hero-title-line">
              <span className="title-word glitch-text" data-text="THE">THE</span>
            </span>
            <span className="hero-title-line">
              <span className="title-word glitch-text" data-text="MONOLITH">MONOLITH</span>
            </span>
          </h1>

          <div
            ref={subtitleRef}
            className={`hero-subtitle reveal-element ${subtitleVisible ? 'revealed' : ''}`}
          >
            <span className="meta-label">[ PERMISSION_LEVEL ]</span>
            <span className="hero-level">LVL: 99</span>
          </div>

          <p
            ref={descRef}
            className={`hero-description reveal-element ${descVisible ? 'revealed' : ''}`}
          >
            {typedText}
            {!typingDone && <span className="typing-cursor" />}
          </p>

          <div
            ref={actionsRef}
            className={`hero-actions reveal-element ${actionsVisible ? 'revealed' : ''}`}
          >
            <a href="#projects" className="btn-primary">
              <span className="btn-text">ENTER_EXPERIENCE</span>
              <span className="btn-arrow material-icons">arrow_forward</span>
              <span className="btn-glitch-layer" />
            </a>
            <a href="#about" className="btn-bracket">[ VIEW_IDENTITY ]</a>
          </div>

          <div
            ref={statsRef}
            className={`hero-stats reveal-element ${statsVisible ? 'revealed' : ''}`}
          >
            <div className="stat-item">
              <span className="stat-label">PROJECTS</span>
              <span className="stat-value">{projectCount}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-label">UPTIME_HRS</span>
              <span className="stat-value">{uptimeCount.toLocaleString()}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-label">DEPLOY_COUNT</span>
              <span className="stat-value">{deployCount}</span>
            </div>
          </div>
        </div>

        <div
          ref={visualRef}
          className={`hero-visual reveal-element ${visualVisible ? 'revealed' : ''}`}
        >
          <div className="hud-container" ref={hudRef}>
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
            <div className="hero-image-wrapper">
              <img
                src="/hero-portrait.png"
                alt="V.RAVEN Operative Profile"
                className="hero-portrait"
              />
              <div className="scan-overlay" />
              <div className="image-hud-data">
                <span>SCAN_ACTIVE: {scanPercent}%</span>
                <span>THREAT: NONE</span>
              </div>
            </div>
          </div>
          <div className="hud-telemetry">
            <div className="telemetry-line">
              <span className="telemetry-label">LAT</span>
              <span className="telemetry-value">35.6762°N</span>
            </div>
            <div className="telemetry-line">
              <span className="telemetry-label">LNG</span>
              <span className="telemetry-value">139.6503°E</span>
            </div>
            <div className="telemetry-line">
              <span className="telemetry-label">SECTOR</span>
              <span className="telemetry-value">NEO_TOKYO_09</span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`scroll-indicator reveal-element ${scrollVisible ? 'revealed' : ''}`}
      >
        <span className="scroll-text">SCROLL_DOWN</span>
        <div className="scroll-arrow">
          <span className="material-icons">expand_more</span>
        </div>
      </div>
    </section>
  );
}
