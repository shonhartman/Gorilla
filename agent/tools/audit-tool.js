import { log } from "../../src/audit.js";

export async function logEntry({ brand_id, action, detail }) {
  await log(brand_id, action, detail);
  return { ok: true };
}
