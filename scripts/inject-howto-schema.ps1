#requires -Version 7
$ErrorActionPreference = 'Stop'
$base = 'https://pzm.ae'
$repo = $PSScriptRoot | Split-Path -Parent

function Inject-HowTo {
    param([string]$RelPath, [string]$Json)
    $full = Join-Path $repo $RelPath
    if (-not (Test-Path -LiteralPath $full)) { Write-Host "SKIP missing $RelPath"; return }
    $html = [System.IO.File]::ReadAllText($full)
    if ($html -match '"@type"\s*:\s*"HowTo"') { Write-Host "SKIP already has HowTo: $RelPath"; return }
    $needle = '</head>'
    $idx = $html.IndexOf($needle)
    if ($idx -lt 0) { Write-Host "SKIP no </head>: $RelPath"; return }
    $insert = "    <script type=`"application/ld+json`">$Json</script>`r`n"
    $new = $html.Substring(0, $idx) + $insert + $html.Substring($idx)
    [System.IO.File]::WriteAllText($full, $new, (New-Object System.Text.UTF8Encoding $false))
    Write-Host "OK $RelPath"
}

function HowTo {
    param([string]$Name, [string]$Desc, [string]$Url, [string]$Image, [string]$Lang, [array]$Steps)
    $stepArr = @()
    $i = 1
    foreach ($s in $Steps) {
        $stepArr += @{
            '@type' = 'HowToStep'
            position = $i
            name = $s.name
            text = $s.text
            url = "$Url#step-$i"
        }
        $i++
    }
    $obj = [ordered]@{
        '@context' = 'https://schema.org'
        '@type' = 'HowTo'
        name = $Name
        description = $Desc
        inLanguage = $Lang
        image = $Image
        totalTime = "PT$($Steps.Count * 5)M"
        step = $stepArr
    }
    return ($obj | ConvertTo-Json -Compress -Depth 10)
}

# ---------- POST 1 EN ----------
$json = HowTo `
    -Name 'How to Check a Used iPhone Before Buying in Dubai' `
    -Desc 'Step-by-step checklist to inspect a used iPhone before paying: IMEI, battery health, Face ID, screen, water damage, activation lock, parts, and network tests.' `
    -Url "$base/blog/how-to-check-used-iphone-dubai/" `
    -Image "$base/images/blog/iphone_storage.jpg" `
    -Lang 'en' `
    -Steps @(
        @{ name='Check IMEI and device identity'; text='Dial *#06# and confirm the IMEI matches the SIM tray, Settings > General > About, and original packaging to verify the device is legitimate and not mismatched.' },
        @{ name='Verify battery health and charging'; text='Open Settings > Battery > Battery Health and check maximum capacity; test stable charging and watch for rapid percentage drops or unstable behaviour.' },
        @{ name='Test Face ID or Touch ID'; text='Enrol and test biometric unlock multiple times; if it fails, ask whether the issue is sensor, board, or software related before paying.' },
        @{ name='Inspect the display and touch screen'; text='Check the screen on white, black, and grey backgrounds for dead pixels, burn-in, brightness patches, and touch dead zones using keyboard and icon taps.' },
        @{ name='Check for water damage and body condition'; text='Inspect the frame for dents, the SIM slot for corrosion, and verify the screws and seals do not indicate poor reassembly.' },
        @{ name='Confirm activation lock is cleared'; text='Ensure the iPhone is signed out of iCloud and free from activation lock before paying; never buy a device the seller cannot reset to setup.' },
        @{ name='Verify original vs aftermarket parts'; text='Check Settings for parts and service history disclosures; confirm aftermarket parts are priced fairly and that all key functions still work.' },
        @{ name='Run a network, audio, and camera test'; text='Insert a SIM or eSIM, test signal, Wi-Fi, Bluetooth, speakers, microphone, and every camera including focus speed and portrait mode.' }
    )
Inject-HowTo 'blog\how-to-check-used-iphone-dubai\index.html' $json

# ---------- POST 2 EN ----------
$json = HowTo `
    -Name 'How to Buy a Used MacBook in Dubai' `
    -Desc 'Checklist to verify a used MacBook before paying: battery cycles, screen test, activation lock, keyboard, ports, thermal behaviour, and grading clarity.' `
    -Url "$base/blog/how-to-buy-used-macbook-dubai/" `
    -Image "$base/images/blog/macbook_repair_alternative.jpg" `
    -Lang 'en' `
    -Steps @(
        @{ name='Check battery cycle count and capacity'; text='Open System Information > Power and review both cycle count and maximum capacity; a healthy used MacBook usually still has more than 85% capacity.' },
        @{ name='Inspect the screen carefully'; text='Test the display on white, black, red, green, blue, and grey backgrounds for dead pixels, pressure spots, and burn marks; open and close the lid for hinge and cable flicker.' },
        @{ name='Confirm activation lock and iCloud sign-out'; text='Never pay until the seller signs out of iCloud and disables Find My; verify the device boots to the setup assistant cleanly.' },
        @{ name='Test keyboard, trackpad, ports, camera, and audio'; text='Type every key including the function row, click and gesture on the trackpad, plug in real accessories on each port, and test camera, mic, and speakers at high volume.' },
        @{ name='Check thermal behaviour under load'; text='Run a realistic workload for 5 to 10 minutes with browser tabs, video, and heavier apps; watch for slowdowns, shutdowns, or loud sustained fan noise.' },
        @{ name='Clarify the grading terminology'; text='Ask the seller exactly what their grade means: body wear, screen condition, keyboard condition, battery health range, and history of replaced parts.' }
    )
Inject-HowTo 'blog\how-to-buy-used-macbook-dubai\index.html' $json

# ---------- POST 3 EN ----------
$json = HowTo `
    -Name 'How to Choose the Perfect Gaming PC Build in 2026' `
    -Desc 'Step-by-step guide to choosing a gaming PC in 2026: CPU, GPU, memory and storage, power and cooling, and where to build in Dubai.' `
    -Url "$base/blog/how-to-choose-perfect-gaming-pc-build/" `
    -Image "$base/images/blog/gaming_pc_chooser.jpg" `
    -Lang 'en' `
    -Steps @(
        @{ name='Choose the CPU'; text='Pick AMD Ryzen 9000 or Intel Arrow Lake; Ryzen 7 9800X3D leads pure gaming, Core Ultra 7 265K is best for streaming, and Ryzen 5 9600X is the value pick for 1080p/1440p.' },
        @{ name='Choose the GPU'; text='NVIDIA RTX 5070 Ti and AMD RX 9070 XT lead mid-range 1440p; RTX 5080 is the 4K sweet spot; RTX 5090 is enthusiast-only.' },
        @{ name='Choose memory and storage'; text='Use 32GB DDR5 at 6000–6400 MT/s and at least one 2TB Gen4 NVMe SSD; modern games exceed 150GB so plan a secondary 4TB drive if your library is large.' },
        @{ name='Choose power supply and cooling'; text='Use 850W minimum for mid-range builds or 1000W for high-end; pick an 80+ Gold or Platinum PSU and pair with a 360mm AIO or quality air cooler.' },
        @{ name='Build at PZM in Dubai'; text='Send your budget and target games to PZM in Al Barsha; you will get sourced parts, proper cable management, thermal paste application, and stress testing before pickup.' }
    )
Inject-HowTo 'blog\how-to-choose-perfect-gaming-pc-build\index.html' $json

# ---------- POST 4 EN ----------
$json = HowTo `
    -Name 'Essential PC Maintenance Tips for 2026' `
    -Desc 'Practical PC maintenance routine for Dubai: dust cleaning, temperature monitoring, SSD health, Windows and driver updates, and power protection.' `
    -Url "$base/blog/essential-pc-maintenance-tips/" `
    -Image "$base/images/blog/essential_pc_maintenance.jpg" `
    -Lang 'en' `
    -Steps @(
        @{ name='Clean dust every 3–4 months'; text='Open the case and use compressed air on fans, GPU and CPU coolers, and PSU vents; dust is the single biggest cause of overheating in Dubai air.' },
        @{ name='Monitor temperatures with HWiNFO64'; text='Install HWiNFO64 and check CPU and GPU temps under load; aim for CPU below 85°C and GPU below 90°C, and replace thermal paste every 2–3 years.' },
        @{ name='Check SSD health with CrystalDiskInfo'; text='Run CrystalDiskInfo and review Total Host Writes; keep at least 15–20% free space and replace any drive that shows caution or bad sector warnings.' },
        @{ name='Update Windows and drivers carefully'; text='Keep Windows 11 patched, wait a week before installing day-one GPU drivers, and create a restore point before major updates so you can roll back fast.' },
        @{ name='Protect with surge protection or a UPS'; text='Use a surge protector at minimum or a basic 650VA UPS; Dubai is stable overall but micro-surges and brownouts during updates can brick a PC.' }
    )
Inject-HowTo 'blog\essential-pc-maintenance-tips\index.html' $json

# ---------- POST 3 AR ----------
$json = HowTo `
    -Name 'كيف تختار جهاز ألعاب PC مثالي في 2026' `
    -Desc 'دليل خطوة بخطوة لاختيار جهاز ألعاب في 2026: المعالج وكرت الشاشة والذاكرة والتخزين ومزود الطاقة والتبريد وأين تجمعه في دبي.' `
    -Url "$base/ar/blog/how-to-choose-perfect-gaming-pc-build/" `
    -Image "$base/images/blog/gaming_pc_chooser.jpg" `
    -Lang 'ar' `
    -Steps @(
        @{ name='اختر المعالج (CPU)'; text='اختر AMD Ryzen 9000 أو Intel Arrow Lake؛ يتصدر Ryzen 7 9800X3D للألعاب البحتة، وCore Ultra 7 265K للبث والمحتوى، وRyzen 5 9600X للميزانية عند 1080p/1440p.' },
        @{ name='اختر كرت الشاشة (GPU)'; text='يتصدر NVIDIA RTX 5070 Ti وAMD RX 9070 XT الفئة المتوسطة عند 1440p، وRTX 5080 هو الخيار الأمثل لـ 4K، وRTX 5090 للمحترفين فقط.' },
        @{ name='اختر الذاكرة والتخزين'; text='استخدم 32GB DDR5 بسرعة 6000–6400 MT/s وقرص SSD NVMe Gen4 بسعة 2TB على الأقل، مع قرص ثانوي 4TB إن كانت مكتبتك كبيرة.' },
        @{ name='اختر مزود الطاقة والتبريد'; text='استخدم 850W كحد أدنى للأجهزة المتوسطة أو 1000W للأجهزة العالية، مع مزود 80+ Gold أو Platinum، ومبرد AIO 360 ملم أو مبرد هوائي عالي الجودة.' },
        @{ name='اطلب البناء من PZM في دبي'; text='أرسل ميزانيتك والألعاب التي تستهدفها إلى PZM في البرشاء، وستحصل على قطع موثوقة وتنظيم كابلات احترافي وتطبيق معجون حراري واختبار ضغط قبل الاستلام.' }
    )
Inject-HowTo 'ar\blog\how-to-choose-perfect-gaming-pc-build\index.html' $json

# ---------- POST 4 AR ----------
$json = HowTo `
    -Name 'نصائح أساسية لصيانة الكمبيوتر في 2026' `
    -Desc 'روتين عملي لصيانة الكمبيوتر في دبي: تنظيف الغبار، ومراقبة الحرارة، وصحة SSD، وتحديثات Windows والتعريفات، والحماية من تذبذب التيار.' `
    -Url "$base/ar/blog/essential-pc-maintenance-tips/" `
    -Image "$base/images/blog/essential_pc_maintenance.jpg" `
    -Lang 'ar' `
    -Steps @(
        @{ name='نظف الغبار كل 3-4 أشهر'; text='افتح صندوق الجهاز واستخدم الهواء المضغوط على المراوح ومبردات GPU وCPU وفتحات مزود الطاقة، فالغبار هو السبب الأول للحرارة في جو دبي.' },
        @{ name='راقب درجة الحرارة بـ HWiNFO64'; text='ثبّت HWiNFO64 وتابع حرارة المعالج وكرت الشاشة تحت الحمل، مع إبقاء CPU دون 85°C وGPU دون 90°C، وتغيير المعجون الحراري كل 2-3 سنوات.' },
        @{ name='افحص صحة SSD بـ CrystalDiskInfo'; text='شغّل CrystalDiskInfo وراجع "Total Host Writes" وحافظ على 15-20% مساحة فارغة على الأقل، واستبدل أي قرص يظهر تحذيرات.' },
        @{ name='حدّث Windows والتعريفات بحذر'; text='حافظ على Windows 11 محدّثاً، وانتظر أسبوعاً قبل تثبيت تعريفات GPU الجديدة، وأنشئ نقطة استعادة قبل التحديثات الكبيرة لتتمكن من التراجع.' },
        @{ name='احمِ الجهاز بمنظم تيار أو UPS'; text='استخدم منظم تيار كحد أدنى أو UPS بقدرة 650VA؛ شبكة دبي مستقرة لكن تذبذبات التيار أثناء التحديثات قد تتلف الجهاز.' }
    )
Inject-HowTo 'ar\blog\essential-pc-maintenance-tips\index.html' $json

Write-Host "Done."
