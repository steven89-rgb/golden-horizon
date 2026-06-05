import { useState } from 'react';
import { Section } from '../layout/Section.jsx';
import { Button, Badge, Card, Eyebrow, Input } from '../components/index.js';
import { Icons, Mail, Lock, Repeat } from '../lib/icons.jsx';

const ORDERS = [
  { id: 'GHR-10428', date: '2026-05-20', item: 'Reference Material RC-12', batch: 'GHR-2406-A', status: 'In transit', sub: true },
  { id: 'GHR-10391', date: '2026-05-02', item: 'Calibration Standard CS-21', batch: 'GHR-2406-B', status: 'Delivered', sub: false },
];

const SUMMARY = [
  ['Order History', 'Box', '2 orders'],
  ['Subscriptions', 'Repeat', '1 active'],
  ['Saved COAs', 'FileChk', '4 documents'],
  ['Tracking', 'Truck', '1 in transit'],
];

export default function Account() {
  const [signed, setSigned] = useState(false);

  if (!signed) {
    return (
      <Section pad="var(--space-10)">
        <Card variant="elevated" padding="var(--space-9)" style={{ maxWidth: 420, margin: '0 auto' }}>
          <img src="/assets/logo-mark.png" alt="" style={{ width: 64, marginBottom: 22 }} />
          <h1 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>Customer Login</h1>
          <p style={{ margin: '10px 0 26px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Access your orders, subscriptions, and saved certificates.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); setSigned(true); }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <Input label="Email" placeholder="you@lab.example" iconLeft={<Mail size={18} stroke={1.9} />} />
            <Input label="Password" type="password" placeholder="••••••••" iconLeft={<Lock size={18} stroke={1.9} />} />
            <Button variant="primary" size="lg" fullWidth type="submit">Sign In</Button>
          </form>
        </Card>
      </Section>
    );
  }

  return (
    <Section pad="var(--space-9)">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-7)', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <Eyebrow rule style={{ marginBottom: 12 }}>Account</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>Welcome back</h1>
        </div>
        <Button variant="ghost" onClick={() => setSigned(false)}>Sign out</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {SUMMARY.map(([h, ic, meta]) => {
          const Icon = Icons[ic];
          return (
            <Card key={h} variant="default" padding="var(--space-5)">
              <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <span style={{ color: 'var(--text-accent)' }}><Icon size={22} stroke={1.8} /></span>
                <div>
                  <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{h}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{meta}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Card variant="default" padding="0" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '18px var(--space-6)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)' }}>Order History</div>
        {ORDERS.map((o) => (
          <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto', gap: 16, alignItems: 'center', padding: '18px var(--space-6)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{o.item}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 3 }}>{o.id} · {o.batch}</div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{o.date}</span>
            <span>{o.sub && <Badge tone="gold" size="sm">Subscription</Badge>}</span>
            <Badge tone={o.status === 'Delivered' ? 'verified' : 'pending'} dot>{o.status}</Badge>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10, padding: '16px var(--space-6)', flexWrap: 'wrap' }}>
          <Button variant="secondary" size="sm" iconLeft={<Repeat size={15} stroke={1.9} />}>Manage subscription</Button>
          <Button variant="ghost" size="sm">Pause · Skip · Cancel</Button>
        </div>
      </Card>
    </Section>
  );
}
