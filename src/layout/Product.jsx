import { useNavigate } from 'react-router-dom';
import { Card, Badge } from '../components/index.js';
import { Layers, ArrowR } from '../lib/icons.jsx';

/** Neutral document/material placeholder thumbnail (no medical imagery). */
export function ProductThumb({ form, big = false }) {
  return (
    <div
      style={{
        height: big ? 360 : 180,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-subtle)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, rgba(201,167,106,0.10), transparent 60%)' }} />
      <img src="/assets/logo-mark.png" alt="" loading="lazy" decoding="async" style={{ width: big ? 150 : 92, opacity: 0.5, filter: 'grayscale(0.1)' }} />
      <span style={{ position: 'absolute', bottom: 12, left: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)' }}>{form}</span>
    </div>
  );
}

/** Catalog product card. */
export function ProductCard({ p }) {
  const navigate = useNavigate();
  const goProduct = () => navigate(`/product/${p.id}`);
  return (
    <Card variant="elevated" interactive onClick={goProduct} padding="var(--space-4)">
      <ProductThumb form={p.form} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{p.code}</span>
        <Badge tone={p.status === 'verified' ? 'verified' : 'pending'} size="sm" dot>
          {p.status === 'verified' ? 'Verified' : 'Pending'}
        </Badge>
      </div>
      <h3 style={{ margin: '8px 0 0', fontSize: 'var(--text-lg)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-primary)' }}>{p.name}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', marginTop: 12, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
        <span style={{ whiteSpace: 'nowrap' }}>{p.size}</span>
        <span style={{ color: 'var(--border-strong)' }}>·</span>
        <span style={{ whiteSpace: 'nowrap' }}>{p.form}</span>
        <span style={{ color: 'var(--border-strong)' }}>·</span>
        <span style={{ whiteSpace: 'nowrap' }}>Purity {p.purity}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
          <Layers size={14} stroke={1.9} /> {p.batch}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); goProduct(); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-accent)' }}
        >
          View COA <ArrowR size={15} />
        </button>
      </div>
    </Card>
  );
}
