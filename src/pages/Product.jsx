import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Section } from '../layout/Section.jsx';
import { FaqItem } from '../layout/FaqItem.jsx';
import { Button, Badge } from '../components/index.js';
import { Icons, ArrowR, Download, ZoomIn } from '../lib/icons.jsx';
import { PRODUCTS } from '../lib/data.js';
import { useCatalog, addToCartUrl } from '../lib/catalog.js';

/* ----------------------------- Gallery ----------------------------- */

function GalleryView({ view, form }) {
  const hostRef = useRef(null);
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(false);

  const onMove = (e) => {
    const host = hostRef.current;
    const img = imgRef.current;
    if (!host || !img) return;
    const r = host.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  };

  if (view.type === 'photo') {
    return (
      <div
        ref={hostRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        style={{
          position: 'relative',
          height: 380,
          borderRadius: 'var(--radius-md)',
          background: 'radial-gradient(120% 90% at 50% 0%, rgba(201,167,106,0.12), transparent 60%), var(--surface-subtle)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          cursor: zoom ? 'zoom-in' : 'default',
        }}
      >
        <img
          ref={imgRef}
          src={view.src}
          alt={view.alt}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '6%',
            transform: zoom ? 'scale(2)' : 'scale(1)',
            transition: 'transform 0.18s var(--ease-out)',
            willChange: 'transform',
          }}
        />
        <span style={{ position: 'absolute', top: 12, right: 12, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(10,10,10,0.55)', border: '1px solid var(--border-inverse)', backdropFilter: 'blur(6px)', fontSize: 11, color: 'var(--text-secondary)' }}>
          <ZoomIn size={13} stroke={1.9} /> Hover to zoom
        </span>
      </div>
    );
  }

  // Stylized placeholder layout (packaging / label / seal mock)
  return (
    <div
      style={{
        position: 'relative',
        height: 380,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-subtle)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, rgba(201,167,106,0.10), transparent 60%)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <img src="/assets/logo-mark.png" alt="" style={{ width: 130, opacity: 0.45 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}>{view.label} · {form}</span>
      </div>
    </div>
  );
}

function ProductGallery({ p }) {
  const views = [
    { key: 'packaging', type: 'photo', src: '/assets/hero-product.webp', alt: `${p.name} packaging`, label: 'Packaging' },
    { key: 'vial', type: 'mock', label: 'Front' },
    { key: 'label', type: 'mock', label: 'Label' },
    { key: 'seal', type: 'mock', label: 'Seal' },
  ];
  const [active, setActive] = useState(0);

  return (
    <div className="gh-product-gallery" style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <GalleryView view={views[active]} form={p.form} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {views.map((v, i) => {
          const sel = i === active;
          return (
            <button
              key={v.key}
              onClick={() => setActive(i)}
              aria-label={`View ${v.label}`}
              style={{
                height: 76,
                padding: 0,
                cursor: 'pointer',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-subtle)',
                border: `1px solid ${sel ? 'var(--accent)' : 'var(--border-subtle)'}`,
                boxShadow: sel ? 'var(--shadow-gold)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
              }}
            >
              {v.type === 'photo' ? (
                <img src={v.src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: sel ? 1 : 0.8 }} />
              ) : (
                <img src="/assets/logo-mark.png" alt="" style={{ width: 38, opacity: sel ? 0.7 : 0.4 }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------- Info blocks ----------------------------- */

function InfoBlock({ icon, title, children }) {
  const Icon = Icons[icon];
  return (
    <div style={{ paddingTop: 'var(--space-7)', borderTop: '1px solid var(--border-default)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
        <span style={{ color: 'var(--text-accent)' }}><Icon size={20} stroke={1.9} /></span>
        <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function DataRow({ k, v, mono = true }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{k}</span>
      <span style={{ fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{v}</span>
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useCatalog();
  const pool = products && products.length ? products : PRODUCTS;
  const p = pool.find((x) => x.id === id) || pool[0];
  const [faq, setFaq] = useState(-1);
  const faqs = [
    { q: 'Is a Certificate of Analysis included?', a: 'Yes. Each batch is issued a COA documenting identity and purity, downloadable below and via the verification portal.' },
    { q: 'How is this item packaged?', a: 'In a secure, labeled, tamper-evident container prepared for safe transit, referencing its batch and lot identifiers.' },
  ];
  return (
    <Section pad="var(--space-9)" className="gh-section-pad">
      <button
        onClick={() => navigate('/shop')}
        className="gh-arrow-parent"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 26, padding: 0 }}
      >
        <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><ArrowR size={15} /></span> Back to catalog
      </button>
      <div className="gh-product-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-9)', alignItems: 'start' }}>
        {/* Left: gallery */}
        <ProductGallery p={p} />
        {/* Right: details */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{p.code}</span>
            <Badge tone={p.status === 'verified' ? 'verified' : 'pending'} dot>{p.status === 'verified' ? 'Verified' : 'Pending'}</Badge>
            <Badge tone="neutral">{p.avail}</Badge>
          </div>
          <h1 style={{ margin: 0, fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', color: 'var(--text-primary)' }}>{p.name}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: 16, fontSize: 'var(--text-md)', color: 'var(--text-secondary)' }}>
            <span style={{ whiteSpace: 'nowrap' }}>{p.size}</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span style={{ whiteSpace: 'nowrap' }}>{p.form}</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span style={{ whiteSpace: 'nowrap' }}>Purity {p.purity}</span>
          </div>
          <div className="gh-buy-row" style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 26, marginBottom: 30, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)' }}>${p.price}</span>
            <Button variant="primary" size="lg" iconRight={<ArrowR size={17} />} onClick={() => { if (p.wcId) window.location.href = addToCartUrl(p.wcId); }}>Add to Order</Button>
            <Button variant="secondary" size="lg" iconLeft={<Download size={17} stroke={1.9} />} onClick={() => navigate('/verify')}>COA</Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
            <InfoBlock icon="FileChk" title="Overview">
              <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
                {p.name} is supplied as a {p.form.toLowerCase()} research material for laboratory use. Each batch ships with an independent third-party Certificate of Analysis. Identity and purity results are published and verifiable by batch and lot number.
              </p>
            </InfoBlock>
            <InfoBlock icon="ShieldChk" title="Verification">
              <div>
                <DataRow k="Batch Number" v={p.batch} />
                <DataRow k="Lot Number" v={p.lot} />
                <DataRow k="Analysis Date" v={p.tested} />
                <DataRow k="Purity Result" v={p.purity} />
              </div>
              <Button variant="dark" iconLeft={<Download size={16} stroke={1.9} />} onClick={() => navigate('/verify')} style={{ marginTop: 18 }}>
                Download Certificate (PDF)
              </Button>
            </InfoBlock>
            <InfoBlock icon="Lock" title="Storage Information">
              <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
                Store in a cool, dry environment away from direct light, in the original sealed container. Handle in accordance with standard laboratory practice.
              </p>
            </InfoBlock>
            <InfoBlock icon="Truck" title="Shipping Information">
              <p style={{ margin: 0, fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)' }}>
                Dispatched from California fulfillment in secure, tamper-evident packaging. In-stock items are typically prepared within 1–2 business days with tracking provided.
              </p>
            </InfoBlock>
            <InfoBlock icon="Layers" title="FAQ">
              <div>
                {faqs.map((f, i) => (
                  <FaqItem key={i} item={f} open={faq === i} onToggle={() => setFaq(faq === i ? -1 : i)} />
                ))}
              </div>
            </InfoBlock>
          </div>
        </div>
      </div>
    </Section>
  );
}
