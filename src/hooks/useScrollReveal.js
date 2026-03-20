// ============================================
// useScrollReveal.js — Reusable hook that
//   triggers CSS class when element is in view
// ============================================
import { useEffect, useRef } from 'react';

/**
 * @param {object} options
 * @param {number} options.threshold  — 0–1, how much visible before triggering
 * @param {string} options.className  — CSS class to add (default: 'sr-visible')
 * @param {boolean} options.once      — only trigger once (default: true)
 */
const useScrollReveal = ({
  threshold = 0.15,
  className = 'sr-visible',
  once = true,
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(className);
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove(className);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, className, once]);

  return ref;
};

export default useScrollReveal;
