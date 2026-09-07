const VIDEO_URL = "https://www.tiktok.com/@veritycheck/video/7682866518173994262";
const CACHE_SECONDS = 30;
const MAX_PAGES = 20;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const video = url.searchParams.get("url") || env.VIDEO_URL || VIDEO_URL;

    if (
      !video ||
      !/^https:\/\/(www\.)?tiktok\.com\/@veritycheck\/video\/\d+/.test(video)
    ) {
      return json({ error: "only @veritycheck videos are allowed" }, 403);
    }

    const cacheKey = new Request("https://cache.veritycheck/" + video);
    const cached = await caches.default.match(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const seen = new Map();
      let cursor = 0;

      for (let page = 0; page < MAX_PAGES; page++) {
        const upstream = await fetch(
          "https://www.tikwm.com/api/comment/list/?url=" +
            encodeURIComponent(video) +
            "&count=50&cursor=" +
            cursor
        );
        const payload = await upstream.json();
        const batch = payload?.data?.comments;

        if (payload.code !== 0 || !Array.isArray(batch) || batch.length === 0) {
          break;
        }

        for (const c of batch) {
          const id = String(c.id || c.comment_id || "");
          if (id && !seen.has(id)) {
            seen.set(id, c);
          }
        }

        if (!payload.data?.has_more) {
          break;
        }
        cursor = payload.data?.cursor ?? cursor + batch.length;
      }

      if (seen.size === 0) {
        const empty = json([]);
        empty.headers.set(
          "cache-control",
          "public, max-age=" + CACHE_SECONDS
        );
        ctx.waitUntil(caches.default.put(cacheKey, empty.clone()));
        return empty;
      }

      const pins = [...seen.values()]
        .map((c) => ({
          user: c.user?.unique_id || c.user?.nickname || "unknown",
          avatar: c.user?.avatar || "",
          comment: (c.text || "").trim(),
          time: c.create_time || 0,
          id: String(c.id || c.comment_id || ""),
        }))
        .filter((p) => p.comment)
        .sort((a, b) => a.time - b.time || a.id.localeCompare(b.id));

      const response = json(pins);
      response.headers.set(
        "cache-control",
        "public, max-age=" + CACHE_SECONDS
      );
      ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
      return response;
    } catch {
      return json({ error: "failed to fetch comments" }, 502);
    }
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
    },
  });
}
