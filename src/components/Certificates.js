import React, { useEffect, useRef } from "react";
import { FiAward, FiExternalLink, FiCalendar } from "react-icons/fi";
import "../styles/Certificates.css";

const certificates = [
  {
    id: 1,
    title: "Introduction to C",
    issuer: "Sololearn",
    date: "Mar 2026",
    credential: "https://www.sololearn.com/certificates/CC-WX5AMHEL",
    color: "#00d4ff",
    icon: "??",
    skills: ["C Programming", "Variables", "Loops", "Functions", "Pointers"],
  },
  {
    id: 2,
    title: "AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "Dec 2025",
    credential: "#",
    color: "#7b2fff",
    icon: "??",
    skills: ["AI Tools", "ChatGPT", "Prompting", "Data Analysis", "Automation"],
  },
];

const Certificates = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const cards = sectionRef.current?.querySelectorAll(".cert-card");
      cards?.forEach((card, i) => {
        setTimeout(() => card.classList.add("visible"), i * 100);
      });
    }, 500);
  }, []);

  return (
    <section id="certificates" className="certificates section-padding">
      <div className="glow-orb cert-orb" />
      <div className="container" ref={sectionRef}>
        <div className="section-header">
          <span className="section-tag">Achievements</span>
          <h2 className="section-title">My <span className="gradient-text">Certificates</span></h2>
          <p className="section-subtitle">Continuous learning is the key to staying relevant.</p>
        </div>
        <div className="cert-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-accent" style={{ background: cert.color }} />
              <div className="cert-top">
                <div className="cert-icon" style={{ borderColor: cert.color + "33" }}>{cert.icon}</div>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date"><FiCalendar size={11} /> {cert.date}</span>
                </div>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-skills">
                {cert.skills.map((sk, i) => (
                  <span key={i} className="cert-skill-tag" style={{ color: cert.color, borderColor: cert.color + "40", background: cert.color + "0d" }}>{sk}</span>
                ))}
              </div>
              <a href={cert.credential} target="_blank" rel="noreferrer" className="cert-link" style={{ "--cert-color": cert.color }}>
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
