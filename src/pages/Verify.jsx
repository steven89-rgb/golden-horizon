import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Section } from '../layout/Section.jsx';
import { Button, Badge, Card, Eyebrow, Input } from '../components/index.js';
import { Search, X, BadgeChk, ShieldChk, FileChk, Download, Lock, Copy, Check } from '../lib/icons.jsx';
import { PRODUCTS } from '../lib/data.js';

function lookup(value) {
  const norm = value.trim().toUpperCase();
  if (!norm) return null;
  const hit = PRODUCTS.find((p) => p.batch.toUpperCase() === norm || p.lot.toUpperCase() === norm);
  return hit || 'notfound';
}

/* A monospace value that can be copied to the clipboard. */
function CopyValue({ value, mono = true }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable — value stays selectable */
    }
  };
  return (
    <button
      onClick={copy}
      title="Copy"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: mono ? 500 : 600,
        color: 'var(--text-primary)',
      }}
    >
      {value}
      <span style={{ color: copied ? 'var(--green-500)' : 'var(--text-tertiary)', display: 'inline-flex' }}>
        {copied ? <Check size={14} stroke={2.2} /> : <Copy size={14} stroke={1.8} />}
      </span>
    </button>
  );
}

function ScanningPanel() {
  return (
    <Card variant="elevated" padding="0" className="gh-scan-host" style={{ minHeight: 220 }}>
      <span className="gh-scan-line" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: 220, padding: 'var(--space-7)' }}>
        <span className="gh-spinner" />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
          Matching batch records…
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          <Lock size={13} stroke={1.9} /> Encrypted lookup
        </div>
      </div>
    </Card>
  );
}

function ResultPanel({ rec }) {
  if (rec === null) return null;
  if (rec === 'notfound') {
    return (
      <Card variant="default" padding="var(--space-6)" className="gh-result-in" style={{ borderColor: 'var(--red-500)', background: 'var(--red-100)' }}>
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
  const rows = [
    ['Product Name', rec.name, false],
    ['Batch Number', rec.batch, true],
    ['Lot Number', rec.lot, true],
    ['Analysis Date', rec.tested, true],
    ['Purity Result', rec.purity, true],
  ];
  return (
    <Card variant="elevated" accent padding="0" className="gh-result-in" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '22px var(--space-6)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--green-100)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--green-500)' }}>
            <svg className="gh-check-draw" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--green-500)' }}>Verification confirmed</span>
        </div>
        <Badge tone="verified" dot>Verified</Badge>
      </div>
      <div className="gh-verify-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ padding: 'var(--space-6)', borderRight: '1px solid var(--border-subtle)' }}>
          {rows.map(([k, v, m]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid var(--border-subtle)', gap: 12 }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{k}</span>
              {m ? (
                <CopyValue value={v} />
              ) : (
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right' }}>{v}</span>
              )}
            </div>
          ))}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            <Lock size={13} stroke={1.9} /> Tap any code to copy
          </div>
        </div>
        <div style={{ padding: 'var(--space-6)', background: 'var(--surface-subtle)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 'var(--text-2xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 14 }}>Laboratory Report</div>
          <div className="gh-sheen-host" style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', gap: 12, minHeight: 180 }}>
            <span className="gh-sheen" />
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
  const [scanning, setScanning] = useState(false);
  const timer = useRef(null);

  // Keep results in sync when arriving via a ?q= link (e.g. the home teaser).
  useEffect(() => {
    const incoming = params.get('q') || '';
    setQ(incoming);
    setResult(lookup(incoming));
    setScanning(false);
  }, [params]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const run = (value = q) => {
    const v = (value || '').trim();
    if (!v) { setResult(null); return; }
    setScanning(true);
    setResult(null);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setResult(lookup(v));
      setScanning(false);
      setParams({ q: v }, { replace: true });
    }, 850);
  };

  return (
    <div>
      <div style={{ background: 'var(--ink)', color: 'var(--text-inverse)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 760, height: 360, background: 'radial-gradient(50% 100% at 50% 0%, rgba(201,167,106,0.16), transparent 70%)', pointerEvents: 'none' }} />
        <div className="gh-container-pad" style={{ maxWidth: 860, margin: '0 auto', padding: 'var(--space-10) var(--space-6)', textAlign: 'center', position: 'relative' }}>
          <Eyebrow rule tone="inverse" align="center" className="gh-enter gh-enter-d1" style={{ justifyContent: 'center', marginBottom: 20 }}>Certificate Verification</Eyebrow>
          <h1 className="gh-enter gh-enter-d2" style={{ margin: 0, fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-snug)' }}>Verify Product Documentation</h1>
          <p className="gh-enter gh-enter-d3" style={{ margin: '16px auto 30px', maxWidth: 480, fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--gray-400)' }}>
            Enter a batch or lot number to retrieve its Certificate of Analysis, analysis date, and verification status.
          </p>
          <div className="gh-verify-search gh-enter gh-enter-d4" style={{ display: 'flex', gap: 12, maxWidth: 560, margin: '0 auto' }}>
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
            <Button variant="primary" size="lg" onClick={() => run()} disabled={scanning}>{scanning ? 'Verifying…' : 'Verify'}</Button>
          </div>
          <div className="gh-enter gh-enter-d5" style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', marginTop: 16, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}><Lock size={12} stroke={1.9} /> Try:</span>
            {['GHR-2406-A', 'GHR-2406-B', 'L-4471-09'].map((b) => (
              <button
                key={b}
                onClick={() => { setQ(b); run(b); }}
                style={{ background: 'var(--surface-inverse-soft)', border: '1px solid var(--border-inverse)', borderRadius: 'var(--radius-full)', padding: '4px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gray-400)', cursor: 'pointer', transition: 'border-color var(--dur-fast), color var(--dur-fast)' }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Section pad="var(--space-9)" className="gh-section-pad">
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {scanning ? (
            <ScanningPanel />
          ) : result ? (
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
