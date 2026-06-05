import React from 'react';

/**
 * Golden Horizon Research — Select
 * Native select styled to match Input. Used for Shop filters (Product Type, Availability).
 */
export function Select({ label, options = [], value, onChange, size = 'md', id, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const h = { md: 48, lg: 56 }[size] || 48;
  const selId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }}>
      {label && (
        <label
          htmlFor={selId}
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
      <div style={{ position: 'relative', height: h }}>
        <select
          id={selId}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%',
            height: '100%',
            padding: '0 40px 0 16px',
            appearance: 'none',
            WebkitAppearance: 'none',
            background: 'var(--surface-card)',
            border: `1px solid ${focus ? 'var(--accent)' : 'var(--border-strong)'}`,
            borderRadius: 'var(--radius-md)',
            boxShadow: focus ? 'var(--focus-ring)' : 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
          }}
          {...rest}
        >
          {options.map((o) => {
            const val = typeof o === 'string' ? o : o.value;
            const lbl = typeof o === 'string' ? o : o.label;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-tertiary)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
