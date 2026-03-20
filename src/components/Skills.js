// ============================================
// Skills.js — Animated skills section with
//             progress bars and tech icons
// ============================================
import React, { useEffect, useRef, useState } from 'react';
import {
  SiReact, SiNodedotjs, SiJavascript, SiPython,
  SiMongodb, SiExpress, SiTailwindcss, SiGit,
  SiFirebase, SiFigma, SiTypescript, SiHtml5,
  SiCss3, SiGithub, SiPostman, SiC
} from 'react-icons/si';
import '../styles/Skills.css';

// ── Skill categories ──────────────────────────
const skillCategories = [
  {
    title: 'Frontend',
    color: '#00d4ff',
    skills: [
      { name: 'React.js',   icon: <SiReact />,      level: 85 },
      { name: 'JavaScript', icon: <SiJavascript />, level: 80 },
      { name: 'HTML5',      icon: <SiHtml5 />,      level: 90 },
      { name: 'CSS3',       icon: <SiCss3 />,       level: 85 },
      { name: 'TypeScript', icon: <SiTypescript />, level: 65 },
      { name: 'Tailwind',   icon: <SiTailwindcss />,level: 75 },
    ],
  },
  {
    title: 'Backend',
    color: '#7b2fff',
    skills: [
      { name: 'Node.js',   icon: <SiNodedotjs />, level: 75 },
      { name: 'Express.js',icon: <SiExpress />,   level: 70 },
      { name: 'Python',    icon: <SiPython />,    level: 72 },
      { name: 'MongoDB',   icon: <SiMongodb />,   level: 68 },
      { name: 'Firebase',  icon: <SiFirebase />,  level: 65 },
      { name: 'C',         icon: <SiC />,         level: 60 },
    ],
  },
  {
    title: 'Tools',
    color: '#00ffaa',
    skills: [
      { name: 'Git',     icon: <SiGit />,     level: 80 },
      { name: 'GitHub',  icon: <SiGithub />,  level: 82 },
      { name: 'Figma',   icon: <SiFigma />,   level: 65 },
      { name: 'Postman', icon: <SiPostman />, level: 75 },
    ],
  },
];

// Single skill bar
const SkillBar = ({ name, icon, level, color, animate }) => (
  <div className="skill-bar-item">
    <div className="skill-bar-header">
      <span className="skill-icon" style={{ color }}>{icon}</span>
      <span className="skill-name">{name}</span>
      <span className="skill-level" style={{ color }}>{level}%</span>
    </div>
    <div className="skill-bar-track">
      <div
        className="skill-bar-fill"
        style={{
          width: animate ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  </div>
);

const Skills = () => {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          // Stagger card reveals
          const cards = sectionRef.current?.querySelectorAll('.skill-card');
          cards?.forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 120));
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills section-padding">
      <div className="glow-orb skills-orb-1" />
      <div className="glow-orb skills-orb-2" />

      <div className="container" ref={sectionRef}>
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">What I Know</span>
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="skills-tabs">
          {skillCategories.map((cat, i) => (
            <button
              key={i}
              className={`skills-tab ${activeTab === i ? 'active' : ''}`}
              style={activeTab === i ? { borderColor: cat.color, color: cat.color, background: cat.color + '15' } : {}}
              onClick={() => { setActiveTab(i); setAnimate(false); setTimeout(() => setAnimate(true), 50); }}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="skills-content">
          {/* Left: Skill bars */}
          <div className="skills-bars skill-card">
            <h3 className="skills-cat-title" style={{ color: skillCategories[activeTab].color }}>
              {skillCategories[activeTab].title} Skills
            </h3>
            {skillCategories[activeTab].skills.map((skill, i) => (
              <SkillBar
                key={i}
                {...skill}
                color={skillCategories[activeTab].color}
                animate={animate}
              />
            ))}
          </div>

          {/* Right: Icon grid */}
          <div className="skills-icons skill-card">
            <h3 className="skills-cat-title" style={{ color: skillCategories[activeTab].color }}>
              Tech Stack
            </h3>
            <div className="skills-icon-grid">
              {skillCategories[activeTab].skills.map((skill, i) => (
                <div
                  key={i}
                  className="skill-icon-box"
                  style={{ '--color': skillCategories[activeTab].color }}
                >
                  <span className="skill-icon-big" style={{ color: skillCategories[activeTab].color }}>
                    {skill.icon}
                  </span>
                  <span className="skill-icon-label">{skill.name}</span>
                  {/* Circular progress */}
                  <svg className="skill-circle" viewBox="0 0 36 36">
                    <path
                      className="skill-circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="skill-circle-fill"
                      strokeDasharray={`${animate ? skill.level : 0}, 100`}
                      stroke={skillCategories[activeTab].color}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      style={{ transition: `stroke-dasharray 1.2s ${i * 0.1}s ease` }}
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: All tech tags */}
        <div className="all-skills-row skill-card">
          {skillCategories.flatMap(cat =>
            cat.skills.map((sk, i) => (
              <span key={i} className="all-skill-tag" style={{ '--color': cat.color }}>
                <span style={{ color: cat.color }}>{sk.icon}</span>
                {sk.name}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
