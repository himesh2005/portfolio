import React from 'react';
import './Contact.css';

const SOCIALS = ['YouTube', 'Instagram', 'LinkedIn', 'Vimeo'];

export default function Contact() {
  return (
    <section className="contact-page page-shell">
      <div className="contact-content">
        <header className="contact-head">
          <h2>
            Let&apos;s make something
            <span>great.</span>
          </h2>
          <p className="availability">
            <span className="status-dot" />
            Available for new projects
          </p>
        </header>

        <div className="contact-grid">
          <aside>
            <a className="mail-link" href="mailto:hello@abhichakrapani.com">hello@abhichakrapani.com</a>
            <div className="social-links">
              {SOCIALS.map((item) => (
                <a href="#" key={item}>{item}</a>
              ))}
            </div>
          </aside>

          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Your name" />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" />

            <label htmlFor="message">Message</label>
            <textarea id="message" rows="4" placeholder="Tell me about your project" />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
