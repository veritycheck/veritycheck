import json
import urllib.request
import urllib.parse

VIDEO_URL = "https://www.tiktok.com/@veritycheck/video/7683055096590077206"
OUTPUT = "../everyone/comments.json"
UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
}


def fetch_json(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode("utf-8"))


def main():
    endpoint = "https://www.tikwm.com/api/comment/list/?url=" + urllib.parse.quote(
        VIDEO_URL, safe=""
    ) + "&count=50"
    data = fetch_json(endpoint)
    comments = (data.get("data") or {}).get("comments") or []

    pins = []
    for c in comments:
        user = c.get("user") or {}
        text = (c.get("text") or "").strip()
        if not text:
            continue
        pins.append(
            {
                "user": user.get("unique_id") or user.get("nickname") or "unknown",
                "avatar": user.get("avatar") or "",
                "comment": text,
                "time": c.get("create_time") or 0,
                "id": str(c.get("id") or c.get("comment_id") or ""),
            }
        )

    pins.sort(key=lambda p: (p["time"], p["id"]))
    out = [{"user": p["user"], "avatar": p["avatar"], "comment": p["comment"]} for p in pins]

    with open(OUTPUT, "w", encoding="utf-8", newline="\n") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print("wrote", len(out), "comments to", OUTPUT)
    for p in out:
        print("  @" + p["user"], "->", p["comment"][:60])


if __name__ == "__main__":
    main()
