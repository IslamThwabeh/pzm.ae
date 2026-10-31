from html import escape
from pathlib import Path
from urllib.parse import quote
import re
import argparse
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description="Update bilingual inventory and merchant feed from an owner stock list.")
parser.add_argument("source", type=Path, help="Path to the owner stock list")
parser.add_argument("--enquiry-price", type=int, action="append", default=[], help="Unconfirmed source price to replace with an enquiry; may be repeated")
parser.add_argument("--price-correction", action="append", default=[], metavar="SOURCE=CORRECTED", help="Correct a typo in a source price; may be repeated")
args = parser.parse_args()
try:
    price_corrections = dict(tuple(map(int, pair.split("="))) for pair in args.price_correction)
    if any(source <= 0 or corrected <= 0 for source, corrected in price_corrections.items()):
        raise ValueError("Prices must be positive")
except (ValueError, TypeError):
    parser.error("Price corrections must use positive integers: SOURCE=CORRECTED")
SOURCE = args.source
WA = "https://wa.me/971528026677"
SITE = "https://pzm.ae"
IPHONE_IMG = "/assets/v20260624/images/buy_iphone/iPhone_17_Pro_Max_all_colors-55c7582f.webp"
USED_IMG = "/assets/v20260624/images/buy_used/used_iphone_16_pro_max_main-d1d40f10.webp"
SAMSUNG_IMG = "/assets/v20260624/images/brand_new/samsung_a56_5g-8aaa14ce.webp"
SWITCH_IMG = "/assets/v20260624/images/brand_new/nintendo_switch-a346ee08.webp"
IPHONE18_IMG = "/images/buy_iphone/iphone-18-pro-finishes.jpg"


def parse_sections(text):
    sections = {}
    current = None
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        if line.startswith("*****"):
            current = line.strip("* ").strip()
            sections[current] = []
        elif current:
            sections[current].append(line.removeprefix("-").strip())
    return sections


def split_price(raw):
    match = re.search(r"(?i)\b(\d+)\s*aed\b", raw)
    if not match:
        return raw, None
    price = int(match.group(1))
    name = (raw[:match.start()] + raw[match.end():]).strip()
    return name, price


def clean_name(raw):
    name = re.sub(r"(?<!\d)00\d{5,}\b", " ", raw)
    name = re.sub(r"(?i)\bnever\s+fix(?:ed|befofe|beford|before)?\s*(?:before|beford|befofe)?\b", " ", name)
    name = re.sub(r"(?i)\bnew battery\b", "new battery", name)
    name = re.sub(r"(?i)\bwith cd\b", "with disc drive", name)
    name = re.sub(r"(?i)\bwith dc\b", "with disc drive", name)
    name = re.sub(r"(?i)\bduel core\b", "dual core", name)
    name = re.sub(r"(?i)\bxeom\b", "Xeon", name)
    name = re.sub(r"(?i)\blenevo\b", "Lenovo", name)
    name = re.sub(r"(?i)\bph(i?)lps\b", "Philips", name)
    name = re.sub(r"(?i)\bmackbook\b", "MacBook", name)
    name = re.sub(r"(?i)\brayzen\b", "Ryzen", name)
    name = re.sub(r"(?i)\bglod\b", "Gold", name)
    name = re.sub(r"(?i)\bphyscal\b", "Physical", name)
    name = re.sub(r"(?i)\bopne box\b", "Open Box", name)
    name = re.sub(r"(?i)\bfringer print\b", "fingerprint", name)
    name = re.sub(r"(?i)(\b\d+GB)\s+pcs\b", r"\1", name)
    name = re.sub(r"(?i)\biphones?\b", lambda m: "iPhone" if m.group(0).lower().startswith("iphone") else m.group(0), name)
    name = re.sub(r"\s*/\s*not for sale.*$", "", name, flags=re.I)
    name = re.sub(r"(?i)\b(\d+)\s*aed\b", " ", name)
    name = re.sub(r"\s+", " ", name).strip(" -")
    return name


def brand_for(name):
    first = name.split()[0].strip("|")
    if first.lower() in ("iphone", "ipad", "apple", "airpod", "airpods", "macbook"):
        return "Apple"
    if first.lower() == "gaming":
        for token, brand in (("lenovo", "Lenovo"), ("inspiron", "Dell"), ("omen", "HP"), ("asus", "ASUS"), ("lg", "LG")):
            if token in name.lower():
                return brand
    mapping = {
        "IPHONE": "Apple", "iPhone": "Apple", "IPAD": "Apple", "APPLE": "Apple", "Apple": "Apple",
        "Airpod": "Apple", "AirPods": "Apple", "MacBook": "Apple", "MACKBOOK": "Apple",
        "SAMSUNG": "Samsung", "Samsung": "Samsung",
        "Honor": "Honor", "HONOR": "Honor",
        "Redmi": "Xiaomi", "NOTHING": "Nothing",
        "NINTENDO": "Nintendo", "Nintendo": "Nintendo",
        "PS5": "Sony", "PS4": "Sony", "XBOX": "Microsoft",
        "Lenovo": "Lenovo", "HP": "HP", "Dell": "Dell", "DELL": "Dell",
        "MICROSOFT": "Microsoft", "HUAWEI": "Huawei", "BVATE": "BVATE",
        "JBL": "JBL", "Gaming": "LG", "ASUS": "ASUS", "Philips": "Philips", "NVIDIA": "NVIDIA",
    }
    return mapping.get(first, first)


def image_for(name, new=False):
    low = name.lower()
    if "iphone" in low or "ipad" in low or "apple" in low or "airpod" in low:
        return IPHONE_IMG
    if "samsung" in low:
        return SAMSUNG_IMG
    if "nintendo" in low:
        return SWITCH_IMG
    if low.startswith("nvidia geforce"):
        return "/images/home/2026-10-24/custom-pc-480.webp"
    return USED_IMG


def item(name, price=None, condition="pre-owned", image=None, href="/services/buy-used.html"):
    return {
        "name": name,
        "price": price,
        "condition": condition,
        "image": image or image_for(name, condition == "new"),
        "href": href,
    }


def card(product, lang="en"):
    name = product["name"]
    price = product["price"]
    priced = price is not None
    price_text = f"{price:,} AED" if priced else ("Ask for today's price" if lang == "en" else "اسأل عن سعر اليوم")
    condition = "brand-new" if product["condition"] == "new" else "pre-owned"
    if priced:
        msg = f"Hi, I am interested in the {condition} {name} for {price:,} AED. (via pzm.ae)"
    else:
        msg = f"Hi, I am interested in {name}. Please send today's price, availability, warranty details and collection options. (via pzm.ae)"
    href = f"{WA}?text={quote(msg)}"
    price_class = ' class="item-price enquiry-price"' if not priced else ' class="item-price"'
    hint = "اضغط للاستفسار عبر واتساب" if lang == "ar" else "Tap to enquire on WhatsApp"
    return f'''                <a class="inventory-item" href="{href}" target="_blank" rel="noopener noreferrer">
                    <img src="{product["image"]}" alt="{escape(name, quote=True)}" class="item-thumb" width="64" height="64" loading="lazy">
                    <div class="item-info">
                        <span class="item-name">{escape(name)}</span>
                        <span class="item-whatsapp-hint">{hint}</span>
                    </div>
                    <span{price_class}>{price_text}</span>
                </a>'''


def replace_section(source, section_id, cards_html):
    pattern = re.compile(
        rf'(<section class="inventory-section" id="{re.escape(section_id)}">\s*<h2 class="inventory-category-title">.*?</h2>\s*<div class="inventory-list">)(.*?)(\s*</div>\s*</section>)',
        re.S,
    )
    updated, count = pattern.subn(lambda m: m.group(1) + "\n" + cards_html + "\n" + m.group(3).lstrip("\r\n"), source, count=1)
    if count != 1:
        raise ValueError(f"Missing inventory section: {section_id}")
    return updated


def normalize_item(raw, condition, href):
    name_part, price = split_price(raw)
    name = clean_name(name_part)
    if re.match(r"(?i)^PS5\s+1\s+Controller\b", name) and price == 170:
        name = "PS5 Controller"
    if re.match(r"(?i)^GPU\s+RTX\s+3070\b", name):
        name = "NVIDIA GeForce RTX 3070 graphics card"
    if re.match(r"(?i)^SAMSUNG\s+Z\s+Flip\s+48GB/256GB\b", name):
        # Best reading of the merged model/RAM, matching Samsung's official configuration.
        name = "Samsung Galaxy Z Flip4 8GB/256GB"
    if price in args.enquiry_price:
        price = None
    else:
        price = price_corrections.get(price, price)
    return item(name, price, condition, image_for(name, condition == "new"), href)


sections = parse_sections(SOURCE.read_text(encoding="utf-8"))

brand_iphones = []
for raw in sections["Brand New IPHones"]:
    product = normalize_item(raw, "new", "/services/brand-new.html")
    if re.match(r"(?i)^iPhone 18\b", product["name"]):
        # Owner policy: these models remain enquiry-only until stable prices are approved.
        product["price"] = None
        product["image"] = IPHONE18_IMG
    brand_iphones.append(product)
brand_samsung = [normalize_item(x, "new", "/services/brand-new.html") for x in sections["Brand New Samsung"]]
brand_gaming = [normalize_item(x, "new", "/services/brand-new.html") for x in sections["GAMING CONSOLE Brand New"]]
brand_speakers = [item(clean_name(x), None, "new", USED_IMG, "/services/brand-new.html") for x in sections["Brand New Speakers"]]
console_stock = sections["GAMING CONSOLE Preowned"]
component_stock = [raw for raw in console_stock if re.match(r"(?i)^GPU\b", raw)]

used_groups = {
    "phones": [normalize_item(x, "used", "/services/buy-used.html") for x in sections["Preowned Phones"]],
    "laptops": [normalize_item(x, "used", "/services/buy-used.html") for x in sections["Preowned LAPTOPS"] if "not for sale" not in x.lower()],
    "tablets": [normalize_item(x, "used", "/services/buy-used.html") for x in sections["Preowned Tablets"]],
    "accessories": [normalize_item(x, "used", "/services/buy-used.html") for x in sections["Preowned APPLE WATCH - & AIRPODS / Apple Pincel"]],
    "consoles": [normalize_item(x, "used", "/services/buy-used.html") for x in console_stock if x not in component_stock],
    "gaming": [normalize_item(x, "used", "/services/buy-used.html") for x in sections["Preowned PC/ Gaming PC"] + component_stock],
    "monitors": [normalize_item(x, "used", "/services/buy-used.html") for x in sections["Preowned MONITOR"]],
    "all-in-one": [normalize_item(x, "used", "/services/buy-used.html") for x in sections["All in One PC"]],
}
for product in used_groups["laptops"]:
    product["image"] = "/assets/v20260822/images/buy_used/used_laptops_collection_main-513c937d.webp"

brand_groups = {
    "iphone": brand_iphones,
    "samsung": brand_samsung,
    "gaming": brand_gaming,
    "speakers": brand_speakers,
}

for rel in ("services/brand-new.html", "ar/services/brand-new.html"):
    path = ROOT / rel
    source = path.read_text(encoding="utf-8")
    for section_id, products in brand_groups.items():
        source = replace_section(source, section_id, "\n".join(card(p, "ar" if rel.startswith("ar/") else "en") for p in products))
    path.write_text(source, encoding="utf-8", newline="\n")

for rel in ("services/buy-used.html", "ar/services/buy-used.html"):
    path = ROOT / rel
    source = path.read_text(encoding="utf-8")
    labels = (
        (("href=\"#gaming\">كمبيوتر مكتبي</a>", "href=\"#gaming\">كمبيوتر وقطع</a>"),
         ("class=\"inventory-category-title\">كمبيوتر مكتبي مستعمل</h2>", "class=\"inventory-category-title\">كمبيوتر مكتبي وقطع مستعملة</h2>"),
         ('"name": "أجهزة كمبيوتر مكتبية مستعملة",', '"name": "أجهزة كمبيوتر مكتبية وقطع مستعملة",'))
        if rel.startswith("ar/") else
        (("href=\"#gaming\">Desktop PCs</a>", "href=\"#gaming\">PCs &amp; components</a>"),
         ("class=\"inventory-category-title\">Pre-Owned Desktop PCs</h2>", "class=\"inventory-category-title\">Pre-Owned Desktop PCs &amp; Components</h2>"),
         ('"name": "Used PCs",', '"name": "Used PCs and Components",'))
    )
    for old, new in labels:
        source = source.replace(old, new)
    for section_id, products in used_groups.items():
        source = replace_section(source, section_id, "\n".join(card(p, "ar" if rel.startswith("ar/") else "en") for p in products))
    path.write_text(source, encoding="utf-8", newline="\n")

feed_products = [p for group in (*brand_groups.values(), *used_groups.values()) for p in group if p["price"] is not None]

ET.register_namespace("g", "http://base.google.com/ns/1.0")
rss = ET.Element("rss", {"version": "2.0"})
channel = ET.SubElement(rss, "channel")
ET.SubElement(channel, "title").text = "P Z M Computers & Mobile Phones - Sell New Used PC Build Inventory"
ET.SubElement(channel, "link").text = SITE + "/"
ET.SubElement(channel, "description").text = "Current new and pre-owned device inventory in Al Barsha, Dubai; confirm availability before visiting."

def slugify(value):
    value = re.sub(r"[^a-z0-9]+", "-", value.lower())
    return value.strip("-")[:80]

for idx, p in enumerate(feed_products, 1):
    node = ET.SubElement(channel, "item")
    cond = "new" if p["condition"] == "new" else "used"
    prefix = "Brand-new" if cond == "new" else "Pre-owned"
    ET.SubElement(node, "{http://base.google.com/ns/1.0}id").text = f"{slugify(p['name'])}-{idx}-{cond}"
    ET.SubElement(node, "{http://base.google.com/ns/1.0}title").text = p["name"]
    ET.SubElement(node, "{http://base.google.com/ns/1.0}description").text = f"{prefix} {p['name']} available from our Al Barsha store. Confirm current stock before visiting."
    ET.SubElement(node, "{http://base.google.com/ns/1.0}link").text = SITE + p["href"]
    image = p["image"] if p["image"].startswith("http") else SITE + p["image"]
    ET.SubElement(node, "{http://base.google.com/ns/1.0}image_link").text = image
    ET.SubElement(node, "{http://base.google.com/ns/1.0}availability").text = "in_stock"
    ET.SubElement(node, "{http://base.google.com/ns/1.0}price").text = f"{p['price']:.2f} AED"
    ET.SubElement(node, "{http://base.google.com/ns/1.0}condition").text = cond
    ET.SubElement(node, "{http://base.google.com/ns/1.0}brand").text = brand_for(p["name"])
    ET.SubElement(node, "{http://base.google.com/ns/1.0}identifier_exists").text = "false"

tree = ET.ElementTree(rss)
ET.indent(tree, space="  ")
tree.write(ROOT / "product-feed.xml", encoding="UTF-8", xml_declaration=True)

print("brand-new website items:", sum(len(v) for v in brand_groups.values()))
print("used website items:", sum(len(v) for v in used_groups.values()))
print("merchant feed items:", len(feed_products))
