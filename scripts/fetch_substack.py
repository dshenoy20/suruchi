import feedparser
import json

RSS_URL = "https://saumyaaanchal.substack.com/feed"

feed = feedparser.parse(RSS_URL)

posts = []

for entry in feed.entries:
    posts.append({
        "title": entry.title,
        "link": entry.link,
        "published": entry.published,
        "summary": entry.summary
    })

with open("data/posts.json", "w", encoding="utf-8") as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"Saved {len(posts)} posts")
