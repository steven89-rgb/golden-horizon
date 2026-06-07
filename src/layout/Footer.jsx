import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo.jsx';
import { Disclaimer } from './Disclaimer.jsx';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';
import { MapPin, Mail } from '../lib/icons.jsx';
import { useT } from '../lib/i18n.jsx';

/** Matte-black footer carrying nav columns, language switcher, and disclaimer. */
export function Footer() {
  const navigate = useNavigate();
  const { t } = useT();
  const cols = [
    { h: t('footer.catalog'), items: [[t('footer.shopAll'), '/shop'], [t('footer.verify'), '/verify'], [t('footer.tracking'), '/verify']] },
    { h: t('footer.company'), items: [[t('footer.about'), '/about'], [t('footer.contact'), '/contact'], [t('footer.account'), '/account']] },
    { h: t('footer.support'), items: [[t('footer.whatsapp'), '/contact'], [t('footer.email'), '/contact'], [t('footer.shipping'), '/shop']] },
  ];
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--text-inverse)', marginTop: 'var(--space-12)', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--space-10) var(--space-6) var(--space-6)' }}>
        <div className="gh-footer-cols" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 'var(--space-7)', paddingBottom: 'var(--space-8)', borderBottom: '1px solid var(--border-inverse)' }}>
          <div>
            <Logo />
            <p style={{ marginTop: 18, maxWidth: 320, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--gray-400)' }}>
              {t('footer.tagline')}
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 18, color: 'var(--gray-500)', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 'var(--text-xs)' }}>
                <MapPin size={15} stroke={1.8} /> {t('footer.fulfillment')}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 'var(--text-xs)' }}>
                <Mail size={15} stroke={1.8} /> support@goldenhorizon.example
              </span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div style={{ fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', fontWeight: 600, color: 'var(--text-accent)', marginBottom: 14 }}>
                {c.h}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map(([label, to]) => (
                  <button
                    key={label}
                    onClick={() => navigate(to)}
                    style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--gray-400)' }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, paddingTop: 'var(--space-6)', flexWrap: 'wrap' }}>
          <Disclaimer compact />
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <LanguageSwitcher tone="dark" />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>{t('footer.rights')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
