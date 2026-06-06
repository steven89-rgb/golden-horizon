import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, SectionHead } from '../layout/Section.jsx';
import { FaqItem } from '../layout/FaqItem.jsx';
import { Button, Card, Eyebrow, Input, Reveal, CountUp } from '../components/index.js';
import { Icons, ArrowR, ShieldChk, Search, FileChk, Lock } from '../lib/icons.jsx';
import { TRUST, WHY, STEPS, FAQ, STATS, BRAND_FACTS } from '../lib/data.js';

/* ----------------------------- Hero ----------------------------- */

function ProductMock() {
  return (
    <div style={{ position: 'relative', minHeight: 460, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* layered ambient glow behind the product (breathing) */}
      <div
        className="gh-glow-breathe"
        style={{ position: 'absolute', inset: '-10% -14%', background: 'radial-gradient(52% 52% at 60% 50%, rgba(201,167,106,0.26), transparent 70%)', pointerEvents: 'none' }}
      />
      <div
        style={{ position: 'absolute', inset: '6% 12%', background: 'radial-gradient(40% 40% at 50% 60%, rgba(201,167,106,0.10), transparent 72%)', pointerEvents: 'none' }}
      />
      <div style={{ position: 'relative', width: '100%', maxWidth: 660 }}>
        <img
          className="gh-float"
          src="/assets/hero-product.webp"
          alt="Golden Horizon Research RTA-20 research pen with its packaging, marked Research Use Only"
          width="660"
          height="460"
          decoding="async"
          fetchpriority="high"
          style={{ position: 'relative', width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.55))' }}
        />
        {/* premium reflection */}
        <img
          aria-hidden="true"
          src="/assets/hero-product.webp"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '99%',
            width: '100%',
            height: 'auto',
            transform: 'scaleY(-1)',
            opacity: 0.18,
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 42%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 42%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="gh-hero-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ambient gold horizon glow + a soft breathing halo */}
      <div style={{ position: 'absolute', top: -160, left: '55%', width: 1100, height: 520, background: 'radial-gradient(50% 100% at 50% 0%, rgba(201,167,106,0.18), transparent 70%)', pointerEvents: 'none' }} />
      <div className="gh-glow-breathe" style={{ position: 'absolute', top: -60, left: '12%', width: 520, height: 420, background: 'radial-gradient(50% 50% at 50% 50%, rgba(201,167,106,0.07), transparent 70%)', pointerEvents: 'none' }} />
      {/* hairline horizon */}
      <div style={{ position: 'absolute', top: 1, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,167,106,0.35) 50%, transparent)', pointerEvents: 'none' }} />

      <div className="gh-container-pad" style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--space-10) var(--space-6) var(--space-9)', position: 'relative' }}>
        <div className="gh-hero" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 'var(--space-9)', alignItems: 'center' }}>
          <div>
            <Eyebrow rule className="gh-enter gh-enter-d1" style={{ marginBottom: 22 }}>Golden Horizon Research</Eyebrow>
            <h1 className="gh-enter gh-enter-d2" style={{ margin: 0, maxWidth: 540, fontSize: 'clamp(2.75rem, 5.4vw, 5rem)', fontWeight: 800, letterSpacing: 'var(--tracking-tighter)', lineHeight: 1.0, color: 'var(--text-primary)' }}>
              Premium Research <span style={{ color: 'var(--text-accent)' }}>Materials</span>
            </h1>
            <div className="gh-enter gh-enter-d2" style={{ width: 72, height: 4, borderRadius: 'var(--radius-full)', background: 'var(--gradient-gold)', margin: '28px 0 0' }} />
            <p className="gh-enter gh-enter-d3" style={{ margin: '24px 0 0', maxWidth: 460, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
              Independently verified. Batch traceable.
              <br />
              Transparent documentation. Consistent standards.
            </p>
            <div className="gh-cta-row gh-enter gh-enter-d4" style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" iconRight={<ArrowR size={17} />} onClick={() => navigate('/shop')}>View Products</Button>
              <Button variant="secondary" size="lg" iconLeft={<ShieldChk size={17} stroke={1.9} />} onClick={() => navigate('/verify')}>Verify COAs</Button>
            </div>
            <div className="gh-enter gh-enter-d5" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 26, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              <Lock size={14} stroke={1.9} /> Secure checkout · Encrypted · California fulfillment
            </div>
          </div>
          <div className="gh-hero-media gh-enter gh-enter-d3">
            <ProductMock />
          </div>
        </div>

        <Reveal delay={120}><TrustBar /></Reveal>
        <Reveal delay={80}><BatchBand /></Reveal>
      </div>
    </div>
  );
}

function TrustBar() {
  return (
    <div className="gh-trustbar" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 'var(--space-9)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      {TRUST.map((t, i) => {
        const Icon = Icons[t.icon];
        return (
          <div key={t.label} className="gh-trust-tile" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '26px 24px', borderLeft: i === 0 ? 'none' : '1px solid var(--border-subtle)' }}>
            <span className="gh-tile-icon" style={{ color: 'var(--text-accent)', flexShrink: 0 }}><Icon size={26} stroke={1.7} /></span>
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
    <div className="gh-batchband-thumbs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
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
      <div className="gh-batchband" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr auto', gap: 'var(--space-7)', alignItems: 'center' }}>
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

/* --------------------------- Stats --------------------------- */

function StatTile({ s, delay }) {
  const Icon = Icons[s.icon];
  return (
    <Reveal delay={delay} className="gh-stat-tile" style={{ padding: 'var(--space-6) var(--space-5)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
      <span style={{ display: 'inline-flex', color: 'var(--text-accent)', marginBottom: 14 }}>{Icon ? <Icon size={22} stroke={1.7} /> : null}</span>
      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(2rem, 3.4vw, 2.75rem)', letterSpacing: 'var(--tracking-tight)', lineHeight: 1, color: 'var(--text-primary)' }}>
        <CountUp end={s.end} decimals={s.decimals || 0} prefix={s.prefix || ''} suffix={s.suffix || ''} />
      </div>
      <div style={{ marginTop: 12, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{s.label}</div>
      <div style={{ marginTop: 4, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{s.sub}</div>
    </Reveal>
  );
}

function StatsBand() {
  // Append only the optional brand-fact tiles that have real values set.
  const extra = [];
  if (BRAND_FACTS.yearsOperating != null)
    extra.push({ icon: 'Clock', end: BRAND_FACTS.yearsOperating, decimals: 0, suffix: '+', label: 'Years Operating', sub: 'Serving research customers' });
  if (BRAND_FACTS.ordersFulfilled != null)
    extra.push({ icon: 'Truck', end: BRAND_FACTS.ordersFulfilled, decimals: 0, suffix: '+', label: 'Orders Fulfilled', sub: 'Dispatched from California' });
  if (BRAND_FACTS.verificationLookups != null)
    extra.push({ icon: 'Search', end: BRAND_FACTS.verificationLookups, decimals: 0, suffix: '+', label: 'Verification Requests', sub: 'Completed via the portal' });
  const tiles = [...STATS, ...extra];

  return (
    <Section style={{ background: 'var(--surface-sunken)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }} pad="var(--space-10)">
      <Reveal>
        <SectionHead dark eyebrow="By The Numbers" title="Verification you can count." desc="Figures drawn directly from the live catalogue and verification portal — nothing inflated, nothing invented." />
      </Reveal>
      <div className="gh-stats" style={{ display: 'grid', gridTemplateColumns: `repeat(${tiles.length}, 1fr)`, gap: 16 }}>
        {tiles.map((s, i) => (
          <StatTile key={s.label} s={s} delay={i * 90} />
        ))}
      </div>
    </Section>
  );
}

/* --------------------------- Sections --------------------------- */

function WhySection() {
  return (
    <Section className="gh-section-pad">
      <Reveal>
        <SectionHead eyebrow="Why Golden Horizon Research" title="Built around verification, not promises." desc="We let third-party documentation and transparent batch records do the talking — every batch, every order." />
      </Reveal>
      <div className="gh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
        {WHY.map((w, i) => {
          const Icon = Icons[w.icon];
          return (
            <Reveal key={w.h} delay={i * 90}>
              <Card variant="default" lift padding="var(--space-5)" style={{ height: '100%' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', color: 'var(--gold-300)', border: '1px solid var(--accent-border)' }}><Icon size={24} stroke={1.8} /></span>
                <h3 style={{ margin: '18px 0 8px', fontSize: 'var(--text-md)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>{w.h}</h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)' }}>{w.p}</p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function ProcessSection() {
  return (
    <Section style={{ background: 'var(--surface-sunken)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <Reveal>
        <SectionHead dark eyebrow="How It Works" title="From source to fulfillment." desc="A consistent, four-stage path that ends in a verifiable Certificate of Analysis." />
      </Reveal>
      <div className="gh-process" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
        {STEPS.map((s, i) => {
          const Icon = Icons[s.icon];
          return (
            <Reveal key={s.n} delay={i * 110} style={{ position: 'relative', padding: '0 22px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 'var(--radius-full)', background: 'var(--surface-inverse-soft)', border: '1px solid var(--border-inverse)', color: 'var(--accent)' }}><Icon size={23} stroke={1.8} /></span>
                {i < 3 && <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--accent-border), var(--border-inverse))' }} />}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-accent)', marginTop: 22 }}>{s.n}</div>
              <h3 style={{ margin: '6px 0 8px', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>{s.h}</h3>
              <p style={{ margin: 0, maxWidth: 220, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)' }}>{s.p}</p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <Section pad="var(--space-10)" className="gh-section-pad">
      <Reveal>
        <SectionHead eyebrow="Frequently Asked Questions" title="Answers, documented." />
      </Reveal>
      <Reveal delay={80} style={{ maxWidth: 820 }}>
        {FAQ.map((f, i) => (
          <FaqItem key={i} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </Reveal>
    </Section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <StatsBand />
      <WhySection />
      <ProcessSection />
      <FaqSection />
    </div>
  );
}
