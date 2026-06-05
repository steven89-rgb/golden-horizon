import React from 'react';

/**
 * Golden Horizon Research — Eyebrow
 * Wide-tracked uppercase section label, echoing the RESEARCH wordmark.
 * `rule` adds the flanking gold hairlines from the brand mark.
 */
export function Eyebrow({ children, rule = false, tone = 'gold', align = 'left', style = {}, ...rest }) {
  const color =
    tone === 'gold' ? 'var(--text-accent)' : tone === 'muted' ? 'var(--text-tertiary)' : 'var(--text-inverse)';
  const line = (
    <span
      style={{
        height: 1,
        width: 34,
        background: tone === 'gold' ? 'var(--accent-border)' : 'currentColor',
        opacity: tone === 'gold' ? 1 : 0.4,
        flex: '0 0 auto',
      }}
    />
  );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        gap: 14,
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-semibold)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-caps)',
        color,
        ...style,
      }}
      {...rest}
    >
      {rule && line}
      <span>{children}</span>
      {rule && align === 'center' && line}
    </div>
  );
}
