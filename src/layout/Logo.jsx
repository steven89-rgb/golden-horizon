import { useNavigate } from 'react-router-dom';

/**
 * Brand lockup — gold sun mark + GOLDEN HORIZON / RESEARCH wordmark.
 * Click returns to home.
 */
export function Logo({ dark = false, compact = false }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      aria-label="Golden Horizon Research — home"
      style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <img src="/assets/logo-mark.png" alt="" style={{ height: compact ? 26 : 30, width: 'auto' }} />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: compact ? 14 : 16, letterSpacing: '0.02em', color: dark ? 'var(--text-inverse)' : 'var(--text-primary)' }}>
          GOLDEN HORIZON
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 9, letterSpacing: '0.34em', color: 'var(--text-accent)', marginTop: 3 }}>
          RESEARCH
        </span>
      </span>
    </button>
  );
}
