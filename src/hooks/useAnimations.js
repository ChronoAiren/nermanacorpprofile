import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Intersection Observer hook for scroll-triggered reveal animations.
 * Returns a ref to attach and whether the element is visible.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/**
 * Counter animation hook — animates a number from 0 to target.
 */
export function useCounter(target, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart || !target) return;

    let start = 0;
    const end = parseInt(target, 10);
    const stepTime = Math.max(Math.floor(duration / end), 10);
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, shouldStart]);

  return count;
}

/**
 * Typewriter effect hook — types out text character by character.
 */
export function useTypewriter(text, speed = 40, shouldStart = false) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!shouldStart || !text) return;

    let index = 0;
    setDisplayText('');
    setIsDone(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsDone(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, shouldStart]);

  return [displayText, isDone];
}

/**
 * Active section tracker for navigation highlighting.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    const visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        entries.forEach((entry) => {
          visibleSections.set(entry.target.id, entry.isIntersecting);
          if (entry.isIntersecting) changed = true;
        });

        // Loop through sections in order to prioritize the top-most visible one
        if (changed) {
          for (const id of sectionIds) {
            if (visibleSections.get(id)) {
              setActiveId(id);
              break;
            }
          }
        }
      },
      { threshold: 0.2, rootMargin: '-10% 0px -40% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return activeId;
}

/**
 * Theme (dark / light) toggle with localStorage persistence.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('monolith-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('monolith-theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return [theme, toggle];
}

/**
 * Live timestamp that updates every second.
 */
export function useLiveTimestamp() {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toISOString().slice(0, 19).replace('T', '_').replace(/-/g, '.').replace(/:/g, ':');
      setTimestamp(formatted);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return timestamp;
}
