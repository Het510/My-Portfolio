// ============================================
// Loader.js — Cinematic loading screen with
//             Het Rathod name animation
// ============================================
import React, { useEffect, useState } from 'react';
import '../styles/Loader.css';

const Loader = ({ onComplete }) => {
  const [phase, setPhase]       = useState(0);
  // 0 = black screen
  // 1 = letters appear one by one
  // 2 = name glows + holds
  // 3 = exit wipe

  const firstName = "HET";
  const lastName  = "RATHOD";

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);   // start letters
    const t2 = setTimeout(() => setPhase(2), 1800);  // full glow
    const t3 = setTimeout(() => setPhase(3), 2800);  // exit
    const t4 = setTimeout(() => onComplete(), 3500); // done
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`loader ${phase >= 3 ? 'loader-exit' : ''}`}>
      {/* Animated grid */}
      <div className="loader-grid" />

      {/* Radial glow behind name */}
      <div className={`loader-glow ${phase >= 2 ? 'active' : ''}`} />

      {/* Corner decorations */}
      <div className="loader-corner loader-corner-tl" />
      <div className="loader-corner loader-corner-tr" />
      <div className="loader-corner loader-corner-bl" />
      <div className="loader-corner loader-corner-br" />

      {/* Name container */}
      <div className="loader-content">
        {/* Tagline above */}
        <div className={`loader-tag ${phase >= 2 ? 'visible' : ''}`}>
          Welcome to my portfolio
        </div>

        {/* First name: HET */}
        <div className="loader-name-row">
          {firstName.split('').map((char, i) => (
            <span
              key={i}
              className={`loader-char ${phase >= 1 ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Last name: RATHOD */}
        <div className="loader-name-row loader-lastname">
          {lastName.split('').map((char, i) => (
            <span
              key={i}
              className={`loader-char loader-char-outline ${phase >= 1 ? 'visible' : ''}`}
              style={{ transitionDelay: `${(firstName.length + i) * 0.12}s` }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Animated underline */}
        <div className={`loader-line ${phase >= 2 ? 'active' : ''}`}>
          <span className="loader-line-inner" />
        </div>

        {/* Role text */}
        <div className={`loader-role ${phase >= 2 ? 'visible' : ''}`}>
          Full Stack Developer &amp; UI/UX Designer
        </div>

        {/* Progress bar */}
        <div className="loader-progress">
          <div className={`loader-progress-bar ${phase >= 1 ? 'active' : ''}`} />
        </div>
      </div>

      {/* Particle dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="loader-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top:  `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
