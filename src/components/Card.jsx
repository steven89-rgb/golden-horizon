import React from 'react';

/**
 * Golden Horizon Research — Card
 * Surface container. Variants: default (bordered), elevated (shadow), inverse (matte black).
 * `interactive` adds hover lift + pointer (clickable cards).
 * `lift` adds the same hover elevation WITHOUT a pointer cursor (decorative cards).
 * `accent` adds a thin top gold rule.
 */
export function Card({
  children,
  variant = 'default',
  interactive = false,
  lift = false,
  accent = false,
  padding = 'var(--space-6)',
  style = {},
  onClick,
  ...rest
}) {
  const variants = {
    default: { background: 'var(--surface-card)', border: '1px solid var(--border-default)', boxShadow: 'none', color: 'var(--text-primary)' },
    elevated: { background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)', color: 'var(--text-primary)' },
    inverse: { background: 'var(--ink)', border: '1px solid var(--border-inverse)', boxShadow: 'none', color: 'var(--text-inverse)' },
  };
  const v = variants[variant] || variants.default;
  const [hover, setHover] = React.useState(false);
  const elevated = (interactive || lift) && hover;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        padding,
        cursor: interactive ? 'pointer' : 'default',
        transition:
          'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
        transform: elevated ? 'translateY(-4px)' : 'none',
        boxShadow: elevated ? 'var(--shadow-lg)' : v.boxShadow,
        overflow: 'hidden',
        ...v,
        ...(elevated ? { borderColor: 'var(--accent-border)' } : null),
        ...style,
      }}
      {...rest}
    >
      {accent && (
        <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--gradient-gold)' }} />
      )}
      {children}
    </div>
  );
}
