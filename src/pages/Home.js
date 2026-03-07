import React from "react";
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

      <div className="hero-wrap">
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
      </div>
    </section>
  );
}
