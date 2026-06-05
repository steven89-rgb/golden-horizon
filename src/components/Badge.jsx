import React from 'react';

/**
 * Golden Horizon Research — Badge
 * Status & label pill. Tones: verified, pending, error, neutral, gold. Optional leading dot.
 */
export function Badge({ children, tone = 'neutral', dot = false, size = 'md', style = {}, ...rest }) {
  const tones = {
    verified: { bg: 'var(--green-100)', fg: 'var(--green-500)', bd: '#cfe2d6' },
    pending: { bg: 'var(--amber-100)', fg: 'var(--amber-500)', bd: '#ecdcb8' },
    error: { bg: 'var(--red-100)', fg: 'var(--red-500)', bd: '#e6cdc6' },
    neutral: { bg: 'var(--surface-sunken)', fg: 'var(--text-secondary)', bd: 'var(--border-default)' },
    gold: { bg: 'var(--accent-soft)', fg: 'var(--gold-700)', bd: 'var(--accent-border)' },
  };
  const sizes = {
    sm: { padding: '3px 9px', fontSize: '11px', gap: 6, dotS: 6 },
    md: { padding: '5px 12px', fontSize: 'var(--text-xs)', gap: 7, dotS: 7 },
  };
  const t = tones[tone] || tones.neutral;
  const s = sizes[size] || sizes.md;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        padding: s.padding,
        fontFamily: 'var(--font-sans)',
        fontSize: s.fontSize,
        fontWeight: 'var(--weight-semibold)',
        letterSpacing: '0.01em',
        color: t.fg,
        background: t.bg,
        border: `1px solid ${t.bd}`,
        borderRadius: 'var(--radius-full)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: s.dotS, height: s.dotS, borderRadius: '50%', background: t.fg, flexShrink: 0 }} />}
      {children}
    </span>
  );
}
