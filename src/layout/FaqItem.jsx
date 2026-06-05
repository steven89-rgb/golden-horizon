import { Plus, Minus } from '../lib/icons.jsx';

/** Single expandable FAQ row. */
export function FaqItem({ item, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border-default)' }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '22px 4px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)' }}>{item.q}</span>
        <span style={{ color: 'var(--text-accent)', flexShrink: 0 }}>{open ? <Minus size={20} /> : <Plus size={20} />}</span>
      </button>
      {open && (
        <p style={{ margin: '0 0 22px', padding: '0 4px', maxWidth: 720, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
          {item.a}
        </p>
      )}
    </div>
  );
}
