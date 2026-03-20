// Hero.js — Hero with photo on right side
import React, { useEffect, useRef, useState } from 'react';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Hero.css';

const roles = ['Full Stack Developer', 'UI/UX Designer', 'React Enthusiast', 'Problem Solver'];

const Hero = () => {
  const [roleIndex, setRoleIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex]   = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed   = isDeleting ? 50 : 90;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) { setTimeout(() => setIsDeleting(true), 1600); }
        else { setCharIndex(c => c + 1); }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false); setCharIndex(0);
          setRoleIndex(r => (r + 1) % roles.length);
        } else { setCharIndex(c => c - 1); }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3, dx: (Math.random()-0.5)*0.4, dy: (Math.random()-0.5)*0.4,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(0,212,255,${p.opacity})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${window.scrollY / total})`;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero">
      <div id="scroll-progress" className="scroll-progress" />
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="glow-orb hero-orb-1" />
      <div className="glow-orb hero-orb-2" />
      <div className="glow-orb hero-orb-3" />
      <div className="hero-grid" />

      <div className="container hero-inner">
        {/* LEFT: Text */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for work
          </div>
          <h1 className="hero-title">
            <span className="hero-greeting">Hello, I'm</span>
            <span className="hero-name">Het Rathod</span>
          </h1>
          <div className="hero-role">
            <span className="role-text">{displayed}</span>
            <span className="cursor-blink">|</span>
          </div>
          <p className="hero-desc">
            I'm a passionate Full Stack Developer from Gandhinagar, India, who
            loves building beautiful web applications. I turn ideas into reality
            using modern technologies like React, Node.js, and MongoDB.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work <FiArrowDown size={16} />
            </button>
            <a href="/resume.pdf" download className="btn-outline">
              Download CV <FiDownload size={16} />
            </a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/Het510" target="_blank" rel="noreferrer" className="social-icon"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
          </div>
          <div className="hero-stats">
            {[{number:'15+',label:'Projects Built'},{number:'5+',label:'Certificates'},{number:'2+',label:'Years Exp.'}].map((s,i) => (
              <div key={i} className="hero-stat">
                <span className="stat-number gradient-text">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div className="hero-photo-col">
          <div className="hero-photo-wrapper">
            <div className="hero-photo-ring" />
            <div className="hero-photo-ring hero-photo-ring-2" />
            <div className="hero-photo-frame">
              <img src="/photo.jpg" alt="Het Rathod" className="hero-photo-img" onError={(e) => { e.target.style.display='none'; }} />
              <div className="hero-photo-initials">HR</div>
            </div>
            <div className="hero-float-badge hfb-1">⚛️ React</div>
            <div className="hero-float-badge hfb-2">🚀 Node.js</div>
            <div className="hero-float-badge hfb-3">🎨 UI/UX</div>
          </div>
        </div>
      </div>

      <button className="scroll-indicator" onClick={scrollDown}>
        <span className="scroll-wheel" />
      </button>
    </section>
  );
};

export default Hero;
