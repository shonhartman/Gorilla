import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import yaml from "js-yaml";

const BRANDS_DIR = new URL("../brands", import.meta.url).pathname;

export async function loadBrandPack(slug) {
  const file = join(BRANDS_DIR, slug, "brand.yaml");
  const raw = await readFile(file, "utf8");
  const brand = yaml.load(raw);
  if (!brand.slug) brand.slug = slug;
  return brand;
}

export async function listBrandSlugs() {
  const entries = await readdir(BRANDS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => e.name);
}
