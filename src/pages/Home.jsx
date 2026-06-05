import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, SectionHead } from '../layout/Section.jsx';
import { FaqItem } from '../layout/FaqItem.jsx';
import { Button, Card, Eyebrow, Input } from '../components/index.js';
import { Icons, ArrowR, ShieldChk, Search, FileChk } from '../lib/icons.jsx';
import { TRUST, WHY, STEPS, FAQ } from '../lib/data.js';

/* ----------------------------- Hero ----------------------------- */

function ProductMock() {
  return (
    <div style={{ position: 'relative', minHeight: 460, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* warm gold glow behind the product */}
      <div style={{ position: 'absolute', inset: '-8% -12%', background: 'radial-gradient(55% 55% at 62% 52%, rgba(201,167,106,0.20), transparent 70%)', pointerEvents: 'none' }} />
      <img
        src="/assets/hero-product.webp"
        alt="Golden Horizon Research RTA-20 research pen with its packaging, marked Research Use Only"
        style={{ position: 'relative', width: '100%', maxWidth: 660, height: 'auto', borderRadius: 'var(--radius-lg)' }}
      />
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ambient gold horizon glow */}
      <div style={{ position: 'absolute', top: -160, left: '55%', width: 1100, height: 520, background: 'radial-gradient(50% 100% at 50% 0%, rgba(201,167,106,0.16), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--space-10) var(--space-6) var(--space-9)', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 'var(--space-9)', alignItems: 'center' }}>
          <div>
            <Eyebrow rule style={{ marginBottom: 22 }}>Golden Horizon Research</Eyebrow>
            <h1 style={{ margin: 0, maxWidth: 540, fontSize: 'clamp(2.75rem, 5.4vw, 5rem)', fontWeight: 800, letterSpacing: 'var(--tracking-tighter)', lineHeight: 1.0, color: 'var(--text-primary)' }}>
              Premium Research <span style={{ color: 'var(--text-accent)' }}>Materials</span>
            </h1>
            <div style={{ width: 72, height: 4, borderRadius: 'var(--radius-full)', background: 'var(--gradient-gold)', margin: '28px 0 0' }} />
            <p style={{ margin: '24px 0 0', maxWidth: 460, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
              Independently verified. Batch traceable.
              <br />
              Transparent documentation. Consistent standards.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" iconRight={<ArrowR size={17} />} onClick={() => navigate('/shop')}>View Products</Button>
              <Button variant="secondary" size="lg" iconLeft={<ShieldChk size={17} stroke={1.9} />} onClick={() => navigate('/verify')}>Verify COAs</Button>
            </div>
          </div>
          <ProductMock />
        </div>

        <TrustBar />
        <BatchBand />
      </div>
    </div>
  );
}

function TrustBar() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 'var(--space-9)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      {TRUST.map((t, i) => {
        const Icon = Icons[t.icon];
        return (
          <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '26px 24px', borderLeft: i === 0 ? 'none' : '1px solid var(--border-subtle)' }}>
            <span style={{ color: 'var(--text-accent)', flexShrink: 0 }}><Icon size={26} stroke={1.7} /></span>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--text-primary)' }}>{t.label}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginTop: 4 }}>{t.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CoaThumbs() {
  const paper = (rot, z, x) => (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: 0,
        width: 74,
        height: 96,
        background: '#F4F2EC',
        borderRadius: 6,
        boxShadow: '0 8px 20px rgba(0,0,0,0.45)',
        transform: `rotate(${rot}deg)`,
        zIndex: z,
        padding: 9,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div style={{ width: '55%', height: 5, borderRadius: 2, background: 'var(--gold-400)' }} />
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ width: i % 3 === 2 ? '60%' : '100%', height: 3, borderRadius: 2, background: '#CFCABD' }} />
      ))}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
      <div style={{ position: 'relative', width: 130, height: 100 }}>
        {paper(-8, 1, 6)}
        {paper(7, 2, 50)}
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--text-accent)' }}>
        <FileChk size={15} stroke={1.9} /> View Sample COA
      </span>
    </div>
  );
}

function BatchBand() {
  const navigate = useNavigate();
  const [val, setVal] = useState('');
  const go = () => navigate(val.trim() ? `/verify?q=${encodeURIComponent(val.trim())}` : '/verify');
  return (
    <Card variant="elevated" accent padding="var(--space-7)" style={{ marginTop: 'var(--space-8)', background: 'var(--surface-card)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr auto', gap: 'var(--space-7)', alignItems: 'center' }}>
        <div>
          <Eyebrow rule style={{ marginBottom: 14 }}>Verify With Confidence</Eyebrow>
          <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>Check Your Batch</h2>
          <p style={{ margin: '10px 0 0', maxWidth: 320, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
            Enter your batch or lot number to view its official Certificate of Analysis.
          </p>
        </div>
        <Input
          mono
          placeholder="Enter batch or lot number"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && go()}
          iconLeft={<Search size={18} />}
          trailing={<Button size="sm" iconRight={<ArrowR size={15} />} onClick={go}>Verify Now</Button>}
        />
        <CoaThumbs />
      </div>
    </Card>
  );
}

/* --------------------------- Sections --------------------------- */

function WhySection() {
  return (
    <Section>
      <SectionHead eyebrow="Why Golden Horizon Research" title="Built around verification, not promises." desc="We let third-party documentation and transparent batch records do the talking — every batch, every order." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
        {WHY.map((w) => {
          const Icon = Icons[w.icon];
          return (
            <Card key={w.h} variant="default" padding="var(--space-5)">
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', color: 'var(--gold-300)', border: '1px solid var(--accent-border)' }}><Icon size={24} stroke={1.8} /></span>
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
    <Section style={{ background: 'var(--surface-sunken)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
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
              <h3 style={{ margin: '6px 0 8px', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>{s.h}</h3>
              <p style={{ margin: 0, maxWidth: 220, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)' }}>{s.p}</p>
            </div>
          );
        })}
      </div>
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
      <FaqSection />
    </div>
  );
}
