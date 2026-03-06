import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Sidebar.css";

const NAV_ITEMS = [
  {
    key: "home",
    label: "Home",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V21h13V9.5" />
      </svg>
    ),
  },
  {
    key: "projects",
    label: "Projects",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4" y="4" width="6" height="6" />
        <rect x="14" y="4" width="6" height="6" />
        <rect x="4" y="14" width="6" height="6" />
        <rect x="14" y="14" width="6" height="6" />
      </svg>
    ),
  },
  {
    key: "experience",
    label: "Experience",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 6h14" />
        <path d="M4 12h10" />
        <path d="M4 18h16" />
        <circle cx="20" cy="6" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "contact",
    label: "Contact",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="m4 8 8 6 8-6" />
      </svg>
    ),
  },
];

function LogoMark({ logoRef }) {
  return (
    <div className="logo-mark" ref={logoRef} aria-hidden="true">
      <span className="logo-ac">AC</span>
      <span className="logo-app app-cc">
        <svg
          viewBox="0 0 100 100"
          width="13"
          height="13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="18"
            y="12"
            width="44"
            height="32"
            rx="10"
            ry="10"
            fill="none"
            stroke="#111"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <rect
            x="38"
            y="56"
            width="44"
            height="32"
            rx="10"
            ry="10"
            fill="none"
            stroke="#111"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <line
            x1="22"
            y1="78"
            x2="78"
            y2="22"
            stroke="#111"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="logo-app app-pr">Pr</span>
      <span className="logo-app app-ae">Ae</span>
    </div>
  );
}

export default function Sidebar({ activePage, onNavigate }) {
  const [drawerPhase, setDrawerPhase] = useState("closed");
  const [logoVisible, setLogoVisible] = useState(false);
  const [navVisible, setNavVisible] = useState([false, false, false, false]);
  const [badgeVisible, setBadgeVisible] = useState(false);

  const desktopLogoRef = useRef(null);
  const mobileLogoRef = useRef(null);
  const timeoutRefs = useRef([]);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutRefs.current = [];
  };

  const queueTimeout = (callback, delay) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutRefs.current.push(timeoutId);
  };

  const resetDrawerVisibility = () => {
    setLogoVisible(false);
    setNavVisible([false, false, false, false]);
    setBadgeVisible(false);
  };

  const measureLogo = (logoElement) => {
    if (!logoElement) return;
    const acText = logoElement.querySelector(".logo-ac");
    if (!acText) return;
    const rect = acText.getBoundingClientRect();
    logoElement.style.setProperty("--ac-width", `${rect.width}px`);
  };

  const runOpenSequence = () => {
    clearAllTimeouts();
    resetDrawerVisibility();
    setDrawerPhase("opening");

    queueTimeout(() => {
      setLogoVisible(true);
    }, 0);
    queueTimeout(() => {
      setNavVisible([true, false, false, false]);
    }, 180);
    queueTimeout(() => {
      setNavVisible([true, true, false, false]);
    }, 265);
    queueTimeout(() => {
      setNavVisible([true, true, true, false]);
    }, 350);
    queueTimeout(() => {
      setNavVisible([true, true, true, true]);
    }, 435);
    queueTimeout(() => {
      setBadgeVisible(true);
    }, 535);
    queueTimeout(() => {
      setDrawerPhase("open");
    }, 700);
  };

  const runCloseSequence = (afterClose) => {
    if (drawerPhase === "closed" || drawerPhase === "closing") {
      if (afterClose) {
        queueTimeout(afterClose, 300);
      }
      return;
    }

    clearAllTimeouts();
    setDrawerPhase("closing");

    queueTimeout(() => {
      setBadgeVisible(false);
    }, 0);
    queueTimeout(() => {
      setNavVisible([true, true, true, false]);
    }, 40);
    queueTimeout(() => {
      setNavVisible([true, true, false, false]);
    }, 80);
    queueTimeout(() => {
      setNavVisible([true, false, false, false]);
    }, 120);
    queueTimeout(() => {
      setNavVisible([false, false, false, false]);
    }, 160);
    queueTimeout(() => {
      setLogoVisible(false);
    }, 200);
    queueTimeout(() => {
      setDrawerPhase("closed");
    }, 280);

    if (afterClose) {
      queueTimeout(afterClose, 300);
    }
  };

  const handleToggle = () => {
    if (drawerPhase === "opening" || drawerPhase === "open") {
      runCloseSequence();
      return;
    }

    runOpenSequence();
  };

  const handleNavigate = (key) => {
    if (window.innerWidth <= 768) {
      runCloseSequence(() => {
        onNavigate(key);
      });
      return;
    }

    onNavigate(key);
  };

  useLayoutEffect(() => {
    measureLogo(desktopLogoRef.current);
    measureLogo(mobileLogoRef.current);

    const onResize = () => {
      measureLogo(desktopLogoRef.current);
      measureLogo(mobileLogoRef.current);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={`mobile-menu-toggle ${drawerPhase === "opening" || drawerPhase === "open" ? "is-open" : ""}`}
        onClick={handleToggle}
        aria-label={
          drawerPhase === "opening" || drawerPhase === "open"
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={drawerPhase === "opening" || drawerPhase === "open"}
      >
        <span className="menu-line line-1" />
        <span className="menu-line line-2" />
        <span className="menu-line line-3" />
      </button>

      <div
        className={`mobile-nav-backdrop ${
          drawerPhase === "opening" || drawerPhase === "open"
            ? "is-open"
            : drawerPhase === "closing"
              ? "is-closing"
              : ""
        }`}
        onClick={() => runCloseSequence()}
        aria-hidden="true"
      />

      <aside className="sidebar">
        <div className="sidebar-inner">
          <LogoMark logoRef={desktopLogoRef} />

          <nav className="sidebar-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`nav-item ${activePage === item.key ? "active" : ""}`}
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

      <aside
        className={`mobile-sidebar ${
          drawerPhase === "opening" || drawerPhase === "open"
            ? "is-active"
            : drawerPhase === "closing"
              ? "is-closing"
              : ""
        }`}
      >
        <div className="sidebar-inner mobile-sidebar-inner">
          <div
            className={`mobile-logo-wrap ${
              logoVisible
                ? drawerPhase === "closing"
                  ? "logo-animate-out"
                  : "logo-animate-in"
                : ""
            }`}
          >
            <LogoMark logoRef={mobileLogoRef} />
          </div>

          <nav className="sidebar-nav mobile-sidebar-nav">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.key}
                type="button"
                className={`nav-item mobile-nav-item ${activePage === item.key ? "active" : ""} ${
                  navVisible[index]
                    ? `nav-item-visible-${index + 1}`
                    : drawerPhase === "closing"
                      ? "nav-item-exit"
                      : ""
                }`}
                onClick={() => handleNavigate(item.key)}
              >
                <span className="active-bar" />
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div
            className={`availability mobile-availability ${
              badgeVisible
                ? drawerPhase === "closing"
                  ? "nav-item-exit"
                  : "nav-item-visible-badge"
                : drawerPhase === "closing"
                  ? "nav-item-exit"
                  : ""
            }`}
          >
            <span className="avail-dot" />
            <span>Available for work</span>
          </div>
        </div>
      </aside>
    </>
  );
}
