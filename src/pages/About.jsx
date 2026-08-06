import { Section } from '../layout/Section.jsx';
import { Card, Eyebrow, Reveal } from '../components/index.js';
import { Icons } from '../lib/icons.jsx';
import { useT } from '../lib/i18n.jsx';

export default function About() {
  const { t, get } = useT();
  const values = get('about_page.values') || [];
  return (
    <div>
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: 'var(--space-11) var(--space-6)', textAlign: 'center' }}>
          <img src="/assets/logo-mark.png" alt="" style={{ width: 84, marginBottom: 24, marginLeft: 'auto', marginRight: 'auto' }} />
          <Eyebrow rule align="center" style={{ justifyContent: 'center', marginBottom: 20 }}>{t('nav.about')}</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', color: 'var(--text-primary)' }}>
            {t('about_page.title')}
          </h1>
          <p style={{ margin: '20px auto 0', maxWidth: 560, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
            {t('about_page.body')}
          </p>
        </div>
      </div>
      <Section className="gh-section-pad">
        <div className="gh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {values.map((v, i) => {
            const Icon = Icons[v.icon] || Icons.ShieldChk;
            return (
              <Reveal key={v.h} delay={i * 100}>
                <Card variant="default" accent lift padding="var(--space-6)" style={{ height: '100%' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', color: 'var(--gold-300)' }}><Icon size={24} stroke={1.8} /></span>
                  <h3 style={{ margin: '18px 0 8px', fontSize: 'var(--text-lg)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>{v.h}</h3>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)' }}>{v.p}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
