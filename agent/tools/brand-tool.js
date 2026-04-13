import { loadBrandPack, listBrandSlugs } from "../../src/brand-loader.js";

export async function loadBrand({ brand_id }) {
  const brand = await loadBrandPack(brand_id);
  return { ok: true, brand };
}

export async function listBrands() {
  const slugs = await listBrandSlugs();
  return { ok: true, slugs };
}
