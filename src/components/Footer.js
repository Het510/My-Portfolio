// ============================================
// Footer.js — Footer with logo, links,
//             social icons, and copyright
// ============================================
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FiHeart, FiCode } from 'react-icons/fi';
import '../styles/Footer.css';

const footerLinks = [
  { label: 'Home',         id: 'home' },
  { label: 'About',        id: 'about' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Contact',      id: 'contact' },
];

const socials = [
  { icon: <FaGithub />,    href: 'https://github.com',    label: 'GitHub' },
  { icon: <FaLinkedin />,  href: 'https://linkedin.com',  label: 'LinkedIn' },
  { icon: <FaTwitter />,   href: 'https://twitter.com',   label: 'Twitter' },
  { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
];

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="container">
        {/* Top: Logo + Nav */}
        <div className="footer-top">
          {/* Logo */}
          <div className="footer-logo">
            <span className="logo-bracket">&lt;</span>
            <span>Dev</span>
            <span className="logo-bracket">/&gt;</span>
          </div>

          {/* Nav links */}
          <nav className="footer-nav">
            {footerLinks.map(l => (
              <button key={l.id} className="footer-link" onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="footer-socials">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" className="footer-social" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom: Copyright */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <span className="gradient-text">Het Rathod</span>. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <FiHeart className="heart-icon" /> and <FiCode className="code-icon" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
