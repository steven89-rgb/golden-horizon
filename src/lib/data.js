// Golden Horizon Research — sample catalog & content data.
// Verification-focused, non-medical. No fabricated reviews, stats, or testimonials.

export const PRODUCTS = [
  { id: 'reta15', name: 'Retatrutide 15 mg Pen', code: 'GHR-RTA15', size: '15 mg', form: 'Pen', type: 'Pens', purity: '99.2%', batch: 'GHR-2406-A', lot: 'L-4471-09', tested: '2026-05-18', status: 'verified', avail: 'In stock', price: 185 },
  { id: 'reta20', name: 'Retatrutide 20 mg Pen', code: 'GHR-RTA20', size: '20 mg', form: 'Pen', type: 'Pens', purity: '99.4%', batch: 'GHR-2406-B', lot: 'L-4475-11', tested: '2026-05-22', status: 'verified', avail: 'In stock', price: 225 },
];

export const FILTERS_TYPE = ['All Products', 'Pens'];
export const FILTERS_AVAIL = ['Any Availability', 'In stock', 'Batch pending'];

export const FAQ = [
  { q: 'What is a COA?', a: 'A Certificate of Analysis (COA) is the third-party laboratory report documenting a batch’s identity and purity results. Every Golden Horizon Research batch is issued a COA, downloadable from the product page and the verification portal.' },
  { q: 'How do I verify a batch?', a: 'Enter the batch or lot number on the Verify COAs page. The portal returns the matching Certificate of Analysis, the analysis date, the product name, and a verification status.' },
  { q: 'How are products packaged?', a: 'Materials are packaged in secure, labeled, tamper-evident containers and prepared for safe transit. Each shipment references its batch and lot identifiers.' },
  { q: 'What is your fulfillment timeline?', a: 'Orders are processed from our California fulfillment operation. In-stock items are typically prepared within 1–2 business days, with tracking provided once dispatched.' },
];

export const WHY = [
  { icon: 'ShieldChk', h: 'Independent COA', p: 'Every batch ships with a third-party Certificate of Analysis you can verify yourself.' },
  { icon: 'Layers', h: 'Batch Transparency', p: 'Batch and lot identifiers are published and searchable through the verification portal.' },
  { icon: 'BadgeChk', h: 'Consistent Presentation', p: 'Standardized labeling, documentation, and packaging across the entire catalog.' },
  { icon: 'WhatsApp', h: 'Responsive Support', p: 'Direct support for product questions, order status, and verification over WhatsApp.' },
];

export const TRUST = [
  { icon: 'BadgeChk', label: 'Third-Party Verified', sub: 'Independent Certificate of Analysis' },
  { icon: 'Layers', label: 'Batch Verified', sub: 'Every batch ships with a COA' },
  { icon: 'MapPin', label: 'California Fulfillment', sub: 'Fast, discreet shipping' },
  { icon: 'Box', label: 'Secure Packaging', sub: 'Tamper-evident & discreet' },
];

export const STEPS = [
  { n: '01', icon: 'Box', h: 'Sourced', p: 'Materials are received and assigned a unique batch identifier.' },
  { n: '02', icon: 'FileChk', h: 'Documented', p: 'Each batch arrives with its independent Certificate of Analysis.' },
  { n: '03', icon: 'ShieldChk', h: 'Verifiable', p: 'Batch and lot numbers are searchable anytime you need them.' },
  { n: '04', icon: 'Truck', h: 'Fulfilled', p: 'Secure packaging dispatched from California with tracking.' },
];

/* ============================================================
   TRUST STATISTICS  — HONEST BY CONSTRUCTION
   ------------------------------------------------------------
   IMPORTANT: Do not fabricate trust numbers. The values below
   are DERIVED from the live catalog (PRODUCTS) at runtime, so
   they are always true to what the site actually shows:
     • documented batches  = number of catalog batches
     • COAs on file        = one per batch
     • average purity      = mean of published purity results
     • portal availability = the verification page is always-on
   ============================================================ */

const _avgPurity = (() => {
  const nums = PRODUCTS.map((p) => parseFloat(p.purity)).filter((n) => !Number.isNaN(n));
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
})();

export const STATS = [
  { icon: 'Layers', end: PRODUCTS.length, suffix: '', decimals: 0, label: 'Documented Batches', sub: 'Each with an independent COA' },
  { icon: 'FileChk', end: PRODUCTS.length, suffix: '', decimals: 0, label: 'COAs On File', sub: 'Searchable in the portal' },
  { icon: 'BadgeChk', end: _avgPurity ?? 0, suffix: '%', decimals: 1, label: 'Average Documented Purity', sub: 'Across the published catalog' },
  { icon: 'ShieldChk', display: '24/7', label: 'Verification Portal', sub: 'Always-on batch lookup' },
];

/* ------------------------------------------------------------
   OPTIONAL BRAND FACTS — fill in ONLY with figures you can stand
   behind. Leave as null to hide the tile (nothing is invented).
   Example once true:  yearsOperating: 3,  ordersFulfilled: 4200
   ------------------------------------------------------------ */
export const BRAND_FACTS = {
  yearsOperating: null,   // e.g. 3  -> renders a "Years Operating" tile
  ordersFulfilled: null,  // e.g. 4200 -> renders an "Orders Fulfilled" tile
  verificationLookups: null, // e.g. 9800 -> renders a "Verification Requests" tile
};
