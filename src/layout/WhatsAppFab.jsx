import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WhatsApp } from '../lib/icons.jsx';

/** Floating WhatsApp contact button, fixed bottom-right on every page.
 *  A soft pulse ring draws the eye without being loud; the label expands on
 *  hover. Update `onClick` to your real wa.me link when you have a number. */
export function WhatsAppFab() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={() => navigate('/contact')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Contact us on WhatsApp"
      style={{
        position: 'fixed',
        right: 26,
        bottom: 26,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 58,
        padding: hover ? '0 22px 0 18px' : '0 17px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-inverse)',
        background: 'var(--ink)',
        color: 'var(--text-inverse)',
        cursor: 'pointer',
        boxShadow: hover ? '0 16px 40px rgba(37,211,102,0.22), var(--shadow-xl)' : 'var(--shadow-xl)',
        transition: 'padding var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      }}
    >
      {/* soft green pulse ring */}
      <span className="gh-pulse-ring" aria-hidden="true" />
      <span style={{ position: 'relative', color: '#25D366', display: 'inline-flex' }}>
        <WhatsApp size={26} />
      </span>
      {hover && (
        <span style={{ position: 'relative', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600, whiteSpace: 'nowrap' }}>
          Questions? Chat with support
        </span>
      )}
    </button>
  );
}
