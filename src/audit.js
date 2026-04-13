import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const DATA_DIR = new URL("../data", import.meta.url).pathname;

export async function log(brandId, action, detail = "") {
  const dir = join(DATA_DIR, brandId);
  await mkdir(dir, { recursive: true });

  const entry = {
    timestamp: new Date().toISOString(),
    brand: brandId,
    action,
    detail,
  };

  await appendFile(
    join(dir, "audit.log"),
    JSON.stringify(entry) + "\n",
    "utf8",
  );
}
