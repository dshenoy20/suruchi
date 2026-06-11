import json
import requests

URL = "https://api.rss2json.com/v1/api.json?rss_url=https://saumyaaanchal.substack.com/feed"

response = requests.get(URL, timeout=30)

print("Status:", response.status_code)

data = response.json()

posts = []

for item in data.get("items", []):

    posts.append({
        "title": item.get("title", ""),
        "link": item.get("link", ""),
        "published": item.get("pubDate", ""),
        "summary": item.get("description", "")
    })

with open("data/posts.json", "w", encoding="utf-8") as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"Saved {len(posts)} posts")
