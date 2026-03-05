import React, { useEffect, useState } from 'react';
import './Sidebar.css';

const NAV_ITEMS = [
  {
    key: 'home',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V21h13V9.5" />
      </svg>
    ),
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="6" height="6" />
        <rect x="14" y="4" width="6" height="6" />
        <rect x="4" y="14" width="6" height="6" />
        <rect x="14" y="14" width="6" height="6" />
      </svg>
    ),
  },
  {
    key: 'experience',
    label: 'Experience',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h14" />
        <path d="M4 12h10" />
        <path d="M4 18h16" />
        <circle cx="20" cy="6" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: 'contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="m4 8 8 6 8-6" />
      </svg>
    ),
  },
];

export default function Sidebar({ activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavigate = (key) => {
    setMobileOpen(false);
    onNavigate(key);
  };

  return (
    <>
      <button
        type="button"
        className={`mobile-menu-toggle ${mobileOpen ? 'is-open' : ''}`}
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
      >
        <span className="menu-line line-1" />
        <span className="menu-line line-2" />
        <span className="menu-line line-3" />
      </button>

      <div
        className={`mobile-nav-backdrop ${mobileOpen ? 'is-open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="logo-mark" aria-hidden="true">
            <span className="dot blue" />
            <span className="dot pink" />
          </div>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`nav-item ${activePage === item.key ? 'active' : ''}`}
                onClick={() => handleNavigate(item.key)}
              >
                <span className="active-bar" />
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="availability">
            <span className="avail-dot" />
            <span>Available for work</span>
          </div>
        </div>
      </aside>

      <aside className={`mobile-sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="sidebar-inner mobile-sidebar-inner">
          <div className="logo-mark" aria-hidden="true">
            <span className="dot blue" />
            <span className="dot pink" />
          </div>

          <nav className={`sidebar-nav mobile-sidebar-nav ${mobileOpen ? 'drawer-open' : ''}`}>
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.key}
                type="button"
                className={`nav-item ${activePage === item.key ? 'active' : ''}`}
                onClick={() => handleNavigate(item.key)}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span className="active-bar" />
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="availability">
            <span className="avail-dot" />
            <span>Available for work</span>
          </div>
        </div>
      </aside>
    </>
  );
}
