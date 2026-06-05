import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../layout/Section.jsx';
import { FaqItem } from '../layout/FaqItem.jsx';
import { Button, Eyebrow } from '../components/index.js';
import { ShieldChk, WhatsApp } from '../lib/icons.jsx';
import { FAQ } from '../lib/data.js';

const EXTRA = [
  { q: 'How do I read a Certificate of Analysis?', a: 'Each COA lists the product name, batch and lot identifiers, the analysis date, and the purity result. The same fields appear on the verification portal so you can cross-check any document against its record.' },
  { q: 'Do you ship internationally?', a: 'Orders are fulfilled from our California operation. Available destinations and timelines are confirmed at checkout; tracking is provided once a shipment is dispatched.' },
  { q: 'How are subscriptions managed?', a: 'From your account you can pause, skip, or cancel a subscription at any time. Each renewal references the current verified batch and its Certificate of Analysis.' },
];

export default function Faq() {
  const navigate = useNavigate();
  const items = [...FAQ, ...EXTRA];
  const [open, setOpen] = useState(0);
  return (
    <div>
      <div style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-sunken)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-10) var(--space-6) var(--space-8)', textAlign: 'center' }}>
          <Eyebrow rule align="center" style={{ justifyContent: 'center', marginBottom: 18 }}>Frequently Asked Questions</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', color: 'var(--text-primary)' }}>Answers, documented.</h1>
          <p style={{ margin: '16px auto 0', maxWidth: 520, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
            Everything about verification, documentation, fulfillment, and orders. Still have a question? Reach us on WhatsApp.
          </p>
        </div>
      </div>
      <Section pad="var(--space-9)">
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          {items.map((f, i) => (
            <FaqItem key={i} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 'var(--space-7)', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              <ShieldChk size={18} stroke={1.8} /> Can’t find what you need?
            </span>
            <Button variant="primary" iconLeft={<span style={{ display: 'inline-flex' }}><WhatsApp size={18} /></span>} onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
