import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo.jsx';
import { Button } from '../components/index.js';
import { ArrowR, User } from '../lib/icons.jsx';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/verify', label: 'Verify COAs' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

/** Sticky, frosted top navigation. */
export function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(252,251,249,0.82)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', height: 72, padding: '0 var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV.map((n) => {
            const active = n.to === '/' ? pathname === '/' : pathname.startsWith(n.to);
            return (
              <button
                key={n.to}
                onClick={() => navigate(n.to)}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '8px 14px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'color var(--dur-fast)',
                  whiteSpace: 'nowrap',
                }}
              >
                {n.label}
              </button>
            );
          })}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => navigate('/account')}
            aria-label="Account"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 42,
              height: 42,
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-default)',
              background: 'var(--surface-card)',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            <User size={19} stroke={1.9} />
          </button>
          <Button variant="dark" size="sm" iconRight={<ArrowR size={15} />} onClick={() => navigate('/shop')}>
            Shop
          </Button>
        </div>
      </div>
    </header>
  );
}
