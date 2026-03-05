import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Projects.css';

const PROJECTS = {
  client: [
    { id: 1, driveId: '1kLu1xB-nZ1jgciDCb1dk3HNjhQozzrXQ' },
    { id: 2, driveId: '1TKG_d0NyaAFVMc2LwQOmRQfj6XhKX_C8' },
    { id: 3, driveId: '1R-jHt3l6rJwiYjAgXnZdyn-u5jlky6Z5' },
    { id: 4, driveId: '1TuUcvxbY_VEP_SHWnZ1by2MLNT4AJGrZ' },
    { id: 5, driveId: '1xebUY4lRZGq-R4EfRlMcGNd8KY-SnHhE' },
    { id: 6, driveId: '1KC_0YOuKaEZoAeZPmdNKPV7JC28pJIce' },
    { id: 7, driveId: '1_8tsLwTUPPjwcJEYtpuMjPbH0GOlOsZX' },
    { id: 8, driveId: '1aBefknyW5kPAkexZs5-3JsS2o3XJ8BY0' },
  ],
  personal: [],
  freelance: [],
};

const TABS = [
  { key: 'client', label: 'Client Work' },
  { key: 'personal', label: 'Personal' },
  { key: 'freelance', label: 'Freelance' },
];

const SLICE_COUNT = 8;

function ThumbVisual() {
  return (
    <div className="thumb-visual">
      <div className="thumb-dots" aria-hidden="true">
        <span className="dot dot-rec" />
        <span className="dot dot-blue" />
      </div>
      <div className="thumb-center" aria-hidden="true">
        <span className="thumb-rule" />
        <span className="thumb-client">CLIENT</span>
        <span className="thumb-work">WORK</span>
        <span className="thumb-rule" />
      </div>
      <span className="thumb-play" aria-hidden="true">
        {'\u25B6  PLAY'}
      </span>
    </div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('client');
  const [displayTab, setDisplayTab] = useState('client');
  const [tabTransition, setTabTransition] = useState(false);
  const [gridEntering, setGridEntering] = useState(false);
  const [pillStyle, setPillStyle] = useState({});
  const [pillReady, setPillReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [modalTransition, setModalTransition] = useState('idle');
  const [switchDirection, setSwitchDirection] = useState('right');
  const [switchPhase, setSwitchPhase] = useState('idle');

  const flashRef = useRef(null);
  const slicesRef = useRef(null);
  const tabRefs = useRef({});
  const tabContainerRef = useRef(null);
  const timeoutsRef = useRef([]);

  const currentProjects = PROJECTS[displayTab] || [];
  const currentProject = currentProjects[modalIndex] || null;

  const addTimeout = useCallback((callback, delay) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);

  const recalcPill = useCallback(() => {
    const container = tabContainerRef.current;
    const activeEl = tabRefs.current[activeTab];
    if (!container || !activeEl) return;

    const cRect = container.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();
    setPillStyle({
      left: `${aRect.left - cRect.left - 4}px`,
      width: `${aRect.width}px`,
    });
  }, [activeTab]);

  const startModalEnter = useCallback(
    (index) => {
      if (!currentProjects[index]) return;
      clearAllTimeouts();
      setModalIndex(index);
      setModalOpen(true);
      setModalTransition('entering');
      setSwitchPhase('idle');
      addTimeout(() => {
        setModalTransition('active');
      }, 600);
    },
    [addTimeout, clearAllTimeouts, currentProjects],
  );

  const closeModal = useCallback(
    (afterClose) => {
      if (!modalOpen) {
        if (afterClose) afterClose();
        return;
      }

      clearAllTimeouts();
      setModalTransition('exiting');
      setSwitchPhase('idle');
      addTimeout(() => {
        setModalOpen(false);
        setModalTransition('idle');
        if (afterClose) afterClose();
      }, 300);
    },
    [addTimeout, clearAllTimeouts, modalOpen],
  );

  const runTabTransition = useCallback(
    (tabKey) => {
      clearAllTimeouts();
      setModalIndex(0);
      setTabTransition(true);
      setGridEntering(false);

      addTimeout(() => {
        setDisplayTab(tabKey);
        setActiveTab(tabKey);
      }, 200);

      addTimeout(() => {
        setTabTransition(false);
        setGridEntering(true);
      }, 220);

      addTimeout(() => {
        setGridEntering(false);
      }, 560);
    },
    [addTimeout, clearAllTimeouts],
  );

  const switchProject = useCallback(
    (direction) => {
      if (!modalOpen || modalTransition === 'switching') return;

      const delta = direction === 'right' ? 1 : -1;
      const nextIndex = modalIndex + delta;
      if (nextIndex < 0 || nextIndex >= currentProjects.length) return;

      clearAllTimeouts();
      setSwitchDirection(direction);
      setSwitchPhase('out');
      setModalTransition('switching');

      addTimeout(() => {
        setModalIndex(nextIndex);
        setSwitchPhase('in');
      }, 180);

      addTimeout(() => {
        setSwitchPhase('idle');
        setModalTransition('active');
      }, 460);
    },
    [
      addTimeout,
      clearAllTimeouts,
      currentProjects.length,
      modalIndex,
      modalOpen,
      modalTransition,
    ],
  );

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

  useEffect(() => {
    recalcPill();
    window.addEventListener('resize', recalcPill);
    return () => {
      window.removeEventListener('resize', recalcPill);
    };
  }, [recalcPill]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPillReady(true);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!(modalOpen && modalTransition === 'entering')) return;

    if (flashRef.current) {
      flashRef.current.classList.remove('is-active');
      void flashRef.current.offsetWidth;
      flashRef.current.classList.add('is-active');
    }

    if (slicesRef.current) {
      slicesRef.current.classList.remove('is-active');
      void slicesRef.current.offsetWidth;
      slicesRef.current.classList.add('is-active');
    }
  }, [modalOpen, modalTransition]);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
      if (event.key === 'ArrowRight') {
        switchProject('right');
      }
      if (event.key === 'ArrowLeft') {
        switchProject('left');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeModal, modalOpen, switchProject]);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      document.body.style.overflow = '';
    };
  }, [clearAllTimeouts]);

  return (
    <section className="projects-page">
      <div
        ref={tabContainerRef}
        className="projects-tabs"
        role="tablist"
        aria-label="Project categories"
      >
        <div
          className={`projects-tab-pill ${pillReady ? '' : 'no-transition'}`}
          style={pillStyle}
          aria-hidden="true"
        />
        {TABS.map((tab) => (
          <button
            key={tab.key}
            ref={(el) => {
              tabRefs.current[tab.key] = el;
            }}
            type="button"
            className={`projects-tab ${activeTab === tab.key ? 'is-active' : ''}`}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={`projects-grid-wrap ${tabTransition ? 'grid-dissolve-out' : ''} ${gridEntering ? 'grid-dissolve-in' : ''}`}
      >
        <div className="grid-glow" aria-hidden="true" />
        {currentProjects.length > 0 ? (
          <div className="projects-grid">
            {currentProjects.map((project, index) => {
              const isActive = modalOpen && index === modalIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  className={`thumb-card ${isActive ? 'is-active' : ''}`}
                  style={{ '--card-delay': `${(index % 8) * 40}ms` }}
                  onClick={() => startModalEnter(index)}
                >
                  <ThumbVisual />
                  {isActive && <span className="thumb-top-accent" aria-hidden="true" />}
                </button>
              );
            })}
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
              modalTransition === 'entering' ||
              modalTransition === 'active' ||
              modalTransition === 'switching'
                ? 'is-visible'
                : ''
            } ${modalTransition === 'exiting' ? 'is-exiting' : ''}`}
            onClick={() => closeModal()}
            aria-hidden="true"
          />

          <div ref={flashRef} className="film-burn-flash" aria-hidden="true" />

          <div ref={slicesRef} className="screen-slices" aria-hidden="true">
            {Array.from({ length: SLICE_COUNT }).map((_, index) => (
              <span
                key={index}
                className="screen-slice"
                style={{ top: `${index * 12.5}vh` }}
              />
            ))}
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={() => closeModal()}
          >
            {'\u2715  Close'}
          </button>

          <button
            type="button"
            className="modal-nav modal-nav-left"
            onClick={() => switchProject('left')}
            disabled={modalIndex === 0 || modalTransition === 'switching'}
            aria-label="Previous project"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.5 6.5 9 12l5.5 5.5" />
            </svg>
          </button>

          <button
            type="button"
            className="modal-nav modal-nav-right"
            onClick={() => switchProject('right')}
            disabled={
              modalIndex === currentProjects.length - 1 ||
              modalTransition === 'switching'
            }
            aria-label="Next project"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9.5 6.5 15 12l-5.5 5.5" />
            </svg>
          </button>

          <div
            className={`projects-modal-content ${
              modalTransition === 'entering' ||
              modalTransition === 'active' ||
              modalTransition === 'switching'
                ? 'is-entering'
                : ''
            } ${modalTransition === 'exiting' ? 'is-exiting' : ''}`}
          >
            <div
              className={`modal-video-shell ${
                modalTransition === 'switching'
                  ? `is-switching phase-${switchPhase} dir-${switchDirection}`
                  : ''
              }`}
            >
              <iframe
                key={`${displayTab}-${modalIndex}`}
                className="modal-iframe"
                src={`https://drive.google.com/file/d/${currentProject.driveId}/preview`}
                title={`Project ${currentProject.id}`}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                allow="autoplay; encrypted-media"
                allowFullScreen={true}
              />
            </div>

            <div className="modal-counter">
              {modalIndex + 1} / {currentProjects.length}
            </div>

            <div className="modal-dots" aria-hidden="true">
              {currentProjects.map((project, index) => (
                <span
                  key={project.id}
                  className={`modal-dot ${index === modalIndex ? 'is-active' : ''}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
