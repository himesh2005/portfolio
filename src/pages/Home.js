import React, { useRef, useEffect, useState } from "react";
import ShinyText from "../components/ShinyText";
import "./Home.css";

const FLOATERS = [
  { id: 1, label: "Pr", className: "pr", pos: "t1", dur: "8.4s", delay: "0s" },
  {
    id: 2,
    label: "Da",
    className: "da",
    pos: "t2",
    dur: "9.2s",
    delay: "-1.4s",
  },
  {
    id: 3,
    label: "Cc",
    className: "cc",
    pos: "t3",
    dur: "10.1s",
    delay: "-2.8s",
  },
  {
    id: 4,
    label: "Ae",
    className: "ae",
    pos: "t4",
    dur: "8.1s",
    delay: "-0.9s",
  },
  {
    id: 5,
    label: "Ps",
    className: "ps",
    pos: "t5",
    dur: "10.8s",
    delay: "-4.6s",
  },
  {
    id: 6,
    label: "AI",
    className: "ai",
    pos: "t6",
    dur: "9.4s",
    delay: "-2.2s",
  },
  {
    id: 7,
    label: "Pr",
    className: "pr",
    pos: "t7",
    dur: "10.4s",
    delay: "-3.9s",
  },
  {
    id: 8,
    label: "Ae",
    className: "ae",
    pos: "t8",
    dur: "11.2s",
    delay: "-6.1s",
  },
];

const BADGES = [
  { label: "Premiere Pro", dot: "dot-pr" },
  { label: "DaVinci Resolve", dot: "dot-da" },
  { label: "CapCut", dot: "dot-cc" },
  { label: "After Effects", dot: "dot-ae" },
  { label: "Photoshop", dot: "dot-ps" },
  { label: "AI Video", dot: "dot-ai" },
];

const HERO_NAME = "Abhi Chakrapani";

export default function Home({ onNavigate }) {
  const sectionRef = useRef(null);
  const igRef = useRef(null);
  const [socVisible, setSocVisible] = useState(false);
  const socialRevealTimeoutRef = useRef(null);

  useEffect(() => {
    if (igRef.current) {
      igRef.current.innerHTML =
        '<behold-widget feed-id="6TphyaByVT7Y9QNEAdoG"></behold-widget>';
    }
  }, []);

  useEffect(() => {
    const TOOLS_INTRO_TOTAL_MS = 1000;
    const introStartTime = performance.now();

    const scheduleSocialReveal = () => {
      const elapsed = performance.now() - introStartTime;
      const remaining = Math.max(0, TOOLS_INTRO_TOTAL_MS - elapsed);

      if (socialRevealTimeoutRef.current) {
        clearTimeout(socialRevealTimeoutRef.current);
      }

      socialRevealTimeoutRef.current = setTimeout(() => {
        setSocVisible(true);
      }, remaining);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        scheduleSocialReveal();
        obs.disconnect();
      },
      { threshold: 0.08 },
    );

    if (sectionRef.current) obs.observe(sectionRef.current);

    return () => {
      obs.disconnect();
      if (socialRevealTimeoutRef.current) {
        clearTimeout(socialRevealTimeoutRef.current);
        socialRevealTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <section className="home-page page-shell">
      <div className="tool-layer" aria-hidden="true">
        {FLOATERS.map((item, idx) => (
          <div
            key={item.id}
            className={`tool-chip ${item.className} ${item.pos}`}
            style={{
              "--dur": item.dur,
              "--delay": item.delay,
              "--enter-delay": `${0.3 + idx * 0.2 + (idx % 2 === 0 ? 0 : 0.05)}s`,
            }}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="hero-wrap hero-wrap-centered">
        <p className="fade-up delay-0 eyebrow">PROFESSIONAL VIDEO EDITOR</p>
        <h1 className="hero-name" aria-label={HERO_NAME}>
          <ShinyText
            text={HERO_NAME}
            className="hero-name-reveal"
            speed={8.5}
            color="rgba(255, 255, 255, 0.68)"
            shineColor="rgba(255, 255, 255, 1)"
            spread={115}
            direction="left"
            delay={0.6}
          />
        </h1>
        <p className="fade-up delay-2 hero-copy">
          I turn raw footage into stories that stop the scroll. Cinematic edits,
          precise cuts - built for creators who refuse to be average.
        </p>

        <div className="fade-up delay-3 badge-row">
          {BADGES.map((badge, idx) => (
            <span
              className="tool-badge pop-badge"
              style={{ "--i": idx }}
              key={badge.label}
            >
              <span className={`badge-dot ${badge.dot}`} />
              {badge.label}
            </span>
          ))}
        </div>

        <div className="fade-up delay-4 action-row">
          <button
            type="button"
            className="cta-secondary"
            onClick={() => onNavigate("projects")}
          >
            See My Work
          </button>
        </div>

        <div className="fade-up delay-5 stat-row">
          <div className="stat-item">
            <strong>2+ Years</strong>
            <span>Exp.</span>
          </div>
        </div>

        {/* ── SCROLL HINT ── */}
        <div className="scroll-hint">
          <div className="scroll-hint-line" />
          <span className="scroll-hint-text">scroll</span>
        </div>
      </div>

      {/* ── SOCIAL SECTION ── */}
      <div
        className="social-section social-section-below-fold"
        ref={sectionRef}
      >
        <p className="social-label">Find me online</p>

        <div className="social-grid">
          {/* INSTAGRAM */}
          <div
            className={`social-card ig-card ${socVisible ? "card-visible" : ""}`}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="social-card-accent ig-accent" />

            <div className="social-card-header">
              <div className="social-handle-row">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <defs>
                    <linearGradient id="ig-gr" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f72585" />
                      <stop offset="100%" stopColor="#7b5ea7" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    stroke="url(#ig-gr)"
                  />
                  <circle cx="12" cy="12" r="4.5" stroke="url(#ig-gr)" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="#f72585"
                    stroke="none"
                  />
                </svg>
                <span className="social-handle">@abhi.keyf</span>
              </div>
              <a
                href="https://www.instagram.com/abhi.keyf?igsh=OHpkaHdieGJwdWtt"
                target="_blank"
                rel="noreferrer"
                className="social-pill-btn ig-btn"
              >
                Follow
              </a>
            </div>

            {/* Behold widget injected here */}
            <div ref={igRef} className="behold-wrapper" />
          </div>

          {/* LINKEDIN */}
          <div
            className={`social-card li-card ${socVisible ? "card-visible" : ""}`}
            style={{ transitionDelay: "180ms" }}
          >
            <div className="social-card-accent li-accent" />

            <div className="social-card-header">
              <div className="social-handle-row">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="#4e82c4"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027
              -3.037-1.852-3.037-1.853 0-2.136 1.445-2.136
              2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
              1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267
              5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926
              -2.063-2.065 0-1.138.92-2.063 2.063-2.063
              1.14 0 2.064.925 2.064 2.063 0 1.139-.925
              2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564
              v11.452zM22.225 0H1.771C.792 0 0 .774 0
              1.729v20.542C0 23.227.792 24 1.771
              24h20.451C23.2 24 24 23.227 24
              22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
                <span className="social-handle">Abhi Chakrapani</span>
              </div>
              <a
                href="https://www.linkedin.com/in/abhi-chakrapani-7a0114301"
                target="_blank"
                rel="noreferrer"
                className="social-pill-btn li-btn"
              >
                Connect
              </a>
            </div>

            <div className="li-card-body">
              <div className="li-profile-row">
                <div className="li-avatar">AC</div>
                <div className="li-info">
                  <p className="li-name">Abhi Chakrapani</p>
                  <p className="li-title">Video Editor</p>
                  <p className="li-location">Nagpur, India</p>
                </div>
              </div>

              <div className="li-divider" />

              <div className="li-stats-row">
                {[
                  { v: "2+", l: "Years Exp." },
                  { v: "160+", l: "Connections" },
                  { v: "Open", l: "To Work" },
                ].map((s) => (
                  <div key={s.l} className="li-stat">
                    <span className="li-stat-value">{s.v}</span>
                    <span className="li-stat-label">{s.l}</span>
                  </div>
                ))}
              </div>

              <div className="li-skills-row">
                {[
                  "Video Editing",
                  "Color Grading",
                  "After Effects",
                  "DaVinci",
                ].map((sk) => (
                  <span key={sk} className="li-skill-pill">
                    {sk}
                  </span>
                ))}
              </div>

              <a
                href="https://www.linkedin.com/in/abhi-chakrapani-7a0114301"
                target="_blank"
                rel="noreferrer"
                className="li-view-btn"
              >
                View Full Profile &nbsp;↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
