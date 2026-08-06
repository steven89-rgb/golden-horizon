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
    eyebrow: 'Built Around Transparency',
    title1: 'Research Materials',
    title2: 'Without Compromise',
    body: 'Golden Horizon supplies research materials backed by independent testing, batch transparency, and consistent standards. Prepared for laboratory research and fulfilled from California — not for personal or medical use.',
  },
  trust: {
    items: [
      { icon: 'FileChk', h: 'Independent Testing', p: 'Materials are tested by an independent laboratory before release, so results do not rely on a single source.' },
      { icon: 'Layers', h: 'Batch Transparency', p: 'Every order references its batch and lot identifiers, giving each shipment a clear and traceable record.' },
      { icon: 'BadgeChk', h: 'Consistent Standards', p: 'The same preparation, labeling, and review are applied across the catalog, from one order to the next.' },
      { icon: 'MapPin', h: 'California Fulfillment', p: 'Orders are prepared and shipped from our California operation, with tracking provided once dispatched.' },
    ],
  },
  about: {
    eyebrow: 'Who We Are',
    title: 'Built for research that depends on consistency.',
    body: 'Golden Horizon exists to supply research materials that laboratories can rely on order after order. We focus on independent testing, clear batch documentation, and consistent standards across the catalog. Every item is prepared for laboratory research and is not intended for personal, therapeutic, or veterinary use.',
  },
  best: {
    eyebrow: 'Catalog',
    title: 'Featured Research Materials',
    desc: 'A selection from the catalog. Each item is prepared to the same standards and shipped from California.',
  },
  features: {
    eyebrow: 'Why Golden Horizon',
    title: 'A process built for confidence.',
    items: [
      { icon: 'FileChk', h: 'Independent Testing', p: 'Testing is handled by an outside laboratory, so quality is confirmed by a separate party rather than assumed.' },
      { icon: 'BadgeChk', h: 'Documentation Standards', p: 'Each order arrives with its batch and lot identifiers documented, so records stay clear and easy to reference.' },
      { icon: 'Lock', h: 'Secure Checkout', p: 'Payment and account details are handled through an encrypted checkout, so every order is placed with confidence.' },
      { icon: 'WhatsApp', h: 'Responsive Support', p: 'Our team answers product, order, and fulfillment questions by WhatsApp and email during business hours.' },
    ],
  },
  homeFaq: {
    eyebrow: 'Frequently Asked Questions',
    title: 'Questions, answered.',
    more: 'Still have a question?',
    items: [
      { q: 'How and when do orders ship?', a: 'In-stock orders are usually prepared within one to two business days. Tracking is provided once an order is dispatched.' },
      { q: 'Where are orders fulfilled?', a: 'Orders are prepared and shipped from our California operation. Available destinations are confirmed at checkout.' },
      { q: 'What standards apply to each batch?', a: 'Every batch is prepared to the same process and reviewed before release, so materials stay consistent across orders.' },
      { q: 'What documentation comes with an order?', a: 'Each order references its batch and lot identifiers, giving every shipment a clear and traceable record.' },
      { q: 'How can I reach support?', a: 'Our team responds to product, order, and fulfillment questions by WhatsApp and email during business hours.' },
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
    tagline: 'Research materials supplied with independent testing, batch transparency, and consistent standards. California fulfillment and secure checkout.',
    fulfillment: 'California Fulfillment',
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
    eyebrow: 'Basado en la Transparencia',
    title1: 'Materiales de Investigación',
    title2: 'Sin Concesiones',
    body: 'Golden Horizon suministra materiales de investigación respaldados por pruebas independientes, transparencia de lotes y estándares consistentes. Preparados para la investigación de laboratorio y distribuidos desde California — no para uso personal ni médico.',
  },
  trust: {
    items: [
      { icon: 'FileChk', h: 'Pruebas Independientes', p: 'Los materiales se analizan en un laboratorio independiente antes de su liberación, de modo que los resultados no dependen de una sola fuente.' },
      { icon: 'Layers', h: 'Transparencia de Lotes', p: 'Cada pedido indica sus identificadores de lote, lo que da a cada envío un registro claro y trazable.' },
      { icon: 'BadgeChk', h: 'Estándares Consistentes', p: 'Se aplican la misma preparación, etiquetado y revisión en todo el catálogo, de un pedido al siguiente.' },
      { icon: 'MapPin', h: 'Distribución desde California', p: 'Los pedidos se preparan y envían desde nuestra operación en California, con seguimiento una vez despachados.' },
    ],
  },
  about: {
    eyebrow: 'Quiénes Somos',
    title: 'Creados para una investigación que depende de la consistencia.',
    body: 'Golden Horizon existe para suministrar materiales de investigación en los que los laboratorios puedan confiar pedido tras pedido. Nos centramos en pruebas independientes, documentación de lotes clara y estándares consistentes en todo el catálogo. Cada artículo se prepara para la investigación de laboratorio y no está destinado a uso personal, terapéutico ni veterinario.',
  },
  best: {
    eyebrow: 'Catálogo',
    title: 'Materiales de Investigación Destacados',
    desc: 'Una selección del catálogo. Cada artículo se prepara con los mismos estándares y se envía desde California.',
  },
  features: {
    eyebrow: 'Por Qué Golden Horizon',
    title: 'Un proceso pensado para dar confianza.',
    items: [
      { icon: 'FileChk', h: 'Pruebas Independientes', p: 'Las pruebas las realiza un laboratorio externo, de modo que la calidad la confirma un tercero en lugar de darse por supuesta.' },
      { icon: 'BadgeChk', h: 'Estándares de Documentación', p: 'Cada pedido llega con sus identificadores de lote documentados, para que los registros sean claros y fáciles de consultar.' },
      { icon: 'Lock', h: 'Pago Seguro', p: 'Los datos de pago y de la cuenta se gestionan mediante un pago cifrado, para realizar cada pedido con confianza.' },
      { icon: 'WhatsApp', h: 'Soporte Ágil', p: 'Nuestro equipo responde preguntas sobre productos, pedidos y entrega por WhatsApp y correo en horario laboral.' },
    ],
  },
  homeFaq: {
    eyebrow: 'Preguntas Frecuentes',
    title: 'Preguntas, respondidas.',
    more: '¿Aún tienes una pregunta?',
    items: [
      { q: '¿Cómo y cuándo se envían los pedidos?', a: 'Los pedidos en stock suelen prepararse en uno o dos días hábiles. El seguimiento se proporciona una vez despachado el pedido.' },
      { q: '¿Desde dónde se gestionan los pedidos?', a: 'Los pedidos se preparan y envían desde nuestra operación en California. Los destinos disponibles se confirman al finalizar la compra.' },
      { q: '¿Qué estándares se aplican a cada lote?', a: 'Cada lote se prepara con el mismo proceso y se revisa antes de su liberación, para que los materiales se mantengan consistentes entre pedidos.' },
      { q: '¿Qué documentación acompaña a un pedido?', a: 'Cada pedido indica sus identificadores de lote, lo que da a cada envío un registro claro y trazable.' },
      { q: '¿Cómo puedo contactar con soporte?', a: 'Nuestro equipo responde preguntas sobre productos, pedidos y entrega por WhatsApp y correo en horario laboral.' },
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
    tagline: 'Materiales de investigación suministrados con pruebas independientes, transparencia de lotes y estándares consistentes. Distribución desde California y pago seguro.',
    fulfillment: 'Distribución California',
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
