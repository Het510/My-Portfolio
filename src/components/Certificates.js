// ============================================
// Certificates.js — Certificates/achievements
//                  displayed as flip cards
// ============================================
import React, { useEffect, useRef } from 'react';
import { FiAward, FiExternalLink, FiCalendar } from 'react-icons/fi';
import '../styles/Certificates.css';

// -------------------------------------------------------
// EDIT THIS ARRAY to add your own certificates
// -------------------------------------------------------
const certificates = [
  {
    id: 1,
    title: 'React - The Complete Guide',
    issuer: 'Udemy',
    date: 'Jan 2024',
    credential: '#',
    color: '#00d4ff',
    icon: '⚛️',
    skills: ['React', 'Hooks', 'Redux', 'Next.js'],
  },
  {
    id: 2,
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    date: 'Mar 2024',
    credential: '#',
    color: '#7b2fff',
    icon: '🌐',
    skills: ['HTML', 'CSS', 'JS', 'Node.js', 'MongoDB'],
  },
  {
    id: 3,
    title: 'Python for Data Science',
    issuer: 'IBM / Coursera',
    date: 'Jun 2023',
    credential: '#',
    color: '#00ffaa',
    icon: '🐍',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    id: 4,
    title: 'UI/UX Design Foundations',
    issuer: 'Google',
    date: 'Aug 2023',
    credential: '#',
    color: '#ff2d78',
    icon: '🎨',
    skills: ['Figma', 'Prototyping', 'User Research'],
  },
  {
    id: 5,
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Oct 2023',
    credential: '#',
    color: '#ffb300',
    icon: '☁️',
    skills: ['AWS', 'EC2', 'S3', 'Lambda', 'IAM'],
  },
  {
    id: 6,
    title: 'MongoDB Developer Path',
    issuer: 'MongoDB University',
    date: 'Dec 2023',
    credential: '#',
    color: '#00d4ff',
    icon: '🍃',
    skills: ['MongoDB', 'Aggregation', 'Atlas'],
  },
];

const Certificates = () => {
  const sectionRef = useRef(null);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = sectionRef.current?.querySelectorAll('.cert-card');
          cards?.forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 100);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certificates" className="certificates section-padding">
      <div className="glow-orb cert-orb" />

      <div className="container" ref={sectionRef}>
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <FiAward style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
            Achievements
          </span>
          <h2 className="section-title">My <span className="gradient-text">Certificates</span></h2>
          <p className="section-subtitle">
            Continuous learning is the key to staying relevant in this fast-paced industry.
          </p>
        </div>

        {/* Cards grid */}
        <div className="cert-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="cert-card">
              {/* Card top accent line */}
              <div className="cert-accent" style={{ background: cert.color }} />

              {/* Icon & issuer */}
              <div className="cert-top">
                <div className="cert-icon" style={{ borderColor: cert.color + '33' }}>
                  {cert.icon}
                </div>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date">
                    <FiCalendar size={11} /> {cert.date}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="cert-title">{cert.title}</h3>

              {/* Skills */}
              <div className="cert-skills">
                {cert.skills.map((sk, i) => (
                  <span key={i} className="cert-skill-tag" style={{ color: cert.color, borderColor: cert.color + '40', background: cert.color + '0d' }}>
                    {sk}
                  </span>
                ))}
              </div>

              {/* View credential link */}
              <a
                href={cert.credential}
                target="_blank"
                rel="noreferrer"
                className="cert-link"
                style={{ '--cert-color': cert.color }}
              >
                View Credential <FiExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
