import { NavLink } from 'react-router-dom';
import { THEMES, useTheme } from '../ThemeContext.jsx';
import { profile } from '../content.js';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/code', label: 'Code' },
  { to: '/data', label: 'Data explorer' },
];

const THEME_LABELS = { regular: 'regular theme', aero: 'Frutiger Aero theme' };

export default function Header() {
  const { theme, setTheme } = useTheme();
  const other = THEMES.find((t) => t !== theme) ?? theme;

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="brand">{profile.name}</NavLink>
        <nav className="nav" aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className="nav-link"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {THEMES.length > 1 && (
          <button type="button" className="btn btn-small" onClick={() => setTheme(other)}>
            Switch to {THEME_LABELS[other]}
          </button>
        )}
      </div>
    </header>
  );
}
