/*
  # Add sample blog posts

  This migration adds initial sample blog posts to populate the blog section.
*/

INSERT INTO blog_posts (title, slug, content, excerpt, image_url, category, published) 
VALUES 
  (
    'How to Choose the Perfect Gaming PC Build',
    'how-to-choose-perfect-gaming-pc-build',
    'Building a gaming PC can be overwhelming with so many options available. Here are the key components you need to consider: 1. CPU - The brain of your system, 2. GPU - For stunning graphics, 3. RAM - For smooth multitasking, 4. Storage - SSDs for faster loading times...',
    'A comprehensive guide to building your dream gaming PC with the right components.',
    'https://images.pexels.com/photos/1034312/pexels-photo-1034312.jpeg',
    'Gaming',
    true
  ),
  (
    'Top 5 iPhone Repair Tips Everyone Should Know',
    'top-5-iphone-repair-tips',
    'Keep your iPhone running smoothly with these essential maintenance tips: 1. Regular software updates, 2. Battery optimization, 3. Screen protection, 4. Proper charging habits, 5. Regular backups...',
    'Essential tips to maintain and repair your iPhone for optimal performance.',
    'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg',
    'Repair',
    true
  ),
  (
    'The Ultimate Guide to Buying Used Laptops',
    'ultimate-guide-buying-used-laptops',
    'Looking to save money on a laptop? Here''s what to check when buying used: 1. Battery health, 2. Hardware specifications, 3. Physical condition, 4. Warranty options, 5. Seller reputation...',
    'Everything you need to know about safely purchasing a pre-owned laptop.',
    'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    'Used',
    true
  ),
  (
    'Essential PC Maintenance Tips for Longevity',
    'essential-pc-maintenance-tips',
    'Keep your PC running like new with these maintenance tips: 1. Regular cleaning, 2. Software updates, 3. Disk optimization, 4. Temperature monitoring, 5. Component upgrades...',
    'Learn how to maintain your PC for optimal performance and longer lifespan.',
    'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    'PC',
    true
  ),
  (
    'Latest Mobile Accessories You Need in 2025',
    'latest-mobile-accessories-2025',
    'Enhance your mobile experience with these must-have accessories: 1. MagSafe chargers, 2. Advanced screen protectors, 3. Professional camera lenses, 4. Battery packs, 5. Premium cases...',
    'Discover the newest and most innovative mobile accessories for 2025.',
    'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg',
    'Accessories',
    true
  );