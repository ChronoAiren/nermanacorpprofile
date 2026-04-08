import { useEffect, useRef } from 'react';
import { useReveal } from '../../hooks/useAnimations';
import './AboutSection.css';
import data from '../../data.json';

// Fallback data if not provided in data.json
const FALLBACK_SKILLS = [
  { name: 'INTERFACE_DESIGN', level: 92 },
  { name: 'HARDWARE_HACKING', level: 78 },
  { name: 'NEURAL_NETWORKS', level: 85 },
  { name: 'DATA_ENCRYPTION', level: 96 },
  { name: 'SYSTEMS_DESIGN', level: 88 },
];

const FALLBACK_EXPERIENCE = [
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
  if (!name || level === undefined) return null;
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

  // Skip if entry has no meaningful data
  if (!entry || (!entry.title && !entry.company && !entry.description)) return null;

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
          {entry.title && <h5 className="log-title">{entry.title}</h5>}
          {entry.company && <span className="log-org">// {entry.company}</span>}
        </div>
        {entry.description && <p className="log-desc">{entry.description}</p>}
        {entry.date && <span className="log-date">{entry.date}</span>}
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

  // Get data from JSON or use fallbacks
  // Supports both: data.skills (old array) and data.skills.items (new structure)
  const { personal } = data;
  const skills = data.skills?.items || data.skills || FALLBACK_SKILLS;
  const experience = data.experience?.items || data.experience || FALLBACK_EXPERIENCE;

  // Check if we have any about data to show
  const hasAboutData = personal?.name || personal?.subtitle || skills.length > 0 || experience.length > 0;
  if (!hasAboutData) return null;

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
        {/* Profile Image Column - show if we have image, name (for placeholder), or meta data */}
        {(personal?.image || personal?.name || personal?.location || personal?.status || personal?.subnetId) && (
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
                {personal?.image ? (
                  <img
                    src={personal.image}
                    alt={`${personal.name || 'Profile'}`}
                    className="profile-portrait"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                {/* CSS Avatar Placeholder */}
                <div 
                  className="profile-portrait-placeholder" 
                  style={{ display: personal?.image ? 'none' : 'flex' }}
                >
                  <span className="placeholder-initials">
                    {personal?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() || 'ME'}
                  </span>
                </div>
                <div className="scan-overlay" />
              </div>
            </div>
            {(personal?.location || personal?.status || personal?.subnetId) && (
              <div className="profile-meta">
                {personal?.location && (
                  <div className="profile-meta-item">
                    <span className="meta-label">LOCATION</span>
                    <span className="meta-value">{personal.location}</span>
                  </div>
                )}
                {personal?.status && (
                  <div className="profile-meta-item">
                    <span className="meta-label">STATUS</span>
                    <span className="meta-value">
                      <span className="status-dot pulse" /> {personal.status}
                    </span>
                  </div>
                )}
                {personal?.subnetId && (
                  <div className="profile-meta-item">
                    <span className="meta-label">SUBNET_ID</span>
                    <span className="meta-value">{personal.subnetId}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Info Column */}
        {(personal?.name || personal?.subtitle || skills.length > 0) && (
          <div className="about-info">
            {(personal?.name || personal?.subtitle) && (
              <div
                ref={nameRef}
                className={`about-name reveal-element ${nameVisible ? 'revealed' : ''}`}
              >
                {personal?.name && (
                  <h3
                    className="name-title glitch-text"
                    data-text={personal.name}
                  >
                    {personal.name}
                  </h3>
                )}
                {personal?.subtitle && <p className="name-desc">{personal.subtitle}</p>}
              </div>
            )}

            {skills.length > 0 && (
              <div
                ref={skillsRef}
                className={`about-skills reveal-element ${skillsVisible ? 'revealed' : ''}`}
              >
                <h4 className="subsection-title">OPERATIONAL_SKILLS</h4>
                <div className="skills-list">
                  {skills.map((skill) => (
                    <SkillBar
                      key={skill.name || Math.random()}
                      name={skill.name}
                      level={skill.level}
                      shouldAnimate={skillsVisible}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Activity Log */}
      {experience.length > 0 && (
        <div className="activity-log">
          <h4
            ref={logTitleRef}
            className={`subsection-title reveal-element ${logTitleVisible ? 'revealed' : ''}`}
          >
            ACTIVITY_LOG
          </h4>
          <div className="log-timeline">
            {experience.map((entry, i) => (
              <TimelineEntry key={entry.company || i} entry={entry} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications?.items?.length > 0 && (
        <div className="certifications-section">
          <h4 className="subsection-title">CERTIFICATIONS</h4>
          <div className="certifications-list">
            {data.certifications.items.map((cert, i) => {
              // Check if certification has a link (format: "Name — Issuer|https://url" or just "Name — Issuer")
              const parts = cert.split('|');
              const displayText = parts[0];
              const link = parts[1];
              
              return (
                <div key={i} className="certification-item">
                  {link ? (
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="certification-link"
                    >
                      <span className="certification-text">{displayText}</span>
                      <span className="material-icons certification-icon">open_in_new</span>
                    </a>
                  ) : (
                    <span className="certification-text">{displayText}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.items?.length > 0 && (
        <div className="education-section">
          <h4 className="subsection-title">EDUCATION</h4>
          <div className="education-list">
            {data.education.items.map((edu, i) => (
              <div key={i} className="education-item">
                {edu.link ? (
                  <a 
                    href={edu.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="education-link"
                  >
                    <div className="education-header">
                      <span className="education-degree">{edu.degree}</span>
                      <span className="material-icons education-icon">open_in_new</span>
                    </div>
                    <div className="education-details">
                      {edu.school && <span className="education-school">{edu.school}</span>}
                      {edu.location && <span className="education-location">{edu.location}</span>}
                    </div>
                    <div className="education-meta">
                      {edu.year && <span className="education-year">{edu.year}</span>}
                      {edu.status && <span className="education-status">{edu.status}</span>}
                    </div>
                  </a>
                ) : (
                  <>
                    <div className="education-header">
                      <span className="education-degree">{edu.degree}</span>
                    </div>
                    <div className="education-details">
                      {edu.school && <span className="education-school">{edu.school}</span>}
                      {edu.location && <span className="education-location">{edu.location}</span>}
                    </div>
                    <div className="education-meta">
                      {edu.year && <span className="education-year">{edu.year}</span>}
                      {edu.status && <span className="education-status">{edu.status}</span>}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
