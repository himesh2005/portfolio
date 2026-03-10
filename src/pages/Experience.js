import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Experience.css";

const EXPERIENCES = [
  {
    id: 1,
    name: "Sanjay Arora",
    company: "Shells Advertising Inc.",
    website: "https://shellsindia.com",
    websiteLabel: "shellsindia.com",
    period: "May 2025 - Present",
    tag: "CURRENT",
    role: "Senior Video Editor",
    type: "Advertising Agency - Nagpur, India",
    color: "#4361ee",
    colorRgb: "67,97,238",
    description:
      "Creating campaign videos and brand stories for one of central India's largest advertising agencies. Clients include Haldiram's, DM IMS, Spacewood and more.",
    stats: [
      { value: "12+", label: "Brand Clients" },
      { value: "34+", label: "Years Agency" },
    ],
    side: "left",
  },
  {
    id: 2,
    name: "Sneha Taori",
    company: "Personal Brand",
    website: "https://snehataori.com",
    websiteLabel: "snehataori.com",
    period: "Aug 2024 - Apr 2025",
    tag: "PREV",
    role: "Senior Video Editor",
    type: "Content Creator - India",
    color: "#f72585",
    colorRgb: "247,37,133",
    description:
      "Crafted high-retention video content for a personal brand. Built a signature visual language through precise cuts and cinematic colour grading - drove consistent audience growth.",
    stats: [
      { value: "50+", label: "Videos Edited" },
      { value: "3x", label: "Engagement" },
    ],
    side: "right",
  },
  {
    id: 3,
    name: "Freelance Projects",
    company: "Independent",
    website: null,
    websiteLabel: null,
    period: "Aug 2023 - Jul 2024",
    tag: "FREELANCE",
    role: "Video Editor",
    type: "Freelance - Remote",
    color: "#7b5ea7",
    colorRgb: "123,94,167",
    description:
      "Worked with multiple independent clients across YouTube, social media and short-film production. Developed versatile editing skills across formats, styles and genres.",
    stats: [
      { value: "10+", label: "Clients" },
      { value: "2+", label: "Years Exp." },
    ],
    side: "left",
  },
];

function buildCurve(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return (
    `M ${a.x} ${a.y} ` +
    `C ${a.x + dx * 0.15} ${a.y + dy * 0.65}, ` +
    `${b.x - dx * 0.15} ${b.y - dy * 0.65}, ` +
    `${b.x} ${b.y}`
  );
}

function ExperienceInfo({ exp, index, nameRefs }) {
  return (
    <div className={`info-block exp-${index}-info`}>
      <div className="name-row">
        <h2
          ref={(el) => {
            nameRefs.current[index] = el;
          }}
          className={`name-title anim-reveal exp-${index}-name`}
        >
          {exp.name}
        </h2>
        <span
          className={`tag-pill tag-${exp.tag.toLowerCase()} anim-reveal exp-${index}-tag`}
        >
          {exp.tag === "CURRENT" && (
            <span className="tag-live-dot" aria-hidden="true" />
          )}
          {exp.tag}
        </span>
      </div>

      <div className={`role-type-row anim-reveal exp-${index}-role`}>
        <span className="role-text" style={{ color: exp.color }}>
          {exp.role}
        </span>
        <span className="dot-sep">{"\u00b7"}</span>
        <span>{exp.type}</span>
      </div>

      <div className={`period-row anim-reveal exp-${index}-period`}>
        <span className="period-line" aria-hidden="true" />
        <span>{exp.period}</span>
      </div>

      <p className={`desc anim-reveal exp-${index}-desc`}>{exp.description}</p>

      <div className={`stats-row anim-reveal exp-${index}-stats`}>
        {exp.stats.map((stat) => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value" style={{ color: exp.color }}>
              {stat.value}
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {exp.website && (
        <a
          className={`website-link anim-reveal exp-${index}-website`}
          href={exp.website}
          target="_blank"
          rel="noreferrer"
        >
          <span>{exp.websiteLabel}</span>
          <svg viewBox="0 0 10 10" width="9" height="9" aria-hidden="true">
            <path d="M1 9L9 1M9 1H3M9 1v6" />
          </svg>
        </a>
      )}
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const dotRefs = useRef([]);
  const nameRefs = useRef([]);
  const pathRefs = useRef([]);
  const basePathRefs = useRef([]);
  const glowPathRefs = useRef([]);
  const timeoutIds = useRef([]);
  const [pts, setPts] = useState(null);

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const cr = container.getBoundingClientRect();
      const points = nameRefs.current.map((el, idx) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          // Keep node 1/3 anchored at the name start, but anchor node 2 at the name end.
          x: (idx === 1 ? r.right : r.left) - cr.left,
          y: r.top + r.height / 2 - cr.top,
        };
      });
      if (points.length !== 3 || points.some((p) => !p)) return;
      setPts(points);
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current = [];

    if (!pts) return () => {};

    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const baseEl = basePathRefs.current[i];
      const glowEl = glowPathRefs.current[i];
      const len = el.getTotalLength();
      el.style.transition = "none";
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      if (baseEl) {
        baseEl.style.transition = "none";
        baseEl.style.opacity = "0";
      }
      if (glowEl) {
        glowEl.style.transition = "none";
        glowEl.style.opacity = "0";
      }

      const delay = i === 0 ? 520 : 1720;
      const dur = i === 0 ? 1650 : 1450;
      const id = setTimeout(() => {
        if (baseEl) {
          baseEl.style.transition = "opacity 420ms ease";
          baseEl.style.opacity = "0.25";
        }
        if (glowEl) {
          glowEl.style.transition = "opacity 520ms ease";
          glowEl.style.opacity = "0.2";
        }
        el.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(0.4,0,0.2,1)`;
        requestAnimationFrame(() => {
          el.style.strokeDashoffset = "0";
        });
      }, delay);
      timeoutIds.current.push(id);
    });

    return () => {
      timeoutIds.current.forEach((id) => clearTimeout(id));
      timeoutIds.current = [];
    };
  }, [pts]);

  const path0D = pts ? buildCurve(pts[0], pts[1]) : "";
  const path1D = pts ? buildCurve(pts[1], pts[2]) : "";

  return (
    <section className="experience-page">
      <div ref={containerRef} className="experience-content-wrap">
        <h1 className="experience-heading">Experience</h1>

        {pts && (
          <svg className="experience-svg" aria-hidden="true">
            <defs>
              <linearGradient
                id="g0"
                gradientUnits="userSpaceOnUse"
                x1={pts[0].x}
                y1={pts[0].y}
                x2={pts[1].x}
                y2={pts[1].y}
              >
                <stop offset="0%" stopColor="#4361ee" stopOpacity="0" />
                <stop offset="12%" stopColor="#4361ee" stopOpacity="0.6" />
                <stop offset="88%" stopColor="#f72585" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f72585" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="g1"
                gradientUnits="userSpaceOnUse"
                x1={pts[1].x}
                y1={pts[1].y}
                x2={pts[2].x}
                y2={pts[2].y}
              >
                <stop offset="0%" stopColor="#f72585" stopOpacity="0" />
                <stop offset="12%" stopColor="#f72585" stopOpacity="0.5" />
                <stop offset="88%" stopColor="#7b5ea7" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#7b5ea7" stopOpacity="0" />
              </linearGradient>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {[path0D, path1D].map((d, i) => (
              <g key={`p-${i}`}>
                <path
                  ref={(el) => {
                    glowPathRefs.current[i] = el;
                  }}
                  d={d}
                  stroke={`url(#g${i})`}
                  strokeWidth="12"
                  fill="none"
                  filter="url(#glow)"
                  opacity="0"
                />
                <path
                  ref={(el) => {
                    basePathRefs.current[i] = el;
                  }}
                  d={d}
                  stroke={`url(#g${i})`}
                  strokeWidth="1"
                  fill="none"
                  opacity="0"
                />
                <path
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  d={d}
                  stroke={`url(#g${i})`}
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
              </g>
            ))}

            <circle r="3" opacity="0" fill="#6c83f0" filter="url(#glow)">
              <animateMotion
                path={path0D}
                dur="10s"
                begin="0.62s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.4 0 0.6 1"
              />
              <animate
                attributeName="opacity"
                values="0;0.7;0.7;0"
                keyTimes="0;0.08;0.92;1"
                dur="10s"
                begin="0.62s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="7" opacity="0" fill="#4361ee" filter="url(#glow)">
              <animateMotion
                path={path0D}
                dur="10s"
                begin="0.64s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.4 0 0.6 1"
              />
              <animate
                attributeName="opacity"
                values="0;0.18;0.18;0"
                keyTimes="0;0.08;0.92;1"
                dur="10s"
                begin="0.64s"
                repeatCount="indefinite"
              />
            </circle>

            <circle r="3" opacity="0" fill="#fa5eab" filter="url(#glow)">
              <animateMotion
                path={path1D}
                dur="12s"
                begin="1.86s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.4 0 0.6 1"
              />
              <animate
                attributeName="opacity"
                values="0;0.7;0.7;0"
                keyTimes="0;0.08;0.92;1"
                dur="12s"
                begin="1.86s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="7" opacity="0" fill="#f72585" filter="url(#glow)">
              <animateMotion
                path={path1D}
                dur="12s"
                begin="1.88s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.4 0 0.6 1"
              />
              <animate
                attributeName="opacity"
                values="0;0.18;0.18;0"
                keyTimes="0;0.08;0.92;1"
                dur="12s"
                begin="1.88s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        )}

        <div className="nodes-wrap">
          {EXPERIENCES.map((exp, index) => {
            const hasNext = index < EXPERIENCES.length - 1;
            return (
              <React.Fragment key={exp.id}>
                <div
                  className={`node-row ${exp.side === "left" ? "side-left" : "side-right"}`}
                >
                  <div className="node-col node-col-left">
                    {exp.side === "left" ? (
                      <ExperienceInfo
                        exp={exp}
                        index={index}
                        nameRefs={nameRefs}
                      />
                    ) : null}
                  </div>

                  <div
                    className={`node-col node-col-mid ${hasNext ? "has-next" : ""} exp-${index}-dot anim-reveal`}
                    style={
                      hasNext
                        ? {
                            "--line-from": exp.color,
                            "--line-to": EXPERIENCES[index + 1].color,
                          }
                        : undefined
                    }
                  >
                    <span
                      ref={(el) => {
                        dotRefs.current[index] = el;
                      }}
                      className="node-dot"
                      style={{
                        "--accent": exp.color,
                        "--accent-rgb": exp.colorRgb,
                      }}
                    />
                    <span className="mobile-period-label">{exp.period}</span>
                  </div>

                  <div className="node-col node-col-right">
                    {exp.side === "right" ? (
                      <ExperienceInfo
                        exp={exp}
                        index={index}
                        nameRefs={nameRefs}
                      />
                    ) : null}
                  </div>
                </div>
                {index < EXPERIENCES.length - 1 && (
                  <div className="row-divider" aria-hidden="true" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <p className="experience-footer anim-reveal footer-reveal">
          {
            "Nagpur, India \u00b7 2023 - Present \u00b7 Open to new collaborations"
          }
        </p>
      </div>
    </section>
  );
}
