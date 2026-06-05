// Golden Horizon Research — sample catalog & content data.
// Verification-focused, non-medical. No fabricated reviews, stats, or testimonials.

export const PRODUCTS = [
  { id: 'rc12', name: 'Reference Material RC-12', code: 'GHR-RC12', size: '10 mg', form: 'Lyophilized', type: 'Reference Standards', purity: '99.2%', batch: 'GHR-2406-A', lot: 'L-4471-09', tested: '2026-05-18', status: 'verified', avail: 'In stock', price: 84 },
  { id: 'rc08', name: 'Reference Material RC-08', code: 'GHR-RC08', size: '5 mg', form: 'Lyophilized', type: 'Reference Standards', purity: '98.9%', batch: 'GHR-2405-C', lot: 'L-4460-02', tested: '2026-05-04', status: 'verified', avail: 'In stock', price: 72 },
  { id: 'cs21', name: 'Calibration Standard CS-21', code: 'GHR-CS21', size: '25 mg', form: 'Solution', type: 'Calibration Standards', purity: '99.6%', batch: 'GHR-2406-B', lot: 'L-4475-11', tested: '2026-05-22', status: 'verified', avail: 'In stock', price: 118 },
  { id: 'cs14', name: 'Calibration Standard CS-14', code: 'GHR-CS14', size: '25 mg', form: 'Solution', type: 'Calibration Standards', purity: '99.1%', batch: 'GHR-2404-D', lot: 'L-4452-07', tested: '2026-04-19', status: 'verified', avail: 'Batch pending', price: 109 },
  { id: 'as05', name: 'Assay Reagent AS-05', code: 'GHR-AS05', size: '50 mg', form: 'Powder', type: 'Assay Reagents', purity: '98.4%', batch: 'GHR-2405-A', lot: 'L-4458-03', tested: '2026-05-01', status: 'verified', avail: 'In stock', price: 64 },
  { id: 'as02', name: 'Assay Reagent AS-02', code: 'GHR-AS02', size: '50 mg', form: 'Powder', type: 'Assay Reagents', purity: '97.8%', batch: 'GHR-2403-B', lot: 'L-4440-15', tested: '2026-03-28', status: 'pending', avail: 'Batch pending', price: 58 },
];

export const FILTERS_TYPE = ['All Products', 'Reference Standards', 'Calibration Standards', 'Assay Reagents'];
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
  { icon: 'BadgeChk', label: 'Third-Party Verified' },
  { icon: 'Layers', label: 'Batch Verified' },
  { icon: 'MapPin', label: 'California Fulfillment' },
  { icon: 'Box', label: 'Secure Packaging' },
];

export const STEPS = [
  { n: '01', icon: 'Box', h: 'Sourced', p: 'Materials are received and assigned a unique batch identifier.' },
  { n: '02', icon: 'FileChk', h: 'Documented', p: 'Each batch arrives with its independent Certificate of Analysis.' },
  { n: '03', icon: 'ShieldChk', h: 'Verifiable', p: 'Batch and lot numbers are searchable anytime you need them.' },
  { n: '04', icon: 'Truck', h: 'Fulfilled', p: 'Secure packaging dispatched from California with tracking.' },
];
