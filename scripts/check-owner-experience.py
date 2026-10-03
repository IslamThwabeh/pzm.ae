"""Validate owner-approved retail pages, inventory parity and sitemap targets."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    'index.html', 'ar/index.html', 'iphone-18-pro-dubai.html',
    'ar/iphone-18-pro-dubai.html', 'services/iphone-device-care-al-barsha.html',
    'ar/services/iphone-device-care-al-barsha.html',
    'services/macbook-repair-al-barsha.html', 'ar/services/macbook-repair-al-barsha.html',
    'services/index.html', 'ar/services/index.html',
    'services/brand-new.html', 'ar/services/brand-new.html', 'services/buy-used.html', 'ar/services/buy-used.html',
]


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.links, self.assets, self.json = [], [], []
        self.h1 = 0
        self.canonical = []
        self.title = ''
        self.buffer = None
        self.in_title = False
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'h1':
            self.h1 += 1
        if tag == 'title':
            self.in_title = True
        if tag == 'a':
            self.links.append(a.get('href', ''))
        if tag in ('img', 'script') and a.get('src'):
            self.assets.append(a['src'])
        if tag == 'link':
            if a.get('rel') == 'stylesheet':
                self.assets.append(a['href'])
            if a.get('rel') == 'canonical':
                self.canonical.append(a['href'])
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.buffer = ''

    def handle_data(self, data):
        if self.buffer is not None:
            self.buffer += data
        if self.in_title:
            self.title += data

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'script' and self.buffer is not None:
            self.json.append(json.loads(self.buffer))
            self.buffer = None


def local_target(route, page):
    clean = unquote(urlparse(route).path)
    target = ROOT / clean.lstrip('/') if clean.startswith('/') else page.parent / clean
    return target / 'index.html' if target.is_dir() else target


for name in PAGES:
    file = ROOT / name
    source = file.read_text(encoding='utf-8')
    p = Page(source)
    assert p.h1 == 1, (name, 'Expected one H1')
    assert len(p.title) <= 60, (name, 'Title too long', p.title)
    assert len(p.canonical) == 1 and p.json, (name, 'Missing canonical/schema')
    assert not re.search(r'\b(?:Al Quoz|Dubai Marina|Jumeirah|Tecom|JLT|JVC|JVT)\b', source, re.I), name
    for asset in p.assets:
        if not urlparse(asset).scheme and not asset.startswith('//'):
            assert local_target(asset, file).is_file(), (name, 'Missing asset', asset)
    for link in p.links:
        if link.startswith(('https://wa.me/', 'http://wa.me/')):
            parsed = urlparse(link)
            assert parsed.path == '/971528026677', (name, 'Incorrect contact number')
            message = parse_qs(parsed.query).get('text', [''])[0]
            assert message.endswith(('via pzm.ae', '(via pzm.ae)')), (name, message)
        elif link and not urlparse(link).scheme and not link.startswith(('#', '//')):
            target = local_target(link, file)
            assert target.is_file(), (name, 'Missing destination', link)
            fragment = urlparse(link).fragment
            if fragment and target.suffix == '.html':
                assert re.search(r'id=["\']' + re.escape(fragment) + r'["\']', target.read_text(encoding='utf-8')), (name, 'Missing anchor', link)
    print('Page PASS:', name)

for language in ('', 'ar/'):
    source = (ROOT / language / 'index.html').read_text(encoding='utf-8')
    assert source.count('class="retail-tile"') == 6
    assert source.index('retail-grid') < source.index('id="visit"')
    for route in ('services/iphone-device-care-al-barsha.html', 'services/macbook-repair-al-barsha.html'):
        assert f'href="/{language}{route}"' in source
    for kind, count in [('brand-new', 10), ('buy-used', 92)]:
        source = (ROOT / language / f'services/{kind}.html').read_text(encoding='utf-8')
        assert source.count('class="inventory-item"') == count, (language, kind)

for kind in ('brand-new', 'buy-used'):
    inventories = []
    for language in ('', 'ar/'):
        source = (ROOT / language / f'services/{kind}.html').read_text(encoding='utf-8')
        names = re.findall(r'<span class="item-name">(.*?)</span>', source)
        prices = re.findall(r'<span class="item-price">(.*?)</span>', source)
        inventories.append(list(zip(names, prices)))
    assert inventories[0] == inventories[1], (kind, 'EN/AR inventory differs')

feed = ET.parse(ROOT / 'product-feed.xml')
items = feed.findall('.//item')
assert len(items) == 102
google = {'g': 'http://base.google.com/ns/1.0'}
iphone = [item for item in items if item.find('g:title', google).text.startswith('iPhone 18')]
assert sorted(item.find('g:price', google).text for item in iphone) == ['5300.00 AED', '6350.00 AED', '7100.00 AED']
assert all('iphone-18-pro-finishes.jpg' in item.find('g:image_link', google).text for item in iphone)

sitemap = ET.parse(ROOT / 'sitemap.xml')
locations = [node.text for node in sitemap.findall('.//{*}loc')]
assert len(locations) == len(set(locations)), 'Duplicate sitemap entries'
for location in locations:
    target = local_target(urlparse(location).path, ROOT / 'index.html')
    assert target.is_file(), ('Sitemap destination missing', location)
    source = target.read_text(encoding='utf-8')
    assert not re.search(r'<meta\b[^>]*\bcontent=["\'][^"\']*noindex', source, re.I), location
    assert not re.search(r'<meta\b[^>]*http-equiv=["\']refresh', source, re.I), location
for route in ('services/macbook-repair-al-barsha.html', 'ar/services/macbook-repair-al-barsha.html', 'ar/services/iphone-device-care-al-barsha.html'):
    assert 'https://pzm.ae/' + route in locations
for language in ('', 'ar/'):
    source = (ROOT / language / 'services/macbook-care-al-barsha.html').read_text(encoding='utf-8')
    assert 'noindex,follow' in source and 'http-equiv="refresh"' in source
    assert 'https://pzm.ae/' + language + 'services/macbook-repair-al-barsha.html' in source
    assert 'https://pzm.ae/' + language + 'services/macbook-care-al-barsha.html' not in locations

assert (ROOT / 'js/navbar.js').read_bytes() == (ROOT / 'assets/v20260822/js/navbar-5625cc25.js').read_bytes()
assert (ROOT / 'js/contact-loader.js').read_bytes() == (ROOT / 'assets/v20260822/js/contact-loader-58f75adf.js').read_bytes()
print('PASS: inventory parity (102 products), stock prices, assets, redirects, and', len(locations), 'sitemap targets')
