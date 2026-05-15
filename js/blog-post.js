// Import blog posts data
import { blogPosts } from './blog.js';

function setMetaContent(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.setAttribute('content', value);
    }
}

function updateBlogPostMetadata(post, slug) {
    const pageUrl = new URL(window.location.href);
    pageUrl.search = '';
    pageUrl.searchParams.set('slug', slug);

    const imageUrl = new URL(post.image_url, window.location.origin).href;
    const pageTitle = `${post.title} | PZM Dubai Tech Blog`;
    const publishedISO = post.date ? new Date(post.date).toISOString() : undefined;

    document.title = pageTitle;
    setMetaContent('meta-description', post.excerpt);
    setMetaContent('meta-og-title', pageTitle);
    setMetaContent('meta-og-description', post.excerpt);
    setMetaContent('meta-og-url', pageUrl.href);
    setMetaContent('meta-og-image', imageUrl);
    setMetaContent('meta-twitter-title', pageTitle);
    setMetaContent('meta-twitter-description', post.excerpt);
    setMetaContent('meta-twitter-image', imageUrl);

    // The base blog-post.html ships with robots="noindex, follow" so the empty
    // shell never gets indexed. Once we have a valid slug + content, flip it
    // to index so per-slug articles can be discovered.
    setMetaContent('meta-robots', 'index, follow');

    const canonicalLink = document.getElementById('canonical-link');
    if (canonicalLink) {
        canonicalLink.setAttribute('href', pageUrl.href);
    }

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: imageUrl,
        mainEntityOfPage: pageUrl.href,
        inLanguage: 'en',
        ...(publishedISO ? { datePublished: publishedISO, dateModified: publishedISO } : {}),
        author: {
            '@type': 'Organization',
            name: 'PZM Computers & Mobile Phones - Sell Fix New Used Laptop PC Build',
            url: 'https://pzm.ae/'
        },
        publisher: {
            '@type': 'Organization',
            name: 'PZM Computers & Mobile Phones - Sell Fix New Used Laptop PC Build',
            logo: {
                '@type': 'ImageObject',
                url: 'https://pzm.ae/images/mini_logo.png'
            }
        }
    };

    const schemaScript = document.getElementById('blog-post-schema');
    if (schemaScript) {
        schemaScript.textContent = JSON.stringify(schema);
    }
}

function getPostSlug() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug');
}

function findPostBySlug(slug) {
    return blogPosts.find(post => post.slug === slug);
}

function displayBlogPost() {
    const slug = getPostSlug();
    const post = findPostBySlug(slug);
    
    if (!post) {
        window.location.href = '/blog.html';
        return;
    }
    
    const postContent = document.getElementById('post-content');
    updateBlogPostMetadata(post, slug);
    
    postContent.innerHTML = `
        <img src="${post.image_url}" alt="${post.title}" class="blog-post-image">
        <div class="blog-post-content">
            <span class="blog-category">${post.category}</span>
            <h1>${post.title}</h1>
            <div class="blog-content">
                ${post.content}
            </div>
        </div>
    `;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', displayBlogPost);