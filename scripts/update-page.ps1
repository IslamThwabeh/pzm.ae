param([string]$FilePath, [string]$IsSubDir)

$lines = Get-Content $FilePath -Encoding UTF8
$out = @()
$skip = $false
$navbarInserted = $false
$cssPrefix = if ($IsSubDir -eq "yes") { "../" } else { "" }

foreach ($line in $lines) {
    # Skip Elfsight WhatsApp widget
    if ($line -match 'elfsight-app-870cae90') { continue }
    
    # Skip old header block
    if ($line -match '^\s*<header>') { $skip = $true; continue }
    if ($skip -and $line -match '^\s*</header>') { $skip = $false; continue }
    if ($skip) { continue }
    
    # Skip old nav.main-nav block  
    if ($line -match '^\s*<nav class="main-nav"') { $skip = $true; continue }
    if ($skip -and $line -match '^\s*</nav>') { $skip = $false; continue }
    if ($skip) { continue }
    
    # Skip comment lines about old header/nav
    if ($line -match '^\s*<!-- Main Header -->') { continue }
    if ($line -match '^\s*<!-- Navigation Menu -->') { continue }
    
    # Replace CSS links
    if ($line -match "css/main\.css") {
        $out += "    <link rel=`"stylesheet`" href=`"${cssPrefix}css/theme.css`">"
        continue
    }
    if ($line -match "css/header\.css") { continue }
    
    # Replace header.js with navbar.js
    if ($line -match 'js/header\.js') {
        $out += '    <script src="/js/navbar.js"></script>'
        continue
    }
    
    # After <body>, insert navbar
    if ($line -match '<body' -and -not $navbarInserted) {
        $out += $line
        $navbarInserted = $true
        
        $svcPrefix = if ($IsSubDir -eq "yes") { "/services" } else { "services" }
        $blogHref = if ($IsSubDir -eq "yes") { "/blog.html" } else { "blog.html" }
        
        $out += '    <!-- Navbar -->'
        $out += '    <nav class="navbar">'
        $out += '        <div class="navbar-inner">'
        $out += '            <a href="/" class="logo"><div class="logo-group"><span class="logo-pzm">PZM</span><span class="logo-store">STORE</span></div></a>'
        $out += '            <div class="nav-links" id="navLinks">'
        $out += '                <a href="/">Home</a>'
        $out += '                <div class="nav-dropdown">'
        $out += '                    <button class="nav-dropdown-trigger">Services</button>'
        $out += '                    <div class="nav-dropdown-content">'
        $out += "                        <a href=`"$svcPrefix/buy-iphone.html`">Buy iPhone</a>"
        $out += "                        <a href=`"$svcPrefix/brand-new.html`">New Devices</a>"
        $out += "                        <a href=`"$svcPrefix/buy-used.html`">Used Devices</a>"
        $out += "                        <a href=`"$svcPrefix/repair.html`">Repair Services</a>"
        $out += "                        <a href=`"$svcPrefix/gaming-pc.html`">Gaming PC</a>"
        $out += "                        <a href=`"$svcPrefix/sell-gadgets.html`">Sell Devices</a>"
        $out += "                        <a href=`"$svcPrefix/accessories.html`">Accessories</a>"
        $out += '                    </div>'
        $out += '                </div>'
        $out += "                <a href=`"$blogHref`">Blog</a>"
        $out += '                <a href="#contact">Contact</a>'
        $out += '            </div>'
        $out += '            <div class="nav-actions" id="navActions">'
        $out += '                <a href="tel:+971528026677" class="btn-login">📞 Call Us</a>'
        $out += '                <a href="https://wa.me/971528026677?text=Hi%2C%20I%27m%20interested%20in%20your%20services.%20(via%20pzm.ae)" class="btn-signup" target="_blank" rel="noopener">WhatsApp</a>'
        $out += '            </div>'
        $out += '            <button class="hamburger" id="hamburger" onclick="toggleMenu()"><span></span><span></span><span></span></button>'
        $out += '        </div>'
        $out += '    </nav>'
        continue
    }
    
    $out += $line
}

$out | Set-Content $FilePath -Encoding UTF8
Write-Output "Updated: $(Split-Path $FilePath -Leaf)"
