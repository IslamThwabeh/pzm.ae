import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

async function loadBlogPosts() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading blog posts:', error);
    return;
  }

  const blogGrid = document.querySelector('.blog-grid');
  blogGrid.innerHTML = '';

  posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.innerHTML = `
      <img src="${post.image_url}" alt="${post.title}" class="blog-image">
      <div class="blog-content">
        <span class="blog-category">${post.category}</span>
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <a href="/blog/posts/${post.slug}" class="read-more">Read More</a>
        <div class="blog-meta">
          <span>${Math.ceil(post.content.split(' ').length / 200)} min read</span>
          <span>${new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    `;
    blogGrid.appendChild(article);
  });
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);