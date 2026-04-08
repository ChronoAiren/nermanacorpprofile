import { useReveal, useLiveTimestamp } from '../../hooks/useAnimations';
import './ProjectsGallery.css';

const PROJECTS = [
  {
    id: '_4372201',
    title: 'NEURAL_INTERFACE_V1',
    desc: 'Experimental hardware bridge for direct cortical data streaming. Optimized for low-latency neural feedback loops.',
    tech: ['RUST_CORE', 'WEB_GL', 'NEURAL_API'],
    status: 'DEPLOY',
    image: '/project-neural.png',
  },
  {
    id: '_5891330',
    title: 'VOID_ENCRYPTION',
    desc: 'Quantum-resistant cryptographic layer utilizing multi-dimensional noise injection protocols.',
    tech: ['QUANTUM', 'CRYPTO', 'PROTOCOL'],
    status: 'ACTIVE',
    image: '/project-encryption.png',
  },
  {
    id: '_7024518',
    title: 'ORBITAL_PULSE',
    desc: 'Global monitoring array for real-time atmospheric data collection and predictive modeling.',
    tech: ['SATELLITE', 'ML_CORE', 'DATA_VIZ'],
    status: 'DEPLOY',
    image: '/project-neural.png',
  },
  {
    id: '_3019742',
    title: 'MONOLITH_CORE',
    desc: 'The central backbone architecture for distributed computing networks. Stability redefined.',
    tech: ['GO_LANG', 'GRPC', 'K8S'],
    status: 'STABLE',
    image: '/project-monolith.png',
  },
  {
    id: '_6147893',
    title: 'SILICON_DREAMS',
    desc: 'AI-driven creative engine for synthetic environment generation and procedural art.',
    tech: ['GEN_AI', 'UNREAL', 'PYTHON'],
    status: 'ACTIVE',
    image: '/project-silicon.png',
  },
  {
    id: '_8290164',
    title: 'KINETIC_SYNC',
    desc: 'Advanced haptic synchronization for tele-operated robotics systems in high-precision environments.',
    tech: ['HAPTICS', 'ROS2', 'C++'],
    status: 'TESTING',
    image: '/project-encryption.png',
  },
];

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useReveal();

  return (
    <article
      ref={ref}
      className={`project-card reveal-element ${isVisible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="card-header">
        <span className="card-id">ID: {project.id}</span>
        <span className="card-status">[VIEW:{project.status}]</span>
      </div>

      <div className="card-visual">
        <div className="hud-container card-hud">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />
          <div className="card-image-wrapper">
            <img
              src={project.image}
              alt={`${project.title} project`}
              className="card-image"
              loading="lazy"
            />
            <div className="card-scan-line" />
          </div>
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.desc}</p>
        <div className="card-tech">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>

      <a href="#" className="card-link btn-bracket" onClick={(e) => e.preventDefault()}>
        [ VIEW_PROJECT ]
      </a>
    </article>
  );
}

export default function ProjectsGallery() {
  const [headerRef, headerVisible] = useReveal();
  const timestamp = useLiveTimestamp();

  return (
    <section id="projects" className="section section-projects">
      <div
        ref={headerRef}
        className={`section-header reveal-element ${headerVisible ? 'revealed' : ''}`}
      >
        <div className="section-label">
          <span className="label-bracket">[</span>
          <span className="label-text">SECTION_02</span>
          <span className="label-bracket">]</span>
        </div>
        <h2
          className="section-title glitch-text"
          data-text="PROJECT_GALLERY"
        >
          PROJECT_GALLERY
        </h2>
        <div className="section-meta">
          <span>SYSTEM_VERSION: 4.0.2</span>
          <span className="meta-divider">|</span>
          <span>TIMESTAMP: {timestamp}</span>
          <span className="meta-divider">|</span>
          <span>
            STATUS: <span className="status-dot pulse" /> ONLINE
          </span>
        </div>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
