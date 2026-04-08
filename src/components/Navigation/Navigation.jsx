import { useActiveSection, useTheme } from '../../hooks/useAnimations';
import './Navigation.css';
import data from '../../data.json';

const SECTIONS = [
  { id: 'home',     label: 'HOME', icon: 'home',      num: '01' },
  { id: 'projects', label: 'DATA', icon: 'grid_view',  num: '02' },
  { id: 'about',    label: 'BIO',  icon: 'person',     num: '03' },
  { id: 'contact',  label: 'LINK', icon: 'terminal',   num: '04' },
];

export default function Navigation() {
  const activeSection         = useActiveSection(SECTIONS.map((s) => s.id));
  const [theme, toggleTheme]  = useTheme();

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Desktop Top Nav ── */}
      <header className="top-nav">
        <div className="top-nav-brand">
          <span className="brand-bracket">[</span>
          <span className="brand-text glitch-text" data-text={data.brand?.name || 'MONOLITH'}>
            {data.brand?.name || 'MONOLITH'}
          </span>
          <span className="brand-bracket">]</span>
          <span className="brand-version">{data.brand?.version || 'V4.0.2'}</span>
        </div>

        <nav className="top-nav-links" aria-label="Main navigation">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`nav-link ${activeSection === s.id ? 'active' : ''}`}
              onClick={(e) => scrollTo(e, s.id)}
            >
              <span className="nav-link-id">{s.num}</span>
              <span className="nav-link-label">{s.label}</span>
            </a>
          ))}
        </nav>

        <div className="top-nav-right">
          <div className="top-nav-status">
            <span className="status-dot pulse" />
            <span className="status-text">SYS_ONLINE</span>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="material-icons icon-dark">light_mode</span>
            <span className="material-icons icon-light">dark_mode</span>
          </button>
        </div>
      </header>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="bottom-nav" aria-label="Mobile navigation">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`bottom-nav-item ${activeSection === s.id ? 'active' : ''}`}
            onClick={(e) => scrollTo(e, s.id)}
          >
            <span className="material-icons">{s.icon}</span>
            <span className="bottom-nav-label">{s.label}</span>
          </a>
        ))}
        {/* Theme toggle in mobile bottom nav */}
        <button
          className="bottom-nav-item bottom-nav-theme"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="material-icons icon-dark">light_mode</span>
          <span className="material-icons icon-light">dark_mode</span>
          <span className="bottom-nav-label">THEME</span>
        </button>
      </nav>
    </>
  );
}
