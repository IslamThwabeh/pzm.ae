import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import { parse } from 'npm:rss-to-json@2.1.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const TECH_RSS_FEEDS = [
  'https://www.theverge.com/rss/index.xml',
  'https://www.engadget.com/rss.xml',
  'https://www.techradar.com/rss',
];

const CATEGORIES = ['iPhone', 'Samsung', 'PC', 'Gaming', 'Repair'];

async function fetchAndFilterArticles() {
  const articles = [];

  for (const feed of TECH_RSS_FEEDS) {
    try {
      const rss = await parse(feed);
      
      for (const item of rss.items) {
        // Check if article matches our categories
        const matchesCategory = CATEGORIES.some(category => 
          item.title.toLowerCase().includes(category.toLowerCase()) ||
          item.description.toLowerCase().includes(category.toLowerCase())
        );

        if (matchesCategory) {
          articles.push({
            title: item.title,
            content: item.description,
            excerpt: item.description.substring(0, 200) + '...',
            image_url: item.image || item.enclosures?.[0]?.url || 'https://via.placeholder.com/800x400',
            category: CATEGORIES.find(cat => 
              item.title.toLowerCase().includes(cat.toLowerCase()) ||
              item.description.toLowerCase().includes(cat.toLowerCase())
            ),
            published: true,
            author_id: '00000000-0000-0000-0000-000000000000', // System user
            slug: item.title.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching ${feed}:`, error);
    }
  }

  return articles;
}

async function updateBlogPosts() {
  const articles = await fetchAndFilterArticles();
  
  // Keep only the latest 10 articles
  const { data: existingPosts } = await supabase
    .from('blog_posts')
    .select('id')
    .order('created_at', { ascending: false })
    .limit(10);

  if (existingPosts && existingPosts.length > 0) {
    await supabase
      .from('blog_posts')
      .delete()
      .in('id', existingPosts.map(post => post.id));
  }

  // Insert new articles
  const { error } = await supabase
    .from('blog_posts')
    .insert(articles.slice(0, 10));

  if (error) {
    throw error;
  }
}

// Handle the request
Deno.serve(async (req) => {
  try {
    if (req.method === 'POST') {
      const authHeader = req.headers.get('Authorization');
      if (authHeader !== `Bearer ${Deno.env.get('CRON_SECRET')}`) {
        return new Response('Unauthorized', { status: 401 });
      }

      await updateBlogPosts();
      return new Response('Blog posts updated successfully', { status: 200 });
    }

    return new Response('Method not allowed', { status: 405 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal server error', { status: 500 });
  }
});