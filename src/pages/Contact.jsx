import { Section } from '../layout/Section.jsx';
import { Button, Card, Eyebrow, Reveal } from '../components/index.js';
import { Icons, WhatsApp, Mail } from '../lib/icons.jsx';
import { useT } from '../lib/i18n.jsx';

export default function Contact() {
  const { t, get } = useT();
  const reasons = get('contact.reasons') || [];
  return (
    <Section pad="var(--space-10)" className="gh-section-pad">
      <div className="gh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-9)', alignItems: 'center' }}>
        <Reveal as="div">
          <Eyebrow rule style={{ marginBottom: 20 }}>{t('contact.eyebrow')}</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', color: 'var(--text-primary)' }}>{t('contact.title')}</h1>
          <p style={{ margin: '16px 0 30px', maxWidth: 440, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
            {t('contact.body')}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="dark" size="lg" iconLeft={<span style={{ color: '#25D366', display: 'inline-flex' }}><WhatsApp size={20} /></span>}>{t('contact.whatsapp')}</Button>
            <Button variant="secondary" size="lg" iconLeft={<Mail size={17} stroke={1.9} />}>{t('contact.email')}</Button>
          </div>
          <p style={{ margin: '22px 0 0', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{t('contact.note')}</p>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {reasons.map((r, i) => {
            const Icon = Icons[r.icon] || Icons.ShieldChk;
            return (
              <Reveal key={r.h} delay={i * 90} as="div">
              <Card variant="default" lift padding="var(--space-5)">
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', color: 'var(--gold-300)', flexShrink: 0 }}><Icon size={22} stroke={1.8} /></span>
                  <div>
                    <h3 style={{ margin: '2px 0 6px', fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)' }}>{r.h}</h3>
                    <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)' }}>{r.p}</p>
                  </div>
                </div>
              </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
