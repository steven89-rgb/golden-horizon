// Golden Horizon Research — shared icon set (Lucide/Feather idiom, 24×24, stroke).
// Substitute for a licensed set — see the brand guide ICONOGRAPHY section.
// Thin geometric line icons, round caps/joins, inheriting currentColor.

const Ico = ({ children, size = 24, stroke = 2, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
);

export const Search = (p) => (
  <Ico {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Ico>
);
export const ArrowR = (p) => (
  <Ico {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Ico>
);
export const Check = (p) => (
  <Ico {...p}>
    <path d="M20 6L9 17l-5-5" />
  </Ico>
);
export const ShieldChk = (p) => (
  <Ico {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </Ico>
);
export const BadgeChk = (p) => (
  <Ico {...p}>
    <path d="M12 2l2.4 1.8 3 .2.2 3L19.4 9.4 21 12l-1.6 2.6.2 3-3 .2L14.4 19.6 12 21l-2.4-1.4-3-.2-.2-3L4.6 14.6 3 12l1.6-2.6-.2-3 3-.2L9.6 3.8z" />
    <path d="M9 12l2 2 4-4" />
  </Ico>
);
export const FileChk = (p) => (
  <Ico {...p}>
    <path d="M14 3v5h5" />
    <path d="M14 3H6v18h12V8z" />
    <path d="M9 15l2 2 4-4" />
  </Ico>
);
export const Download = (p) => (
  <Ico {...p}>
    <path d="M12 3v12" />
    <path d="M7 11l5 5 5-5" />
    <path d="M5 21h14" />
  </Ico>
);
export const Box = (p) => (
  <Ico {...p}>
    <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
    <path d="M3 8l9 5 9-5" />
    <path d="M12 13v8" />
  </Ico>
);
export const Layers = (p) => (
  <Ico {...p}>
    <path d="M12 3l9 5-9 5-9-5z" />
    <path d="M3 13l9 5 9-5" />
  </Ico>
);
export const Truck = (p) => (
  <Ico {...p}>
    <path d="M3 6h11v9H3z" />
    <path d="M14 9h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17.5" cy="18" r="1.6" />
  </Ico>
);
export const Lock = (p) => (
  <Ico {...p}>
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </Ico>
);
export const MapPin = (p) => (
  <Ico {...p}>
    <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Ico>
);
export const Flask = (p) => (
  <Ico {...p}>
    <path d="M9 3h6" />
    <path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
    <path d="M7.5 15h9" />
  </Ico>
);
export const Chevron = (p) => (
  <Ico {...p}>
    <path d="M6 9l6 6 6-6" />
  </Ico>
);
export const Plus = (p) => (
  <Ico {...p}>
    <path d="M12 5v14M5 12h14" />
  </Ico>
);
export const Minus = (p) => (
  <Ico {...p}>
    <path d="M5 12h14" />
  </Ico>
);
export const Menu = (p) => (
  <Ico {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Ico>
);
export const User = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </Ico>
);
export const X = (p) => (
  <Ico {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Ico>
);
export const Mail = (p) => (
  <Ico {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Ico>
);
export const Repeat = (p) => (
  <Ico {...p}>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </Ico>
);
export const Clock = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Ico>
);
export const Cart = (p) => (
  <Ico {...p}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2.5 3h2.2l2.1 11.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.3L21.5 7H6" />
  </Ico>
);

export const Copy = (p) => (
  <Ico {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </Ico>
);
export const ZoomIn = (p) => (
  <Ico {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
    <path d="M11 8v6M8 11h6" />
  </Ico>
);

// WhatsApp-style chat glyph (recreated, filled).
export const WhatsApp = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  </svg>
);

export const Icons = {
  Search,
  ArrowR,
  Check,
  ShieldChk,
  BadgeChk,
  FileChk,
  Download,
  Box,
  Layers,
  Truck,
  Lock,
  MapPin,
  Flask,
  Chevron,
  Plus,
  Minus,
  Menu,
  User,
  X,
  Mail,
  Repeat,
  Clock,
  Cart,
  Copy,
  ZoomIn,
  WhatsApp,
};
