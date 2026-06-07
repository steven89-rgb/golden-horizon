import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/* Golden Horizon Research — lightweight i18n (English (US) + Spanish).
   Copy lives here keyed by dotted paths. useT().t('hero.title') returns a
   string; useT().get('features.items') returns the raw value (arrays/objects).
   Language is persisted to localStorage and defaults to English. */

export const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
];

const en = {
  bar: { ship: 'Free shipping + insurance on orders from $250' },
  nav: { home: 'Home', products: 'Products', verify: 'Verify COAs', about: 'About', faq: 'FAQ', contact: 'Contact', account: 'Account', cart: 'Cart' },
  common: {
    viewProducts: 'View Products',
    contactUs: 'Contact Us',
    addToCart: 'Add to Cart',
    added: 'Added',
    learnMore: 'Learn More',
    viewCoa: 'View COA',
    verified: 'Verified',
    pending: 'Pending',
    inStock: 'In stock',
    batchPending: 'Batch pending',
    purity: 'Purity',
    from: 'from',
  },
  hero: {
    eyebrow: 'Research materials for science',
    title1: 'Premium Research',
    title2: 'Materials',
    body: 'Golden Horizon Research supplies high-purity research materials to scientific institutions and laboratories. Independently verified, transparently documented, and intended exclusively for laboratory research — not for personal or medical use.',
  },
  about: {
    eyebrow: 'Golden Horizon',
    title: 'About Golden Horizon',
    body: 'Golden Horizon Research is a specialized supplier of high-purity research materials, founded out of a commitment to scientific rigor. We supply exclusively to recognized research institutions, universities, and certified laboratories. Every batch is prepared under controlled conditions and accompanied by complete analytical documentation. Our products are not intended for personal, therapeutic, or veterinary use.',
  },
  best: { eyebrow: 'Golden Horizon', title: 'Our bestsellers' },
  features: {
    eyebrow: 'Golden Horizon',
    title: 'For research purposes only',
    items: [
      { icon: 'BadgeChk', h: 'Controlled Quality', p: 'Each batch is prepared under strictly controlled conditions and documented for purity. Only materials that meet our standards leave the facility.' },
      { icon: 'Truck', h: 'Fast & Safe Delivery', p: 'Discreet, secure shipping to research institutions, carefully packaged and accompanied by all necessary documentation.' },
      { icon: 'FileChk', h: 'For Research Only', p: 'Our products are strictly intended for scientific and preclinical research. Sales for personal or medical use are expressly excluded.' },
      { icon: 'ShieldChk', h: 'Transparent Documentation', p: 'Every order includes a full Certificate of Analysis (COA) detailing purity, composition, and batch identifiers — reliable, traceable data.' },
    ],
  },
  about_page: {
    title: 'Committed to transparency, verification, and consistent research standards.',
    body: 'Golden Horizon Research supplies premium research materials backed by third-party Certificates of Analysis and transparent batch documentation. Our focus is simple: make verification effortless and quality consistent.',
    values: [
      { icon: 'ShieldChk', h: 'Transparency', p: 'Documentation is published and searchable — nothing is hidden behind the sale.' },
      { icon: 'BadgeChk', h: 'Verification', p: 'An independent third-party Certificate of Analysis stands behind every batch we fulfill.' },
      { icon: 'Layers', h: 'Consistency', p: 'Standardized presentation, labeling, and process across the catalog.' },
    ],
  },
  shop: { eyebrow: 'Catalog', title: 'Research Materials', desc: 'Reference standards, calibration standards, and assay reagents — each batch supplied with an independent Certificate of Analysis.', type: 'Product Type', avail: 'Availability', count: '{n} products', loading: 'Loading…' },
  contact: {
    eyebrow: 'Contact', title: 'Talk to us directly.',
    body: 'The fastest way to reach Golden Horizon Research is on WhatsApp. Our team responds to product, order, and verification questions during business hours.',
    whatsapp: 'Contact Us On WhatsApp', email: 'Email Us', note: 'support@goldenhorizon.example · Responses during U.S. business hours.',
    reasons: [
      { icon: 'Search', h: 'Quick Questions', p: 'General questions about the catalog, documentation, or process.' },
      { icon: 'Box', h: 'Order Support', p: 'Help with an existing order, tracking, or fulfillment status.' },
      { icon: 'ShieldChk', h: 'Product Verification', p: 'Confirm a batch, lot, or Certificate of Analysis.' },
    ],
  },
  faq: {
    eyebrow: 'Frequently Asked Questions', title: 'Answers, documented.',
    intro: 'Everything about verification, documentation, fulfillment, and orders. Still have a question? Reach us on WhatsApp.',
    cta: 'Contact Us', cantFind: 'Can’t find what you need?',
    items: [
      { q: 'What is a COA?', a: 'A Certificate of Analysis (COA) is the third-party laboratory report documenting a batch’s identity and purity results. Every Golden Horizon Research batch is issued a COA, downloadable from the product page and the verification portal.' },
      { q: 'How do I verify a batch?', a: 'Enter the batch or lot number on the Verify COAs page. The portal returns the matching Certificate of Analysis, the analysis date, the product name, and a verification status.' },
      { q: 'How are products packaged?', a: 'Materials are packaged in secure, labeled, tamper-evident containers and prepared for safe transit. Each shipment references its batch and lot identifiers.' },
      { q: 'What is your fulfillment timeline?', a: 'Orders are processed from our U.S. fulfillment operation. In-stock items are typically prepared within 1–2 business days, with tracking provided once dispatched.' },
      { q: 'How do I read a Certificate of Analysis?', a: 'Each COA lists the product name, batch and lot identifiers, the analysis date, and the purity result. The same fields appear on the verification portal so you can cross-check any document against its record.' },
      { q: 'Do you ship internationally?', a: 'Orders are fulfilled from our U.S. operation. Available destinations and timelines are confirmed at checkout; tracking is provided once a shipment is dispatched.' },
    ],
  },
  footer: {
    tagline: 'Premium research materials supplied with third-party Certificates of Analysis and transparent batch documentation. U.S. fulfillment.',
    fulfillment: 'U.S. Fulfillment',
    catalog: 'Catalog', company: 'Company', support: 'Support',
    shopAll: 'Shop All', verify: 'Verify COAs', tracking: 'Batch Tracking',
    about: 'About', contact: 'Contact', account: 'Account',
    whatsapp: 'WhatsApp', email: 'Email', shipping: 'Shipping',
    rights: '© 2026 Golden Horizon Research',
    disclaimerStrong: 'For laboratory research purposes only.',
    disclaimer: 'Not intended for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.',
  },
};

const es = {
  bar: { ship: 'Envío + seguro gratis en pedidos desde $250' },
  nav: { home: 'Inicio', products: 'Productos', verify: 'Verificar COA', about: 'Nosotros', faq: 'Preguntas', contact: 'Contacto', account: 'Cuenta', cart: 'Carrito' },
  common: {
    viewProducts: 'Ver Productos',
    contactUs: 'Contáctanos',
    addToCart: 'Añadir al carrito',
    added: 'Añadido',
    learnMore: 'Saber más',
    viewCoa: 'Ver COA',
    verified: 'Verificado',
    pending: 'Pendiente',
    inStock: 'En stock',
    batchPending: 'Lote pendiente',
    purity: 'Pureza',
    from: 'desde',
  },
  hero: {
    eyebrow: 'Materiales de investigación para la ciencia',
    title1: 'Materiales de Investigación',
    title2: 'Premium',
    body: 'Golden Horizon Research suministra materiales de investigación de alta pureza a instituciones científicas y laboratorios. Verificados de forma independiente, documentados con transparencia y destinados exclusivamente a la investigación de laboratorio — no para uso personal ni médico.',
  },
  about: {
    eyebrow: 'Golden Horizon',
    title: 'Sobre Golden Horizon',
    body: 'Golden Horizon Research es un proveedor especializado de materiales de investigación de alta pureza, fundado con un compromiso con el rigor científico. Suministramos exclusivamente a instituciones de investigación reconocidas, universidades y laboratorios certificados. Cada lote se prepara en condiciones controladas y se acompaña de documentación analítica completa. Nuestros productos no están destinados a uso personal, terapéutico ni veterinario.',
  },
  best: { eyebrow: 'Golden Horizon', title: 'Más vendidos' },
  features: {
    eyebrow: 'Golden Horizon',
    title: 'Solo para fines de investigación',
    items: [
      { icon: 'BadgeChk', h: 'Calidad Controlada', p: 'Cada lote se prepara en condiciones estrictamente controladas y se documenta su pureza. Solo los materiales que cumplen nuestros estándares salen de las instalaciones.' },
      { icon: 'Truck', h: 'Envío Rápido y Seguro', p: 'Envío discreto y seguro a instituciones de investigación, cuidadosamente embalado y acompañado de toda la documentación necesaria.' },
      { icon: 'FileChk', h: 'Solo para Investigación', p: 'Nuestros productos están destinados estrictamente a la investigación científica y preclínica. Las ventas para uso personal o médico quedan expresamente excluidas.' },
      { icon: 'ShieldChk', h: 'Documentación Transparente', p: 'Cada pedido incluye un Certificado de Análisis (COA) completo con la pureza, composición e identificadores de lote — datos fiables y trazables.' },
    ],
  },
  about_page: {
    title: 'Comprometidos con la transparencia, la verificación y estándares de investigación consistentes.',
    body: 'Golden Horizon Research suministra materiales de investigación premium respaldados por Certificados de Análisis de terceros y documentación de lote transparente. Nuestro objetivo es simple: hacer que la verificación sea sencilla y la calidad consistente.',
    values: [
      { icon: 'ShieldChk', h: 'Transparencia', p: 'La documentación se publica y es consultable — nada se oculta tras la venta.' },
      { icon: 'BadgeChk', h: 'Verificación', p: 'Un Certificado de Análisis independiente de terceros respalda cada lote que entregamos.' },
      { icon: 'Layers', h: 'Consistencia', p: 'Presentación, etiquetado y procesos estandarizados en todo el catálogo.' },
    ],
  },
  shop: { eyebrow: 'Catálogo', title: 'Materiales de Investigación', desc: 'Estándares de referencia, estándares de calibración y reactivos de ensayo — cada lote se suministra con un Certificado de Análisis independiente.', type: 'Tipo de producto', avail: 'Disponibilidad', count: '{n} productos', loading: 'Cargando…' },
  contact: {
    eyebrow: 'Contacto', title: 'Habla con nosotros directamente.',
    body: 'La forma más rápida de contactar con Golden Horizon Research es por WhatsApp. Nuestro equipo responde a preguntas sobre productos, pedidos y verificación en horario laboral.',
    whatsapp: 'Contáctanos por WhatsApp', email: 'Envíanos un correo', note: 'support@goldenhorizon.example · Respuestas en horario laboral de EE. UU.',
    reasons: [
      { icon: 'Search', h: 'Preguntas Rápidas', p: 'Preguntas generales sobre el catálogo, la documentación o el proceso.' },
      { icon: 'Box', h: 'Soporte de Pedidos', p: 'Ayuda con un pedido existente, seguimiento o estado de entrega.' },
      { icon: 'ShieldChk', h: 'Verificación de Producto', p: 'Confirma un lote, número de lote o Certificado de Análisis.' },
    ],
  },
  faq: {
    eyebrow: 'Preguntas Frecuentes', title: 'Respuestas, documentadas.',
    intro: 'Todo sobre verificación, documentación, entrega y pedidos. ¿Aún tienes una pregunta? Escríbenos por WhatsApp.',
    cta: 'Contáctanos', cantFind: '¿No encuentras lo que buscas?',
    items: [
      { q: '¿Qué es un COA?', a: 'Un Certificado de Análisis (COA) es el informe de laboratorio de terceros que documenta la identidad y los resultados de pureza de un lote. Cada lote de Golden Horizon Research recibe un COA, descargable desde la página del producto y el portal de verificación.' },
      { q: '¿Cómo verifico un lote?', a: 'Introduce el número de lote en la página Verificar COA. El portal devuelve el Certificado de Análisis correspondiente, la fecha de análisis, el nombre del producto y un estado de verificación.' },
      { q: '¿Cómo se embalan los productos?', a: 'Los materiales se embalan en envases seguros, etiquetados y con sello de seguridad, preparados para un transporte seguro. Cada envío referencia sus identificadores de lote.' },
      { q: '¿Cuál es el plazo de entrega?', a: 'Los pedidos se procesan desde nuestra operación de distribución en EE. UU. Los artículos en stock suelen prepararse en 1–2 días hábiles, con seguimiento una vez enviados.' },
      { q: '¿Cómo leo un Certificado de Análisis?', a: 'Cada COA indica el nombre del producto, los identificadores de lote, la fecha de análisis y el resultado de pureza. Los mismos campos aparecen en el portal de verificación para que puedas cotejar cualquier documento con su registro.' },
      { q: '¿Realizan envíos internacionales?', a: 'Los pedidos se gestionan desde nuestra operación en EE. UU. Los destinos disponibles y los plazos se confirman al finalizar la compra; el seguimiento se proporciona una vez enviado el pedido.' },
    ],
  },
  footer: {
    tagline: 'Materiales de investigación premium suministrados con Certificados de Análisis de terceros y documentación de lote transparente. Distribución desde EE. UU.',
    fulfillment: 'Distribución EE. UU.',
    catalog: 'Catálogo', company: 'Empresa', support: 'Soporte',
    shopAll: 'Ver todo', verify: 'Verificar COA', tracking: 'Seguimiento de lote',
    about: 'Nosotros', contact: 'Contacto', account: 'Cuenta',
    whatsapp: 'WhatsApp', email: 'Correo', shipping: 'Envíos',
    rights: '© 2026 Golden Horizon Research',
    disclaimerStrong: 'Solo para fines de investigación de laboratorio.',
    disclaimer: 'No apto para consumo humano. No destinado a diagnosticar, tratar, curar ni prevenir ninguna enfermedad.',
  },
};

const DICTS = { en, es };

function resolve(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

const I18nContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('ghr_lang');
      if (saved && DICTS[saved]) return saved;
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
    if (typeof localStorage !== 'undefined') localStorage.setItem('ghr_lang', lang);
  }, [lang]);

  const value = useMemo(() => {
    const dict = DICTS[lang] || en;
    const get = (key) => {
      const v = resolve(dict, key);
      return v !== undefined ? v : resolve(en, key);
    };
    const t = (key, vars) => {
      let s = get(key);
      if (typeof s !== 'string') return key;
      if (vars) for (const [k, val] of Object.entries(vars)) s = s.replace(`{${k}}`, val);
      return s;
    };
    return { lang, setLang: setLangState, t, get };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT must be used within LanguageProvider');
  return ctx;
}
