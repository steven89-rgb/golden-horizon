import { Section } from '../layout/Section.jsx';
import { Button, Card, Eyebrow, Reveal } from '../components/index.js';
import { Icons, WhatsApp, Mail } from '../lib/icons.jsx';

const REASONS = [
  { icon: 'Search', h: 'Quick Questions', p: 'General questions about the catalog, documentation, or process.' },
  { icon: 'Box', h: 'Order Support', p: 'Help with an existing order, tracking, or fulfillment status.' },
  { icon: 'ShieldChk', h: 'Product Verification', p: 'Confirm a batch, lot, or Certificate of Analysis.' },
];

export default function Contact() {
  return (
    <Section pad="var(--space-10)" className="gh-section-pad">
      <div className="gh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-9)', alignItems: 'center' }}>
        <Reveal as="div">
          <Eyebrow rule style={{ marginBottom: 20 }}>Contact</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', color: 'var(--text-primary)' }}>Talk to us directly.</h1>
          <p style={{ margin: '16px 0 30px', maxWidth: 440, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
            The fastest way to reach Golden Horizon Research is on WhatsApp. Our team responds to product, order, and verification questions during business hours.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="dark" size="lg" iconLeft={<span style={{ color: '#25D366', display: 'inline-flex' }}><WhatsApp size={20} /></span>}>Contact Us On WhatsApp</Button>
            <Button variant="secondary" size="lg" iconLeft={<Mail size={17} stroke={1.9} />}>Email Us</Button>
          </div>
          <p style={{ margin: '22px 0 0', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>support@goldenhorizon.example · Responses during California business hours.</p>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {REASONS.map((r, i) => {
            const Icon = Icons[r.icon];
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
