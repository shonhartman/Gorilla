import { request } from "undici";

const API_VERSION = "v21.0";
const BASE = `https://graph.facebook.com/${API_VERSION}`;

function headers(token) {
  return { authorization: `Bearer ${token}` };
}

function metaClient(token = process.env.META_ACCESS_TOKEN) {
  if (!token) throw new Error("META_ACCESS_TOKEN is required");

  async function get(path, params = {}) {
    const url = new URL(`${BASE}${path}`);
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, Array.isArray(v) ? v.join(",") : v);
    }
    const res = await request(url.toString(), { headers: headers(token) });
    const body = await res.body.json();
    if (body.error) throw new Error(`Meta API: ${body.error.message}`);
    return body;
  }

  return {
    async campaignInsights(adAccountId, dateRange, metrics) {
      const timeRange = dateRangeToMeta(dateRange);
      return get(`/${adAccountId}/insights`, {
        level: "campaign",
        fields: metrics,
        time_range: JSON.stringify(timeRange),
      });
    },

    async pageInsights(pageId, metrics, period = "day") {
      return get(`/${pageId}/insights`, {
        metric: metrics,
        period,
      });
    },

    async postInsights(postId, metrics) {
      return get(`/${postId}/insights`, {
        metric: metrics,
      });
    },

    async publishPost(pageId, pageToken, { message, link }) {
      const url = `${BASE}/${pageId}/feed`;
      const res = await request(url, {
        method: "POST",
        headers: {
          ...headers(pageToken),
          "content-type": "application/json",
        },
        body: JSON.stringify({ message, link }),
      });
      const body = await res.body.json();
      if (body.error) throw new Error(`Meta API: ${body.error.message}`);
      return body;
    },
  };
}

function dateRangeToMeta(range) {
  const now = new Date();
  const fmt = (d) => d.toISOString().slice(0, 10);

  if (range === "last_7_days") {
    const since = new Date(now);
    since.setDate(since.getDate() - 7);
    return { since: fmt(since), until: fmt(now) };
  }
  if (range === "prior_7_days") {
    const until = new Date(now);
    until.setDate(until.getDate() - 7);
    const since = new Date(until);
    since.setDate(since.getDate() - 7);
    return { since: fmt(since), until: fmt(until) };
  }
  return range;
}

export { metaClient };
