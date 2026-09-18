"""Check launch links, metadata, schema, and enquiry copy."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
from PIL import Image
import json
import re
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
pages = ['iphone-18-pro-dubai.html','ar/iphone-18-pro-dubai.html','index.html','ar/index.html','services/buy-iphone.html','ar/services/buy-iphone.html']
discovery = ['services/brand-new.html','ar/services/brand-new.html','services/index.html','ar/services/index.html','areas/al-barsha.html','ar/areas/al-barsha.html']
editorial = ['blog/iphone-18-pro-rumors-vs-iphone-17-pro-max-dubai/index.html','ar/blog/iphone-18-pro-rumors-vs-iphone-17-pro-max-dubai/index.html','blog/should-you-wait-iphone-18-dubai-or-buy-iphone-17-now/index.html','ar/blog/should-you-wait-iphone-18-dubai-or-buy-iphone-17-now/index.html']

class Read(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.images=[]; self.alternates=[]; self.canonical=[]; self.enquiries=[]; self.scripts=[]; self._json=False; self._text=''; self.h1=0
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='h1': self.h1+=1
        if tag=='img': self.images.append(a.get('src',''))
        if tag=='a':
            self.links.append(a.get('href',''))
            if 'launch-enquiry' in a.get('class',''): self.enquiries.append((a.get('data-model'),a.get('href','')))
        if tag=='link':
            if a.get('rel')=='canonical': self.canonical.append(a.get('href'))
            if a.get('rel')=='alternate': self.alternates.append((a.get('hreflang'),a.get('href')))
        if tag=='script' and a.get('type')=='application/ld+json': self._json=True; self._text=''
    def handle_data(self, data):
        if self._json: self._text+=data
    def handle_endtag(self, tag):
        if tag=='script' and self._json:
            self.scripts.append(json.loads(self._text)); self._json=False

parsed={}
for path in pages:
    raw=(root/path).read_text(encoding='utf-8')
    p=Read(); p.feed(raw); parsed[path]=p
    for href in p.links:
        if href.startswith('/') and not href.startswith('//'):
            target=root/href.split('#')[0].split('?')[0].lstrip('/')
            if href=='/': target=root/'index.html'
            if href=='/ar/': target=root/'ar/index.html'
            if target.is_dir(): target=target/'index.html'
            assert target.exists(), (path,href)
    for model,href in p.enquiries:
        assert model in ('iPhone 18 Pro','iPhone 18 Pro Max'), (path,model)
        u=urlparse(href)
        assert u.netloc=='wa.me' and u.path=='/971528026677', (path,href)
        msg=parse_qs(u.query)['text'][0]
        assert model in msg and msg.endswith('via pzm.ae'), (path,msg)
        assert ('price' in msg or 'السعر' in msg), (path,msg)
        assert 'AED 0' not in raw and 'price: 0' not in raw
    print(path, 'enquiries:',len(p.enquiries),'JSON-LD:',len(p.scripts))

for path in pages[:2]:
    p=parsed[path]
    url='https://pzm.ae/'+path
    assert p.h1==1 and p.canonical==[url]
    for lang,route in [('en','iphone-18-pro-dubai.html'),('ar-AE','ar/iphone-18-pro-dubai.html'),('x-default','iphone-18-pro-dubai.html')]:
        assert (lang,'https://pzm.ae/'+route) in p.alternates
    graph=p.scripts[0]['@graph']
    assert len([x for x in graph if x['@type']=='Product'])==2
    assert all('offers' not in x for x in graph)
    assert len([x for x in graph if x['@type']=='FAQPage'][0]['mainEntity'])==5

sitemap=ET.parse(root/'sitemap.xml')
items={x.text for x in sitemap.findall('.//{*}loc')}
for path in pages[:2]: assert 'https://pzm.ae/'+path in items
assert 'launch-home-feature' in (root/'index.html').read_text(encoding='utf-8')
assert 'launch-home-feature' in (root/'ar/index.html').read_text(encoding='utf-8')
for path in discovery:
    source=(root/path).read_text(encoding='utf-8')
    assert source.count('launch-discovery-strip')==1, path
    assert ('/ar/iphone-18-pro-dubai.html' if path.startswith('ar/') else '/iphone-18-pro-dubai.html') in source, path
for path in editorial:
    source=(root/path).read_text(encoding='utf-8')
    p=Read();p.feed(source)
    assert p.h1==1 and p.scripts, path
    assert 'iphone-18-pro-dubai.html' in source, path
    assert 'Apple has not announced' not in source and 'لم تعلن Apple' not in source, path
    assert '2026-09-18' in source, path
for name,size in [('iphone-18-pro-abstract-launch.webp',(1600,900)),('iphone-18-pro-abstract-launch-960.webp',(960,960)),('iphone-18-pro-abstract-launch-640.webp',(640,640))]:
    with Image.open(root/'images/buy_iphone'/name) as im: assert im.size==size and im.format=='WEBP'
for path in pages[:2]:
    assert '/images/buy_iphone/iphone-18-pro-abstract-launch-640.webp' in parsed[path].images
print('Launch checks passed')
