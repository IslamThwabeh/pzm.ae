"""Build the static, bilingual iPhone 18 Pro enquiry launch pages."""
from pathlib import Path
from urllib.parse import quote
import json

ROOT = Path(__file__).resolve().parents[1]
BUSINESS = 'P Z M Computers & Mobile Phones - Sell New Used PC Build'
DATE = '2026-09-18'
PHONE = '971528026677'  # Matches the existing navbar/contact links.
SPECS = 'https://www.apple.com/ae/iphone-18-pro/specs/'

COPY = {
    'en': dict(home='Home', catalog='iPhone catalogue', eyebrow='New at PZM', title='iPhone 18 Pro & Pro Max in Dubai | Ask for Price | PZM',
        description='Explore iPhone 18 Pro and iPhone 18 Pro Max at PZM in Al Barsha, Dubai. Ask our team for current prices, colors, storage options and availability.',
        h1='iPhone 18 Pro', intro='Two Pro models. One considered way to choose.', lead='Explore Apple’s newly announced Pro lineup, then ask our Al Barsha team for a personal quote.',
        ask='Ask for Price', explore='Explore the models', trust='Price and availability confirmed personally by our Al Barsha team.',
        models='Choose your Pro', model_intro='Both models feature the A20 Pro chip and a 48MP Pro Fusion camera system. Apple confirms four finishes and four storage capacities for each. Ask us which configuration we can source.',
        pro='6.3-inch Super Retina XDR display · 211 g', max='6.9-inch Super Retina XDR display · 249 g',
        price='Ask for Price', detail='Apple-confirmed specifications · local price on enquiry', compare='Pro or Pro Max?',
        compare_intro='The clear choice is display size and weight. Both share the A20 Pro chip and 48MP Pro Fusion camera system.',
        compact='More compact display and lighter body', expansive='Larger display for more room to view and create',
        why='Why enquire with PZM?', why_text='Speak directly with our Al Barsha electronics shop about current pricing, colors, capacities, warranty terms and pickup arrangements before deciding.',
        trade='Have a device to trade in?', trade_text='We also accept device sale and trade-in enquiries. Share your current model and condition for an individual assessment.',
        trade_link='Ask about a trade-in', related='Continue exploring', related_iphone='Browse the current iPhone catalogue', related_accessories='Explore accessories', related_store='Visit our Al Barsha store',
        faq='Frequently asked questions', q1='What is the PZM price of iPhone 18 Pro or Pro Max?', a1='Our selling prices are confirmed personally. Select a model and message our team for its current quote.',
        q2='Are colors and storage options available?', a2='Apple lists Black, Silver, Glacier and Burgundy finishes, with 256GB, 512GB, 1TB and 2TB capacities. Ask us to confirm local availability for your chosen configuration.',
        q3='Which model should I choose?', a3='iPhone 18 Pro has a 6.3-inch display and weighs 211 g. Pro Max has a 6.9-inch display and weighs 249 g. Both use A20 Pro and the 48MP Pro Fusion camera system.',
        q4='Can I arrange pickup in Al Barsha?', a4='Contact our team to confirm availability and arrange a store visit or pickup at Union Coop Hypermarket, Hessa Street, Al Barsha.',
        q5='How do I contact PZM?', a5='Use the model-specific WhatsApp button or call our store. We will confirm price, warranty details and availability before you decide.',
        note='Apple and iPhone are trademarks of Apple Inc. PZM is an independent electronics retailer.',
        source='View Apple UAE specifications', selection='Model', select='Select model',
        color='Preferred color (optional)', storage='Preferred storage (optional)', any='Ask me about options',
        colors=['Black','Silver','Glacier','Burgundy'],
        message='Hi PZM, I’m interested in the {model}. Please send me the available colors, storage options, price, warranty details, and availability.',
        color_word='Preferred color', storage_word='Preferred storage',
        image='Official product image pending approval'),
    'ar': dict(home='الرئيسية', catalog='كتالوج iPhone', eyebrow='جديد لدى PZM', title='iPhone 18 Pro وPro Max في دبي | اسأل عن السعر | PZM',
        description='تعرّف على iPhone 18 Pro وiPhone 18 Pro Max لدى PZM في البرشاء، دبي. تواصل معنا لمعرفة السعر والألوان والسعات والتوفر.',
        h1='iPhone 18 Pro', intro='طرازان احترافيان. اختيار يناسبك.', lead='تعرّف على الطرازين الجديدين من Apple، ثم اطلب عرض سعر شخصياً من فريقنا في البرشاء.',
        ask='اسأل عن السعر', explore='استكشف الطرازين', trust='يؤكد فريقنا في البرشاء السعر والتوفر لك شخصياً.',
        models='اختر طراز Pro المناسب', model_intro='يضم الطرازان شريحة A20 Pro ونظام كاميرات Pro Fusion بدقة 48MP. تؤكد Apple أربعة ألوان وأربع سعات لكل طراز. تواصل معنا للتحقق من التوفر.',
        pro='شاشة Super Retina XDR مقاس 6.3 بوصات · 211 غ', max='شاشة Super Retina XDR مقاس 6.9 بوصات · 249 غ',
        price='اسأل عن السعر', detail='مواصفات مؤكدة من Apple · السعر المحلي عند الاستفسار', compare='Pro أم Pro Max؟',
        compare_intro='الفرق الواضح هو حجم الشاشة والوزن. يشترك الطرازان في شريحة A20 Pro ونظام كاميرات Pro Fusion بدقة 48MP.',
        compact='شاشة أصغر ووزن أخف', expansive='شاشة أكبر للمشاهدة والعمل',
        why='لماذا تتواصل مع PZM؟', why_text='تحدث مباشرة مع متجرنا للإلكترونيات في البرشاء لمعرفة السعر الحالي والألوان والسعات وشروط الضمان وترتيبات الاستلام قبل اتخاذ القرار.',
        trade='هل لديك جهاز للاستبدال؟', trade_text='نستقبل أيضاً استفسارات بيع الأجهزة واستبدالها. أخبرنا بطراز جهازك وحالته لتقييمه بصورة فردية.',
        trade_link='استفسر عن الاستبدال', related='اكتشف المزيد', related_iphone='تصفح كتالوج iPhone', related_accessories='اكتشف الإكسسوارات', related_store='زر متجرنا في البرشاء',
        faq='الأسئلة الشائعة', q1='ما سعر iPhone 18 Pro أو Pro Max لدى PZM؟', a1='يؤكد فريقنا سعر البيع شخصياً. اختر الطراز وراسلنا للحصول على السعر الحالي.',
        q2='ما الألوان والسعات المتاحة؟', a2='تدرج Apple الأسود والفضي وGlacier وBurgundy، وسعات 256GB و512GB و1TB و2TB. تواصل معنا لتأكيد توفر النسخة المطلوبة محلياً.',
        q3='أي الطرازين أنسب لي؟', a3='يأتي iPhone 18 Pro بشاشة 6.3 بوصات ووزن 211 غ، بينما يأتي Pro Max بشاشة 6.9 بوصات ووزن 249 غ. يشتركان في شريحة A20 Pro ونظام كاميرات Pro Fusion بدقة 48MP.',
        q4='هل يمكن ترتيب الاستلام من البرشاء؟', a4='تواصل مع فريقنا لتأكيد التوفر وترتيب زيارة المتجر أو الاستلام من يونيون كوب هايبرماركت، شارع حصة، البرشاء.',
        q5='كيف أتواصل مع PZM؟', a5='استخدم زر واتساب الخاص بالطراز أو اتصل بمتجرنا. سنؤكد السعر وشروط الضمان والتوفر قبل اتخاذ قرارك.',
        note='Apple وiPhone علامتان تجاريتان لشركة Apple Inc. وPZM متجر إلكترونيات مستقل.',
        source='شاهد مواصفات Apple الإمارات', selection='الطراز', select='اختر الطراز',
        color='اللون المفضل (اختياري)', storage='السعة المفضلة (اختيارية)', any='اسألني عن الخيارات',
        colors=['Black','Silver','Glacier','Burgundy'],
        message='مرحباً PZM، أنا مهتم بجهاز {model}. يرجى إرسال الألوان والسعات المتوفرة والسعر وتفاصيل الضمان والتوفر.',
        color_word='اللون المفضل', storage_word='السعة المفضلة', image='صورة المنتج الرسمية بانتظار الموافقة'),
}

def wa(lang, model, color=None, storage=None):
    c = COPY[lang]
    message = c['message'].format(model=model)
    if color: message += f" {c['color_word']}: {color}."
    if storage: message += f" {c['storage_word']}: {storage}."
    return 'https://wa.me/' + PHONE + '?text=' + quote(message + ' via pzm.ae')

def block(lang):
    c = COPY[lang]
    base = '/ar/' if lang == 'ar' else '/'
    model_cards = ''
    for slug, name, spec in [('pro','iPhone 18 Pro',c['pro']),('max','iPhone 18 Pro Max',c['max'])]:
        model_cards += f'''<article class="launch-card" id="iphone-18-{slug}"><div class="launch-device-placeholder"><img src="/images/buy_iphone/iphone-18-pro-abstract-launch-640.webp" srcset="/images/buy_iphone/iphone-18-pro-abstract-launch-640.webp 640w, /images/buy_iphone/iphone-18-pro-abstract-launch-960.webp 960w" sizes="(max-width:700px) 100vw, 50vw" width="640" height="640" loading="lazy" alt="{'Illustrative black, silver and burgundy phone boxes' if lang=='en' else 'رسم توضيحي لعلب هواتف بالأسود والفضي والعنابي'}"></div><div class="launch-card-copy"><span class="launch-badge">{'جديد' if lang=='ar' else 'NEW'}</span><h3>{name}</h3><p>{spec}</p><p class="launch-price">{c['price']}</p><p class="launch-muted">{c['detail']}</p><a class="launch-button launch-enquiry" data-model="{name}" href="{wa(lang,name)}" target="_blank" rel="noopener noreferrer">{c['ask']}</a></div></article>'''
    faqs = [(c['q'+str(i)],c['a'+str(i)]) for i in range(1,6)]
    faq_html = ''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q,a in faqs)
    page_url = 'https://pzm.ae' + base + 'iphone-18-pro-dubai.html'
    graph = {'@context':'https://schema.org','@graph':[
        {'@type':'WebPage','@id':page_url,'url':page_url,'name':c['title'],'description':c['description'],'inLanguage':'ar-AE' if lang=='ar' else 'en-AE'},
        {'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':c['home'],'item':'https://pzm.ae'+base},{'@type':'ListItem','position':2,'name':c['catalog'],'item':'https://pzm.ae'+base+'services/buy-iphone.html'},{'@type':'ListItem','position':3,'name':'iPhone 18 Pro','item':page_url}]},
        *[{'@type':'Product','name':name,'description':f'{name}: {spec}. A20 Pro chip and 48MP Pro Fusion camera system.','url':page_url+'#iphone-18-'+slug,'brand':{'@type':'Brand','name':'Apple'}} for slug,name,spec in [('pro','iPhone 18 Pro',c['pro']),('max','iPhone 18 Pro Max',c['max'])]],
        {'@type':'FAQPage','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in faqs]}
    ]}
    return f'''<!doctype html><html lang="{lang}" dir="{'rtl' if lang=='ar' else 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{c['title']}</title><meta name="description" content="{c['description']}"><meta name="robots" content="index,follow"><link rel="canonical" href="{page_url}"><link rel="alternate" hreflang="en" href="https://pzm.ae/iphone-18-pro-dubai.html"><link rel="alternate" hreflang="ar-AE" href="https://pzm.ae/ar/iphone-18-pro-dubai.html"><link rel="alternate" hreflang="x-default" href="https://pzm.ae/iphone-18-pro-dubai.html"><meta property="og:type" content="website"><meta property="og:title" content="{c['title']}"><meta property="og:description" content="{c['description']}"><meta property="og:url" content="{page_url}"><meta property="og:image" content="https://pzm.ae/images/home/pzm-home-hero-2026.webp"><meta property="og:image:alt" content="PZM electronics shop in Al Barsha"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{c['title']}"><meta name="twitter:description" content="{c['description']}"><meta name="twitter:image" content="https://pzm.ae/images/home/pzm-home-hero-2026.webp"><link rel="stylesheet" href="/assets/v20260822/css/theme-5d8e6fd1.css"><link rel="stylesheet" href="/assets/v20260822/css/contact-567cf668.css"><link rel="stylesheet" href="/css/iphone-18-launch.css"><script async src="https://www.googletagmanager.com/gtag/js?id=G-NSJ08ST3JL"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-NSJ08ST3JL');gtag('config','G-KYVRVKG3MZ');</script><script type="application/ld+json">{json.dumps(graph,ensure_ascii=False)}</script></head><body><nav class="navbar"><div class="navbar-inner"><a class="logo" href="{base}"><span class="logo-pzm">{BUSINESS.replace('&','&amp;')}</span></a><div class="nav-links" id="navLinks"><a href="{base}">{c['home']}</a><a href="{base}services/buy-iphone.html">{c['catalog']}</a><a href="{base}areas/al-barsha.html">{'البرشاء' if lang=='ar' else 'Al Barsha'}</a></div><div class="nav-actions" id="navActions"><a class="btn-login" href="tel:+{PHONE}">{'اتصل بنا' if lang=='ar' else 'Call us'}</a></div><button class="hamburger" id="hamburger" type="button" aria-label="Menu" onclick="toggleMenu()"><span></span><span></span><span></span></button></div></nav><main><nav class="launch-breadcrumb" aria-label="Breadcrumb"><a href="{base}">{c['home']}</a><span aria-hidden="true">/</span><a href="{base}services/buy-iphone.html">{c['catalog']}</a><span aria-hidden="true">/</span><span>iPhone 18 Pro</span></nav><section class="launch-hero"><div class="launch-hero-inner"><span class="launch-eyebrow">{c['eyebrow']}</span><h1>{c['h1']}</h1><p class="launch-hero-kicker">{c['intro']}</p><p>{c['lead']}</p><div class="launch-actions"><a class="launch-button launch-enquiry" data-model="iPhone 18 Pro" href="{wa(lang,'iPhone 18 Pro')}" target="_blank" rel="noopener noreferrer">{c['ask']}</a><a class="launch-button launch-button-outline" href="#models">{c['explore']}</a></div><small>{c['trust']}</small></div><div class="launch-orbit" aria-hidden="true"><span>18</span><span>PRO</span></div></section><section class="launch-section" id="models"><span class="launch-eyebrow">iPhone 18 Pro</span><h2>{c['models']}</h2><p class="launch-section-intro">{c['model_intro']}</p><div class="launch-grid">{model_cards}</div><p class="launch-source"><a href="{SPECS}" target="_blank" rel="noopener noreferrer">{c['source']}</a></p></section><section class="launch-section launch-panel"><h2>{c['compare']}</h2><p>{c['compare_intro']}</p><div class="launch-compare"><div><strong>iPhone 18 Pro</strong><span>{c['compact']}</span><b>6.3″ · 211 g</b></div><div><strong>iPhone 18 Pro Max</strong><span>{c['expansive']}</span><b>6.9″ · 249 g</b></div></div></section><section class="launch-section"><h2>{c['why']}</h2><p>{c['why_text']}</p><p><a href="{base}areas/al-barsha.html">Union Coop Hypermarket, Hessa Street, Al Barsha, Dubai, UAE</a></p><h3>{c['trade']}</h3><p>{c['trade_text']} <a href="{base}services/sell-gadgets.html">{c['trade_link']}</a></p></section><section class="launch-section launch-panel"><h2>{c['related']}</h2><div class="launch-related"><a href="{base}services/buy-iphone.html">{c['related_iphone']}</a><a href="{base}services/accessories.html">{c['related_accessories']}</a><a href="{base}areas/al-barsha.html">{c['related_store']}</a></div></section><section class="launch-section launch-faq"><h2>{c['faq']}</h2>{faq_html}</section><section class="launch-section launch-final"><h2>{c['ask']}</h2><p>{c['trust']}</p><a class="launch-button launch-enquiry" data-model="iPhone 18 Pro Max" href="{wa(lang,'iPhone 18 Pro Max')}" target="_blank" rel="noopener noreferrer">iPhone 18 Pro Max · {c['ask']}</a></section><p class="launch-legal">{c['note']}</p><div id="contact-section"></div></main><script src="/assets/v20260822/js/navbar-5625cc25.js" defer></script><script src="/assets/v20260822/js/contact-loader-58f75adf.js" defer></script><script src="/js/iphone-18-launch.js" defer></script></body></html>'''

_base_block = block
def block(lang):
    html = _base_block(lang)
    html = html.replace('https://pzm.ae/images/home/pzm-home-hero-2026.webp', 'https://pzm.ae/images/buy_iphone/iphone-18-pro-abstract-launch.webp')
    html = html.replace('PZM electronics shop in Al Barsha', 'Illustrative black, silver and burgundy phone boxes')
    note = 'Illustrative packaging artwork. Confirm current finishes and packaging with our team.' if lang == 'en' else 'الصور توضيحية للعلب. يرجى تأكيد الألوان والتغليف الحاليين مع فريقنا.'
    html = html.replace('<div class="launch-grid">', f'<p class="launch-art-note">{note}</p><div class="launch-grid">', 1)
    return html

for lang, path in [('en','iphone-18-pro-dubai.html'),('ar','ar/iphone-18-pro-dubai.html')]:
    (ROOT/path).write_text(block(lang),encoding='utf-8')

def insert_once(path, marker, content):
    file = ROOT/path
    text = file.read_text(encoding='utf-8')
    if content not in text:
        if marker not in text: raise ValueError(f'Marker missing: {path}: {marker}')
        file.write_text(text.replace(marker,content+marker,1),encoding='utf-8')

for lang, home, catalog in [('en','index.html','services/buy-iphone.html'),('ar','ar/index.html','ar/services/buy-iphone.html')]:
    c = COPY[lang]
    dest = '/ar/iphone-18-pro-dubai.html' if lang=='ar' else '/iphone-18-pro-dubai.html'
    feature = f'''<section class="launch-home-feature" aria-labelledby="launch-home-title"><div class="launch-home-copy"><span class="launch-eyebrow">{c['eyebrow']}</span><h2 id="launch-home-title">iPhone 18 Pro</h2><p>{c['intro']} {c['lead']}</p><div class="launch-actions"><a class="launch-button launch-enquiry" data-model="iPhone 18 Pro" href="{wa(lang,'iPhone 18 Pro')}" target="_blank" rel="noopener noreferrer">{c['ask']}</a><a class="launch-button launch-button-outline" href="{dest}">{c['explore']}</a></div><small>{c['trust']}</small></div><div class="launch-home-art" aria-hidden="true">18<span>PRO</span></div></section>'''
    # Position directly after the established homepage hero.
    ht = (ROOT/home).read_text(encoding='utf-8')
    hero_start = ht.find('<section class="hero"') if lang == 'en' else ht.find('<section class="hero-panel"')
    hero_end = ht.find('</section>', hero_start) + len('</section>') if hero_start >= 0 else 0
    if hero_end < len('</section>'): raise ValueError(f'Home hero missing: {home}')
    if 'launch-home-feature' not in ht:
        ht = ht[:hero_end] + feature + ht[hero_end:]
        ht = ht.replace('</head>','<link rel="stylesheet" href="/css/iphone-18-launch.css"></head>',1)
        ht = ht.replace('</body>','<script src="/js/iphone-18-launch.js" defer></script></body>',1)
        (ROOT/home).write_text(ht,encoding='utf-8')
    cat_intro = f'''<section class="launch-catalog-feature"><div><span class="launch-eyebrow">{c['eyebrow']}</span><h2>iPhone 18 Pro &amp; iPhone 18 Pro Max</h2><p>{c['model_intro']}</p></div><div class="launch-catalog-cards"><article><h3>iPhone 18 Pro</h3><p>{c['pro']}</p><strong>{c['price']}</strong><a class="launch-button launch-enquiry" data-model="iPhone 18 Pro" href="{wa(lang,'iPhone 18 Pro')}" target="_blank" rel="noopener noreferrer">{c['ask']}</a></article><article><h3>iPhone 18 Pro Max</h3><p>{c['max']}</p><strong>{c['price']}</strong><a class="launch-button launch-enquiry" data-model="iPhone 18 Pro Max" href="{wa(lang,'iPhone 18 Pro Max')}" target="_blank" rel="noopener noreferrer">{c['ask']}</a></article></div><a class="launch-detail-link" href="{dest}">{c['explore']} →</a></section>'''
    ct = (ROOT/catalog).read_text(encoding='utf-8')
    if 'launch-catalog-feature' not in ct:
        ct = ct.replace('<main>', '<main>'+cat_intro,1)
        ct = ct.replace('</head>','<link rel="stylesheet" href="/css/iphone-18-launch.css"></head>',1)
        ct = ct.replace('</body>','<script src="/js/iphone-18-launch.js" defer></script></body>',1)
        (ROOT/catalog).write_text(ct,encoding='utf-8')

for lang, paths in [('en',['services/brand-new.html','services/index.html','areas/al-barsha.html']),('ar',['ar/services/brand-new.html','ar/services/index.html','ar/areas/al-barsha.html'])]:
    dest = '/ar/iphone-18-pro-dubai.html' if lang == 'ar' else '/iphone-18-pro-dubai.html'
    title = 'iPhone 18 Pro وiPhone 18 Pro Max في البرشاء' if lang == 'ar' else 'iPhone 18 Pro and Pro Max in Al Barsha'
    summary = 'تعرّف على الطرازين واسأل فريقنا عن السعر والألوان والسعات والتوفر الحالي قبل زيارة المتجر.' if lang == 'ar' else 'Explore both models and ask our team for current prices, colors, storage options and availability before visiting.'
    cta = 'استكشف الطرازين واسأل عن السعر' if lang == 'ar' else 'Explore both models and ask for price'
    strip = f'<section class="launch-discovery-strip" aria-label="iPhone 18 Pro"><div><span class="launch-eyebrow">{COPY[lang]["eyebrow"]}</span><h2>{title}</h2><p>{summary}</p></div><a class="launch-button" href="{dest}">{cta}</a></section>'
    for path in paths:
        file = ROOT/path
        source = file.read_text(encoding='utf-8')
        if 'launch-discovery-strip' in source: continue
        source = source.replace('<main>', '<main>'+strip,1)
        source = source.replace('</head>','<link rel="stylesheet" href="/css/iphone-18-launch.css"></head>',1)
        file.write_text(source,encoding='utf-8')

nav = ROOT/'js/navbar.js'
nt = nav.read_text(encoding='utf-8')
if "'/iphone-18-pro-dubai.html':" not in nt:
    nt = nt.replace("    '/services/buy-iphone.html':", "    '/iphone-18-pro-dubai.html': '/ar/iphone-18-pro-dubai.html',\n    '/ar/iphone-18-pro-dubai.html': '/iphone-18-pro-dubai.html',\n    '/services/buy-iphone.html':",1)
    nav.write_text(nt,encoding='utf-8')

sitemap = ROOT/'sitemap.xml'
st = sitemap.read_text(encoding='utf-8')
import re
for route in ['/', '/ar/', '/services/buy-iphone.html', '/ar/services/buy-iphone.html', '/services/brand-new.html', '/ar/services/brand-new.html', '/services/', '/ar/services/', '/areas/al-barsha.html', '/ar/areas/al-barsha.html']:
    url = 'https://pzm.ae' + route
    st = re.sub(r'(<loc>'+re.escape(url)+r'</loc>\s*<lastmod>)[^<]+', r'\g<1>'+DATE, st, count=1)
if 'iphone-18-pro-dubai.html</loc>' not in st:
    entries = ''.join(f'  <url><loc>https://pzm.ae{p}</loc><lastmod>{DATE}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n' for p in ['/iphone-18-pro-dubai.html','/ar/iphone-18-pro-dubai.html'])
    st = st.replace('</urlset>', entries+'</urlset>')
sitemap.write_text(st,encoding='utf-8')
