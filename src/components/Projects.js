import React, { useState, useEffect, useRef } from "react";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";
import "../styles/Projects.css";

const projects = [
  {
    id: 1,
    title: "BitTorrent Clone",
    description: "A pixel-perfect clone of BitTorrent website with product showcase, download sections and responsive navigation.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Het510/clone-projects",
    live: "https://hetrathod1.netlify.app/bittorrent/",
    category: "frontend",
    featured: true,
    emoji: "?",
    color: "#7b2fff",
  },
  {
    id: 2,
    title: "WHOOP Clone",
    description: "A responsive clone of WHOOP fitness membership website with smooth animations and modern UI design.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Het510/clone-projects",
    live: "https://hetrathod1.netlify.app/clone-projects/whoop/",
    category: "frontend",
    featured: true,
    emoji: "??",
    color: "#00ffaa",
  },
  {
    id: 3,
    title: "Snitch Clone",
    description: "A fashion e-commerce website clone of Snitch with product listings, image sliders and responsive layout.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Het510/clone-projects",
    live: "https://hetrathod1.netlify.app/snitch/",
    category: "frontend",
    featured: false,
    emoji: "??",
    color: "#ff2d78",
  },
];

const categories = ["all", "fullstack", "frontend", "backend"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);
  const filtered = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = sectionRef.current?.querySelectorAll(".project-card");
          cards?.forEach((c, i) => setTimeout(() => c.classList.add("visible"), i * 80));
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
        <div className="section-header">
          <span className="section-tag"><FiCode style={{ marginRight: "0.4rem", verticalAlign: "middle" }} />My Work</span>
          <h2 className="section-title">Featured <span className="gradient-text-2">Projects</span></h2>
          <p className="section-subtitle">A selection of projects I have built.</p>
        </div>
        <div className="filter-bar">
          {categories.map(cat => (
            <button key={cat} className={`filter-btn ${activeFilter === cat ? "active" : ""}`} onClick={() => setActiveFilter(cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map(project => (
            <div key={project.id} className={`project-card ${project.featured ? "featured" : ""}`}>
              {project.featured && <div className="featured-badge">? Featured</div>}
              <div className="project-accent" style={{ background: project.color }} />
              <div className="project-emoji" style={{ "--color": project.color }}>{project.emoji}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t, i) => <span key={i} className="project-tech-tag">{t}</span>)}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noreferrer" className="project-link github"><FiGithub size={15} /> Code</a>
                {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="project-link live" style={{ "--color": project.color }}><FiExternalLink size={15} /> Live Demo</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
