import React from 'react';

/**
 * Golden Horizon Research — CountUp
 * Animates a numeric value from 0 to `end` the first time it scrolls into view.
 * Honest by design: it only animates whatever number it's given — it does not
 * invent data. Supports prefix/suffix, decimals, and thousands separators.
 */
export function CountUp({
  end,
  duration = 1400,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  style = {},
  className = '',
  ...rest
}) {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  const started = React.useRef(false);

  const format = React.useCallback(
    (n) => {
      const fixed = Number(n).toFixed(decimals);
      const [int, dec] = fixed.split('.');
      const grouped = separator
        ? int.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
        : int;
      return `${prefix}${grouped}${dec ? '.' + dec : ''}${suffix}`;
    },
    [decimals, prefix, suffix, separator]
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setVal(end);
        return;
      }
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(end * eased);
        if (p < 1) requestAnimationFrame(tick);
        else setVal(end);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className} style={style} {...rest}>
      {format(val)}
    </span>
  );
}
