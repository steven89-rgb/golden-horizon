import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, SectionHead } from '../layout/Section.jsx';
import { ProductThumb } from '../layout/Product.jsx';
import { FaqItem } from '../layout/FaqItem.jsx';
import { Button, Card, Eyebrow, Reveal } from '../components/index.js';
import { Icons, ArrowR, ShieldChk, Check } from '../lib/icons.jsx';
import { useCatalog, addToCartUrl } from '../lib/catalog.js';
import { useT } from '../lib/i18n.jsx';

/* ------------------------------- Hero ------------------------------- */

function ProductMock() {
  return (
    <div className="gh-hero-media" style={{ position: 'relative', minHeight: 440, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
  const { t } = useT();
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -160, left: '55%', width: 1100, height: 520, background: 'radial-gradient(50% 100% at 50% 0%, rgba(201,167,106,0.16), transparent 70%)', pointerEvents: 'none' }} />
      <div className="gh-hero-wrap" style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--space-10) var(--space-6) var(--space-9)', position: 'relative' }}>
        <div className="gh-hero" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 'var(--space-9)', alignItems: 'center' }}>
          <div>
            <Eyebrow rule style={{ marginBottom: 22 }}>{t('hero.eyebrow')}</Eyebrow>
            <h1 style={{ margin: 0, maxWidth: 560, fontSize: 'clamp(2.5rem, 6vw, 4.75rem)', fontWeight: 800, letterSpacing: 'var(--tracking-tighter)', lineHeight: 1.02, color: 'var(--text-primary)' }}>
              {t('hero.title1')} <span style={{ color: 'var(--text-accent)' }}>{t('hero.title2')}</span>
            </h1>
            <div style={{ width: 72, height: 4, borderRadius: 'var(--radius-full)', background: 'var(--gradient-gold)', margin: '28px 0 0' }} />
            <p style={{ margin: '24px 0 0', maxWidth: 480, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
              {t('hero.body')}
            </p>
            <div className="gh-cta-row" style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" iconRight={<ArrowR size={17} />} onClick={() => navigate('/shop')}>{t('common.viewProducts')}</Button>
              <Button variant="secondary" size="lg" iconLeft={<ShieldChk size={17} stroke={1.9} />} onClick={() => navigate('/contact')}>{t('common.contactUs')}</Button>
            </div>
          </div>
          <ProductMock />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Trust Cards ---------------------------- */

function TrustCards() {
  const { get } = useT();
  const items = get('trust.items') || [];
  return (
    <Section className="gh-section-pad">
      <div className="gh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
        {items.map((f, i) => {
          const Icon = Icons[f.icon] || Icons.ShieldChk;
          return (
            <Reveal key={f.h} delay={i * 70}>
              <Card variant="elevated" lift className="gh-trust-tile" padding="var(--space-5)" style={{ height: '100%' }}>
                <span className="gh-tile-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 'var(--radius-full)', background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', color: 'var(--gold-300)', marginBottom: 16 }}>
                  <Icon size={21} stroke={1.8} />
                </span>
                <h3 style={{ margin: '0 0 8px', fontSize: 'var(--text-md)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>{f.h}</h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)' }}>{f.p}</p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ------------------------- Featured Products ------------------------- */

function FeaturedCard({ p }) {
  const navigate = useNavigate();
  const { t } = useT();
  const [added, setAdded] = useState(false);
  const add = (e) => {
    e.stopPropagation();
    if (p.wcId) { window.location.href = addToCartUrl(p.wcId); return; }
    setAdded(true); setTimeout(() => setAdded(false), 1500);
  };
  return (
    <Card variant="elevated" lift padding="var(--space-4)" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>
        <ProductThumb form={p.form} />
      </div>
      <h3 onClick={() => navigate(`/product/${p.id}`)} style={{ margin: '16px 0 0', fontSize: 'var(--text-md)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)', cursor: 'pointer' }}>{p.name}</h3>
      <div style={{ marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-accent)' }}>${p.price}.00</div>
      <div style={{ marginTop: 'auto', paddingTop: 16 }}>
        <Button variant={added ? 'secondary' : 'primary'} size="sm" fullWidth iconLeft={added ? <Check size={15} stroke={2.2} /> : undefined} onClick={add}>
          {added ? t('common.added') : t('common.addToCart')}
        </Button>
      </div>
    </Card>
  );
}

function FeaturedProducts() {
  const { products } = useCatalog();
  const navigate = useNavigate();
  const { t } = useT();
  const items = products.slice(0, 4);
  return (
    <Section className="gh-section-pad" style={{ background: 'var(--surface-sunken)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <SectionHead center eyebrow={t('best.eyebrow')} title={t('best.title')} desc={t('best.desc')} />
      <div className="gh-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, maxWidth: 620, margin: '0 auto' }}>
        {items.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 80}>
            <FeaturedCard p={p} />
          </Reveal>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-8)' }}>
        <Button variant="secondary" iconRight={<ArrowR size={16} />} onClick={() => navigate('/shop')}>{t('common.viewProducts')}</Button>
      </div>
    </Section>
  );
}

/* ------------------------------- About ------------------------------- */

function AboutSection() {
  const navigate = useNavigate();
  const { t } = useT();
  return (
    <Section className="gh-section-pad">
      <div className="gh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 'var(--space-9)', alignItems: 'center' }}>
        <Reveal>
          <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--surface-subtle)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 70% 0%, rgba(201,167,106,0.12), transparent 60%)' }} />
            <img src="/assets/hero-product.webp" alt="Golden Horizon Research packaging and research pen" style={{ position: 'relative', width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <Eyebrow rule style={{ marginBottom: 16 }}>{t('about.eyebrow')}</Eyebrow>
            <h2 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>{t('about.title')}</h2>
            <p style={{ margin: '18px 0 28px', fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>{t('about.body')}</p>
            <Button variant="primary" iconRight={<ArrowR size={16} />} onClick={() => navigate('/shop')}>{t('common.viewProducts')}</Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------- Why Golden Horizon --------------------------- */

function WhyGoldenHorizon() {
  const { t, get } = useT();
  const items = get('features.items') || [];
  return (
    <Section className="gh-section-pad">
      <div className="gh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'var(--space-9)', alignItems: 'center' }}>
        <div>
          <Eyebrow rule style={{ marginBottom: 16 }}>{t('features.eyebrow')}</Eyebrow>
          <h2 style={{ margin: '0 0 var(--space-7)', fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>{t('features.title')}</h2>
          <div className="gh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6) var(--space-5)' }}>
            {items.map((f, i) => {
              const Icon = Icons[f.icon] || Icons.ShieldChk;
              return (
                <Reveal key={f.h} delay={i * 80}>
                  <div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 'var(--radius-full)', background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', color: 'var(--gold-300)', marginBottom: 14 }}><Icon size={20} stroke={1.8} /></span>
                    <h3 style={{ margin: '0 0 8px', fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)' }}>{f.h}</h3>
                    <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--text-secondary)' }}>{f.p}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Reveal delay={120}>
          <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--surface-subtle)', minHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(100% 100% at 50% 0%, rgba(201,167,106,0.16), transparent 60%)' }} />
            <img src="/assets/logo-mark.png" alt="" style={{ position: 'relative', width: 150, opacity: 0.85, filter: 'drop-shadow(0 10px 30px rgba(201,167,106,0.4))' }} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------------------- FAQ -------------------------------- */

function HomeFaq() {
  const navigate = useNavigate();
  const { t, get } = useT();
  const items = get('homeFaq.items') || [];
  const [open, setOpen] = useState(0);
  return (
    <Section className="gh-section-pad" style={{ background: 'var(--surface-sunken)', borderTop: '1px solid var(--border-subtle)' }}>
      <SectionHead center eyebrow={t('homeFaq.eyebrow')} title={t('homeFaq.title')} />
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {items.map((item, i) => (
          <FaqItem key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{t('homeFaq.more')}</span>
          <Button variant="secondary" iconRight={<ArrowR size={16} />} onClick={() => navigate('/contact')}>{t('common.contactUs')}</Button>
        </div>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustCards />
      <FeaturedProducts />
      <AboutSection />
      <WhyGoldenHorizon />
      <HomeFaq />
    </div>
  );
}
