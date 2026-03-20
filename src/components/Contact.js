// ============================================
// Contact.js — Contact form with validation
//              and social links
// ============================================
import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMail, FiMapPin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Contact.css';

const socialLinks = [
  { icon: <FaGithub />,    label: 'GitHub',    href: 'https://github.com' },
  { icon: <FaLinkedin />,  label: 'LinkedIn',  href: 'https://linkedin.com' },
  { icon: <FaTwitter />,   label: 'Twitter',   href: 'https://twitter.com' },
  { icon: <FaInstagram />, label: 'Instagram', href: 'https://instagram.com' },
];

const Contact = () => {
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const sectionRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) sectionRef.current?.classList.add('visible');
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name = 'Name is required';
    if (!form.email.trim())   e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Simulate form submission (replace with EmailJS or any API)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1800);
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="glow-orb contact-orb-1" />
      <div className="glow-orb contact-orb-2" />

      <div className="container" ref={sectionRef}>
        {/* Header */}
        <div className="section-header reveal-item">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's <span className="gradient-text">Work Together</span></h2>
          <p className="section-subtitle">
            Have a project in mind? I'd love to hear about it. Send me a message!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info reveal-item">
            <h3 className="contact-info-title">Say Hello 👋</h3>
            <p className="contact-info-text">
              I'm always open to discussing new projects, creative ideas, or opportunities
              to be part of your vision. Whether it's a freelance project, full-time role,
              or just a chat — reach out!
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon"><FiMail /></div>
                <div>
                  <div className="detail-label">Email</div>
                  <a href="mailto:hetrathod@email.com" className="detail-value">hetrathod49@email.com</a>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><FiPhone /></div>
                <div>
                  <div className="detail-label">Phone</div>
                  <a href="tel:+91XXXXXXXXXX" className="detail-value">+91 9979612044</a>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><FiMapPin /></div>
                <div>
                  <div className="detail-label">Location</div>
                  <span className="detail-value">Gandhinagar, Gujarat, India</span>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="contact-socials">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="contact-social" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper reveal-item reveal-delay-1">
            {submitted ? (
              /* Success state */
              <div className="form-success">
                <FiCheckCircle className="success-icon" />
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button className="btn-primary" onClick={() => setSubmitted(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              /* Form */
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className={`form-group ${errors.name ? 'error' : ''}`}>
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className={`form-group ${errors.email ? 'error' : ''}`}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className={`form-group ${errors.message ? 'error' : ''}`}>
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                  {loading ? (
                    <><span className="btn-spinner" /> Sending...</>
                  ) : (
                    <><FiSend size={16} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
