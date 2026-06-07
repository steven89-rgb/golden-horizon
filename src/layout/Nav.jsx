import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo.jsx';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';
import { useT } from '../lib/i18n.jsx';
import { User, Cart, Menu, X, ShieldChk, WhatsApp, ArrowR } from '../lib/icons.jsx';

const NAV = [
  { to: '/', key: 'home' },
  { to: '/shop', key: 'products' },
  { to: '/verify', key: 'verify' },
  { to: '/about', key: 'about' },
  { to: '/faq', key: 'faq' },
  { to: '/contact', key: 'contact' },
];

function IconButton({ label, onClick, badge, children, className }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={className}
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
        transition: 'border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
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

/** Full-screen mobile navigation drawer. */
function MobileDrawer({ open, onClose, onNavigate, pathname }) {
  const { t } = useT();
  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="gh-mobile-drawer gh-enter"
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        backgroundColor: '#0A0A0A',
        backgroundImage: 'radial-gradient(120% 60% at 50% 0%, rgba(201,167,106,0.10), transparent 60%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: 96, padding: '0 var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
        <Logo layout="stacked" />
        <IconButton label="Close menu" onClick={onClose}>
          <X size={20} stroke={2} />
        </IconButton>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-6)', gap: 2, flex: 1 }}>
        {NAV.map((n, i) => {
          const active = n.to === '/' ? pathname === '/' : pathname.startsWith(n.to);
          return (
            <button
              key={n.to}
              onClick={() => onNavigate(n.to)}
              className="gh-enter"
              style={{
                appearance: 'none',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                padding: '20px 4px',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xl)',
                fontWeight: active ? 800 : 600,
                letterSpacing: 'var(--tracking-tight)',
                color: active ? 'var(--text-accent)' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                animationDelay: `${0.04 * i + 0.05}s`,
              }}
            >
              {t('nav.' + n.key)}
              <ArrowR size={18} />
            </button>
          );
        })}
      </nav>
      <div style={{ padding: 'var(--space-6)', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <button
          onClick={() => onNavigate('/contact')}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, height: 52, borderRadius: 'var(--radius-full)', border: '1px solid var(--border-strong)', background: 'var(--surface-card)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 600, cursor: 'pointer' }}
        >
          <span style={{ color: '#25D366', display: 'inline-flex' }}><WhatsApp size={20} /></span> {t('contact.whatsapp')}
        </button>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          <ShieldChk size={14} stroke={1.9} /> {t('footer.fulfillment')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

/** Sticky, frosted top navigation (dark). */
export function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useT();
  const [menuOpen, setMenuOpen] = useState(false);

  // Always close the drawer on route change.
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const goMobile = (to) => { setMenuOpen(false); navigate(to); };

  return (
    <>
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
        <nav className="gh-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          {NAV.map((n) => {
            const active = n.to === '/' ? pathname === '/' : pathname.startsWith(n.to);
            return (
              <button
                key={n.to}
                onClick={() => navigate(n.to)}
                className="gh-link"
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
                {t('nav.' + n.key)}
                {active && (
                  <span style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 2, background: 'var(--gradient-gold)', borderRadius: 'var(--radius-full)' }} />
                )}
              </button>
            );
          })}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="gh-nav-links"><LanguageSwitcher /></span>
          <IconButton label={t('nav.account')} onClick={() => navigate('/account')}>
            <User size={19} stroke={1.9} />
          </IconButton>
          <IconButton label={t('nav.cart')} onClick={() => navigate('/shop')} badge={0}>
            <Cart size={19} stroke={1.9} />
          </IconButton>
          <IconButton
            label={menuOpen ? 'Close menu' : 'Open menu'}
            className="gh-nav-toggle"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} stroke={2} /> : <Menu size={20} stroke={2} />}
          </IconButton>
        </div>
      </div>
    </header>
    <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={goMobile} pathname={pathname} />
    </>
  );
}
