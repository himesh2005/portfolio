import React from 'react';
import './Experience.css';

const EXPERIENCE = [
  {
    period: '2023 - Present',
    role: 'Senior Video Editor',
    company: 'Freelance',
    desc: 'Working with YouTube creators and brands across finance, sports, and lifestyle niches.',
  },
  {
    period: '2022 - 2023',
    role: 'Video Editor',
    company: 'Content Studio Pvt. Ltd.',
    desc: 'Produced 50+ videos per month for social media clients.',
  },
  {
    period: '2021 - 2022',
    role: 'Junior Editor',
    company: 'Digital Agency',
    desc: 'Started career editing short-form content and brand reels.',
  },
];

const SKILLS = {
  Editing: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Final Cut Pro'],
  Color: ['Color Grading', 'LUT Design', 'DaVinci Color', 'ACES Workflow'],
  Motion: ['After Effects', 'Motion Graphics', 'Lower Thirds', 'Titles'],
  Tools: ['Photoshop', 'Illustrator', 'Audition', 'Frame.io'],
};

export default function Experience() {
  return (
    <section className="experience-page page-shell">
      <div className="experience-content">
        <div className="experience-columns">
          <div>
            <h2>Experience</h2>
            <div className="timeline">
              {EXPERIENCE.map((item) => (
                <article className="timeline-item" key={item.period}>
                  <p className="period">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="company">{item.company}</p>
                  <p className="desc">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2>Skills</h2>
            <div className="skill-groups">
              {Object.entries(SKILLS).map(([label, items]) => (
                <section key={label}>
                  <p className="group-label">{label}</p>
                  <div className="pill-wrap">
                    {items.map((item) => (
                      <span className="skill-pill" key={item}>{item}</span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
