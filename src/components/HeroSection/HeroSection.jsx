import { useRef, useEffect, useState } from 'react';
import { useReveal, useCounter, useTypewriter } from '../../hooks/useAnimations';
import './HeroSection.css';
import data from '../../data.json';

export default function HeroSection() {
  const [metaRef, metaVisible] = useReveal();
  const [titleRef, titleVisible] = useReveal();
  const [subtitleRef, subtitleVisible] = useReveal();
  const [descRef, descVisible] = useReveal();
  const [actionsRef, actionsVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [visualRef, visualVisible] = useReveal();
  const [scrollRef, scrollVisible] = useReveal();

  const { personal, hero } = data;

  // Don't render section if no hero data
  if (!hero && !personal) return null;

  const tagline = hero?.tagline || '';
  const stats = hero?.stats || {};

  const [typedText, typingDone] = useTypewriter(tagline, 35, descVisible);
  const projectCount = useCounter(stats.projects || 0, 1500, statsVisible);
  const uptimeCount = useCounter(stats.uptimeHours || 0, 2000, statsVisible);
  const deployCount = useCounter(stats.deployCount || 0, 1500, statsVisible);

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
          {/* Meta - only show if we have a name */}
          {personal?.name && (
            <div
              ref={metaRef}
              className={`hero-meta reveal-element ${metaVisible ? 'revealed' : ''}`}
            >
              <span className="meta-label">[ IDENTITY_FILE ]</span>
              <span className="meta-separator" />
              <span className="meta-value blink-cursor">ACCESSING</span>
            </div>
          )}

          {/* Title */}
          {personal?.title && (
            <h1
              ref={titleRef}
              className={`hero-title reveal-element ${titleVisible ? 'revealed' : ''}`}
            >
              {personal.title.split(' ').map((word, i) => (
                <span key={i} className="hero-title-line">
                  <span className="title-word glitch-text" data-text={word}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          )}

          {/* Level */}
          {personal?.level && (
            <div
              ref={subtitleRef}
              className={`hero-subtitle reveal-element ${subtitleVisible ? 'revealed' : ''}`}
            >
              <span className="meta-label">[ PERMISSION_LEVEL ]</span>
              <span className="hero-level">LVL: {personal.level}</span>
            </div>
          )}

          {/* Tagline */}
          {tagline && (
            <p
              ref={descRef}
              className={`hero-description reveal-element ${descVisible ? 'revealed' : ''}`}
            >
              {typedText}
              {!typingDone && <span className="typing-cursor" />}
            </p>
          )}

          {/* Actions */}
          <div
            ref={actionsRef}
            className={`hero-actions reveal-element ${actionsVisible ? 'revealed' : ''}`}
          >
            <a href="#projects" className="btn-primary">
              <span className="btn-text">ENTER_EXPERIENCE</span>
              <span className="btn-arrow material-icons">arrow_forward</span>
              <span className="btn-glitch-layer" />
            </a>
            {personal?.name && (
              <a href="#about" className="btn-bracket">[ VIEW_IDENTITY ]</a>
            )}
          </div>

          {/* Stats */}
          {(stats.projects || stats.uptimeHours || stats.deployCount) && (
            <div
              ref={statsRef}
              className={`hero-stats reveal-element ${statsVisible ? 'revealed' : ''}`}
            >
              {stats.projects !== undefined && (
                <div className="stat-item">
                  <span className="stat-label">PROJECTS</span>
                  <span className="stat-value">{projectCount}</span>
                </div>
              )}
              {stats.projects !== undefined && stats.uptimeHours !== undefined && (
                <div className="stat-divider" />
              )}
              {stats.uptimeHours !== undefined && (
                <div className="stat-item">
                  <span className="stat-label">UPTIME_HRS</span>
                  <span className="stat-value">{uptimeCount.toLocaleString()}</span>
                </div>
              )}
              {stats.uptimeHours !== undefined && stats.deployCount !== undefined && (
                <div className="stat-divider" />
              )}
              {stats.deployCount !== undefined && (
                <div className="stat-item">
                  <span className="stat-label">DEPLOY_COUNT</span>
                  <span className="stat-value">{deployCount}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Visual / Portrait - shown if image exists OR if we have name for placeholder */}
        {(personal?.image || personal?.name) && (
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
                {personal?.image ? (
                  <img
                    src={personal.image}
                    alt={`${personal.name || 'Profile'}`}
                    className="hero-portrait"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                {/* CSS Avatar Placeholder - shown when no image or image fails */}
                <div 
                  className="hero-portrait-placeholder" 
                  style={{ display: personal?.image ? 'none' : 'flex' }}
                >
                  <span className="placeholder-initials">
                    {personal?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() || 'ME'}
                  </span>
                </div>
                <div className="scan-overlay" />
                <div className="image-hud-data">
                  <span>SCAN_ACTIVE: {scanPercent}%</span>
                  <span>THREAT: NONE</span>
                </div>
              </div>
            </div>
            {(personal?.location || personal?.subnetId) && (
              <div className="hud-telemetry">
                {personal?.location && (
                  <div className="telemetry-line">
                    <span className="telemetry-label">LOC</span>
                    <span className="telemetry-value">{personal.location}</span>
                  </div>
                )}
                {personal?.subnetId && (
                  <div className="telemetry-line">
                    <span className="telemetry-label">ID</span>
                    <span className="telemetry-value">{personal.subnetId}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
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
