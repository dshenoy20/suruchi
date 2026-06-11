import feedparser

RSS_URL = "https://saumyaaanchal.substack.com/feed"

feed = feedparser.parse(RSS_URL)

print("Feed title:", feed.feed.get("title"))
print("Entries:", len(feed.entries))
print("Bozo:", feed.bozo)

if feed.bozo:
    print("Error:", feed.bozo_exception)
