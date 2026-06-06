import React from 'react';

/**
 * Golden Horizon Research — Reveal
 * Wraps children in an element that fades + rises into view the first time it
 * enters the viewport. Pure CSS transition (see motion.css .gh-reveal); this
 * just toggles the .is-visible class via IntersectionObserver.
 *
 * Props:
 *   as       – element/tag to render (default 'div')
 *   delay    – ms stagger before the transition starts
 *   y        – not used directly; kept for API symmetry
 *   once     – reveal a single time (default true)
 *   className/style – merged through
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  once = true,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: show immediately, skip observing.
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`gh-reveal${visible ? ' is-visible' : ''}${className ? ' ' + className : ''}`}
      style={{ '--gh-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
