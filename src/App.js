import React, { useEffect, useRef, useState } from "react";
import Background from "./components/Background";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [displayPage, setDisplayPage] = useState("home");
  const [transPhase, setTransPhase] = useState("idle");
  const [homeVisitKey, setHomeVisitKey] = useState(0);
  const timeoutRefs = useRef([]);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutRefs.current = [];
  };

  const queueTimeout = (callback, delay) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutRefs.current.push(timeoutId);
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  const onNavigate = (newPage) => {
    if (transPhase === "out") return;

    if (newPage === activePage) {
      if (newPage === "home") {
        setHomeVisitKey((prev) => prev + 1);
      }
      return;
    }

    clearAllTimeouts();
    setTransPhase("out");

    queueTimeout(() => {
      setDisplayPage(newPage);
      setActivePage(newPage);
    }, 420);

    queueTimeout(() => {
      setTransPhase("in");
    }, 460);

    queueTimeout(() => {
      setTransPhase("idle");
    }, 1060);
  };

  return (
    <div className="app-root">
      <Background />
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      <main className="main-area">
        <div className={`page-wrapper page-phase-${transPhase}`}>
          {displayPage === "home" && (
            <Home key={`home-${homeVisitKey}`} onNavigate={onNavigate} />
          )}
          {displayPage === "projects" && <Projects />}
          {displayPage === "experience" && <Experience />}
          {displayPage === "contact" && <Contact />}
        </div>
      </main>
    </div>
  );
}
