import { useNavigate } from 'react-router-dom';

/**
 * Brand lockup — gold sun mark + GOLDEN HORIZON / RESEARCH wordmark.
 * layout="row" (default) places the mark beside the wordmark;
 * layout="stacked" centers the mark above it (used in the top nav).
 * Click returns to home.
 */
export function Logo({ layout = 'row', compact = false }) {
  const navigate = useNavigate();
  const stacked = layout === 'stacked';
  const markH = stacked ? 30 : compact ? 26 : 30;
  return (
    <button
      onClick={() => navigate('/')}
      aria-label="Golden Horizon Research — home"
      style={{
        display: 'flex',
        flexDirection: stacked ? 'column' : 'row',
        alignItems: 'center',
        gap: stacked ? 6 : 11,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <img src="/assets/logo-mark.png" alt="" style={{ height: markH, width: 'auto' }} />
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1,
          textAlign: stacked ? 'center' : 'left',
          alignItems: stacked ? 'center' : 'flex-start',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: compact ? 14 : 16, letterSpacing: stacked ? '0.06em' : '0.02em', color: 'var(--text-primary)' }}>
          GOLDEN HORIZON
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 9, letterSpacing: '0.34em', color: 'var(--text-accent)', marginTop: 3, marginRight: stacked ? '-0.34em' : 0 }}>
          RESEARCH
        </span>
      </span>
    </button>
  );
}
