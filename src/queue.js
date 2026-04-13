import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const DATA_DIR = new URL("../data", import.meta.url).pathname;

function queuePath(brandId) {
  return join(DATA_DIR, brandId, "queue.json");
}

async function ensureDir(brandId) {
  await mkdir(join(DATA_DIR, brandId), { recursive: true });
}

export async function addToQueue(brandId, items, type, status) {
  await ensureDir(brandId);
  const path = queuePath(brandId);
  const existing = await loadJson(path);

  const newItems = (Array.isArray(items) ? items : [items]).map((item) => ({
    id: crypto.randomUUID(),
    type,
    status,
    created: new Date().toISOString(),
    ...item,
  }));

  existing.push(...newItems);
  await writeFile(path, JSON.stringify(existing, null, 2));
  return { count: newItems.length };
}

export async function getQueue(brandId, status) {
  const path = queuePath(brandId);
  const all = await loadJson(path);
  if (!status) return all;
  return all.filter((i) => i.status === status);
}

async function loadJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return [];
  }
}
