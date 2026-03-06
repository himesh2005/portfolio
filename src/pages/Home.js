import React from 'react';
import './Home.css';

const FLOATERS = [
  { id: 1, label: 'Pr', className: 'pr', pos: 't1', dur: '14s', delay: '0s' },
  { id: 2, label: 'Da', className: 'da', pos: 't2', dur: '17s', delay: '-2s' },
  { id: 3, label: 'Cc', className: 'cc', pos: 't3', dur: '19s', delay: '-4s' },
  { id: 4, label: 'Ae', className: 'ae', pos: 't4', dur: '13s', delay: '-1s' },
  { id: 5, label: 'Ps', className: 'ps', pos: 't5', dur: '21s', delay: '-6s' },
  { id: 6, label: 'AI', className: 'ai', pos: 't6', dur: '16s', delay: '-3s' },
  { id: 7, label: 'Pr', className: 'pr', pos: 't7', dur: '18s', delay: '-5s' },
  { id: 8, label: 'Ae', className: 'ae', pos: 't8', dur: '22s', delay: '-8s' },
];

const BADGES = [
  { label: 'Premiere Pro', dot: 'dot-pr' },
  { label: 'DaVinci Resolve', dot: 'dot-da' },
  { label: 'CapCut', dot: 'dot-cc' },
  { label: 'After Effects', dot: 'dot-ae' },
  { label: 'Photoshop', dot: 'dot-ps' },
  { label: 'AI Video', dot: 'dot-ai' },
];

export default function Home({ onNavigate }) {
  return (
    <section className="home-page page-shell">
      <div className="tool-layer" aria-hidden="true">
        {FLOATERS.map((item) => (
          <div
            key={item.id}
            className={`tool-chip ${item.className} ${item.pos}`}
            style={{ '--dur': item.dur, '--delay': item.delay }}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="hero-wrap">
        <p className="fade-up delay-0 eyebrow">PROFESSIONAL VIDEO EDITOR</p>
        <h1 className="fade-up delay-1 hero-name">Abhi Chakrapani</h1>
        <p className="fade-up delay-2 hero-copy">
          I turn raw footage into stories that stop the scroll. Cinematic edits, precise cuts - built for creators
          who refuse to be average.
        </p>

        <div className="fade-up delay-3 badge-row">
          {BADGES.map((badge) => (
            <span className="tool-badge" key={badge.label}>
              <span className={`badge-dot ${badge.dot}`} />
              {badge.label}
            </span>
          ))}
        </div>

        <div className="fade-up delay-4 action-row">
          <button type="button" className="cta-primary" onClick={() => onNavigate('projects')}>
            Watch Reel
          </button>
          <button type="button" className="cta-secondary" onClick={() => onNavigate('projects')}>
            See My Work
          </button>
        </div>

        <div className="fade-up delay-5 stat-row">
          <div className="stat-item">
            <strong>80+</strong>
            <span>Projects</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <strong>4 Years</strong>
            <span>Exp.</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <strong>2.5M+</strong>
            <span>Views</span>
          </div>
        </div>
      </div>
    </section>
  );
}
