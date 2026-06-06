import { useState } from 'react';
import { Section, SectionHead } from '../layout/Section.jsx';
import { ProductCard } from '../layout/Product.jsx';
import { Select, Reveal } from '../components/index.js';
import { PRODUCTS, FILTERS_TYPE, FILTERS_AVAIL } from '../lib/data.js';

export default function Shop() {
  const [type, setType] = useState('All Products');
  const [avail, setAvail] = useState('Any Availability');
  const items = PRODUCTS.filter(
    (p) => (type === 'All Products' || p.type === type) && (avail === 'Any Availability' || p.avail === avail)
  );
  return (
    <div>
      <div style={{ background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, left: '60%', width: 700, height: 360, background: 'radial-gradient(50% 100% at 50% 0%, rgba(201,167,106,0.12), transparent 70%)', pointerEvents: 'none' }} />
        <div className="gh-container-pad" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-9) var(--space-6) var(--space-7)', position: 'relative' }}>
          <Reveal>
            <SectionHead
              eyebrow="Catalog"
              title="Research Materials"
              desc="Reference standards, calibration standards, and assay reagents — each batch supplied with an independent Certificate of Analysis."
            />
          </Reveal>
        </div>
      </div>
      <Section pad="var(--space-8)" className="gh-section-pad">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 'var(--space-7)', flexWrap: 'wrap' }}>
          <Select label="Product Type" options={FILTERS_TYPE} value={type} onChange={(e) => setType(e.target.value)} style={{ maxWidth: 240 }} />
          <Select label="Availability" options={FILTERS_AVAIL} value={avail} onChange={(e) => setAvail(e.target.value)} style={{ maxWidth: 220 }} />
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{items.length} products</span>
        </div>
        <div className="gh-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
