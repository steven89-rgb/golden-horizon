import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, SectionHead } from '../layout/Section.jsx';
import { FaqItem } from '../layout/FaqItem.jsx';
import { Button, Card, Eyebrow, Input } from '../components/index.js';
import { Icons, ArrowR, ShieldChk, Search } from '../lib/icons.jsx';
import { TRUST, WHY, STEPS, FAQ } from '../lib/data.js';

function Hero() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 900, height: 360, background: 'radial-gradient(60% 100% at 50% 0%, rgba(201,167,106,0.18), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-12) var(--space-6) var(--space-10)', position: 'relative', textAlign: 'center' }}>
        <img src="/assets/logo-mark.png" alt="" style={{ width: 96, marginBottom: 26, marginLeft: 'auto', marginRight: 'auto' }} />
        <Eyebrow rule align="center" style={{ marginBottom: 26, justifyContent: 'center' }}>Golden Horizon Research</Eyebrow>
        <h1 style={{ margin: '0 auto', maxWidth: 760, fontSize: 'var(--text-4xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tighter)', lineHeight: 'var(--leading-tight)', color: 'var(--text-primary)' }}>
          Premium Research Materials
        </h1>
        <p style={{ margin: '24px auto 0', maxWidth: 560, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
          Independently verified. Transparent documentation. Consistent standards.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 34, flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" iconRight={<ArrowR size={17} />} onClick={() => navigate('/shop')}>View Products</Button>
          <Button variant="secondary" size="lg" iconLeft={<ShieldChk size={17} stroke={1.9} />} onClick={() => navigate('/verify')}>Verify COAs</Button>
        </div>
      </div>
      <TrustBar />
    </div>
  );
}

function TrustBar() {
  return (
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-6)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {TRUST.map((t) => {
          const Icon = Icons[t.icon];
          return (
            <div key={t.label} style={{ background: 'var(--surface-card)', padding: '22px 20px', display: 'flex', alignItems: 'center', gap: 13 }}>
              <span style={{ color: 'var(--text-accent)', flexShrink: 0 }}><Icon size={24} stroke={1.8} /></span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{t.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WhySection() {
  return (
    <Section>
      <SectionHead eyebrow="Why Golden Horizon Research" title="Built around verification, not promises." desc="We let third-party documentation and transparent batch records do the talking — every batch, every order." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
        {WHY.map((w) => {
          const Icon = Icons[w.icon];
          return (
            <Card key={w.h} variant="default" padding="var(--space-5)">
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', color: 'var(--gold-700)' }}><Icon size={24} stroke={1.8} /></span>
              <h3 style={{ margin: '18px 0 8px', fontSize: 'var(--text-md)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>{w.h}</h3>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)' }}>{w.p}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function ProcessSection() {
  return (
    <Section dark>
      <SectionHead dark eyebrow="How It Works" title="From source to fulfillment." desc="A consistent, four-stage path that ends in a verifiable Certificate of Analysis." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
        {STEPS.map((s, i) => {
          const Icon = Icons[s.icon];
          return (
            <div key={s.n} style={{ position: 'relative', padding: '0 22px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 'var(--radius-full)', background: 'var(--surface-inverse-soft)', border: '1px solid var(--border-inverse)', color: 'var(--accent)' }}><Icon size={23} stroke={1.8} /></span>
                {i < 3 && <span style={{ flex: 1, height: 1, background: 'var(--border-inverse)' }} />}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-accent)', marginTop: 22 }}>{s.n}</div>
              <h3 style={{ margin: '6px 0 8px', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-inverse)' }}>{s.h}</h3>
              <p style={{ margin: 0, maxWidth: 220, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--gray-400)' }}>{s.p}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function VerifyTeaser() {
  const navigate = useNavigate();
  const [val, setVal] = useState('GHR-2406-A');
  return (
    <Section>
      <Card variant="elevated" accent padding="0" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr' }}>
          <div style={{ padding: 'var(--space-9)' }}>
            <Eyebrow rule style={{ marginBottom: 18 }}>Certificate Verification</Eyebrow>
            <h2 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-snug)', color: 'var(--text-primary)' }}>Verify any batch in seconds.</h2>
            <p style={{ margin: '14px 0 26px', maxWidth: 420, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
              Search a batch or lot number to retrieve its Certificate of Analysis, analysis date, and purity results.
            </p>
            <Input
              label="Batch or Lot Number"
              mono
              value={val}
              onChange={(e) => setVal(e.target.value)}
              iconLeft={<Search size={18} />}
              trailing={<Button size="sm" onClick={() => navigate(`/verify?q=${encodeURIComponent(val)}`)}>Verify</Button>}
            />
          </div>
          <div style={{ background: 'var(--surface-subtle)', borderLeft: '1px solid var(--border-subtle)', padding: 'var(--space-7)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
            {[['Document', 'COA PDF', 'FileChk'], ['Analysis Date', '2026-05-18', 'Clock'], ['Purity Result', '99.2%', 'BadgeChk']].map(([k, v, ic]) => {
              const Icon = Icons[ic];
              return (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
                  <span style={{ color: 'var(--text-accent)' }}><Icon size={22} stroke={1.8} /></span>
                  <div>
                    <div style={{ fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', fontWeight: 600, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{k}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--text-primary)', marginTop: 3 }}>{v}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </Section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <Section pad="var(--space-10)">
      <SectionHead eyebrow="Frequently Asked Questions" title="Answers, documented." />
      <div style={{ maxWidth: 820 }}>
        {FAQ.map((f, i) => (
          <FaqItem key={i} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <WhySection />
      <ProcessSection />
      <VerifyTeaser />
      <FaqSection />
    </div>
  );
}
