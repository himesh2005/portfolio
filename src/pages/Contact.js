import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const EMAILJS_SERVICE_ID  = 'service_vqp78in'
const EMAILJS_TEMPLATE_ID = 'template_4l3nvks'
const EMAILJS_PUBLIC_KEY  = 'EWc_oanas3KutwkEL'

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@abhi.keyf",
    href: "https://www.instagram.com/abhi.keyf?igsh=OHpkaHdieGJwdWtt",
    color: "#f72585",
    icon: "ig",
  },
  {
    label: "LinkedIn",
    handle: "Abhi Chakrapani",
    href: "https://www.linkedin.com/in/abhi-chakrapani-7a0114301",
    color: "#4361ee",
    icon: "li",
  },
  {
    label: "YouTube",
    handle: "@ordinaryboy3244",
    href: "https://youtube.com/@ordinaryboy3244?si=M6yqNxSe8R9QEpwP",
    color: "#ff3b3b",
    icon: "yt",
  },
  {
    label: "WhatsApp",
    handle: "+91 84324 19551",
    href: "https://wa.me/918432419551?text=Hi%20Abhi%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20work%20together!",
    color: "#22c55e",
    icon: "wa",
  },
];

const socialDelay = (index) => `${0.5 + index * 0.12}s`;

const SocialIcon = ({ icon, color }) => {
  if (icon === "ig") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3.25"
          y="3.25"
          width="17.5"
          height="17.5"
          rx="5"
          stroke={color}
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="4.3" stroke={color} strokeWidth="1.8" />
        <circle cx="17.3" cy="6.9" r="1.1" fill={color} />
      </svg>
    );
  }

  if (icon === "li") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill={color}
        aria-hidden="true"
      >
        <path d="M20.451 20.451h-3.554v-5.569c0-1.328-.025-3.038-1.851-3.038-1.854 0-2.138 1.447-2.138 2.943v5.664H9.354V9h3.412v1.561h.049c.476-.9 1.637-1.849 3.369-1.849 3.602 0 4.268 2.369 4.268 5.455v6.284zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zM7.114 20.451H3.56V9h3.554v11.451z" />
      </svg>
    );
  }

  if (icon === "yt") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="#ff3b3b"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="#22c55e"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);

    if (isTouchDevice) {
      setMousePos({ x: 0, y: 0 });
      return;
    }

    const handleMove = (e) => {
      if (!btnRef.current) return;
      const r = btnRef.current.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      const dist = Math.sqrt(x * x + y * y);
      if (dist < 120) {
        setMousePos({ x: x * 0.35, y: y * 0.35 });
      } else {
        setMousePos({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleChange = (key) => (e) => {
    const value =
      key === "message" ? e.target.value.slice(0, 500) : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setError(false);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: "himeshchakrapani6@gmail.com",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-orb orb-a" />
      <div className="contact-orb orb-b" />
      <div className="contact-orb orb-c" />

      <div className="contact-grid">
        <div className="contact-left">
          <h1 className="contact-headline">
            <span className="headline-word delay-1">Let&apos;s create</span>
            <span className="headline-word delay-2">something</span>
            <span className="headline-word delay-3 gradient-text">great.</span>
          </h1>

          <div className="availability-badge anim-badge">
            <span className="status-dot" />
            <span>Available for new projects</span>
          </div>

          <p className="contact-email-line anim-email">
            himeshchakrapani6@gmail.com
          </p>

          <div className="social-list">
            {SOCIALS.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="social-item"
                style={{ animationDelay: socialDelay(index) }}
              >
                <span
                  className="social-icon"
                  style={{
                    background: `${social.color}1f`,
                    borderColor: `${social.color}40`,
                  }}
                >
                  <SocialIcon icon={social.icon} color={social.color} />
                </span>

                <span className="social-copy">
                  <span className="social-label">{social.label}</span>
                  <span className="social-handle">{social.handle}</span>
                </span>

                <span className="social-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form-card">
          <div className="card-top-shimmer" />

          <form ref={formRef} className="contact-form" onSubmit={handleSend}>
            {sent ? (
              <div className="success-state">
                <div className="success-check">✓</div>
                <h3>Message sent!</h3>
                <p>I&apos;ll get back to you within 24 hours.</p>
                <button
                  type="button"
                  className="send-another-btn"
                  onClick={() => {
                    setSent(false);
                    setError(false);
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <div className="field-group">
                  <label
                    htmlFor="name"
                    className={focused === "name" ? "active" : ""}
                  >
                    Name
                  </label>
                  <span
                    className={`field-accent ${focused === "name" ? "on" : ""}`}
                  />
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    placeholder="Your name"
                    onChange={handleChange("name")}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    autoComplete="name"
                  />
                </div>

                <div className="field-group">
                  <label
                    htmlFor="email"
                    className={focused === "email" ? "active" : ""}
                  >
                    Email
                  </label>
                  <span
                    className={`field-accent ${focused === "email" ? "on" : ""}`}
                  />
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    placeholder="you@example.com"
                    onChange={handleChange("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    autoComplete="email"
                  />
                </div>

                <div className="field-group">
                  <label
                    htmlFor="message"
                    className={focused === "message" ? "active" : ""}
                  >
                    Message
                  </label>
                  <span
                    className={`field-accent ${focused === "message" ? "on" : ""}`}
                  />
                  <textarea
                    id="message"
                    value={form.message}
                    placeholder="Tell me about your project"
                    onChange={handleChange("message")}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    maxLength={500}
                  />
                  <div
                    className={`char-count ${form.message.length > 450 ? "warn" : ""}`}
                  >
                    {form.message.length} / 500
                  </div>
                </div>

                <button
                  ref={btnRef}
                  type="submit"
                  onClick={handleSend}
                  disabled={sending}
                  className={`send-btn ${sent ? "sent" : ""}`}
                  style={{
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                    transition:
                      mousePos.x === 0
                        ? "transform 0.5s cubic-bezier(0.16,1,0.3,1)"
                        : "transform 0.1s linear",
                  }}
                >
                  {sending ? (
                    <span className="btn-row">
                      <span className="spinner" />
                      Sending...
                    </span>
                  ) : sent ? (
                    "✓ Message Sent!"
                  ) : (
                    "Send Message  →"
                  )}
                </button>

                {error && (
                  <p className="error-note">
                    Something went wrong. Try WhatsApp instead.{" "}
                    <a href={SOCIALS[3].href} target="_blank" rel="noreferrer">
                      Open WhatsApp
                    </a>
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
