// Static blog posts data
const blogPosts = [
  {
    title: "How to Choose the Perfect Gaming PC Build",
    slug: "how-to-choose-perfect-gaming-pc-build",
    content: "Building a gaming PC can be overwhelming with so many options available. Here are the key components you need to consider: 1. CPU - The brain of your system, 2. GPU - For stunning graphics, 3. RAM - For smooth multitasking, 4. Storage - SSDs for faster loading times...",
    excerpt: "A comprehensive guide to building your dream gaming PC with the right components.",
    image_url: "https://images.pexels.com/photos/1034312/pexels-photo-1034312.jpeg",
    category: "Gaming"
  },
  {
    title: "Top 5 iPhone Repair Tips Everyone Should Know",
    slug: "top-5-iphone-repair-tips",
    content: "Keep your iPhone running smoothly with these essential maintenance tips: 1. Regular software updates, 2. Battery optimization, 3. Screen protection, 4. Proper charging habits, 5. Regular backups...",
    excerpt: "Essential tips to maintain and repair your iPhone for optimal performance.",
    image_url: "https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg",
    category: "Repair"
  },
  {
    title: "The Ultimate Guide to Buying Used Laptops",
    slug: "ultimate-guide-buying-used-laptops",
    content: "Looking to save money on a laptop? Here's what to check when buying used: 1. Battery health, 2. Hardware specifications, 3. Physical condition, 4. Warranty options, 5. Seller reputation...",
    excerpt: "Everything you need to know about safely purchasing a pre-owned laptop.",
    image_url: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    category: "Used"
  },
  {
    title: "Essential PC Maintenance Tips for Longevity",
    slug: "essential-pc-maintenance-tips",
    content: "Keep your PC running like new with these maintenance tips: 1. Regular cleaning, 2. Software updates, 3. Disk optimization, 4. Temperature monitoring, 5. Component upgrades...",
    excerpt: "Learn how to maintain your PC for optimal performance and longer lifespan.",
    image_url: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    category: "PC"
  },
  {
    title: "Latest Mobile Accessories You Need in 2025",
    slug: "latest-mobile-accessories-2025",
    content: "Enhance your mobile experience with these must-have accessories: 1. MagSafe chargers, 2. Advanced screen protectors, 3. Professional camera lenses, 4. Battery packs, 5. Premium cases...",
    excerpt: "Discover the newest and most innovative mobile accessories for 2025.",
    image_url: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg",
    category: "Accessories"
  },
  {
    title: "Understanding Smartphone Battery Life",
    slug: "understanding-smartphone-battery-life",
    content: "Maximize your smartphone's battery life with these expert tips: 1. Understand battery cycles, 2. Optimal charging practices, 3. Background app management, 4. Screen brightness optimization...",
    excerpt: "Learn how to extend your smartphone's battery life and maintain its health.",
    image_url: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg",
    category: "Mobile"
  },
  {
    title: "Gaming PC Cooling Solutions Guide",
    slug: "gaming-pc-cooling-solutions-guide",
    content: "Keep your gaming PC cool with these effective cooling solutions: 1. Air vs. liquid cooling, 2. Case airflow optimization, 3. Thermal paste application, 4. Fan configuration...",
    excerpt: "A complete guide to keeping your gaming PC running cool and efficient.",
    image_url: "https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg",
    category: "Gaming"
  },
  {
    title: "SSD vs HDD: Making the Right Choice",
    slug: "ssd-vs-hdd-making-right-choice",
    content: "Choose the right storage solution for your needs: 1. Speed comparison, 2. Capacity options, 3. Price considerations, 4. Reliability factors, 5. Use case scenarios...",
    excerpt: "Compare SSDs and HDDs to find the perfect storage solution for your needs.",
    image_url: "https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg",
    category: "PC"
  },
  {
    title: "Common iPhone Screen Issues and Solutions",
    slug: "common-iphone-screen-issues-solutions",
    content: "Fix common iPhone screen problems: 1. Touch sensitivity issues, 2. Display artifacts, 3. Color calibration, 4. Screen replacement guidelines...",
    excerpt: "Troubleshoot and fix common iPhone screen problems with our expert guide.",
    image_url: "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg",
    category: "Repair"
  },
  {
    title: "Choosing the Right Gaming Monitor",
    slug: "choosing-right-gaming-monitor",
    content: "Select the perfect gaming monitor: 1. Resolution options, 2. Refresh rate importance, 3. Panel types explained, 4. Response time considerations...",
    excerpt: "Find the ideal gaming monitor for your setup with our comprehensive guide.",
    image_url: "https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg",
    category: "Gaming"
  },
  {
    title: "Laptop Buying Guide 2025",
    slug: "laptop-buying-guide-2025",
    content: "Make an informed laptop purchase: 1. Processor selection, 2. RAM requirements, 3. Display considerations, 4. Battery life expectations...",
    excerpt: "Everything you need to know about buying a laptop in 2025.",
    image_url: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    category: "PC"
  },
  {
    title: "Smartphone Photography Tips",
    slug: "smartphone-photography-tips",
    content: "Take better photos with your smartphone: 1. Composition rules, 2. Lighting techniques, 3. Camera settings, 4. Editing apps...",
    excerpt: "Improve your smartphone photography with these professional tips.",
    image_url: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
    category: "Mobile"
  },
  {
    title: "PC Cable Management Guide",
    slug: "pc-cable-management-guide",
    content: "Organize your PC cables like a pro: 1. Planning the layout, 2. Cable routing techniques, 3. Tool recommendations, 4. Maintenance tips...",
    excerpt: "Learn how to achieve clean and efficient PC cable management.",
    image_url: "https://images.pexels.com/photos/1432675/pexels-photo-1432675.jpeg",
    category: "PC"
  },
  {
    title: "Mechanical Keyboard Guide",
    slug: "mechanical-keyboard-guide",
    content: "Choose the perfect mechanical keyboard: 1. Switch types explained, 2. Form factors, 3. Keycap materials, 4. Customization options...",
    excerpt: "Everything you need to know about mechanical keyboards.",
    image_url: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg",
    category: "Accessories"
  },
  {
    title: "Water Cooling vs Air Cooling",
    slug: "water-cooling-vs-air-cooling",
    content: "Compare PC cooling methods: 1. Performance differences, 2. Cost analysis, 3. Maintenance requirements, 4. Installation complexity...",
    excerpt: "Decide between water cooling and air cooling for your PC build.",
    image_url: "https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg",
    category: "PC"
  },
  {
    title: "Smartphone Security Guide",
    slug: "smartphone-security-guide",
    content: "Protect your smartphone: 1. Password best practices, 2. Biometric security, 3. App permissions, 4. Anti-malware protection...",
    excerpt: "Essential security tips to keep your smartphone safe.",
    image_url: "https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg",
    category: "Mobile"
  },
  {
    title: "RGB Lighting Setup Guide",
    slug: "rgb-lighting-setup-guide",
    content: "Create the perfect RGB setup: 1. Controller selection, 2. Synchronization methods, 3. Color schemes, 4. Software control...",
    excerpt: "Master RGB lighting for your gaming setup.",
    image_url: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
    category: "Gaming"
  },
  {
    title: "USB-C Accessories Guide",
    slug: "usb-c-accessories-guide",
    content: "Essential USB-C accessories: 1. Charging adapters, 2. Docking stations, 3. Cable selection, 4. Compatibility guide...",
    excerpt: "Navigate the world of USB-C accessories with our comprehensive guide.",
    image_url: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg",
    category: "Accessories"
  },
  {
    title: "Gaming Mouse Selection Guide",
    slug: "gaming-mouse-selection-guide",
    content: "Choose the right gaming mouse: 1. Sensor technology, 2. DPI settings, 3. Ergonomics, 4. Button configuration...",
    excerpt: "Find the perfect gaming mouse for your play style.",
    image_url: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
    category: "Gaming"
  },
  {
    title: "Laptop Maintenance Guide",
    slug: "laptop-maintenance-guide",
    content: "Keep your laptop in top condition: 1. Cleaning procedures, 2. Software optimization, 3. Hardware upgrades, 4. Battery care...",
    excerpt: "Essential maintenance tips for laptop longevity.",
    image_url: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    category: "PC"
  }
];

function getTodaysPosts() {
  // Get days since epoch to ensure consistent rotation
  const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  
  // Calculate starting index for today's posts (2 posts per day)
  const startIndex = (daysSinceEpoch * 2) % blogPosts.length;
  
  // Get two posts, wrapping around to the beginning if needed
  return [
    blogPosts[startIndex],
    blogPosts[(startIndex + 1) % blogPosts.length]
  ];
}

function displayBlogPosts() {
  const blogGrid = document.querySelector('.blog-grid');
  const todaysPosts = getTodaysPosts();
  
  // Clear any existing content
  blogGrid.innerHTML = '';
  
  // Display today's posts
  todaysPosts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'blog-card';
    
    article.innerHTML = `
      <img src="${post.image_url}" alt="${post.title}" class="blog-image" loading="lazy">
      <div class="blog-content">
        <span class="blog-category">${post.category}</span>
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <div class="blog-meta">
          <span>${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
      </div>
    `;
    
    blogGrid.appendChild(article);
  });
}

// Display posts when the DOM is ready
document.addEventListener('DOMContentLoaded', displayBlogPosts);