import { Eyebrow } from '../components/index.js';

/** Vertical section with a centered max-width container. */
export function Section({ children, dark = false, pad = 'var(--space-11)', className = '', style = {} }) {
  return (
    <section className={className} style={{ background: dark ? 'var(--ink)' : 'transparent', paddingTop: pad, paddingBottom: pad, ...style }}>
      <div className="gh-container-pad" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-6)' }}>{children}</div>
    </section>
  );
}

/** Eyebrow + heading + optional description block. */
export function SectionHead({ eyebrow, title, desc, dark = false, center = false, maxW = 620 }) {
  return (
    <div style={{ maxWidth: center ? maxW : 760, margin: center ? '0 auto' : 0, textAlign: center ? 'center' : 'left', marginBottom: 'var(--space-8)' }}>
      {eyebrow && (
        <Eyebrow rule tone={dark ? 'inverse' : 'gold'} align={center ? 'center' : 'left'} style={{ marginBottom: 18 }}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-snug)', color: dark ? 'var(--text-inverse)' : 'var(--text-primary)' }}>
        {title}
      </h2>
      {desc && (
        <p style={{ margin: '14px 0 0', fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: dark ? 'var(--gray-400)' : 'var(--text-secondary)' }}>
          {desc}
        </p>
      )}
    </div>
  );
}
