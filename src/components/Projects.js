// ============================================
// Projects.js — Portfolio cards with
//               live demo & GitHub links,
//               category filter
// ============================================
import React, { useState, useEffect, useRef } from 'react';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import '../styles/Projects.css';

// 3D tilt utility for cards
const addTilt = (card) => {
  const onMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
  };
  const onLeave = () => { card.style.transform = ''; };
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);
  return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
};

// -------------------------------------------------------
// EDIT THIS ARRAY to add your own projects
// -------------------------------------------------------
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce app with cart, authentication, payment integration, and admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    live: 'https://example.com',
    category: 'fullstack',
    featured: true,
    emoji: '🛒',
    color: '#00d4ff',
  },
  {
    id: 2,
    title: 'AI Chat Application',
    description: 'A real-time chat application powered by OpenAI with conversation history and markdown support.',
    tech: ['React', 'OpenAI API', 'Firebase', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://example.com',
    category: 'frontend',
    featured: true,
    emoji: '🤖',
    color: '#7b2fff',
  },
  {
    id: 3,
    title: 'Task Management System',
    description: 'Kanban-style project management tool with drag-and-drop, team collaboration, and analytics.',
    tech: ['React', 'Redux', 'Express', 'PostgreSQL'],
    github: 'https://github.com',
    live: 'https://example.com',
    category: 'fullstack',
    featured: false,
    emoji: '📋',
    color: '#00ffaa',
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with 7-day forecasts, animated weather icons, and location search.',
    tech: ['React', 'OpenWeather API', 'Chart.js'],
    github: 'https://github.com',
    live: 'https://example.com',
    category: 'frontend',
    featured: false,
    emoji: '🌦️',
    color: '#ff2d78',
  },
  {
    id: 5,
    title: 'Blog API Backend',
    description: 'RESTful API for a blogging platform with JWT auth, image uploads, comments, and rate limiting.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com',
    live: '',
    category: 'backend',
    featured: false,
    emoji: '⚙️',
    color: '#ffb300',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'This very portfolio! Built with React, CSS animations, and a custom dark theme design system.',
    tech: ['React', 'CSS3', 'Framer Motion'],
    github: 'https://github.com',
    live: '#',
    category: 'frontend',
    featured: false,
    emoji: '💼',
    color: '#00d4ff',
  },
];

const categories = ['all', 'fullstack', 'frontend', 'backend'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Scroll reveal + tilt effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = sectionRef.current?.querySelectorAll('.project-card');
          cards?.forEach((c, i) => {
            setTimeout(() => {
              c.classList.add('visible');
              addTilt(c);
            }, i * 80);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <section id="projects" className="projects section-padding">
      <div className="glow-orb projects-orb" />

      <div className="container" ref={sectionRef}>
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <FiCode style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
            My Work
          </span>
          <h2 className="section-title">Featured <span className="gradient-text-2">Projects</span></h2>
          <p className="section-subtitle">
            A selection of projects I've built — from full-stack apps to polished frontends.
          </p>
        </div>

        {/* Category Filter */}
        <div className="filter-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filtered.map(project => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
            >
              {project.featured && (
                <div className="featured-badge">⭐ Featured</div>
              )}

              {/* Top accent */}
              <div className="project-accent" style={{ background: project.color }} />

              {/* Emoji display */}
              <div className="project-emoji" style={{ '--color': project.color }}>
                {project.emoji}
              </div>

              {/* Title + description */}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Tech stack */}
              <div className="project-tech">
                {project.tech.map((t, i) => (
                  <span key={i} className="project-tech-tag">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noreferrer" className="project-link github">
                  <FiGithub size={15} /> Code
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="project-link live" style={{ '--color': project.color }}>
                    <FiExternalLink size={15} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
