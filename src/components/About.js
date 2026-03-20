// About.js — No photo, no tech tags
import React, { useEffect, useRef } from 'react';
import { FiMapPin, FiMail, FiCalendar, FiCode, FiBriefcase, FiAward } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../styles/About.css';

const info = [
  { icon: <FiMapPin />,   label: 'Location',  value: 'Gandhinagar, India' },
  { icon: <FiMail />,     label: 'Email',     value: 'hetrathod49@email.com' },
  { icon: <FiCalendar />, label: 'Available', value: 'Immediately' },
];

const highlights = [
  { icon: <FiCode />,     title: '15+ Projects', desc: 'Built & deployed full stack apps' },
  { icon: <FiAward />,    title: '5+ Certificates', desc: 'Industry recognized certifications' },
  { icon: <FiBriefcase />, title: '2+ Years', desc: 'Hands-on development experience' },
];

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) sectionRef.current?.classList.add('visible'); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about section-padding">
      <div className="glow-orb about-orb" />
      <div className="container" ref={sectionRef}>
        <div className="section-header reveal-item">
          <span className="section-tag">Who I Am</span>
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-subtitle">A passionate developer who loves building things that make a difference.</p>
        </div>

        <div className="about-new-grid">
          {/* Left: Bio */}
          <div className="about-bio-col reveal-item">
            <h3 className="about-name">Hello! I'm <span className="gradient-text">Het Rathod</span></h3>
            <p className="about-text">
              I'm a passionate Full Stack Developer based in Gandhinagar, India, specializing in
              building exceptional digital experiences. With a strong foundation in
              both frontend and backend technologies, I love turning complex problems
              into simple, beautiful, and intuitive solutions.
            </p>
            <p className="about-text">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or leveling up my design skills.
              I believe great software is born at the intersection of clean code and
              thoughtful design.
            </p>

            <div className="about-info">
              {info.map((item, i) => (
                <div key={i} className="info-row">
                  <span className="info-icon">{item.icon}</span>
                  <span className="info-label">{item.label}:</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="about-socials">
              <a href="https://github.com/Het510" target="_blank" rel="noreferrer" className="about-social-btn">
                <FaGithub /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="about-social-btn">
                <FaLinkedin /> LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="about-social-btn">
                <FaInstagram /> Instagram
              </a>
            </div>
          </div>

          {/* Right: Highlight cards */}
          <div className="about-highlights reveal-item reveal-delay-1">
            {highlights.map((h, i) => (
              <div key={i} className="highlight-card">
                <div className="highlight-icon">{h.icon}</div>
                <div>
                  <div className="highlight-title">{h.title}</div>
                  <div className="highlight-desc">{h.desc}</div>
                </div>
              </div>
            ))}

            {/* Fun facts */}
            <div className="about-fun-facts">
              <div className="fun-fact">☕ Coffee-driven developer</div>
              <div className="fun-fact">🎮 Gamer in free time</div>
              <div className="fun-fact">📚 Always learning</div>
              <div className="fun-fact">🌐 Open source lover</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
