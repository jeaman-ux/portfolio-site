#!/usr/bin/env python3
"""
Extract visible text content from web pages.
"""
import sys
import urllib.request
from html.parser import HTMLParser
from io import StringIO

class MLStripper(HTMLParser):
    """HTML parser to extract visible text."""
    def __init__(self):
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs = True
        self.text = StringIO()
        self.skip_tags = {'script', 'style', 'head', 'meta', 'link'}
        self.current_tag = None

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag

    def handle_endtag(self, tag):
        self.current_tag = None

    def handle_data(self, data):
        if self.current_tag not in self.skip_tags:
            self.text.write(data)

    def get_data(self):
        return self.text.getvalue()

def strip_tags(html):
    """Strip HTML tags and return visible text."""
    s = MLStripper()
    s.feed(html)
    return s.get_data()

def fetch_and_extract(url):
    """Fetch URL and extract visible text."""
    try:
        # Set user agent to avoid blocks
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        )

        with urllib.request.urlopen(req, timeout=30) as response:
            html = response.read().decode('utf-8', errors='ignore')

        # Extract visible text
        text = strip_tags(html)

        # Clean up the text
        lines = []
        for line in text.split('\n'):
            line = line.strip()
            if line:  # Only keep non-empty lines
                lines.append(line)

        return '\n'.join(lines)

    except Exception as e:
        return f"Error fetching {url}: {str(e)}"

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: extract_text.py <url>")
        sys.exit(1)

    url = sys.argv[1]
    text = fetch_and_extract(url)
    print(text)
