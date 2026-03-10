import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  personal: [],
  freelance: [],
};

const THUMB_VIDEOS = [
  `${process.env.PUBLIC_URL}/gif/thumb-card card-enter-0.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card card-enter-1.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card card-enter-2.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card card-enter-4.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card card-enter-5.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card card-enter-6.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card card-enter-7.mp4`,
  `${process.env.PUBLIC_URL}/gif/thumb-card card-enter-8.mp4`,
];

const TABS = [
  { key: "client", label: "Client Work" },
  { key: "personal", label: "Personal" },
  { key: "freelance", label: "Freelance" },
];

function VideoThumb({ src }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.load();
    const onReady = () => {
      setLoaded(true);
      el.play().catch(() => {});
    };
    el.addEventListener("canplaythrough", onReady);
    return () => el.removeEventListener("canplaythrough", onReady);
  }, [src]);

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

export default function Projects() {
  const [activeTab, setActiveTab] = useState("client");
  const [displayTab, setDisplayTab] = useState("client");
  const [tabTransition, setTabTransition] = useState(false);
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
  const [pulseIndex, setPulseIndex] = useState(null);

  const tabRefs = useRef({});
  const tabContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const pillRafRef = useRef(null);
  const bounceRafRef = useRef(null);
  const didMountRef = useRef(false);
  const timeoutsRef = useRef([]);

  const currentProjects = PROJECTS[displayTab] || [];
  const currentProject = currentProjects[modalIndex] || null;

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
      const activeEl = tabRefs.current[activeTab];
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
      setPulseIndex(null);

      queueTimeout(() => {
        setModalOpen(false);
        setModalTransition("idle");
        if (afterClose) afterClose();
      }, 500);
    },
    [clearAllTimeouts, modalOpen, queueTimeout],
  );

  const runTabTransition = useCallback(
    (tabKey) => {
      clearAllTimeouts();
      setModalIndex(0);
      setTabTransition(true);

      queueTimeout(() => {
        setDisplayTab(tabKey);
        setActiveTab(tabKey);
      }, 150);

      queueTimeout(() => {
        setTabTransition(false);
      }, 165);
    },
    [clearAllTimeouts, queueTimeout],
  );

  const switchProject = useCallback(
    (direction) => {
      if (!modalOpen || modalTransition !== "open" || switchDir) return;

      const delta = direction === "right" ? 1 : -1;
      const nextIndex = modalIndex + delta;
      if (nextIndex < 0 || nextIndex >= currentProjects.length) return;

      clearAllTimeouts();
      setSwitchDir(direction);
      setSwitchStage("out");
      setSwitchingProject(currentProject);

      queueTimeout(() => {
        setModalIndex(nextIndex);
        setSwitchStage("in");
      }, 180);

      queueTimeout(() => {
        setSwitchDir(null);
        setSwitchStage("idle");
        setSwitchingProject(null);
      }, 500);
    },
    [
      clearAllTimeouts,
      currentProject,
      currentProjects.length,
      modalIndex,
      modalOpen,
      modalTransition,
      queueTimeout,
      switchDir,
    ],
  );

  const openModal = handleCardClick;

  const handleTabChange = useCallback(
    (tabKey) => {
      if (tabKey === activeTab) return;
      if (modalOpen) {
        closeModal(() => runTabTransition(tabKey));
        return;
      }
      runTabTransition(tabKey);
    },
    [activeTab, closeModal, modalOpen, runTabTransition],
  );

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
    return () => {
      clearAllTimeouts();
      cancelPillFrame();
    };
  }, [clearAllTimeouts]);

  return (
    <section className="projects-page">
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
                tabRefs.current[tab.key] = el;
              }}
              type="button"
              className={`projects-tab ${activeTab === tab.key ? "is-active" : ""}`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`projects-grid-wrapper ${tabTransition ? "grid-transition-out" : ""} ${
          modalOpen ? "grid-modal-active" : ""
        } ${modalTransition === "closing" ? "grid-rack-reset" : ""}`}
      >
        <div className="grid-glow" aria-hidden="true" />
        {currentProjects.length > 0 ? (
          <div key={displayTab} className="projects-grid grid-animating">
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card card-enter-${index}`}
                style={{ animationDelay: `${index * 0.07}s` }}
                onClick={() => openModal(index)}
              >
                <VideoThumb src={THUMB_VIDEOS[index]} />
                <div className="card-overlay">
                  <span className="card-play-icon">▶</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="projects-empty" aria-live="polite">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM17.5 14v2.5H20V19h-2.5v2.5H15V19h-2.5v-2.5H15V14z" />
            </svg>
            <p>Projects coming soon</p>
          </div>
        )}
      </div>

      {modalOpen && currentProject && (
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

          <button
            type="button"
            className="modal-nav modal-nav-left"
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
            className="modal-nav modal-nav-right"
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

          <div
            className={`projects-modal-content ${
              modalTransition === "open"
                ? "modal-visible"
                : modalTransition === "closing"
                  ? "modal-hidden"
                  : "modal-prime"
            }`}
          >
            <div className="modal-video-shell">
              {switchDir && switchingProject ? (
                <>
                  <ProjectFrame
                    project={switchingProject}
                    className={`modal-frame-layer is-out is-active ${
                      switchDir === "right"
                        ? "dissolve-out-left"
                        : "dissolve-out-right"
                    }`}
                  />
                  {switchStage === "in" && (
                    <ProjectFrame
                      project={currentProject}
                      className={`modal-frame-layer is-in is-active ${
                        switchDir === "right"
                          ? "dissolve-in-right"
                          : "dissolve-in-left"
                      }`}
                    />
                  )}
                </>
              ) : (
                <ProjectFrame
                  project={currentProject}
                  className={`modal-frame-layer is-static ${
                    modalTransition === "open" ? "modal-bloom" : ""
                  }`}
                />
              )}
            </div>
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
        </>
      )}
    </section>
  );
}
