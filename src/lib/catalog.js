import { useEffect, useState } from 'react';
import { PRODUCTS } from './data.js';

// Headless WooCommerce catalog layer.
//
// When VITE_WC_STORE_URL is set, products are fetched from the public, read-only
// WooCommerce Store API (no secret key required, safe in the browser). When it is
// unset OR the request fails, we fall back to the bundled sample catalog so the
// site always renders. See docs/wordpress-woocommerce-setup.md.

const STORE_URL = (import.meta.env.VITE_WC_STORE_URL || '').replace(/\/$/, '');
const PER_PAGE = import.meta.env.VITE_WC_PER_PAGE || 24;

export const isLiveCatalog = Boolean(STORE_URL);

/** Pull a value out of a WooCommerce product's meta_data array by key. */
function meta(product, key) {
  const hit = (product.meta_data || []).find((m) => m.key === key);
  return hit ? hit.value : undefined;
}

/** Map a WooCommerce Store API product into the shape this UI expects. */
function mapProduct(p) {
  const priceMinor = Number(p.prices?.price ?? 0);
  const decimals = Number(p.prices?.currency_minor_unit ?? 2);
  const price = Math.round(priceMinor / 10 ** decimals);
  return {
    id: p.slug || String(p.id),
    name: p.name,
    code: meta(p, 'code') || p.sku || `GHR-${p.id}`,
    size: meta(p, 'size') || '',
    form: meta(p, 'form') || 'Research material',
    type: meta(p, 'type') || (p.categories?.[0]?.name ?? 'Research Materials'),
    purity: meta(p, 'purity') || '—',
    batch: meta(p, 'batch') || '—',
    lot: meta(p, 'lot') || '—',
    tested: meta(p, 'analysis_date') || '—',
    status: meta(p, 'status') || (p.is_in_stock ? 'verified' : 'pending'),
    avail: p.is_in_stock ? 'In stock' : 'Batch pending',
    price,
    image: p.images?.[0]?.src,
  };
}

/** Fetch the live catalog, or throw so callers can fall back. */
export async function fetchProducts() {
  if (!STORE_URL) return PRODUCTS;
  const res = await fetch(`${STORE_URL}/wp-json/wc/store/v1/products?per_page=${PER_PAGE}`);
  if (!res.ok) throw new Error(`Store API ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return PRODUCTS;
  return data.map(mapProduct);
}

/**
 * React hook returning the catalog with graceful fallback.
 * @returns {{ products: object[], loading: boolean, source: 'live'|'sample' }}
 */
export function useCatalog() {
  const [state, setState] = useState({ products: PRODUCTS, loading: isLiveCatalog, source: 'sample' });
  useEffect(() => {
    if (!isLiveCatalog) return;
    let alive = true;
    fetchProducts()
      .then((products) => alive && setState({ products, loading: false, source: 'live' }))
      .catch(() => alive && setState({ products: PRODUCTS, loading: false, source: 'sample' }));
    return () => { alive = false; };
  }, []);
  return state;
}
