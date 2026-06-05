import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Section } from '../layout/Section.jsx';
import { Button, Badge, Card, Eyebrow, Input } from '../components/index.js';
import { Search, X, BadgeChk, ShieldChk, FileChk, Download } from '../lib/icons.jsx';
import { PRODUCTS } from '../lib/data.js';

function lookup(value) {
  const norm = value.trim().toUpperCase();
  if (!norm) return null;
  const hit = PRODUCTS.find((p) => p.batch.toUpperCase() === norm || p.lot.toUpperCase() === norm);
  return hit || 'notfound';
}

function ResultPanel({ rec }) {
  if (rec === null) return null;
  if (rec === 'notfound') {
    return (
      <Card variant="default" padding="var(--space-6)" style={{ borderColor: 'var(--red-500)', background: 'var(--red-100)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--red-500)' }}><X size={22} /></span>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--red-500)' }}>No matching record found</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 3 }}>Check the batch or lot number and try again, or contact support on WhatsApp.</div>
          </div>
        </div>
      </Card>
    );
  }
  return (
    <Card variant="elevated" accent padding="0" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '22px var(--space-6)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--green-100)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--green-500)' }}><BadgeChk size={24} stroke={1.9} /></span>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--green-500)' }}>Verification confirmed</span>
        </div>
        <Badge tone="verified" dot>Verified</Badge>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ padding: 'var(--space-6)', borderRight: '1px solid var(--border-subtle)' }}>
          {[['Product Name', rec.name, false], ['Batch Number', rec.batch, true], ['Lot Number', rec.lot, true], ['Analysis Date', rec.tested, true], ['Purity Result', rec.purity, true]].map(([k, v, m]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{k}</span>
              <span style={{ fontFamily: m ? 'var(--font-mono)' : 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: m ? 500 : 600, color: 'var(--text-primary)' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 'var(--space-6)', background: 'var(--surface-subtle)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 14 }}>Laboratory Report</div>
          <div style={{ flex: 1, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', gap: 12, minHeight: 180 }}>
            <span style={{ color: 'var(--text-accent)' }}><FileChk size={42} stroke={1.5} /></span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>COA_{rec.batch}.pdf</div>
            <Button variant="dark" size="sm" iconLeft={<Download size={15} stroke={1.9} />}>Download PDF</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Verify() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('q') || '';
  const [q, setQ] = useState(initial);
  const [result, setResult] = useState(() => lookup(initial));

  // Keep results in sync when arriving via a ?q= link (e.g. the home teaser).
  useEffect(() => {
    const incoming = params.get('q') || '';
    setQ(incoming);
    setResult(lookup(incoming));
  }, [params]);

  const run = () => {
    setResult(lookup(q));
    if (q.trim()) setParams({ q: q.trim() }, { replace: true });
  };

  return (
    <div>
      <div style={{ background: 'var(--ink)', color: 'var(--text-inverse)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: 'var(--space-10) var(--space-6)', textAlign: 'center' }}>
          <Eyebrow rule tone="inverse" align="center" style={{ justifyContent: 'center', marginBottom: 20 }}>Certificate Verification</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-snug)' }}>Verify Product Documentation</h1>
          <p style={{ margin: '16px auto 30px', maxWidth: 480, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--gray-400)' }}>
            Enter a batch or lot number to retrieve its Certificate of Analysis, analysis date, and verification status.
          </p>
          <div style={{ display: 'flex', gap: 12, maxWidth: 560, margin: '0 auto' }}>
            <div style={{ flex: 1 }}>
              <Input
                mono
                placeholder="e.g. GHR-2406-A or L-4471-09"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && run()}
                iconLeft={<Search size={18} />}
                size="lg"
              />
            </div>
            <Button variant="primary" size="lg" onClick={run}>Verify</Button>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>Try:</span>
            {['GHR-2406-A', 'L-4475-11', 'GHR-2405-A'].map((b) => (
              <button
                key={b}
                onClick={() => { setQ(b); setResult(lookup(b)); }}
                style={{ background: 'var(--surface-inverse-soft)', border: '1px solid var(--border-inverse)', borderRadius: 'var(--radius-full)', padding: '4px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gray-400)', cursor: 'pointer' }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Section pad="var(--space-9)">
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {result ? (
            <ResultPanel rec={result} />
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-9) 0', color: 'var(--text-tertiary)' }}>
              <span style={{ display: 'inline-flex', color: 'var(--border-strong)' }}><ShieldChk size={56} stroke={1.3} /></span>
              <p style={{ margin: '16px 0 0', fontSize: 'var(--text-sm)' }}>Enter a batch or lot number above to see its verification record.</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
