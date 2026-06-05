import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo.jsx';
import { User, Cart } from '../lib/icons.jsx';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/verify', label: 'Verify COAs' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

function IconButton({ label, onClick, badge, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 42,
        height: 42,
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-default)',
        background: 'transparent',
        cursor: 'pointer',
        color: 'var(--text-primary)',
      }}
    >
      {children}
      {badge != null && (
        <span
          style={{
            position: 'absolute',
            top: -3,
            right: -3,
            minWidth: 18,
            height: 18,
            padding: '0 4px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--accent)',
            color: 'var(--ink)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/** Sticky, frosted top navigation (dark). */
export function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(10,10,10,0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', height: 96, padding: '0 var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-6)' }}>
        <Logo layout="stacked" />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          {NAV.map((n) => {
            const active = n.to === '/' ? pathname === '/' : pathname.startsWith(n.to);
            return (
              <button
                key={n.to}
                onClick={() => navigate(n.to)}
                style={{
                  position: 'relative',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '6px 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: active ? 700 : 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.10em',
                  color: active ? 'var(--text-accent)' : 'var(--text-secondary)',
                  transition: 'color var(--dur-fast)',
                  whiteSpace: 'nowrap',
                }}
              >
                {n.label}
                {active && (
                  <span style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 2, background: 'var(--gradient-gold)', borderRadius: 'var(--radius-full)' }} />
                )}
              </button>
            );
          })}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconButton label="Account" onClick={() => navigate('/account')}>
            <User size={19} stroke={1.9} />
          </IconButton>
          <IconButton label="Cart" onClick={() => navigate('/shop')} badge={0}>
            <Cart size={19} stroke={1.9} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
