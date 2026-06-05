import React from 'react';

/**
 * Golden Horizon Research — Input
 * Labeled text field. Supports leading icon, trailing slot (e.g. a search button),
 * mono mode for batch/lot codes, and error state.
 */
export function Input({
  label,
  hint,
  error,
  iconLeft = null,
  trailing = null,
  mono = false,
  size = 'md',
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = { md: 48, lg: 56 };
  const h = heights[size] || 48;
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-2xs)',
            fontWeight: 'var(--weight-semibold)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--tracking-caps)',
            color: 'var(--text-tertiary)',
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: h,
          padding: '0 6px 0 16px',
          background: 'var(--surface-card)',
          border: `1px solid ${error ? 'var(--red-500)' : focus ? 'var(--accent)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus ? 'var(--focus-ring)' : 'none',
          transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        }}
      >
        {iconLeft && <span style={{ display: 'inline-flex', color: 'var(--text-tertiary)', flexShrink: 0 }}>{iconLeft}</span>}
        <input
          id={inputId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            minWidth: 0,
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            fontWeight: mono ? 500 : 400,
            letterSpacing: mono ? '0.04em' : 'normal',
            color: 'var(--text-primary)',
          }}
          {...rest}
        />
        {trailing && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{trailing}</span>}
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: error ? 'var(--red-500)' : 'var(--text-tertiary)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
