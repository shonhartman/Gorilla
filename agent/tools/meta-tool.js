import { metaClient } from "../../integrations/meta/index.js";

export async function campaignInsights({ ad_account_id, date_range, metrics }) {
  const client = metaClient();
  const data = await client.campaignInsights(ad_account_id, date_range, metrics);
  return { ok: true, data };
}

export async function postInsights({ post_id, metrics }) {
  const client = metaClient();
  const data = await client.postInsights(post_id, metrics);
  return { ok: true, data };
}
