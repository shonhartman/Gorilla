import { addToQueue, getQueue } from "../../src/queue.js";

export async function queueItems({ brand_id, items, type = "post", status = "pending_review" }) {
  const result = await addToQueue(brand_id, items, type, status);
  return { ok: true, queued: result.count };
}

export async function listQueue({ brand_id, status }) {
  const items = await getQueue(brand_id, status);
  return { ok: true, items };
}
