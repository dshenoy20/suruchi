import requests

url = "https://saumyaaanchal.substack.com/feed"

response = requests.get(
    url,
    headers={"User-Agent": "Mozilla/5.0"},
    timeout=30
)

print("Status:", response.status_code)
print(response.text[:3000])
