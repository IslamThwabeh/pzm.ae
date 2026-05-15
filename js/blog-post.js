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

    document.title = pageTitle;
    setMetaContent('meta-description', post.excerpt);
    setMetaContent('meta-og-title', pageTitle);
    setMetaContent('meta-og-description', post.excerpt);
    setMetaContent('meta-og-url', pageUrl.href);
    setMetaContent('meta-og-image', imageUrl);
    setMetaContent('meta-twitter-title', pageTitle);
    setMetaContent('meta-twitter-description', post.excerpt);
    setMetaContent('meta-twitter-image', imageUrl);

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
        author: {
            '@type': 'Organization',
            name: 'PZM Computers & Mobile Phones - Sell Fix New Used Laptop PC Build'
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