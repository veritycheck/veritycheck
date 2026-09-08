import json
import time
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


def fetch_comments(video_url, cursor=0, count=50):
    endpoint = (
        "https://www.tikwm.com/api/comment/list/?url="
        + urllib.parse.quote(video_url, safe="")
        + "&count="
        + str(count)
        + "&cursor="
        + str(cursor)
    )
    return fetch_json(endpoint)


def fetch_with_retry(url, attempts=4):
    delay = 5
    for i in range(attempts):
        try:
            return fetch_json(url)
        except Exception as exc:
            if i == attempts - 1:
                raise
            print("attempt", i + 1, "failed:", exc, "- retrying in", delay, "s")
            time.sleep(delay)
            delay *= 2


def main():
    data = fetch_with_retry(
        "https://www.tikwm.com/api/comment/list/?url="
        + urllib.parse.quote(VIDEO_URL, safe="")
        + "&count=50"
    )
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
