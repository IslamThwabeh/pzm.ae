# Generates 10 EN + 10 AR static blog articles and wires them into
# js/blog.js, sitemap.xml, js/navbar.js, and ar/blog/index.html.

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path "$PSScriptRoot\..").Path
$date = '2026-05-31'
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

function Write-Utf8 { param($Path,$Content)
    $dir = [System.IO.Path]::GetDirectoryName($Path)
    if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    [System.IO.File]::WriteAllText($Path,$Content,$utf8NoBom)
}

$articles = @(
@{ slug='iphone-17-vs-iphone-17-pro-dubai-2026'
   image='/images/buy_iphone/iPhone_17_Pro_all_colors.jpg'
   category_en='Buying'; category_ar='شراء'
   title_en='iPhone 17 vs iPhone 17 Pro in Dubai 2026: which should you buy?'
   title_ar='iPhone 17 مقابل iPhone 17 Pro في دبي 2026: أيّهما تشتري؟'
   desc_en='iPhone 17 vs iPhone 17 Pro in Dubai 2026 — AED price gap, what you actually get for the extra spend, and which model wins for most buyers.'
   desc_ar='iPhone 17 مقابل iPhone 17 Pro في دبي 2026 — فرق السعر بالدرهم، وما الذي تحصل عليه فعلاً مقابل الإضافة، وأي الجهازين الأنسب لمعظم المشترين.'
   money_en='/services/buy-iphone.html'; money_ar='/ar/services/buy-iphone.html'
   money_label_en='Check iPhone 17 availability'; money_label_ar='تحقّق من توفر iPhone 17'
   money_short_en='Buy iPhone'; money_short_ar='شراء iPhone'
   money_desc_en='Live AED prices, colors, and storage in stock at the Al Barsha store.'
   money_desc_ar='أسعار درهم مباشرة، ألوان، ومساحات متوفرة في متجر البرشاء.'
   sections_en=@(
     @{h='1) The AED price gap';p='In Dubai, the iPhone 17 starts around AED 3,200 while the iPhone 17 Pro starts around AED 4,600. That is a 1,400 AED gap before storage — about 44% more for the Pro. The question is whether the extra money buys something you will use every day.'},
     @{h='2) What you actually get on the Pro';p='Pro adds telephoto camera, ProMotion 120 Hz display, titanium frame, larger battery, and faster USB-C. For photographers, frequent travelers, and video shooters, those upgrades show every day. For everyone else, the regular iPhone 17 already gets the A-series chip, the same main camera sensor class, and a great OLED.'},
     @{h='3) The cameras — honest take';p='If you mostly shoot people, food, and short clips at arm length, the iPhone 17 main + ultrawide is plenty. The Pro telephoto is the real upgrade — 3x to 5x optical zoom changes how you shoot events, concerts, and travel. If you never zoom, do not pay for it.'},
     @{h='4) Display and feel';p='ProMotion 120 Hz on the Pro makes scrolling and gaming look smoother — once you use it, 60 Hz feels a step behind. Titanium also makes the Pro lighter than older Pro Max generations. Quality-of-life upgrades, not deal-breakers.'},
     @{h='5) Battery and longevity';p='Pro models historically last 1-2 hours longer per charge and resell stronger after 2-3 years. If you upgrade often, that resale gap matters. If you keep phones 4+ years, both will need a battery service eventually.'},
     @{h='6) Who should buy which';p='Buy <strong>iPhone 17</strong> if you want the best AED-per-feature value and do not zoom often. Buy <strong>iPhone 17 Pro</strong> if you photograph events, edit on the phone, or want the smoother 120 Hz screen. Pro Max only makes sense if battery life is the single most important spec for you.'}
   )
   sections_ar=@(
     @{h='1) فرق السعر بالدرهم';p='في دبي يبدأ iPhone 17 حوالي 3,200 درهم بينما iPhone 17 Pro حوالي 4,600 درهم. فرق 1,400 درهم قبل زيادة السعة — حوالي 44% زيادة لـ Pro. السؤال: هل تستحق هذه الإضافة لاستخدامك اليومي؟'},
     @{h='2) ما يضيفه Pro فعلياً';p='Pro يضيف كاميرا تيليفوتو، شاشة ProMotion 120 هرتز، إطار تيتانيوم، بطارية أكبر، و USB-C أسرع. للمصورين والمسافرين وصنّاع المحتوى تستحق هذه الترقيات. لمعظم الناس، iPhone 17 العادي يكفي.'},
     @{h='3) الكاميرات — رأي صادق';p='إذا تصوّر الناس والطعام بمسافة ذراع، كاميرتا iPhone 17 الأساسية والواسعة كافيتان. تيليفوتو Pro هي الفرق الحقيقي — تكبير بصري 3x إلى 5x يغيّر تجربة تصوير المناسبات والسفر.'},
     @{h='4) من يشتري ماذا';p='اشترِ <strong>iPhone 17</strong> إذا تريد أفضل قيمة بالدرهم ولا تستخدم التكبير. اشترِ <strong>iPhone 17 Pro</strong> إذا تصوّر مناسبات أو تريد شاشة 120 هرتز. Pro Max فقط إذا البطارية أهم مواصفة لك.'}
   )
   faq_en=@(
     @{q='Is the iPhone 17 Pro worth 1,400 AED more in Dubai?';a='Yes if you use the telephoto camera, value 120 Hz ProMotion, or upgrade every 2 years (better resale). For everyday users who do not zoom, the standard iPhone 17 gives you 90% of the experience for 70% of the price.'},
     @{q='What is the difference between iPhone 17 and iPhone 17 Pro cameras?';a='Both have the same main and ultrawide sensor class. The Pro adds a dedicated telephoto lens for 3x-5x optical zoom and stronger video features (ProRes, Log). If you never zoom past 2x, the standard iPhone 17 is plenty.'},
     @{q='Which iPhone 17 model has the best resale value in Dubai?';a='Historically Pro Max holds value best, followed by Pro, then standard. If you plan to upgrade in 2 years, the Pro tier loses fewer AED. If you keep for 4+ years, the standard iPhone 17 is the smarter purchase.'}
   )
   faq_ar=@(
     @{q='هل يستحق iPhone 17 Pro 1,400 درهم إضافية في دبي؟';a='نعم إذا تستخدم كاميرا التيليفوتو أو تقدّر ProMotion 120 هرتز أو تستبدل كل سنتين. لمستخدمي اليوم العادي، iPhone 17 يعطيك 90% من التجربة بـ 70% من السعر.'},
     @{q='أيّ iPhone 17 الأفضل في إعادة البيع بدبي؟';a='تاريخياً Pro Max يحتفظ بأفضل قيمة، ثم Pro، ثم العادي. إذا ستستبدل خلال سنتين، Pro يخسر دراهم أقل. إذا ستحتفظ 4+ سنوات، iPhone 17 العادي أذكى.'}
   )
},
@{ slug='best-used-iphone-students-dubai-2026'
   image='/images/buy_used/used_iphone_15_pro_max_main.webp'
   category_en='Used'; category_ar='مستعمل'
   title_en='Best used iPhone for students in Dubai 2026: 4 budget picks'
   title_ar='أفضل iPhone مستعمل للطلاب في دبي 2026: 4 خيارات بميزانية ذكية'
   desc_en='The best used iPhone for students in Dubai 2026 — 4 budget picks under 1,800 AED with battery, software runway, and where to buy with warranty.'
   desc_ar='أفضل iPhone مستعمل للطلاب في دبي 2026 — 4 خيارات بميزانية تحت 1,800 درهم مع البطارية ودعم البرمجيات وأين تشتري بضمان.'
   money_en='/services/buy-used.html'; money_ar='/ar/services/buy-used.html'
   money_label_en='See certified used iPhones'; money_label_ar='تصفّح iPhone المستعمل المختبر'
   money_short_en='Used iPhones'; money_short_ar='iPhone مستعمل'
   money_desc_en='Tested battery, original screen, and a 30-day written warranty on every unit.'
   money_desc_ar='بطارية مختبرة، شاشة أصلية، وضمان مكتوب 30 يوم على كل جهاز.'
   sections_en=@(
     @{h='Pick #1 — iPhone 13 128 GB (1,200–1,500 AED)';p='The smartest student spend in 2026. OLED, A15 chip, MagSafe, years of iOS update runway, and a battery cell that still hits a full school day. Aim for 85%+ battery health.'},
     @{h='Pick #2 — iPhone 12 128 GB (750–950 AED)';p='Same flat-edge design as the 15/16, OLED, 5G, MagSafe. The weak link is the older battery — either insist on 85%+ health or budget 220 AED for a fresh battery service.'},
     @{h='Pick #3 — iPhone 11 128 GB (550–750 AED)';p='The most popular student starter iPhone. A13 chip is still snappy, cameras are great for the price, and the battery cell is large. Tradeoffs: LCD screen, no 5G, no MagSafe.'},
     @{h='Pick #4 — iPhone SE 2022 (650–850 AED)';p='Only pick this if your student specifically wants a small phone with Touch ID. Battery and software runway are good; screen feels dated next to OLED models.'},
     @{h='What to skip';p='At student budgets, skip the iPhone XR, XS, X, 8, and 8 Plus. Battery cells are usually tired and Apple is running out of major iOS updates for these models. Also skip anything below 80% battery health unless the seller has already added a fresh battery.'},
     @{h='How we hand over a student iPhone';p='Every unit at our Al Barsha store passes a 4-point check: IMEI on Apple Check Coverage, battery health in Settings, original screen and Face/Touch ID verified, all ports + cameras + speakers tested. We also reset and prep the phone for Apple ID sign-in before you leave.'}
   )
   sections_ar=@(
     @{h='الخيار #1 — iPhone 13 سعة 128 (1,200–1,500 درهم)';p='أذكى صرف للطالب في 2026. شاشة OLED، شريحة A15، MagSafe، سنوات من دعم iOS، وبطارية تكفي يوماً دراسياً كاملاً. اطلب نسبة بطارية 85%+.'},
     @{h='الخيار #2 — iPhone 12 سعة 128 (750–950 درهم)';p='نفس تصميم 15/16، OLED، 5G، MagSafe. نقطة الضعف البطارية الأقدم — اطلب 85%+ أو احسب 220 درهم لخدمة بطارية.'},
     @{h='الخيار #3 — iPhone 11 سعة 128 (550–750 درهم)';p='أشهر بداية iPhone للطلاب. شريحة A13 سريعة، كاميرات ممتازة للسعر، بطارية كبيرة. مقابل: شاشة LCD، بدون 5G/MagSafe.'},
     @{h='ما يجب تجنّبه';p='في ميزانية الطالب، تجنّب iPhone XR / XS / X / 8 / 8 Plus — البطاريات متعبة وأبل تنهي دعم iOS الكبير لها. وتجنّب أي جهاز ببطارية أقل من 80%.'},
     @{h='كيف نسلّم iPhone للطلاب';p='كل جهاز في متجرنا بالبرشاء يمرّ بفحص 4 نقاط: IMEI على Apple Check Coverage، نسبة البطارية في الإعدادات، شاشة أصلية وFace/Touch ID مفحوصان، وجميع المنافذ والكاميرات والسماعات مختبرة.'}
   )
   faq_en=@(
     @{q='What is the best used iPhone for a university student in Dubai?';a='In 2026 the smartest student pick is an iPhone 13 128 GB at 1,200–1,500 AED — it has years of iOS support left, MagSafe, and a battery that lasts a full school day. If the budget is tighter, an iPhone 12 128 GB at 750–950 AED is the best value.'},
     @{q='Is 64 GB enough storage for a student iPhone?';a='No. Photos, university apps, ebooks, and a few videos fill 64 GB within a year and slow the phone down. Spend the extra 100–200 AED for a 128 GB unit — it lasts the full degree program comfortably.'},
     @{q='Should I buy a used iPhone from a classifieds site?';a='Risky. Classifieds are cheaper but you have no warranty if the battery dies or the screen turns out to be aftermarket. A reputable shop runs an IMEI check, verifies battery health, and offers a 30-day warranty — usually for only 50–100 AED more.'}
   )
   faq_ar=@(
     @{q='ما أفضل iPhone مستعمل لطالب جامعي في دبي؟';a='في 2026 الأذكى هو iPhone 13 سعة 128 بسعر 1,200–1,500 درهم — سنوات من دعم iOS، MagSafe، وبطارية تكفي يوماً كاملاً. للميزانية الأقل، iPhone 12 سعة 128 بسعر 750–950 درهم أفضل قيمة.'},
     @{q='هل سعة 64 جيجا تكفي لطالب؟';a='لا. الصور وتطبيقات الجامعة والكتب وبعض الفيديوهات تملأ 64 جيجا خلال سنة وتُبطئ الجهاز. ادفع 100–200 درهم إضافية لسعة 128.'}
   )
},
@{ slug='macbook-air-m4-vs-macbook-pro-m4-dubai-2026'
   image='/images/macbook/macbook_air_13_M4.png'
   category_en='MacBook'; category_ar='ماك بوك'
   title_en='MacBook Air M4 vs MacBook Pro M4 in Dubai 2026: who needs Pro?'
   title_ar='MacBook Air M4 مقابل MacBook Pro M4 في دبي 2026: من يحتاج Pro؟'
   desc_en='MacBook Air M4 vs MacBook Pro M4 in Dubai 2026 — AED price gap, who really needs the Pro display, and the cheaper Air spec that wins for most buyers.'
   desc_ar='MacBook Air M4 مقابل MacBook Pro M4 في دبي 2026 — فرق السعر بالدرهم، ومن يحتاج فعلاً شاشة Pro، ومواصفة Air الأرخص التي تكفي معظم المشترين.'
   money_en='/services/brand-new.html'; money_ar='/ar/services/brand-new.html'
   money_label_en='See current MacBook stock'; money_label_ar='تصفّح أجهزة MacBook المتوفرة'
   money_short_en='New MacBooks'; money_short_ar='ماك بوك جديد'
   money_desc_en='Live AED pricing for new MacBook Air and Pro at our Al Barsha store.'
   money_desc_ar='أسعار درهم مباشرة لـ MacBook Air و Pro الجديد في متجر البرشاء.'
   sections_en=@(
     @{h='1) The honest price gap';p='In Dubai, a base MacBook Air 13 M4 starts around AED 4,800 while a base MacBook Pro 14 M4 starts around AED 7,200 — a 2,400 AED gap. Move to M4 Pro and you are easily over AED 9,000. That extra spend has to be worth it.'},
     @{h='2) Who actually needs Pro';p='You need MacBook Pro M4 if you regularly export 4K video, run heavy Logic Pro sessions, compile large codebases, work in Xcode with large simulators, or push 3D rendering. The extra cores, more RAM ceiling, better cooling, and ProMotion display matter every single day for you.'},
     @{h='3) Who is being upsold to Pro';p='If your real use is browsing, email, Word/Excel/Keynote, light Photoshop, occasional Final Cut Express edits, and a lot of video calls — MacBook Air M4 with 16 GB RAM is faster than your old laptop and will stay relevant for 5+ years. You do not need Pro.'},
     @{h='4) The Air upgrade that matters most';p='Skip the base 8 GB / 256 GB Air — Apple now offers 16 GB / 256 GB at a small premium and it is the right starting spec for 2026. If you keep many tabs open or run virtualization, jump to 16 GB / 512 GB.'},
     @{h='5) Display, speakers, and ports';p='Pro wins on display (mini-LED, ProMotion 120 Hz, much brighter), speakers, and the extra HDMI/SD ports. If you connect to many external monitors and run on stage, those count. For a coffee-shop user, the Air display is excellent.'},
     @{h='6) Trade-in math from your old laptop';p='If you have an Intel MacBook or older Air, get a same-day trade-in quote on <a href="/services/sell-gadgets.html">our sell page</a>. A working 2020 MacBook Air typically takes 1,200–1,800 AED off the price of a new Air.'}
   )
   sections_ar=@(
     @{h='1) فرق السعر بالدرهم';p='في دبي يبدأ MacBook Air 13 M4 الجديد حوالي 4,800 درهم بينما MacBook Pro 14 M4 الجديد حوالي 7,200 درهم — فرق 2,400 درهم. M4 Pro يتجاوز 9,000 درهم بسهولة.'},
     @{h='2) من يحتاج Pro فعلاً';p='تحتاج MacBook Pro M4 إذا تصدّر فيديو 4K بانتظام، تشتغل جلسات Logic Pro ثقيلة، تترجم أكواد كبيرة، أو تعمل على Xcode بمحاكيات ضخمة. الأنوية الإضافية، سقف الـ RAM الأعلى، التبريد الأفضل، وشاشة ProMotion تهمّ كل يوم.'},
     @{h='3) من يتمّ إقناعه بـ Pro بلا داعٍ';p='إذا استخدامك تصفّح وبريد وOffice وفوتوشوب خفيف ومكالمات فيديو — MacBook Air M4 بـ 16 جيجا RAM أسرع من جهازك القديم ويبقى مناسباً 5+ سنوات. لا تحتاج Pro.'},
     @{h='4) ترقية Air الأهم';p='تجاوز Air الأساسي 8 جيجا / 256. Apple تعرض الآن 16 جيجا / 256 بفارق بسيط، وهذه البداية الصحيحة لـ 2026. إذا تفتح تبويبات كثيرة أو تشغّل أنظمة افتراضية، اقفز إلى 16 جيجا / 512.'},
     @{h='5) حساب الاستبدال';p='إذا عندك MacBook قديم أو Air أقدم، احصل على عرض استبدال في نفس اليوم. MacBook Air 2020 شغّال يخفّض عادةً 1,200–1,800 درهم من سعر Air الجديد.'}
   )
   faq_en=@(
     @{q='Is MacBook Air M4 fast enough for video editing in 2026?';a='Yes for 1080p and short 4K projects in Final Cut Pro or DaVinci Resolve — especially with 16 GB RAM. For long-form 4K, multi-cam ProRes, or 8K, the Pro M4 is the right tool because of cooling, more RAM, and ProMotion display.'},
     @{q='How much RAM should a MacBook Air have in Dubai 2026?';a='16 GB is the right baseline. 8 GB is fine for very light use but slows down within 2-3 years as software gets heavier. Pay the small premium for 16 GB — it adds 4-5 years of useful life.'},
     @{q='Is buying a MacBook in Dubai cheaper than online?';a='Often yes when you factor in 5% VAT, shipping, customs risk, and AppleCare access. Apple AE prices are competitive, and authorized dealers like P Z M provide local warranty and same-day pickup.'}
   )
   faq_ar=@(
     @{q='هل MacBook Air M4 سريع كفاية لتحرير الفيديو في 2026؟';a='نعم لـ 1080p ومشاريع 4K قصيرة في Final Cut Pro أو DaVinci Resolve — خاصةً مع 16 جيجا RAM. للـ 4K الطويل أو متعدد الكاميرات أو 8K، Pro M4 هو الأداة الصحيحة.'},
     @{q='كم RAM يجب أن يكون في MacBook Air في دبي 2026؟';a='16 جيجا هي البداية الصحيحة. 8 جيجا تكفي للاستخدام الخفيف جداً لكن تتباطأ خلال 2-3 سنوات. ادفع الفرق البسيط لـ 16 جيجا — يضيف 4-5 سنوات من العمر المفيد.'}
   )
},
@{ slug='used-macbook-air-vs-new-macbook-air-dubai-2026'
   image='/images/macbook/macbook_air_13_M4.png'
   category_en='Used'; category_ar='مستعمل'
   title_en='Used MacBook Air vs new MacBook Air in Dubai 2026: real AED math'
   title_ar='MacBook Air مستعمل أم جديد في دبي 2026: حساب درهمي حقيقي'
   desc_en='Used MacBook Air vs new MacBook Air in Dubai 2026 — real AED gap by model, battery and software runway, and when used is the smarter buy.'
   desc_ar='MacBook Air مستعمل أم جديد في دبي 2026 — فرق الدرهم الحقيقي حسب الموديل، البطارية ودعم البرمجيات، ومتى يكون المستعمل الخيار الأذكى.'
   money_en='/services/buy-used.html'; money_ar='/ar/services/buy-used.html'
   money_label_en='Browse used MacBook Air stock'; money_label_ar='تصفّح MacBook Air المستعمل'
   money_short_en='Used MacBook'; money_short_ar='ماك بوك مستعمل'
   money_desc_en='Verified battery health, clean SSD, and a 30-day warranty on every unit.'
   money_desc_ar='بطارية مختبرة، SSD نظيف، وضمان 30 يوم على كل جهاز.'
   sections_en=@(
     @{h='1) New Air M4 in 2026 — the AED baseline';p='A new MacBook Air 13 M4 with 16 GB RAM and 256 GB SSD lands around AED 5,200 at Apple AE. With 512 GB SSD, plan AED 5,900. That is the number to compare every used option against.'},
     @{h='2) Used MacBook Air M2 (2022) — best AED-per-performance';p='In 2026 a clean used MacBook Air M2 13 with 8 GB / 256 GB sits around 2,400–2,800 AED. With 16 GB / 512 GB, around 3,200–3,600 AED. You save roughly 2,200–2,500 AED for a laptop that still feels modern, runs the latest macOS, and has 4-5 more years of update runway.'},
     @{h='3) Used MacBook Air M1 (2020) — extreme value';p='M1 Airs are now 1,800–2,300 AED for an 8 GB / 256 GB unit with healthy battery. Performance is still excellent for daily work, students, and writers. Tradeoffs: older design, 60 Hz screen, no MagSafe, and one less macOS update cycle than M2.'},
     @{h='4) When new wins';p='Pay for new Air M4 if you depend on AppleCare, want the brightest screen, plan to keep the laptop 6+ years, or run heavier workloads that benefit from M4 vs M2. A new M4 also has full 1-year warranty and the latest port speeds.'},
     @{h='5) When used wins';p='Pick used if your budget is under 3,500 AED, you want maximum AED-per-feature, or you are buying for a student/secondary use. A 30-day warranty plus a free battery health check covers the realistic risk.'},
     @{h='6) Trade-in to shrink the gap';p='If you already own a laptop, do not skip a trade-in. Even a 2018 Intel MacBook Air in working condition takes 600–1,000 AED off either new or used. <a href="/services/sell-gadgets.html">Get a same-day quote</a> before you commit.'}
   )
   sections_ar=@(
     @{h='1) Air M4 الجديد في 2026 — السعر المرجعي';p='MacBook Air 13 M4 جديد بـ 16 جيجا / 256 جيجا يصل حوالي 5,200 درهم في Apple AE. مع 512 جيجا حوالي 5,900 درهم. هذا الرقم الذي نقارن به كل خيار مستعمل.'},
     @{h='2) MacBook Air M2 المستعمل — أفضل قيمة';p='في 2026 جهاز Air M2 13 مستعمل نظيف بـ 8 جيجا / 256 يكون 2,400–2,800 درهم. بـ 16 جيجا / 512 حوالي 3,200–3,600 درهم. توفّر 2,200–2,500 درهم لجهاز يبدو حديثاً ولديه 4-5 سنوات دعم.'},
     @{h='3) MacBook Air M1 المستعمل — قيمة قصوى';p='أجهزة M1 الآن 1,800–2,300 درهم لـ 8 جيجا / 256 ببطارية صحية. الأداء ممتاز للعمل اليومي والطلاب. مقابل: تصميم أقدم، شاشة 60 هرتز، بدون MagSafe.'},
     @{h='4) متى يفوز الجديد';p='ادفع الجديد إذا تعتمد على AppleCare، تريد أسطع شاشة، ستحتفظ 6+ سنوات، أو تشغّل أحمال أثقل تستفيد من M4 مقابل M2.'},
     @{h='5) متى يفوز المستعمل';p='اختر المستعمل إذا ميزانيتك تحت 3,500 درهم، تريد أفضل قيمة بالدرهم، أو تشتري لطالب/استخدام ثانوي. ضمان 30 يوم وفحص بطارية مجاني يغطّيان المخاطرة الواقعية.'}
   )
   faq_en=@(
     @{q='Is a used MacBook Air M2 better value than a new MacBook Air M4 in Dubai?';a='For most buyers in 2026, yes. Used M2 (16 GB / 512 GB) sits around 3,200–3,600 AED with a 30-day warranty, while a comparable new M4 is around 5,900 AED. You save 2,300 AED for a laptop that easily lasts 4-5 more years.'},
     @{q='How long will a used MacBook Air M1 keep getting macOS updates?';a='Apple typically supports M1 Macs for at least 6-7 years of major macOS releases from launch (2020), so plan on updates through roughly 2027-2028. After that, security patches usually continue for 2 more years.'},
     @{q='What should I check before buying a used MacBook Air in Dubai?';a='Battery cycle count (under 500 is good), Activation Lock disabled, no liquid damage in the corners, keyboard and trackpad fully responsive, and the display has no backlight bleed or dead pixels. A trusted shop confirms all this in writing.'}
   )
   faq_ar=@(
     @{q='هل MacBook Air M2 المستعمل قيمة أفضل من Air M4 الجديد في دبي؟';a='لمعظم المشترين في 2026 نعم. M2 مستعمل (16 جيجا / 512) حوالي 3,200–3,600 درهم بضمان 30 يوم، بينما M4 مماثل جديد حوالي 5,900 درهم. توفّر 2,300 درهم لجهاز يدوم 4-5 سنوات بسهولة.'},
     @{q='ماذا أفحص قبل شراء MacBook Air مستعمل في دبي؟';a='عدد دورات البطارية (تحت 500 جيد)، Activation Lock معطّل، لا أثر سوائل في الزوايا، لوحة المفاتيح ولوحة اللمس تستجيب بالكامل، والشاشة بدون تسرّب إضاءة أو بكسلات ميتة.'}
   )
},
@{ slug='best-gaming-pc-under-5000-aed-dubai-2026'
   image='/images/blog/how-to-choose-perfect-gaming-pc-build.jpg'
   category_en='Gaming PC'; category_ar='Gaming PC'
   title_en='Best gaming PC under 5,000 AED in Dubai 2026: 1080p high-refresh build'
   title_ar='أفضل تجميع Gaming PC تحت 5,000 درهم في دبي 2026: بناء 1080p بمعدّل تحديث عالٍ'
   desc_en='Best gaming PC under 5,000 AED in Dubai 2026 — a real 1080p high-refresh parts list, AED breakdown, and what to upgrade later.'
   desc_ar='أفضل تجميع Gaming PC تحت 5,000 درهم في دبي 2026 — قائمة قطع حقيقية لـ 1080p بمعدّل تحديث عالٍ، توزيع السعر، وما يمكن ترقيته لاحقاً.'
   money_en='/services/gaming-pc.html'; money_ar='/ar/services/gaming-pc.html'
   money_label_en='Quote this 5,000 AED build'; money_label_ar='اطلب سعر هذا التجميع'
   money_short_en='Gaming PC build'; money_short_ar='تجميع PC'
   money_desc_en='Send your monitor and games and we lock the parts list before you visit.'
   money_desc_ar='أرسل شاشتك وألعابك ونثبّت قائمة القطع قبل الزيارة.'
   sections_en=@(
     @{h='1) Who this build is for';p='You want 1080p high-refresh (144 Hz+) gaming on titles like Valorant, Apex, Fortnite, Warzone, CS2, and most AAA games at high settings. The build is balanced — no single bottleneck — and leaves a clear upgrade path for 1440p later.'},
     @{h='2) The parts list (~4,800 AED)';p='CPU: Ryzen 5 7600 (~750). Motherboard: B650 ATX (~650). RAM: 32 GB DDR5 6000 MT/s (~520). GPU: RTX 5060 Ti 8 GB or RX 7700 XT (~1,800). SSD: 1 TB Gen4 NVMe (~280). PSU: 750 W 80+ Gold (~360). Case: solid airflow mid-tower (~280). Cooler: tower air cooler (~160). Total: ~4,800 AED before assembly.'},
     @{h='3) Why these parts';p='Ryzen 5 7600 is the value king for 1080p — it does not bottleneck the GPU and leaves an AM5 upgrade path to Ryzen 9000 later. 32 GB DDR5 is now the right baseline for modern games. The RTX 5060 Ti / RX 7700 XT class is the sweet spot for 144 Hz at 1080p high.'},
     @{h='4) What we deliberately skipped';p='No RGB tax, no AIO liquid cooling at this budget (air cooler is plenty for Ryzen 5), no Wi-Fi 7 board (Wi-Fi 6 is fine), no 1 TB Gen5 SSD (Gen4 saturates SATA and HDD for storage). These trims keep the focus on FPS-per-dirham.'},
     @{h='5) Performance you should expect';p='Valorant / CS2: 300+ FPS at 1080p. Apex / Warzone: 165+ FPS competitive settings. AAA titles (Cyberpunk, Starfield) at 1080p high: stable 80-110 FPS with DLSS/FSR. 1440p ultra is possible but you will tweak settings.'},
     @{h='6) The upgrade path';p='Year 2: drop in a Ryzen 7 9700X3D for big AAA gains. Year 3: upgrade GPU to the next-gen 70-class card to push 1440p. The PSU, case, RAM, and storage all stay. This is the cheapest way to spread spend over time.'}
   )
   sections_ar=@(
     @{h='1) لمن هذا التجميع';p='تريد ألعاب 1080p بمعدل تحديث عالٍ (144 هرتز+) على Valorant و Apex و Fortnite و Warzone و CS2 ومعظم ألعاب AAA بإعدادات عالية. التجميع متوازن مع طريق ترقية واضح لـ 1440p لاحقاً.'},
     @{h='2) قائمة القطع (~4,800 درهم)';p='CPU: Ryzen 5 7600 (~750). لوحة: B650 ATX (~650). RAM: 32 جيجا DDR5 6000 (~520). GPU: RTX 5060 Ti أو RX 7700 XT (~1,800). SSD: 1 تيرا Gen4 (~280). PSU: 750W Gold (~360). كيس + مبرد (~440). المجموع: ~4,800 درهم قبل التركيب.'},
     @{h='3) لماذا هذه القطع';p='Ryzen 5 7600 ملك القيمة لـ 1080p — لا يخنق GPU ويترك ترقية AM5 لـ Ryzen 9000 لاحقاً. 32 جيجا DDR5 هي البداية الصحيحة. فئة RTX 5060 Ti / RX 7700 XT هي أفضل اختيار لـ 144 هرتز 1080p.'},
     @{h='4) الأداء المتوقع';p='Valorant / CS2: 300+ FPS بـ 1080p. Apex / Warzone: 165+ FPS تنافسي. ألعاب AAA (Cyberpunk, Starfield) بـ 1080p عالٍ: 80-110 FPS مستقر مع DLSS/FSR.'},
     @{h='5) طريق الترقية';p='السنة 2: ترقية لـ Ryzen 7 9700X3D لمكاسب AAA كبيرة. السنة 3: ترقية GPU لجيل قادم لدفع 1440p. PSU والكيس والـ RAM والتخزين تبقى. هذا أرخص طريق لتوزيع المصاريف على الوقت.'}
   )
   faq_en=@(
     @{q='Can a gaming PC under 5,000 AED really run 1440p in Dubai 2026?';a='At 1440p high settings with DLSS/FSR upscaling, yes for many games — but you will sacrifice some FPS in newest AAA titles. The build is designed and tuned for 1080p high-refresh first; 1440p is a bonus.'},
     @{q='Should I buy parts and assemble myself or order pre-built in Dubai?';a='If you have built before and source parts smartly, DIY saves 200-400 AED. For first-time builders, a pre-built or shop-assembled PC adds proper cable management, thermal paste, stress testing, and warranty on the whole system — usually worth 300-500 AED.'},
     @{q='What is the most important upgrade after a year on this build?';a='Almost always the GPU. CPU and RAM age slower than GPUs in gaming. Plan for a GPU upgrade in 18-24 months and the rest of the build will carry you 4-5 more years.'}
   )
   faq_ar=@(
     @{q='هل تجميع تحت 5,000 درهم يشغّل 1440p في دبي 2026؟';a='بإعدادات 1440p عالية مع DLSS/FSR نعم لكثير من الألعاب — لكن ستخسر FPS في أحدث ألعاب AAA. التجميع مصمم لـ 1080p بمعدل تحديث عالٍ أولاً؛ 1440p مكافأة.'},
     @{q='ما أهم ترقية بعد سنة من هذا التجميع؟';a='دائماً تقريباً GPU. CPU و RAM يتقادمان أبطأ من GPU في الألعاب. خطط لترقية GPU خلال 18-24 شهر وباقي التجميع يحملك 4-5 سنوات إضافية.'}
   )
},
@{ slug='best-gaming-pc-under-8000-aed-dubai-2026'
   image='/images/blog/how-to-choose-perfect-gaming-pc-build.jpg'
   category_en='Gaming PC'; category_ar='Gaming PC'
   title_en='Best gaming PC under 8,000 AED in Dubai 2026: real 1440p ultra build'
   title_ar='أفضل تجميع Gaming PC تحت 8,000 درهم في دبي 2026: بناء 1440p بإعدادات Ultra'
   desc_en='Best gaming PC under 8,000 AED in Dubai 2026 — proper 1440p ultra parts list, AED breakdown, and where to spend or save.'
   desc_ar='أفضل تجميع Gaming PC تحت 8,000 درهم في دبي 2026 — قائمة قطع 1440p Ultra، توزيع السعر، وأين تصرف وأين توفّر.'
   money_en='/services/gaming-pc.html'; money_ar='/ar/services/gaming-pc.html'
   money_label_en='Quote this 8,000 AED build'; money_label_ar='اطلب سعر هذا التجميع'
   money_short_en='Gaming PC build'; money_short_ar='تجميع PC'
   money_desc_en='Send your monitor and games and we tune the parts list to your titles.'
   money_desc_ar='أرسل شاشتك وألعابك ونعدّل قائمة القطع حسب ألعابك.'
   sections_en=@(
     @{h='1) Who this build is for';p='You want true 1440p ultra at 100+ FPS in modern AAA games, ray tracing on in supported titles, and headroom for AAA releases through 2027. This is also a great content creation box for streaming and 1080p/4K editing.'},
     @{h='2) The parts list (~7,800 AED)';p='CPU: Ryzen 7 9700X or 7700X (~1,150). Motherboard: B650E or X670 ATX (~850). RAM: 32 GB DDR5 6000 CL30 (~580). GPU: RTX 5070 Ti or RX 9070 XT (~3,400). SSD: 2 TB Gen4 NVMe (~520). PSU: 850 W 80+ Gold (~480). Case: airflow ATX (~360). Cooler: 240 mm AIO or premium air (~440). Total: ~7,780 AED.'},
     @{h='3) Where the budget goes';p='Roughly 44% of the build is GPU. That is correct — at 1440p ultra, the GPU sets your ceiling. Do not be tempted to spend less on GPU to add RGB, faster RAM, or Gen5 SSD; you will regret it within 6 months.'},
     @{h='4) Why not just buy an RTX 5080';p='RTX 5080 adds 1,800-2,200 AED for roughly 25% more performance at 1440p. At this resolution you do not see the full benefit. If you mainly play at 1440p, stay with the 5070 Ti / 9070 XT tier and put the savings into a better monitor.'},
     @{h='5) The monitor decision';p='Pair this PC with a 27-32 inch 1440p OLED or QD-OLED panel at 165-240 Hz. Budget 1,800-2,800 AED. A bad monitor will hide what this build can do. We carry several options at the store.'},
     @{h='6) Future upgrade path';p='AM5 motherboard means you can drop in Ryzen 9 9950X3D later without changing anything else. The 850 W PSU has headroom for next-gen GPUs. The case and cooling are sized for 2028-era hardware. You are not buying a 2026 PC — you are buying a 5-year platform.'}
   )
   sections_ar=@(
     @{h='1) لمن هذا التجميع';p='تريد 1440p ultra حقيقية بـ 100+ FPS في ألعاب AAA الحديثة، مع Ray Tracing مفعّل، وهامش للألعاب القادمة حتى 2027. هذا أيضاً جهاز ممتاز لصناعة المحتوى والبث وتحرير 1080p/4K.'},
     @{h='2) قائمة القطع (~7,800 درهم)';p='CPU: Ryzen 7 9700X أو 7700X (~1,150). لوحة B650E أو X670 (~850). RAM: 32 جيجا DDR5 6000 CL30 (~580). GPU: RTX 5070 Ti أو RX 9070 XT (~3,400). SSD: 2 تيرا Gen4 (~520). PSU: 850W Gold (~480). كيس + AIO 240 (~800). المجموع: ~7,780 درهم.'},
     @{h='3) أين تذهب الميزانية';p='حوالي 44% من التجميع لـ GPU. هذا صحيح — في 1440p ultra الـ GPU هو السقف. لا تنخدع بصرف أقل على GPU لإضافة RGB أو RAM أسرع أو SSD Gen5؛ ستندم خلال 6 أشهر.'},
     @{h='4) لماذا ليس RTX 5080';p='RTX 5080 يضيف 1,800-2,200 درهم لزيادة 25% بالأداء في 1440p. في هذه الدقة لن ترى الفائدة الكاملة. ابقَ على فئة 5070 Ti / 9070 XT واستثمر الفرق في شاشة أفضل.'},
     @{h='5) قرار الشاشة';p='اقرن هذا الجهاز بشاشة OLED أو QD-OLED 27-32 إنش بدقة 1440p ومعدل 165-240 هرتز. الميزانية 1,800-2,800 درهم. شاشة سيئة ستخفي ما يستطيع هذا التجميع فعله.'}
   )
   faq_en=@(
     @{q='Is RTX 5070 Ti enough for 1440p ultra in 2026?';a='Yes. RTX 5070 Ti delivers 100+ FPS at 1440p ultra in most AAA titles and 144+ FPS with DLSS 4 enabled. It is the current sweet spot for 1440p high-refresh.'},
     @{q='Can this build do 4K gaming?';a='Yes for esports titles and most AAA games at 4K high (60-90 FPS, with upscaling for newest titles). For true 4K ultra at 100+ FPS you would step up to RTX 5080 and an extra 1,800 AED.'},
     @{q='Should I go AMD or Intel CPU for an 8,000 AED gaming build in Dubai?';a='AMD AM5 (Ryzen 7 9700X / 7700X) is the better choice in 2026 because the platform supports drop-in upgrades to Ryzen 9000 X3D chips. Intel Arrow Lake performs similarly but the LGA1851 upgrade path is less proven.'}
   )
   faq_ar=@(
     @{q='هل RTX 5070 Ti كافٍ لـ 1440p ultra في 2026؟';a='نعم. يحقق 100+ FPS بـ 1440p ultra في معظم ألعاب AAA و 144+ FPS مع DLSS 4. هي النقطة المثلى الحالية لـ 1440p بمعدل تحديث عالٍ.'},
     @{q='هل يستطيع هذا التجميع تشغيل 4K؟';a='نعم لألعاب الرياضات الإلكترونية ومعظم ألعاب AAA بـ 4K عالٍ (60-90 FPS مع upscaling). للـ 4K ultra الحقيقي بـ 100+ FPS، اقفز إلى RTX 5080 و 1,800 درهم إضافية.'}
   )
},
@{ slug='ps5-pro-vs-ps5-slim-dubai-2026'
   image='/images/PS5/WhitePS5.jpg'
   category_en='Gaming'; category_ar='ألعاب'
   title_en='PS5 Pro vs PS5 Slim in Dubai 2026: is the upgrade worth 1,200 AED?'
   title_ar='PS5 Pro مقابل PS5 Slim في دبي 2026: هل تستحق الترقية 1,200 درهم؟'
   desc_en='PS5 Pro vs PS5 Slim in Dubai 2026 — AED price gap, real-world performance, and which model is the right buy for your TV and budget.'
   desc_ar='PS5 Pro مقابل PS5 Slim في دبي 2026 — فرق السعر بالدرهم، الأداء الواقعي، وأي الجهازين الأنسب لشاشتك وميزانيتك.'
   money_en='/services/brand-new.html'; money_ar='/ar/services/brand-new.html'
   money_label_en='See PS5 models in stock'; money_label_ar='تصفّح موديلات PS5 المتوفرة'
   money_short_en='New PS5'; money_short_ar='PS5 جديد'
   money_desc_en='Live AED pricing for PS5 Slim and Pro at our Al Barsha store.'
   money_desc_ar='أسعار درهم مباشرة لـ PS5 Slim و Pro في متجر البرشاء.'
   sections_en=@(
     @{h='1) The price gap in Dubai';p='PS5 Slim disc edition lands around AED 2,000-2,200 in 2026. PS5 Pro sits around AED 3,200-3,400 — a 1,200 AED gap, before you add controllers or a disc drive. Worth it? Depends on your TV and how you play.'},
     @{h='2) What PS5 Pro actually adds';p='Pro brings a roughly 45% GPU uplift, faster ray tracing, AI upscaling (PSSR) that takes 1080p/1440p renders up to a cleaner 4K, and a faster SSD. On supported titles you get higher framerate at the same fidelity, or higher fidelity at the same framerate.'},
     @{h='3) Your TV decides this';p='If you game on a 1080p or 1440p TV/monitor, do not buy Pro — you will not see the upscaling and ray-tracing gains. If you have a real 4K 120 Hz HDR TV or OLED, Pro shows its money every single session.'},
     @{h='4) The games where Pro matters';p='Ratchet & Clank, Spider-Man 2, Horizon, Final Fantasy, Alan Wake 2, and most upcoming AAA titles patched for Pro. Sports and indie titles see less benefit.'},
     @{h='5) Slim is still excellent in 2026';p='PS5 Slim is the same generation, plays the same games, supports the same accessories, and runs everything at 4K 60 FPS in performance mode. For most players in Dubai, Slim is the smart purchase and saves you 1,200 AED for games and a second controller.'},
     @{h='6) Bundle math';p='Pair either with a DualSense Edge or extra DualSense, charging dock, and 2 launch games — that bundle on Slim is often cheaper than Pro alone. Check our <a href="/services/accessories.html">accessories page</a> for current bundles.'}
   )
   sections_ar=@(
     @{h='1) فرق السعر في دبي';p='PS5 Slim disc يصل حوالي 2,000-2,200 درهم في 2026. PS5 Pro حوالي 3,200-3,400 درهم — فرق 1,200 درهم قبل إضافة محرّك الأقراص أو يد إضافية. هل يستحق؟ يعتمد على شاشتك.'},
     @{h='2) ما يضيفه PS5 Pro فعلياً';p='Pro يضيف زيادة 45% بقوة GPU، Ray Tracing أسرع، تكبير AI (PSSR) يرفع 1080p/1440p إلى 4K أنظف، و SSD أسرع. على الألعاب المدعومة تحصل على FPS أعلى بنفس الجودة، أو جودة أعلى بنفس FPS.'},
     @{h='3) شاشتك تقرّر';p='إذا تلعب على شاشة 1080p أو 1440p لا تشترِ Pro — لن ترى مكاسب التكبير والـ Ray Tracing. إذا عندك تلفاز 4K 120 هرتز HDR حقيقي أو OLED، Pro يثبت قيمته كل جلسة.'},
     @{h='4) Slim لا يزال ممتازاً في 2026';p='PS5 Slim نفس الجيل، يلعب نفس الألعاب، يدعم نفس الإكسسوارات، ويشغّل كل شيء بـ 4K 60 FPS في وضع الأداء. لمعظم اللاعبين في دبي، Slim هو الشراء الذكي ويوفّر 1,200 درهم للألعاب ويد ثانية.'}
   )
   faq_en=@(
     @{q='Is PS5 Pro worth 1,200 AED more than PS5 Slim in Dubai?';a='Only if you have a 4K 120 Hz HDR TV (ideally OLED or QD-OLED) and play single-player AAA titles patched for Pro. On a 1080p or 1440p screen, you will not see the benefit — buy the Slim and put the 1,200 AED into games and accessories.'},
     @{q='Does PS5 Pro have a disc drive?';a='No. PS5 Pro is digital only — the disc drive is a separate accessory at around AED 350. Factor that in if you want physical games or want to play your existing PS4 disc library.'},
     @{q='Will my PS5 games run better on PS5 Pro automatically?';a='Only if the game has a Pro patch. Many top titles have one (Spider-Man 2, Horizon, Hogwarts Legacy, Final Fantasy, etc.) but not all. Unpatched games run the same as on Slim.'}
   )
   faq_ar=@(
     @{q='هل PS5 Pro يستحق 1,200 درهم أكثر من PS5 Slim في دبي؟';a='فقط إذا عندك تلفاز 4K 120 هرتز HDR (الأفضل OLED أو QD-OLED) وتلعب ألعاب AAA فردية مدعومة بـ Pro. على شاشة 1080p أو 1440p لن ترى الفائدة — اشترِ Slim واستثمر الـ 1,200 درهم في الألعاب.'},
     @{q='هل PS5 Pro فيه محرّك أقراص؟';a='لا. PS5 Pro رقمي فقط — محرّك الأقراص إكسسوار منفصل بحوالي 350 درهم. احسب ذلك إذا تريد ألعاب فيزيائية.'}
   )
},
@{ slug='nintendo-switch-2-dubai-2026'
   image='/images/brand_new/nintendo_switch.webp'
   category_en='Gaming'; category_ar='ألعاب'
   title_en='Nintendo Switch 2 in Dubai 2026: AED pricing, availability, who should buy'
   title_ar='Nintendo Switch 2 في دبي 2026: السعر بالدرهم، التوفر، ومن الأنسب للشراء'
   desc_en='Nintendo Switch 2 in Dubai 2026 — AED pricing, availability at retail, how it compares to the original, and who should upgrade now.'
   desc_ar='Nintendo Switch 2 في دبي 2026 — السعر بالدرهم، التوفر، مقارنة مع الأصلي، ومن الأنسب للترقية الآن.'
   money_en='/services/brand-new.html'; money_ar='/ar/services/brand-new.html'
   money_label_en='Check Switch 2 availability'; money_label_ar='تحقّق من توفر Switch 2'
   money_short_en='New Switch 2'; money_short_ar='Switch 2 جديد'
   money_desc_en='Live AED pricing and game bundles at our Al Barsha store.'
   money_desc_ar='أسعار درهم مباشرة وحزم ألعاب في متجر البرشاء.'
   sections_en=@(
     @{h='1) The Switch 2 AED price';p='Nintendo Switch 2 lands in Dubai around AED 1,700-1,900 standalone, with launch-game bundles in the AED 2,000-2,200 range. Compare to the original Switch OLED at AED 1,200-1,400 — the gap is 500-600 AED for a much more capable console.'},
     @{h='2) What Switch 2 adds';p='Bigger LCD screen, much stronger GPU, 4K via dock to TV, smoother third-party AAA ports, backward compatibility with most original Switch games, and improved Joy-Con 2 with magnetic attachment. Battery life is roughly similar in real-world play.'},
     @{h='3) Who should upgrade';p='You should upgrade if you have an original launch Switch with a tired battery, you play a lot of third-party games (where Switch 1 struggles), or you connect to a 4K TV often. If you have an OLED model and mostly play first-party Nintendo titles handheld, you can wait.'},
     @{h='4) Family math';p='For families with kids, Switch 2 is the better long-term buy — it will receive games for the next 6-7 years. If your kids are young, an OLED Switch 1 plus 3 games may still be the smarter spend for now.'},
     @{h='5) Game library at launch';p='Mario Kart, Zelda Tears of the Kingdom enhanced edition, and a strong first-party slate. Most original Switch games run with better framerate and resolution on Switch 2 without buying new versions.'},
     @{h='6) Accessories to plan for';p='Microsd Express (Switch 2 requires the new card class for full speed), screen protector, carrying case, and a second controller. Plan 300-450 AED extra on launch day.'}
   )
   sections_ar=@(
     @{h='1) سعر Switch 2 بالدرهم';p='Nintendo Switch 2 يصل دبي حوالي 1,700-1,900 درهم بمفرده، وحزم ألعاب الإطلاق بين 2,000-2,200 درهم. مقارنةً بـ Switch OLED الأصلي بـ 1,200-1,400 درهم — الفرق 500-600 درهم لجهاز أقوى بكثير.'},
     @{h='2) ما يضيفه Switch 2';p='شاشة LCD أكبر، GPU أقوى بكثير، 4K عبر الـ Dock للتلفاز، أداء أنعم لألعاب الطرف الثالث AAA، توافق رجعي مع معظم ألعاب Switch الأصلي، و Joy-Con 2 محسّن بربط مغناطيسي.'},
     @{h='3) من يستحق الترقية';p='يجب الترقية إذا عندك Switch إطلاق ببطارية متعبة، تلعب كثيراً ألعاب الطرف الثالث، أو تتصل بتلفاز 4K. إذا عندك OLED وتلعب ألعاب Nintendo الأولى يدوياً، يمكنك الانتظار.'},
     @{h='4) حساب العائلة';p='للعائلات مع أطفال، Switch 2 الشراء الأفضل بعيد المدى — سيستقبل ألعاباً 6-7 سنوات قادمة. إذا الأطفال صغار، Switch OLED مع 3 ألعاب قد يكون أذكى الآن.'},
     @{h='5) الإكسسوارات';p='بطاقة Microsd Express (Switch 2 يحتاج فئة البطاقة الجديدة)، واقي شاشة، حقيبة، ويد ثانية. خطط لـ 300-450 درهم إضافية يوم الإطلاق.'}
   )
   faq_en=@(
     @{q='How much is Nintendo Switch 2 in Dubai 2026?';a='Standalone around AED 1,700-1,900. Bundles with a launch game sit at AED 2,000-2,200. Prices vary by retailer and stock — at P Z M we publish live pricing on the brand-new page.'},
     @{q='Are Switch 1 games compatible with Switch 2?';a='Yes, the vast majority of physical and digital Switch 1 games run on Switch 2 with better performance and resolution. A small number of accessories may not work — check official compatibility lists before transferring.'},
     @{q='Should I sell my original Switch when I buy Switch 2?';a='If it is in good condition with a healthy battery, yes — a Switch OLED can fetch 700-900 AED on trade-in. Use that toward Switch 2. Visit our sell-gadgets page for a same-day quote.'}
   )
   faq_ar=@(
     @{q='كم سعر Nintendo Switch 2 في دبي 2026؟';a='بمفرده حوالي 1,700-1,900 درهم. حزم مع لعبة إطلاق 2,000-2,200 درهم. الأسعار تتفاوت حسب البائع — في P Z M ننشر سعر مباشر على صفحة الأجهزة الجديدة.'},
     @{q='هل ألعاب Switch 1 تعمل على Switch 2؟';a='نعم، الغالبية العظمى من ألعاب Switch 1 الفيزيائية والرقمية تعمل على Switch 2 بأداء ودقة أفضل. عدد قليل من الإكسسوارات قد لا يعمل.'}
   )
},
@{ slug='samsung-galaxy-s25-vs-iphone-17-dubai-2026'
   image='/images/brand_new/samsung_a56_5g.webp'
   category_en='Buying'; category_ar='شراء'
   title_en='Samsung Galaxy S25 vs iPhone 17 in Dubai 2026: honest cross-shop'
   title_ar='Samsung Galaxy S25 مقابل iPhone 17 في دبي 2026: مقارنة صادقة'
   desc_en='Samsung Galaxy S25 vs iPhone 17 in Dubai 2026 — AED price, cameras, battery, software runway, and which is the right buy for you.'
   desc_ar='Samsung Galaxy S25 مقابل iPhone 17 في دبي 2026 — السعر بالدرهم، الكاميرات، البطارية، دعم البرمجيات، وأيّهما الأنسب لك.'
   money_en='/services/brand-new.html'; money_ar='/ar/services/brand-new.html'
   money_label_en='See flagship phones in stock'; money_label_ar='تصفّح الهواتف الرائدة المتوفرة'
   money_short_en='New flagships'; money_short_ar='هواتف جديدة'
   money_desc_en='Live AED pricing for iPhone 17 and Galaxy S25 at our Al Barsha store.'
   money_desc_ar='أسعار درهم مباشرة لـ iPhone 17 و Galaxy S25 في متجر البرشاء.'
   sections_en=@(
     @{h='1) The price-and-spec table';p='iPhone 17 (128 GB) sits around AED 3,200. Galaxy S25 (256 GB) sits around AED 3,000-3,200. Roughly the same AED, with Samsung typically including more base storage. Both are flagships, both will last 5+ years, both have excellent cameras.'},
     @{h='2) Cameras — different strengths';p='iPhone 17 wins on consistency, color science, and video. Galaxy S25 wins on zoom flexibility (telephoto on base model), AI editing tools, and night mode aggressiveness. If you shoot video, lean iPhone. If you shoot a lot of zoomed stills, lean Samsung.'},
     @{h='3) Battery and charging';p='Galaxy S25 charges faster (45 W wired, 25 W wireless) than iPhone 17 (25 W wired, 15 W MagSafe). Battery life is roughly comparable for typical users — Samsung edges ahead on heavy use, iPhone edges ahead on light use thanks to standby efficiency.'},
     @{h='4) Software and the ecosystem trap';p='iPhone has Apple ecosystem (iMessage, AirDrop, Apple Watch, AirPods deep integration). Samsung has Galaxy ecosystem (Samsung Watch, Galaxy Buds, DeX desktop mode). If you already own Apple gear, sticking with iPhone makes daily life easier.'},
     @{h='5) AI features in 2026';p='Apple Intelligence is improving but Galaxy AI is more aggressive — live translation, generative photo edit, AI summaries are more polished on Samsung in 2026. Heavy AI users currently lean Samsung. Privacy-focused users lean Apple.'},
     @{h='6) Resale and trade-in';p='iPhone holds resale value much better in the UAE — typically 15-20% more after 2 years. If you upgrade often, factor that into the real cost. If you keep phones 4+ years, both depreciate to roughly similar levels.'}
   )
   sections_ar=@(
     @{h='1) السعر والمواصفات';p='iPhone 17 (128 جيجا) حوالي 3,200 درهم. Galaxy S25 (256 جيجا) حوالي 3,000-3,200 درهم. تقريباً نفس الدرهم، مع تخزين أساسي أكبر عند Samsung. كلاهما رائد ويدوم 5+ سنوات.'},
     @{h='2) الكاميرات — نقاط قوة مختلفة';p='iPhone 17 يفوز في الاتساق وعلم الألوان والفيديو. Galaxy S25 يفوز في مرونة التكبير (تيليفوتو في الموديل الأساسي) وأدوات تحرير AI والوضع الليلي. مصوّرو الفيديو لـ iPhone، مصوّرو التكبير لـ Samsung.'},
     @{h='3) البطارية والشحن';p='Galaxy S25 يشحن أسرع (45W سلكي، 25W لاسلكي) من iPhone 17 (25W سلكي، 15W MagSafe). عمر البطارية متقارب — Samsung يتقدّم قليلاً في الاستخدام الثقيل، iPhone في الخفيف.'},
     @{h='4) النظام البيئي';p='iPhone فيه نظام Apple (iMessage، AirDrop، Apple Watch، AirPods). Samsung فيه نظام Galaxy (Samsung Watch، Galaxy Buds، DeX). إذا عندك أجهزة Apple، iPhone يسهّل حياتك.'},
     @{h='5) القيمة المتبقية';p='iPhone يحتفظ بقيمة إعادة البيع أفضل بكثير في الإمارات — عادةً 15-20% أكثر بعد سنتين. إذا تستبدل كثيراً، احسب ذلك في التكلفة الحقيقية.'}
   )
   faq_en=@(
     @{q='Which is better in Dubai 2026, Samsung Galaxy S25 or iPhone 17?';a='Both are excellent. iPhone 17 wins for video, ecosystem with Apple gear, and resale value. Galaxy S25 wins for zoom photography, AI features, charging speed, and base storage. The right answer depends on what other devices you already own.'},
     @{q='Does Samsung Galaxy S25 last as long as iPhone 17?';a='Yes for software — Samsung now promises 7 years of OS and security updates, matching Apple. Hardware longevity is similar. The differences show up in resale value (iPhone holds more) and battery service network access in Dubai.'},
     @{q='Can I trade in my old Samsung or iPhone in Dubai 2026?';a='Yes. At P Z M, a working flagship from the last 3-4 years gets a fair same-day quote. Send model number and battery health for a real number before you visit.'}
   )
   faq_ar=@(
     @{q='أيّهما أفضل في دبي 2026، Galaxy S25 أم iPhone 17؟';a='كلاهما ممتاز. iPhone 17 يفوز للفيديو والنظام البيئي وإعادة البيع. Galaxy S25 يفوز للتكبير وميزات AI وسرعة الشحن والتخزين الأساسي. الإجابة الصحيحة تعتمد على بقية أجهزتك.'},
     @{q='هل يدوم Galaxy S25 مثل iPhone 17؟';a='نعم للبرمجيات — Samsung تعد الآن بـ 7 سنوات تحديثات نظام وأمان، مطابقاً Apple. متانة الأجهزة متقاربة.'}
   )
},
@{ slug='trade-in-vs-sell-privately-iphone-dubai-2026'
   image='/images/buy_used/used_iphone_16_pro_max_main.webp'
   category_en='Selling'; category_ar='بيع'
   title_en='Trade-in vs sell privately: best way to sell your iPhone in Dubai 2026'
   title_ar='استبدال أم بيع خاص: أفضل طريقة لبيع iPhone في دبي 2026'
   desc_en='Trade-in vs sell privately in Dubai 2026 — real AED differences, time and risk per route, and the smartest way to sell your iPhone.'
   desc_ar='استبدال أم بيع خاص في دبي 2026 — الفرق الحقيقي بالدرهم، الوقت والمخاطرة لكل طريقة، والأذكى لبيع iPhone.'
   money_en='/services/sell-gadgets.html'; money_ar='/ar/services/sell-gadgets.html'
   money_label_en='Get a same-day trade-in quote'; money_label_ar='احصل على عرض استبدال في نفس اليوم'
   money_short_en='Sell your iPhone'; money_short_ar='بيع iPhone'
   money_desc_en='Send model + storage + battery health on WhatsApp for an AED number before you visit.'
   money_desc_ar='أرسل الموديل + السعة + نسبة البطارية على واتساب لتحصل على سعر بالدرهم قبل الزيارة.'
   sections_en=@(
     @{h='1) The real AED gap';p='In Dubai 2026, private sale typically nets 8-15% more AED than a shop trade-in. Example: a clean iPhone 14 Pro 256 GB might fetch AED 2,400 privately vs AED 2,100 trade-in. That is 300 AED on the table — real money, but not life-changing.'},
     @{h='2) Time and effort cost';p='Private sale costs you: writing the ad, replying to lowballers, arranging meetings, dealing with no-shows, payment-fraud risk (fake bank transfer screenshots, switched cash), and 1-3 weeks of your time. Trade-in is 15 minutes at the store.'},
     @{h='3) The real risks of private selling';p='Most common in Dubai: fake bank-transfer screenshots, counterfeit cash, buyer claims the phone is "broken" after handover and demands a refund, and after-sale Find My / iCloud disputes. A shop trade-in eliminates every one of these.'},
     @{h='4) When private sale wins';p='Pick private if your phone is recent (last 18 months), in mint condition, you have time to wait, you know how to handle payment safely, and the AED gap is over 400. For older phones, the gap shrinks.'},
     @{h='5) When trade-in wins';p='Pick trade-in if you are also buying a replacement at the same store (we often add 50-150 AED on top), if your phone is more than 2 years old, if it has any condition issues, or if you simply do not have a week to play marketplace negotiator.'},
     @{h='6) The hybrid play';p='Get a written trade-in quote first (it takes 15 minutes on WhatsApp). Then list privately at 10-15% above that number for one week. If it sells, great. If not, take the trade-in. You lose nothing — and most people end up taking the trade-in once they see how quick it is.'}
   )
   sections_ar=@(
     @{h='1) الفرق الحقيقي بالدرهم';p='في دبي 2026، البيع الخاص يجلب عادةً 8-15% أكثر من استبدال المتجر. مثلاً iPhone 14 Pro 256 نظيف قد يبيع بـ 2,400 درهم خاص مقابل 2,100 درهم استبدال. هذا 300 درهم — مال حقيقي لكن ليس مغيّر حياة.'},
     @{h='2) تكلفة الوقت والجهد';p='البيع الخاص يكلّفك: كتابة الإعلان، الرد على المساومين، ترتيب اللقاءات، التعامل مع من لا يحضر، خطر الاحتيال، و 1-3 أسابيع من وقتك. الاستبدال 15 دقيقة في المتجر.'},
     @{h='3) مخاطر البيع الخاص الحقيقية';p='الأكثر شيوعاً في دبي: لقطات تحويل بنكي مزورة، نقود مزيفة، يدّعي المشتري أن الجهاز معطل بعد التسليم ويطلب استرداد، ونزاعات Find My / iCloud بعد البيع. الاستبدال في المتجر يلغي كل هذا.'},
     @{h='4) متى يفوز البيع الخاص';p='اختر الخاص إذا الجهاز حديث (آخر 18 شهر)، بحالة ممتازة، عندك وقت، تعرف كيف تستلم الدفع بأمان، والفرق فوق 400 درهم.'},
     @{h='5) متى يفوز الاستبدال';p='اختر الاستبدال إذا تشتري بديلاً من نفس المتجر (نضيف عادةً 50-150 درهم)، الجهاز فوق سنتين، فيه أي مشاكل، أو ببساطة ليس عندك أسبوع للتفاوض.'},
     @{h='6) اللعبة الهجينة';p='احصل على عرض استبدال مكتوب أولاً (15 دقيقة على واتساب). ثم اعرض خاصاً بـ 10-15% فوق هذا الرقم لمدة أسبوع. إذا بيع، رائع. إذا لا، خذ الاستبدال.'}
   )
   faq_en=@(
     @{q='Will I get more AED selling my iPhone privately in Dubai?';a='Usually 8-15% more — but you absorb the time, no-show risk, and payment-fraud risk. For phones over 2 years old, the AED gap shrinks to almost nothing once you factor in your time.'},
     @{q='Is iPhone trade-in safe in Dubai?';a='Yes at a reputable shop. You hand over the phone, get a written valuation, sign a sale receipt, and walk out with cash or credit toward a new device. No bank-transfer fraud, no buyer-remorse disputes.'},
     @{q='What battery health do I need for a good trade-in price?';a='Above 85% battery health gets you the best valuation. 80-85% takes 100-200 AED off. Below 80% is still fine but expect 200-300 AED lower because the buyer needs to plan a battery service.'}
   )
   faq_ar=@(
     @{q='هل أحصل على دراهم أكثر ببيع iPhone خاصاً في دبي؟';a='عادةً 8-15% أكثر — لكن تتحمّل الوقت وخطر عدم الحضور وخطر احتيال الدفع. للأجهزة فوق سنتين، الفرق يضيق إلى لا شيء تقريباً بعد حساب وقتك.'},
     @{q='هل استبدال iPhone آمن في دبي؟';a='نعم في متجر موثوق. تسلّم الجهاز، تحصل على تقييم مكتوب، توقّع إيصال بيع، وتخرج بنقد أو رصيد لجهاز جديد.'}
   )
}
)

# ---------- HTML BUILDERS ----------
function Build-EnHtml($a) {
    $sections = ($a.sections_en | ForEach-Object { "                    <h3>$($_.h)</h3>`r`n                    <p>$($_.p)</p>" }) -join "`r`n`r`n"
    $faqJson = ($a.faq_en | ForEach-Object {
        $q = $_.q -replace '"','\"'
        $aText = ($_.a -replace '<[^>]+>','') -replace '"','\"'
        '{"@type":"Question","name":"' + $q + '","acceptedAnswer":{"@type":"Answer","text":"' + $aText + '"}}'
    }) -join ','
    $headlineEsc = $a.title_en -replace '"','\"'
    $descEsc = $a.desc_en -replace '"','\"'
    $imgAbs = "https://pzm.ae$($a.image)"
    $articleJson = '{"@context":"https://schema.org","@type":"Article","headline":"' + $headlineEsc + '","description":"' + $descEsc + '","image":"' + $imgAbs + '","mainEntityOfPage":"https://pzm.ae/blog/' + $a.slug + '/","url":"https://pzm.ae/blog/' + $a.slug + '/","datePublished":"' + $date + '","dateModified":"' + $date + '","inLanguage":"en","author":{"@type":"Organization","name":"P Z M Computers & Mobile Phones -Sell New Used PC Build","url":"https://pzm.ae/"},"publisher":{"@type":"Organization","name":"P Z M Computers & Mobile Phones -Sell New Used PC Build","logo":{"@type":"ImageObject","url":"https://pzm.ae/images/mini_logo.png"}}}'
    $faqJsonLd = '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[' + $faqJson + ']}'

@"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$($a.title_en) | P Z M Computers &amp; Mobile Phones -Sell New Used PC Build Dubai</title>
    <meta name="description" content="$($a.desc_en)">
    <meta name="keywords" content="$($a.slug -replace '-',' '), dubai 2026, P Z M Computers & Mobile Phones -Sell New Used PC Build al barsha">
    <meta name="robots" content="index, follow">
    <link rel="icon" href="/images/favico.ico" type="image/x-icon">
    <link rel="canonical" href="https://pzm.ae/blog/$($a.slug)/">
    <link rel="alternate" hreflang="en" href="https://pzm.ae/blog/$($a.slug)/">
    <link rel="alternate" hreflang="ar-AE" href="https://pzm.ae/ar/blog/$($a.slug)/">
    <link rel="alternate" hreflang="x-default" href="https://pzm.ae/blog/$($a.slug)/">

    <meta property="og:type" content="article">
    <meta property="og:title" content="$($a.title_en)">
    <meta property="og:description" content="$($a.desc_en)">
    <meta property="og:url" content="https://pzm.ae/blog/$($a.slug)/">
    <meta property="og:image" content="$imgAbs">
    <meta property="og:site_name" content="P Z M Computers &amp; Mobile Phones -Sell New Used PC Build">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="$($a.title_en)">
    <meta name="twitter:description" content="$($a.desc_en)">
    <meta name="twitter:image" content="$imgAbs">

    <link rel="stylesheet" href="/css/theme.css">
    <link rel="stylesheet" href="/css/blog.css">
    <link rel="stylesheet" href="/css/contact.css">

    <script type="application/ld+json">$articleJson</script>
    <script type="application/ld+json">$faqJsonLd</script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-NSJ08ST3JL"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-NSJ08ST3JL');
        gtag('config', 'G-KYVRVKG3MZ');
    </script>
</head>
<body>
    <nav class="navbar">
        <div class="navbar-inner">
            <a href="/" class="logo"><div class="logo-group"><span class="logo-pzm">P Z M Computers &amp; Mobile Phones -Sell New Used PC Build</span></div></a>
            <div class="nav-links" id="navLinks">
                <a href="/">Home</a>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-trigger">Services</button>
                    <div class="nav-dropdown-content">
                        <a href="/services/buy-iphone.html">Buy iPhone</a>
                        <a href="/services/brand-new.html">New Devices</a>
                        <a href="/services/buy-used.html">Used Devices</a>
                        <a href="/services/index.html">Device Care</a>
                        <a href="/services/gaming-pc.html">Gaming PC</a>
                        <a href="/services/sell-gadgets.html">Sell Devices</a>
                        <a href="/services/accessories.html">Accessories</a>
                    </div>
                </div>
                <a href="/blog.html">Blog</a>
                <a href="#contact">Contact</a>
            </div>
            <div class="nav-actions" id="navActions">
                <a href="tel:+971528026677" class="btn-login">Call Store</a>
                <a href="https://wa.me/971588366841?text=Hi%2C%20I%27m%20interested%20in%20your%20services.%20(via%20pzm.ae)" class="btn-signup" target="_blank" rel="noopener">WhatsApp</a>
            </div>
            <button class="hamburger" id="hamburger" onclick="toggleMenu()"><span></span><span></span><span></span></button>
        </div>
    </nav>

    <main>
        <article class="blog-post">
            <img src="$($a.image)" alt="$($a.title_en)" class="blog-post-image">
            <div class="blog-post-content">
                <span class="blog-category">$($a.category_en)</span>
                <p class="blog-post-meta">Published May 31, 2026</p>
                <h1>$($a.title_en)</h1>
                <div class="blog-content">
$sections

                    <p>Want a real AED number for your situation? <a href="https://wa.me/971588366841?text=Hi%20P%20Z%20M%20Computers%20%26%20Mobile%20Phones%20-Sell%20New%20Used%20PC%20Build%2C%20question%20from%20$($a.slug)%20(via%20pzm.ae)" target="_blank" rel="noopener">Message us on WhatsApp</a> before visiting <a href="/areas/al-barsha.html">our Al Barsha store</a>. You can also <a href="$($a.money_en)">$($a.money_label_en.ToLower())</a>.</p>
                </div>

                <aside class="blog-next-steps">
                    <p class="blog-next-steps-label">Best next steps</p>
                    <div class="blog-next-steps-grid">
                        <a href="$($a.money_en)" class="blog-next-step-card">
                            <span class="blog-next-step-eyebrow">Service page</span>
                            <strong>$($a.money_label_en)</strong>
                            <span>$($a.money_desc_en)</span>
                        </a>
                        <a href="/areas/al-barsha.html" class="blog-next-step-card">
                            <span class="blog-next-step-eyebrow">Visit us</span>
                            <strong>Al Barsha store directions</strong>
                            <span>Route, parking, and working hours before you visit.</span>
                        </a>
                    </div>
                </aside>
            </div>
        </article>

        <div id="contact-section"></div>
    </main>

    <script src="/js/navbar.js"></script>
    <script src="/js/contact-loader.js"></script>
</body>
</html>
"@
}

function Build-ArHtml($a) {
    $sections = ($a.sections_ar | ForEach-Object { "                    <h3>$($_.h)</h3>`r`n                    <p>$($_.p)</p>" }) -join "`r`n`r`n"
    $faqJson = ($a.faq_ar | ForEach-Object {
        $q = $_.q -replace '"','\"'
        $aText = ($_.a -replace '<[^>]+>','') -replace '"','\"'
        '{"@type":"Question","name":"' + $q + '","acceptedAnswer":{"@type":"Answer","text":"' + $aText + '"}}'
    }) -join ','
    $headlineEsc = $a.title_ar -replace '"','\"'
    $descEsc = $a.desc_ar -replace '"','\"'
    $imgAbs = "https://pzm.ae$($a.image)"
    $articleJson = '{"@context":"https://schema.org","@type":"Article","headline":"' + $headlineEsc + '","description":"' + $descEsc + '","image":"' + $imgAbs + '","mainEntityOfPage":"https://pzm.ae/ar/blog/' + $a.slug + '/","url":"https://pzm.ae/ar/blog/' + $a.slug + '/","datePublished":"' + $date + '","dateModified":"' + $date + '","inLanguage":"ar-AE","author":{"@type":"Organization","name":"P Z M Computers & Mobile Phones -Sell New Used PC Build","url":"https://pzm.ae/ar/"},"publisher":{"@type":"Organization","name":"P Z M Computers & Mobile Phones -Sell New Used PC Build","logo":{"@type":"ImageObject","url":"https://pzm.ae/images/mini_logo.png"}}}'
    $faqJsonLd = '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[' + $faqJson + ']}'

@"
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$($a.title_ar) | P Z M Computers &amp; Mobile Phones -Sell New Used PC Build دبي</title>
    <meta name="description" content="$($a.desc_ar)">
    <meta name="keywords" content="$($a.slug -replace '-',' '), دبي 2026, P Z M البرشاء">
    <meta name="robots" content="index, follow">
    <link rel="icon" href="/images/favico.ico" type="image/x-icon">
    <link rel="canonical" href="https://pzm.ae/ar/blog/$($a.slug)/">
    <link rel="alternate" hreflang="en" href="https://pzm.ae/blog/$($a.slug)/">
    <link rel="alternate" hreflang="ar-AE" href="https://pzm.ae/ar/blog/$($a.slug)/">
    <link rel="alternate" hreflang="x-default" href="https://pzm.ae/blog/$($a.slug)/">

    <meta property="og:type" content="article">
    <meta property="og:title" content="$($a.title_ar)">
    <meta property="og:description" content="$($a.desc_ar)">
    <meta property="og:url" content="https://pzm.ae/ar/blog/$($a.slug)/">
    <meta property="og:image" content="$imgAbs">
    <meta property="og:site_name" content="P Z M Computers &amp; Mobile Phones -Sell New Used PC Build">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="$($a.title_ar)">
    <meta name="twitter:description" content="$($a.desc_ar)">
    <meta name="twitter:image" content="$imgAbs">

    <link rel="stylesheet" href="/css/theme.css">
    <link rel="stylesheet" href="/css/blog.css">
    <link rel="stylesheet" href="/css/blog-ar.css">
    <link rel="stylesheet" href="/css/contact.css">

    <script type="application/ld+json">$articleJson</script>
    <script type="application/ld+json">$faqJsonLd</script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-NSJ08ST3JL"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-NSJ08ST3JL');
        gtag('config', 'G-KYVRVKG3MZ');
    </script>
</head>
<body>
    <nav class="navbar">
        <div class="navbar-inner">
            <a href="/ar/" class="logo"><div class="logo-group"><span class="logo-pzm">P Z M Computers &amp; Mobile Phones -Sell New Used PC Build</span></div></a>
            <div class="nav-links" id="navLinks">
                <a href="/ar/">الرئيسية</a>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-trigger">الخدمات</button>
                    <div class="nav-dropdown-content">
                        <a href="/ar/services/buy-iphone.html">شراء iPhone</a>
                        <a href="/ar/services/brand-new.html">أجهزة جديدة</a>
                        <a href="/ar/services/buy-used.html">أجهزة مستعملة</a>
                        <a href="/ar/services/">العناية بالأجهزة</a>
                        <a href="/ar/services/gaming-pc.html">تجميع Gaming PC</a>
                        <a href="/ar/services/sell-gadgets.html">بيع جهازك</a>
                        <a href="/ar/services/accessories.html">الإكسسوارات</a>
                    </div>
                </div>
                <a href="/ar/blog/">المدونة</a>
                <a href="#contact">اتصل بنا</a>
            </div>
            <div class="nav-actions" id="navActions">
                <a href="tel:+971528026677" class="btn-login">اتصل بنا</a>
                <a href="https://wa.me/971588366841?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%2C%20(via%20pzm.ae)" class="btn-signup" target="_blank" rel="noopener">واتساب</a>
            </div>
            <button class="hamburger" id="hamburger" onclick="toggleMenu()"><span></span><span></span><span></span></button>
        </div>
    </nav>

    <main>
        <article class="blog-post">
            <img src="$($a.image)" alt="$($a.title_ar)" class="blog-post-image">
            <div class="blog-post-content">
                <span class="blog-category">$($a.category_ar)</span>
                <p class="blog-post-meta">نُشر في 31 مايو 2026</p>
                <h1>$($a.title_ar)</h1>
                <div class="blog-content">
$sections

                    <p>تريد رقماً درهمياً حقيقياً يناسب حالتك؟ <a href="https://wa.me/971588366841?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20P%20Z%20M%20Computers%20%26%20Mobile%20Phones%20-Sell%20New%20Used%20PC%20Build%2C%20%D8%B3%D8%A4%D8%A7%D9%84%20%D9%85%D9%86%20$($a.slug)%20(via%20pzm.ae)" target="_blank" rel="noopener">راسلنا على واتساب</a> قبل الزيارة إلى <a href="/ar/areas/al-barsha.html">متجر البرشاء</a>. يمكنك أيضاً <a href="$($a.money_ar)">$($a.money_label_ar)</a>.</p>
                </div>

                <aside class="blog-next-steps">
                    <p class="blog-next-steps-label">أفضل خطوة تالية</p>
                    <div class="blog-next-steps-grid">
                        <a href="$($a.money_ar)" class="blog-next-step-card">
                            <span class="blog-next-step-eyebrow">صفحة خدمة</span>
                            <strong>$($a.money_label_ar)</strong>
                            <span>$($a.money_desc_ar)</span>
                        </a>
                        <a href="/ar/areas/al-barsha.html" class="blog-next-step-card">
                            <span class="blog-next-step-eyebrow">زيارتنا</span>
                            <strong>عنوان متجر البرشاء</strong>
                            <span>الموقع وساعات العمل قبل الزيارة.</span>
                        </a>
                    </div>
                </aside>
            </div>
        </article>

        <div id="contact-section"></div>
    </main>

    <script src="/js/navbar.js"></script>
    <script src="/js/contact-loader.js"></script>
</body>
</html>
"@
}

# ---------- GENERATE HTML ----------
$created = 0
foreach ($a in $articles) {
    $enFile = Join-Path $root "blog\$($a.slug)\index.html"
    $arFile = Join-Path $root "ar\blog\$($a.slug)\index.html"
    if (-not (Test-Path -LiteralPath $enFile)) { Write-Utf8 $enFile (Build-EnHtml $a); $created++ } else { Write-Host "SKIP EN $($a.slug)" -ForegroundColor Yellow }
    if (-not (Test-Path -LiteralPath $arFile)) { Write-Utf8 $arFile (Build-ArHtml $a); $created++ } else { Write-Host "SKIP AR $($a.slug)" -ForegroundColor Yellow }
}
Write-Host "Created $created HTML files." -ForegroundColor Green

# ---------- UPDATE js/blog.js ----------
$blogJsPath = Join-Path $root 'js\blog.js'
$bj = Get-Content -LiteralPath $blogJsPath -Raw -Encoding UTF8

# Build new blogPosts blocks
$newPostBlocks = foreach ($a in $articles) {
    $sectionsHtml = ($a.sections_en | ForEach-Object { "      <h3>$($_.h)</h3>`n      <p>$($_.p)</p>" }) -join "`n`n"
    $imgRel = $a.image.TrimStart('/')
    $titleEsc = $a.title_en -replace '"','\"'
    $descEsc = $a.desc_en -replace '"','\"'
@"
  {
    title: "$titleEsc",
    slug: "$($a.slug)",
    content: ``<p>$($a.desc_en)</p>

$sectionsHtml

      <p>Want a real AED number for your situation? <a href="https://wa.me/971588366841?text=Hi%20P%20Z%20M%20Computers%20%26%20Mobile%20Phones%20-Sell%20New%20Used%20PC%20Build%2C%20question%20from%20$($a.slug)%20(via%20pzm.ae)" target="_blank" rel="noopener">Message us on WhatsApp</a>.</p>``,
    excerpt: "$descEsc",
    image_url: "$imgRel",
    category: "$($a.category_en)",
    date: "$date"
  }
"@
}
$postsBlock = "," + [Environment]::NewLine + ($newPostBlocks -join ("," + [Environment]::NewLine))

# Use unique end-of-array anchor: `  }\n];\n\nconst staticBlogPostPaths`
$anchor1 = "  }`r`n];`r`n`r`nconst staticBlogPostPaths"
$anchor1lf = "  }`n];`n`nconst staticBlogPostPaths"
if ($bj.Contains($anchor1)) {
    $bj = $bj.Replace($anchor1, "  }" + $postsBlock + "`r`n];`r`n`r`nconst staticBlogPostPaths")
} elseif ($bj.Contains($anchor1lf)) {
    $bj = $bj.Replace($anchor1lf, "  }" + $postsBlock + "`n];`n`nconst staticBlogPostPaths")
} else {
    throw "blogPosts end-of-array anchor not found"
}

# staticBlogPostPaths additions — last entry has no trailing comma, then `\n};`
$pathLastLine = '"psg-vs-arsenal-final-dubai-2026": "/blog/psg-vs-arsenal-final-dubai-2026/"'
$pathEntries = ($articles | ForEach-Object { "  `"$($_.slug)`": `"/blog/$($_.slug)/`"" }) -join ("," + [Environment]::NewLine)
$bj = $bj.Replace($pathLastLine, $pathLastLine + "," + [Environment]::NewLine + $pathEntries)

# postJourneys additions — anchor on the unique psg description string and end-of-dict
$journeyEntries = foreach ($a in $articles) {
@"
  "$($a.slug)": {
    moneyPage: {
      href: "$($a.money_en)",
      label: "$($a.money_label_en)",
      shortLabel: "$($a.money_short_en)",
      description: "$($a.money_desc_en)"
    },
    areaPage: {
      href: "/areas/al-barsha.html",
      label: "Visiting from Al Barsha?",
      shortLabel: "Al Barsha",
      description: "Use the Al Barsha page for route details and quick in-store pickup."
    }
  }
"@
}
$journeyBlock = "," + [Environment]::NewLine + ($journeyEntries -join ("," + [Environment]::NewLine))

# The psg journey block ends with: description: "...quick in-store pickup."\n    }\n  }\n};
$psgEnd = 'description: "Use the Al Barsha page for route details and quick in-store pickup."'
$psgClose = $psgEnd + "`r`n    }`r`n  }`r`n};"
$psgCloseLf = $psgEnd + "`n    }`n  }`n};"
if ($bj.Contains($psgClose)) {
    $bj = $bj.Replace($psgClose, $psgEnd + "`r`n    }`r`n  }" + $journeyBlock + "`r`n};")
} elseif ($bj.Contains($psgCloseLf)) {
    $bj = $bj.Replace($psgCloseLf, $psgEnd + "`n    }`n  }" + $journeyBlock + "`n};")
} else {
    throw "postJourneys psg anchor not found"
}

[System.IO.File]::WriteAllText($blogJsPath, $bj, $utf8NoBom)
Write-Host "Updated js/blog.js" -ForegroundColor Green

# ---------- UPDATE sitemap.xml ----------
$sitemapPath = Join-Path $root 'sitemap.xml'
$sm = Get-Content -LiteralPath $sitemapPath -Raw -Encoding UTF8
$smEntries = foreach ($a in $articles) {
    $titleEn = $a.title_en -replace '&','&amp;'
    $titleAr = $a.title_ar -replace '&','&amp;'
    $imgAbs = "https://pzm.ae$($a.image)"
@"
  <url>
    <loc>https://pzm.ae/blog/$($a.slug)/</loc>
    <lastmod>$date</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.74</priority>
    <image:image>
      <image:loc>$imgAbs</image:loc>
      <image:title>$titleEn</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://pzm.ae/ar/blog/$($a.slug)/</loc>
    <lastmod>$date</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.74</priority>
    <image:image>
      <image:loc>$imgAbs</image:loc>
      <image:title>$titleAr</image:title>
    </image:image>
  </url>
"@
}
$smBlock = ($smEntries -join "`r`n") + "`r`n"
$sm = $sm -replace '(</urlset>)', ($smBlock + '$1')
[System.IO.File]::WriteAllText($sitemapPath, $sm, $utf8NoBom)
Write-Host "Updated sitemap.xml" -ForegroundColor Green

# ---------- UPDATE js/navbar.js ----------
$navPath = Join-Path $root 'js\navbar.js'
$nav = Get-Content -LiteralPath $navPath -Raw -Encoding UTF8
$enToAr = ($articles | ForEach-Object { "    '/blog/$($_.slug)/': '/ar/blog/$($_.slug)/'" }) -join ",`r`n"
$arToEn = ($articles | ForEach-Object { "    '/ar/blog/$($_.slug)/': '/blog/$($_.slug)/'" }) -join ",`r`n"
$nav = $nav -replace "(    '/blog/sell-used-phone-dubai-best-trade-in-value-2026/': '/ar/blog/sell-used-phone-dubai-best-trade-in-value-2026/',)(\r?\n    '/return-policy.html')", ('$1' + "`r`n" + $enToAr + ',$2')
$nav = $nav -replace "(    '/ar/blog/sell-used-phone-dubai-best-trade-in-value-2026/': '/blog/sell-used-phone-dubai-best-trade-in-value-2026/',)(\r?\n    '/ar/return-policy.html')", ('$1' + "`r`n" + $arToEn + ',$2')
[System.IO.File]::WriteAllText($navPath, $nav, $utf8NoBom)
Write-Host "Updated js/navbar.js" -ForegroundColor Green

# ---------- UPDATE ar/blog/index.html ----------
$arHubPath = Join-Path $root 'ar\blog\index.html'
$arHub = Get-Content -LiteralPath $arHubPath -Raw -Encoding UTF8
$arCards = ($articles | ForEach-Object {
@"
                <article class="blog-card">
                    <img src="$($_.image)" alt="$($_.title_ar)" class="blog-image" loading="lazy">
                    <div class="blog-content">
                        <span class="blog-category">$($_.category_ar)</span>
                        <h2>$($_.title_ar)</h2>
                        <p>$($_.desc_ar)</p>
                        <div class="blog-meta">
                            <span>31 مايو 2026</span>
                            <span>$($_.category_ar)</span>
                        </div>
                        <a href="/ar/blog/$($_.slug)/" class="read-more">اقرأ المقال</a>
                    </div>
                </article>
"@
}) -join "`r`n"
$arHub = $arHub -replace '(<div class="blog-grid" aria-label="المزيد من المقالات العربية">)', ('$1' + "`r`n" + $arCards)
[System.IO.File]::WriteAllText($arHubPath, $arHub, $utf8NoBom)
Write-Host "Updated ar/blog/index.html" -ForegroundColor Green

Write-Host "`nDone." -ForegroundColor Cyan
