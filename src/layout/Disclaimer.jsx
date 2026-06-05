import { ShieldChk } from '../lib/icons.jsx';

/** Site-wide legal disclaimer — research-use-only, no medical claims. */
export function Disclaimer({ compact = false }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        maxWidth: 760,
        fontFamily: 'var(--font-sans)',
        fontSize: compact ? 11 : 'var(--text-xs)',
        lineHeight: 'var(--leading-normal)',
        color: compact ? 'var(--gray-500)' : 'var(--text-tertiary)',
      }}
    >
      <span style={{ flexShrink: 0, marginTop: 1, color: 'var(--gray-500)' }}>
        <ShieldChk size={compact ? 14 : 16} stroke={1.8} />
      </span>
      <span>
        <strong style={{ fontWeight: 600, color: compact ? 'var(--gray-400)' : 'var(--text-secondary)' }}>For laboratory research purposes only.</strong>{' '}
        Not intended for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.
      </span>
    </div>
  );
}
