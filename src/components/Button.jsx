import React from 'react';

/**
 * Golden Horizon Research — Button
 * Variants: primary (gold), secondary (outline), ghost, dark (matte-black fill).
 * Sizes: sm, md, lg. Optional leading/trailing icon nodes.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '0 14px', height: 36, fontSize: 'var(--text-sm)', gap: 7 },
    md: { padding: '0 20px', height: 46, fontSize: 'var(--text-base)', gap: 9 },
    lg: { padding: '0 28px', height: 56, fontSize: 'var(--text-md)', gap: 10 },
  };

  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--ink)', border: '1px solid transparent', boxShadow: 'var(--shadow-sm)' },
    secondary: { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-xs)' },
    ghost: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent', boxShadow: 'none' },
    dark: { background: 'var(--surface-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', boxShadow: 'none' },
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const hoverStyle = !disabled && hover ? {
    primary: { background: 'var(--accent-hover)' },
    secondary: { background: 'var(--surface-subtle)', borderColor: 'var(--gray-400)' },
    ghost: { background: 'var(--surface-sunken)' },
    dark: { background: 'var(--surface-inverse-soft)', borderColor: 'rgba(246,240,228,0.30)' },
  }[variant] : {};

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        width: fullWidth ? '100%' : 'auto',
        height: s.height,
        padding: s.padding,
        fontFamily: 'var(--font-sans)',
        fontSize: s.fontSize,
        fontWeight: 'var(--weight-semibold)',
        letterSpacing: 'var(--tracking-tight)',
        borderRadius: 'var(--radius-full)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transform: active && !disabled ? 'scale(0.97)' : 'scale(1)',
        transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        whiteSpace: 'nowrap',
        ...v,
        ...hoverStyle,
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{iconRight}</span>}
    </button>
  );
}
