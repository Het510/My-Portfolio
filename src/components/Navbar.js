import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/Navbar.css';

const navLinks = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'skills',       label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'projects',     label: 'Projects' },
  { id: 'contact',      label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveLink(e.target.id); }); },
      { threshold: 0.4 }
    );
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">HR</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`nav-link ${activeLink === link.id ? 'active' : ''}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
              <span className="nav-link-dot" />
            </button>
          ))}
          <button className="btn-primary nav-cta" onClick={() => handleNavClick('contact')}>
            Hire Me
          </button>
        </nav>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
