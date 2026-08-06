import { useT } from '../lib/i18n.jsx';
import { Truck } from '../lib/icons.jsx';

/** Slim promo bar pinned above the nav (gold gradient, ink text). */
export function AnnouncementBar() {
  const { t } = useT();
  return (
    <div style={{ background: 'var(--gradient-gold)', color: 'var(--ink)' }}>
      <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '7px var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
        <Truck size={15} stroke={2} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.01em', textAlign: 'center' }}>
          {t('bar.ship')}
        </span>
      </div>
    </div>
  );
}
