const VIDEO_URL = "https://www.tiktok.com/@veritycheck/video/7679036782750534934";
const CACHE_SECONDS = 600;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const video = url.searchParams.get("url") || env.VIDEO_URL || VIDEO_URL;

    if (!video || video.startsWith("PASTE_YOUR")) {
      return json(
        { error: "set VIDEO_URL in worker.js or pass ?url=<tiktok video url>" },
        400
      );
    }

    const cacheKey = new Request("https://cache.veritycheck/" + video);
    const cached = await caches.default.match(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const upstream = await fetch(
        "https://www.tikwm.com/api/comment/list/?url=" +
          encodeURIComponent(video) +
          "&count=50"
      );
      const payload = await upstream.json();
      const comments = payload?.data?.comments;
      if (payload.code !== 0 || !Array.isArray(comments)) {
        return json({ error: "upstream returned no comments" }, 502);
      }

      const pins = comments
        .map((c) => ({
          user: c.user?.unique_id || c.user?.nickname || "unknown",
          avatar: c.user?.avatar || "",
          comment: (c.text || "").trim(),
          time: c.create_time || 0,
          id: String(c.id || c.comment_id || ""),
        }))
        .filter((p) => p.comment)
        .sort(
          (a, b) => a.time - b.time || a.id.localeCompare(b.id)
        );

      const response = json(pins);
      response.headers.set("cache-control", "public, max-age=" + CACHE_SECONDS);
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
