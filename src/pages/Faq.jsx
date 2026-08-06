import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../layout/Section.jsx';
import { FaqItem } from '../layout/FaqItem.jsx';
import { Button, Eyebrow, Reveal } from '../components/index.js';
import { ShieldChk, WhatsApp } from '../lib/icons.jsx';
import { useT } from '../lib/i18n.jsx';

export default function Faq() {
  const navigate = useNavigate();
  const { t, get } = useT();
  const items = get('faq.items') || [];
  const [open, setOpen] = useState(0);
  return (
    <div>
      <div style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-sunken)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-10) var(--space-6) var(--space-8)', textAlign: 'center' }}>
          <Eyebrow rule align="center" style={{ justifyContent: 'center', marginBottom: 18 }}>{t('faq.eyebrow')}</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', color: 'var(--text-primary)' }}>{t('faq.title')}</h1>
          <p style={{ margin: '16px auto 0', maxWidth: 520, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
            {t('faq.intro')}
          </p>
        </div>
      </div>
      <Section pad="var(--space-9)" className="gh-section-pad">
        <Reveal style={{ maxWidth: 820, margin: '0 auto' }}>
          {items.map((f, i) => (
            <FaqItem key={i} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 'var(--space-7)', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              <ShieldChk size={18} stroke={1.8} /> {t('faq.cantFind')}
            </span>
            <Button variant="primary" iconLeft={<span style={{ display: 'inline-flex' }}><WhatsApp size={18} /></span>} onClick={() => navigate('/contact')}>
              {t('faq.cta')}
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
