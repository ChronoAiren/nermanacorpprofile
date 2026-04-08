import { useEffect, useRef } from 'react';
import { useReveal } from '../../hooks/useAnimations';
import './AboutSection.css';

const SKILLS = [
  { name: 'INTERFACE_DESIGN', level: 92 },
  { name: 'HARDWARE_HACKING', level: 78 },
  { name: 'NEURAL_NETWORKS', level: 85 },
  { name: 'DATA_ENCRYPTION', level: 96 },
  { name: 'SYSTEMS_DESIGN', level: 88 },
];

const EXPERIENCE = [
  {
    title: 'Senior System Architect',
    org: 'KRYPT_CORP',
    desc: 'Lead designer for deep-space communication arrays. Engineered high-fidelity HUD systems for orbital tactical units. Optimized data flow by 40%.',
    date: '2092 — PRESENT',
  },
  {
    title: 'Visual Operative',
    org: 'NEURAL_NET',
    desc: 'Developed biometric interface protocols for civilian-grade cybernetics. Managed cross-sector design teams in a high-latency environment.',
    date: '2090 — 2092',
  },
  {
    title: 'Interface Technician',
    org: 'VOID_STUDIOS',
    desc: 'Deployment of decentralized web frameworks. Execution of raw monochromatic visual identities for underground tech labels.',
    date: '2088 — 2090',
  },
];

function SkillBar({ name, level, shouldAnimate }) {
  const fillRef = useRef(null);

  useEffect(() => {
    if (shouldAnimate && fillRef.current) {
      fillRef.current.classList.add('animate');
    }
  }, [shouldAnimate]);

  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-value">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          ref={fillRef}
          className="skill-fill"
          style={{ '--fill-level': `${level}%` }}
        />
        <div className="skill-segments">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="skill-segment" />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineEntry({ entry, index }) {
  const [ref, isVisible] = useReveal();

  return (
    <div
      ref={ref}
      className={`log-entry reveal-element ${isVisible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="log-marker">
        <div className="marker-dot" />
        <div className="marker-line" />
      </div>
      <div className="log-content">
        <div className="log-header">
          <h5 className="log-title">{entry.title}</h5>
          <span className="log-org">// {entry.org}</span>
        </div>
        <p className="log-desc">{entry.desc}</p>
        <span className="log-date">{entry.date}</span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [headerRef, headerVisible] = useReveal();
  const [profileRef, profileVisible] = useReveal();
  const [nameRef, nameVisible] = useReveal();
  const [skillsRef, skillsVisible] = useReveal();
  const [logTitleRef, logTitleVisible] = useReveal();

  const profileHudRef = useRef(null);

  useEffect(() => {
    if (profileVisible && profileHudRef.current) {
      profileHudRef.current.classList.add('visible');
    }
  }, [profileVisible]);

  return (
    <section id="about" className="section section-about">
      <div
        ref={headerRef}
        className={`section-header reveal-element ${headerVisible ? 'revealed' : ''}`}
      >
        <div className="section-label">
          <span className="label-bracket">[</span>
          <span className="label-text">SECTION_03</span>
          <span className="label-bracket">]</span>
        </div>
        <h2
          className="section-title glitch-text"
          data-text="IDENTITY_PROFILE"
        >
          IDENTITY_PROFILE
        </h2>
      </div>

      <div className="about-grid">
        <div
          ref={profileRef}
          className={`about-profile reveal-element ${profileVisible ? 'revealed' : ''}`}
        >
          <div className="hud-container profile-hud" ref={profileHudRef}>
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
            <div className="profile-image-wrapper">
              <img
                src="/hero-portrait.png"
                alt="V.RAVEN Profile"
                className="profile-portrait"
              />
              <div className="scan-overlay" />
            </div>
          </div>
          <div className="profile-meta">
            <div className="profile-meta-item">
              <span className="meta-label">LOCATION</span>
              <span className="meta-value">Sector_09 // Neo-Tokyo</span>
            </div>
            <div className="profile-meta-item">
              <span className="meta-label">STATUS</span>
              <span className="meta-value">
                <span className="status-dot pulse" /> Active_Duty
              </span>
            </div>
            <div className="profile-meta-item">
              <span className="meta-label">SUBNET_ID</span>
              <span className="meta-value">0x7F3A_9E2B</span>
            </div>
          </div>
        </div>

        <div className="about-info">
          <div
            ref={nameRef}
            className={`about-name reveal-element ${nameVisible ? 'revealed' : ''}`}
          >
            <h3
              className="name-title glitch-text"
              data-text="V.RAVEN"
            >
              V.RAVEN
            </h3>
            <p className="name-desc">
              Digital architect and systems infiltrator specialized in minimalist
              interface construction. Executing visual protocols with surgical
              precision since 2088.
            </p>
          </div>

          <div
            ref={skillsRef}
            className={`about-skills reveal-element ${skillsVisible ? 'revealed' : ''}`}
          >
            <h4 className="subsection-title">OPERATIONAL_SKILLS</h4>
            <div className="skills-list">
              {SKILLS.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  shouldAnimate={skillsVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="activity-log">
        <h4
          ref={logTitleRef}
          className={`subsection-title reveal-element ${logTitleVisible ? 'revealed' : ''}`}
        >
          ACTIVITY_LOG
        </h4>
        <div className="log-timeline">
          {EXPERIENCE.map((entry, i) => (
            <TimelineEntry key={entry.org} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
