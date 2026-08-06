import { useT, LANGS } from '../lib/i18n.jsx';
import { Globe } from '../lib/icons.jsx';

/** Compact EN / ES language toggle. */
export function LanguageSwitcher({ tone = 'light' }) {
  const { lang, setLang } = useT();
  const muted = tone === 'light' ? 'var(--text-secondary)' : 'var(--gray-500)';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: muted }}>
      <Globe size={16} stroke={1.8} />
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
        {LANGS.map((l, i) => (
          <span key={l.code} style={{ display: 'inline-flex', alignItems: 'center' }}>
            {i > 0 && <span style={{ color: 'var(--border-strong)', margin: '0 2px' }}>/</span>}
            <button
              onClick={() => setLang(l.code)}
              aria-label={l.name}
              aria-pressed={lang === l.code}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 4px',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: lang === l.code ? 700 : 500,
                letterSpacing: '0.06em',
                color: lang === l.code ? 'var(--text-accent)' : muted,
              }}
            >
              {l.label}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
