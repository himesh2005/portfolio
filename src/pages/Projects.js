import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "./Projects.css";

const PROJECTS = {
  client: [
    { id: 1, driveId: "1kLu1xB-nZ1jgciDCb1dk3HNjhQozzrXQ" },
    { id: 2, driveId: "1TKG_d0NyaAFVMc2LwQOmRQfj6XhKX_C8" },
    { id: 3, driveId: "1R-jHt3l6rJwiYjAgXnZdyn-u5jlky6Z5" },
    { id: 4, driveId: "1TuUcvxbY_VEP_SHWnZ1by2MLNT4AJGrZ" },
    { id: 5, driveId: "1xebUY4lRZGq-R4EfRlMcGNd8KY-SnHhE" },
    { id: 6, driveId: "1KC_0YOuKaEZoAeZPmdNKPV7JC28pJIce" },
    { id: 7, driveId: "1_8tsLwTUPPjwcJEYtpuMjPbH0GOlOsZX" },
    { id: 8, driveId: "1CdmJQo2rkIx1YRf0q9W-iTnVRoTWDXB2" },
  ],
  personal: [
    {
      id: 1,
      driveId: "13NjaKuBydG0_DiIYXOw518l2RqnWZP7E",
      title: "Short Film",
    },
    {
      id: 2,
      driveId: "1aBefknyW5kPAkexZs5-3JsS2o3XJ8BY0",
      title: "Bacon Avocado",
    },
  ],
  freelance: [
    {
      id: 1,
      driveId: "1EiKUlQJEH0PJHZoVWj-YSMOrIJl8upo2",
      title: "Project 1",
    },
    {
      id: 2,
      driveId: "1IaO3gBsKEC4xGN7kIL4-LhoslmhrFSdf",
      title: "Project 2",
    },
    {
      id: 3,
      driveId: "11Kkj5bGwJoG62UJ5PllQX3z9SCX9Q5rq",
      title: "Project 3",
    },
    {
      id: 4,
      driveId: "1nFE6OS1febzTjX76FJnJb-_Eu6MCCL1R",
      title: "Project 4",
    },
    {
      id: 5,
      driveId: "1D9BHu5kivAYD_uIjC4mz4Vzw3bIfm830",
      title: "Project 5",
    },
  ],
};

const THUMB_VIDEOS = [
  `${process.env.PUBLIC_URL}/gif/thumb-card-card-enter-0.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card-card-enter-1.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card-card-enter-2.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card-card-enter-4.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card-card-enter-5.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card-card-enter-6.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card-card-enter-7.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card-card-enter-8.mp4`,
];

const PERSONAL_THUMB_VIDEOS = [
  `${process.env.PUBLIC_URL}/gif/personal-project-1.mp4`,
  `${process.env.PUBLIC_URL}/gif/personal-projecr-2.mp4`,
];

const FREELANCE_THUMB_VIDEOS = [
  `${process.env.PUBLIC_URL}/gif/freelance-gif-1.mp4`,
  `${process.env.PUBLIC_URL}/gif/freelance-gif-2.mp4`,
  `${process.env.PUBLIC_URL}/gif/freelancer-gif-3.mp4`,
  `${process.env.PUBLIC_URL}/gif/freelance-git-4.mp4`,
  `${process.env.PUBLIC_URL}/gif/freelancer-gif-5.mp4`,
];

const TABS = [
  { key: "client", label: "Client Work" },
  { key: "personal", label: "Personal" },
  { key: "freelance", label: "Freelance" },
];

function VideoThumb({ src, index, isActive }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.load();
    const onReady = () => setLoaded(true);
    el.addEventListener("canplaythrough", onReady);
    return () => el.removeEventListener("canplaythrough", onReady);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded) return;
    if (isActive) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isActive, loaded]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#09091d",
      }}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          display: "block",
        }}
      />
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(160deg,#0e0e22,#0a0a1a)",
          }}
        >
          <div className="vid-spinner" />
        </div>
      )}
    </div>
  );
}

function ProjectFrame({ project, className }) {
  if (!project) return null;

  return (
    <div className={className}>
      <iframe
        className="modal-iframe"
        src={`https://drive.google.com/file/d/${project.driveId}/preview`}
        title={`Project ${project.id}`}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        allow="autoplay; encrypted-media"
        allowFullScreen={true}
      />
    </div>
  );
}

function getCardStyle(animState, index, pillPos) {
  if (animState === "out") {
    return {
      transform: `
        translate(
          calc(${pillPos.x}px - 50%),
          calc(${pillPos.y}px - 50%)
        ) scale(0.05)
      `,
      opacity: 0,
      filter: "blur(6px)",
      transition: `
        transform 0.75s cubic-bezier(0.55,0,1,0.45)
          ${index * 0.035}s,
        opacity 0.55s ease ${index * 0.03}s,
        filter 0.55s ease
      `,
      pointerEvents: "none",
      zIndex: 0,
    };
  }

  if (animState === "in") {
    return {
      transform: "translate(0,0) scale(1)",
      opacity: 1,
      filter: "blur(0px)",
      transition: `
        transform ${0.72 + index * 0.045}s
          cubic-bezier(0.16,1,0.3,1)
          ${0.04 + index * 0.05}s,
        opacity ${0.62 + index * 0.04}s ease
          ${0.04 + index * 0.05}s,
        filter ${0.58 + index * 0.035}s ease
          ${0.04 + index * 0.05}s
      `,
      zIndex: 1,
    };
  }

  return {};
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("client");
  const [displayTab, setDisplayTab] = useState(activeTab);
  const [animState, setAnimState] = useState("idle");
  const [pillPos, setPillPos] = useState({ x: 0, y: 0 });
  const [pillStyle, setPillStyle] = useState({});
  const [pillTransitionEnabled, setPillTransitionEnabled] = useState(false);
  const [pillBouncing, setPillBouncing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [modalTransition, setModalTransition] = useState("idle");
  const [originPos, setOriginPos] = useState({ x: 50, y: 50 });
  const [switchDir, setSwitchDir] = useState(null);
  const [switchStage, setSwitchStage] = useState("idle");
  const [switchingProject, setSwitchingProject] = useState(null);
  const [incomingProject, setIncomingProject] = useState(null);
  const [pulseIndex, setPulseIndex] = useState(null);
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );

  const tabBtnRefs = useRef({});
  const tabContainerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const pillRafRef = useRef(null);
  const bounceRafRef = useRef(null);
  const didMountRef = useRef(false);
  const timeoutsRef = useRef([]);

  const currentProjects = PROJECTS[displayTab] || [];
  const currentProject = currentProjects[modalIndex] || null;

  const thumbSrc = (tab, index) => {
    if (tab === "personal") return PERSONAL_THUMB_VIDEOS[index];
    if (tab === "freelance") return FREELANCE_THUMB_VIDEOS[index];
    return THUMB_VIDEOS[index];
  };

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);

  const queueTimeout = useCallback((callback, delay) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
  }, []);

  const cancelPillFrame = () => {
    if (pillRafRef.current) {
      cancelAnimationFrame(pillRafRef.current);
      pillRafRef.current = null;
    }
    if (bounceRafRef.current) {
      cancelAnimationFrame(bounceRafRef.current);
      bounceRafRef.current = null;
    }
  };

  const measurePill = useCallback(
    (disableTransition = false) => {
      const container = tabContainerRef.current;
      const activeEl = tabBtnRefs.current[activeTab];
      if (!container || !activeEl) return;

      const cRect = container.getBoundingClientRect();
      const aRect = activeEl.getBoundingClientRect();

      setPillStyle({
        width: `${aRect.width}px`,
        transform: `translateX(${aRect.left - cRect.left}px)`,
        transition: disableTransition ? "none" : undefined,
      });

      cancelPillFrame();
      pillRafRef.current = requestAnimationFrame(() => {
        setPillStyle({
          width: `${aRect.width}px`,
          transform: `translateX(${aRect.left - cRect.left}px)`,
          transition: undefined,
        });
        setPillTransitionEnabled(true);
      });
    },
    [activeTab],
  );

  const handleCardClick = useCallback(
    (index) => {
      const el = cardRefs.current[index];
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
        const cy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
        setOriginPos({ x: cx, y: cy });
      }

      clearAllTimeouts();
      setPulseIndex(index);
      queueTimeout(() => {
        setPulseIndex(null);
      }, 200);
      setModalIndex(index);
      setModalOpen(true);
      setModalTransition("idle");
      queueTimeout(() => {
        setModalTransition("open");
      }, 20);
      setSwitchDir(null);
      setSwitchStage("idle");
      setSwitchingProject(null);
      setIncomingProject(null);
    },
    [clearAllTimeouts, queueTimeout],
  );

  const closeModal = useCallback(
    (afterClose) => {
      if (!modalOpen) {
        if (afterClose) afterClose();
        return;
      }

      clearAllTimeouts();
      setModalTransition("closing");
      setSwitchDir(null);
      setSwitchStage("idle");
      setSwitchingProject(null);
      setIncomingProject(null);
      setPulseIndex(null);

      queueTimeout(() => {
        setModalOpen(false);
        setModalTransition("idle");
        if (afterClose) afterClose();
      }, 500);
    },
    [clearAllTimeouts, modalOpen, queueTimeout],
  );

  const handleTabClick = (newTab) => {
    if (newTab === displayTab || animState !== "idle") return;

    const btn = tabBtnRefs.current[newTab];
    const grid = gridRef.current;
    if (btn && grid) {
      const br = btn.getBoundingClientRect();
      const gr = grid.getBoundingClientRect();
      setPillPos({
        x: br.left + br.width / 2 - gr.left,
        y: br.top + br.height / 2 - gr.top,
      });
    }

    setActiveTab(newTab);
    clearAllTimeouts();

    setAnimState("out");

    queueTimeout(() => {
      setDisplayTab(newTab);
      setModalIndex(0);
      setAnimState("in");
    }, 780);

    queueTimeout(() => {
      setAnimState("idle");
    }, 1500);
  };

  const switchProject = useCallback(
    (direction) => {
      if (!modalOpen || modalTransition !== "open" || switchDir) return;

      const delta = direction === "right" ? 1 : -1;
      const nextIndex = modalIndex + delta;
      if (nextIndex < 0 || nextIndex >= currentProjects.length) return;

      const nextProject = currentProjects[nextIndex];
      if (!nextProject) return;

      clearAllTimeouts();
      setSwitchDir(direction);
      setSwitchingProject(currentProject);
      setIncomingProject(nextProject);
      setSwitchStage("prepare");

      queueTimeout(() => {
        setSwitchStage("active");
      }, 24);

      queueTimeout(() => {
        setModalIndex(nextIndex);
      }, 760);

      queueTimeout(() => {
        setSwitchDir(null);
        setSwitchStage("idle");
        setSwitchingProject(null);
        setIncomingProject(null);
      }, 860);
    },
    [
      clearAllTimeouts,
      currentProject,
      currentProjects,
      modalIndex,
      modalOpen,
      modalTransition,
      queueTimeout,
      switchDir,
    ],
  );

  const openModal = handleCardClick;

  useLayoutEffect(() => {
    measurePill(!pillTransitionEnabled);

    const handleResize = () => {
      measurePill(true);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelPillFrame();
    };
  }, [measurePill, pillTransitionEnabled]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    setPillBouncing(false);
    bounceRafRef.current = requestAnimationFrame(() => {
      setPillBouncing(true);
    });
  }, [activeTab]);

  useEffect(() => {
    if (!pillBouncing) return;
    queueTimeout(() => {
      setPillBouncing(false);
    }, 360);
  }, [pillBouncing, queueTimeout]);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
      if (event.key === "ArrowRight") {
        switchProject("right");
      }
      if (event.key === "ArrowLeft") {
        switchProject("left");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, modalOpen, switchProject]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobileView(media.matches);
    apply();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", apply);
      return () => media.removeEventListener("change", apply);
    }

    media.addListener(apply);
    return () => media.removeListener(apply);
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      cancelPillFrame();
    };
  }, [clearAllTimeouts]);

  return (
    <section
      className={`projects-page ${animState !== "idle" ? "is-animating" : ""}`}
    >
      <div className="projects-tabs-shell">
        <div
          ref={tabContainerRef}
          className="projects-tabs"
          role="tablist"
          aria-label="Project categories"
        >
          <div
            className="projects-tab-pill-track"
            style={pillStyle}
            aria-hidden="true"
          >
            <div
              className={`projects-tab-pill ${pillBouncing ? "is-bouncing" : ""}`}
            />
          </div>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              ref={(el) => {
                tabBtnRefs.current[tab.key] = el;
              }}
              type="button"
              className={`projects-tab ${activeTab === tab.key ? "is-active" : ""}`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`projects-grid-wrapper ${modalOpen ? "grid-modal-active" : ""} ${
          modalTransition === "closing" ? "grid-rack-reset" : ""
        } ${animState !== "idle" ? "is-animating" : ""}`}
        ref={gridRef}
      >
        <div className="grid-glow" aria-hidden="true" />
        {["client", "personal", "freelance"].map((tab) => (
          <div
            key={tab}
            className={`projects-grid ${
              animState === "in" && displayTab === tab ? "throwing" : ""
            }`}
            style={{
              display: displayTab === tab ? "grid" : "none",
              "--pill-x": `calc(${pillPos.x}px - 50%)`,
              "--pill-y": `calc(${pillPos.y}px - 50%)`,
            }}
          >
            {PROJECTS[tab].map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${
                  animState === "in" && displayTab === tab ? "throwing" : ""
                }`}
                style={{
                  "--dur": `${0.55 + index * 0.04}s`,
                  "--del": `${index * 0.07}s`,
                  ...getCardStyle(
                    displayTab === tab ? animState : "idle",
                    index,
                    pillPos,
                  ),
                }}
                onClick={() => animState === "idle" && openModal(index)}
              >
                <VideoThumb
                  src={thumbSrc(tab, index)}
                  index={index}
                  isActive={displayTab === tab}
                />
                <div className="card-overlay">
                  <span className="card-play-icon">▶</span>

                  {tab === "personal" && project.title && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "32px",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        font: "600 0.78rem Sora, sans-serif",
                        color: "rgba(255,255,255,0.85)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                        zIndex: 4,
                        padding: "0 8px",
                        pointerEvents: "none",
                      }}
                    >
                      {project.title}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {modalOpen &&
        currentProject &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className={`projects-modal-backdrop ${
                modalTransition === "open"
                  ? "backdrop-open"
                  : modalTransition === "closing"
                    ? "backdrop-closing"
                    : "backdrop-closed"
              }`}
              style={{
                "--ox": `${originPos.x}%`,
                "--oy": `${originPos.y}%`,
              }}
              onClick={() => closeModal()}
              aria-hidden="true"
            />

            <button
              type="button"
              className="modal-close"
              onClick={() => closeModal()}
            >
              {"\u2715  Close"}
            </button>

            <div
              className={`projects-modal-content ${
                modalTransition === "open"
                  ? "modal-visible"
                  : modalTransition === "closing"
                    ? "modal-hidden"
                    : "modal-prime"
              }`}
            >
              {switchDir && switchingProject && incomingProject ? (
                <div
                  style={{
                    position: "relative",
                    width: "min(380px, calc(100vw - 32px))",
                    aspectRatio: "9 / 16",
                  }}
                >
                  <div
                    className="modal-video-shell"
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform:
                        switchStage !== "active"
                          ? "translateX(0%)"
                          : `translateX(${switchDir === "right" ? "-24%" : "24%"})`,
                      opacity: switchStage !== "active" ? 1 : 0,
                      transition:
                        "transform 760ms cubic-bezier(0.22, 1, 0.36, 1), opacity 760ms ease",
                      willChange: "transform, opacity",
                    }}
                  >
                    <ProjectFrame
                      project={switchingProject}
                      className="modal-frame-layer is-static"
                    />
                  </div>

                  <div
                    className="modal-video-shell"
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform:
                        switchStage !== "active"
                          ? `translateX(${switchDir === "right" ? "24%" : "-24%"})`
                          : "translateX(0%)",
                      opacity: switchStage !== "active" ? 0 : 1,
                      transition:
                        "transform 760ms cubic-bezier(0.16, 1, 0.3, 1), opacity 760ms ease",
                      willChange: "transform, opacity",
                    }}
                  >
                    <ProjectFrame
                      project={incomingProject}
                      className={`modal-frame-layer is-static ${
                        modalTransition === "open" ? "modal-bloom" : ""
                      }`}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="modal-video-shell"
                  style={{
                    width: "min(380px, calc(100vw - 32px))",
                  }}
                >
                  <ProjectFrame
                    project={currentProject}
                    className={`modal-frame-layer is-static ${
                      modalTransition === "open" ? "modal-bloom" : ""
                    }`}
                  />
                </div>
              )}

              <button
                type="button"
                className="modal-nav"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: isMobileView
                    ? "clamp(-18px, -6vw, -10px)"
                    : "clamp(-52px, -8vw, -34px)",
                  transform: "translateY(-50%)",
                  pointerEvents: "auto",
                  zIndex: 220,
                }}
                onClick={() => switchProject("left")}
                disabled={
                  modalIndex === 0 || modalTransition !== "open" || !!switchDir
                }
                aria-label="Previous project"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.5 6.5 9 12l5.5 5.5" />
                </svg>
              </button>

              <button
                type="button"
                className="modal-nav"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: isMobileView
                    ? "clamp(-18px, -6vw, -10px)"
                    : "clamp(-52px, -8vw, -34px)",
                  transform: "translateY(-50%)",
                  pointerEvents: "auto",
                  zIndex: 220,
                }}
                onClick={() => switchProject("right")}
                disabled={
                  modalIndex === currentProjects.length - 1 ||
                  modalTransition !== "open" ||
                  !!switchDir
                }
                aria-label="Next project"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.5 6.5 15 12l-5.5 5.5" />
                </svg>
              </button>
            </div>

            <div className="modal-meta">
              <div className="modal-counter">
                {modalIndex + 1} / {currentProjects.length}
              </div>

              <div className="modal-dots" aria-hidden="true">
                {currentProjects.map((project, index) => (
                  <span
                    key={project.id}
                    className={`modal-dot ${index === modalIndex ? "is-active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </>,
          document.body,
        )}
    </section>
  );
}
