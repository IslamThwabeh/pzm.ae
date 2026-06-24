// Import blog posts data
import { blogPosts, postJourneys, formatBlogDate, getBlogPostHref, isStaticBlogPost } from '/assets/v20260624/js/blog-b52c87ad.js';

function setMetaContent(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.setAttribute('content', value);
    }
}

function writeJsonLd(id, payload) {
    let script = document.getElementById(id);

    if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(payload);
}

function updateBlogPostMetadata(post, slug) {
    const pageUrl = new URL(window.location.href);
    pageUrl.search = '';
    pageUrl.searchParams.set('slug', slug);

    const imageUrl = new URL(post.image_url, window.location.origin).href;
    const pageTitle = `${post.title} | P Z M Computers & Mobile Phones -Sell New Used PC Build Blog`;
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

    // Keep the legacy query-param shell out of the crawlable URL set.
    setMetaContent('meta-robots', 'noindex, follow');

    const canonicalLink = document.getElementById('canonical-link');
    if (canonicalLink) {
        canonicalLink.setAttribute('href', pageUrl.href);
    }

    const pageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: pageTitle,
        description: post.excerpt,
        url: pageUrl.href,
        inLanguage: 'en',
        isPartOf: {
            '@type': 'Blog',
            name: 'P Z M Computers & Mobile Phones -Sell New Used PC Build Dubai Tech Blog',
            url: 'https://pzm.ae/blog.html'
        }
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://pzm.ae/'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://pzm.ae/blog.html'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: pageUrl.href
            }
        ]
    };

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: imageUrl,
        mainEntityOfPage: pageUrl.href,
        url: pageUrl.href,
        inLanguage: 'en',
        ...(publishedISO ? { datePublished: publishedISO, dateModified: publishedISO } : {}),
        author: {
            '@type': 'Organization',
            name: 'P Z M Computers & Mobile Phones -Sell New Used PC Build',
            url: 'https://pzm.ae/'
        },
        publisher: {
            '@type': 'Organization',
            name: 'P Z M Computers & Mobile Phones -Sell New Used PC Build',
            logo: {
                '@type': 'ImageObject',
                url: 'https://pzm.ae/images/mini_logo.png'
            }
        }
    };

    writeJsonLd('blog-post-page-schema', pageSchema);
    writeJsonLd('blog-post-breadcrumb-schema', breadcrumbSchema);
    writeJsonLd('blog-post-article-schema', schema);
}

function getPostSlug() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug');
}

function findPostBySlug(slug) {
    return blogPosts.find(post => post.slug === slug);
}

function renderJourneySection(post) {
    const journey = postJourneys[post.slug];

    if (!journey) {
        return '';
    }

    return `
        <aside class="blog-next-steps">
            <p class="blog-next-steps-label">Best next steps</p>
            <div class="blog-next-steps-grid">
                <a href="${journey.moneyPage.href}" class="blog-next-step-card">
                    <span class="blog-next-step-eyebrow">Service page</span>
                    <strong>${journey.moneyPage.label}</strong>
                    <span>${journey.moneyPage.description}</span>
                </a>
                <a href="${journey.areaPage.href}" class="blog-next-step-card">
                    <span class="blog-next-step-eyebrow">Local page</span>
                    <strong>${journey.areaPage.label}</strong>
                    <span>${journey.areaPage.description}</span>
                </a>
            </div>
        </aside>
    `;
}

function displayBlogPost() {
    const slug = getPostSlug();

    if (slug && isStaticBlogPost(slug)) {
        window.location.replace(getBlogPostHref(slug));
        return;
    }

    const post = findPostBySlug(slug);
    
    if (!post) {
        window.location.href = '/blog.html';
        return;
    }
    
    const postContent = document.getElementById('post-content');
    updateBlogPostMetadata(post, slug);
    const publishedLabel = formatBlogDate(post.date);
    const postMeta = publishedLabel ? `<p class="blog-post-meta">Published ${publishedLabel}</p>` : '';
    
    postContent.innerHTML = `
        <img src="${post.image_url}" alt="${post.title}" class="blog-post-image" fetchpriority="high" decoding="async" loading="eager">
        <div class="blog-post-content">
            <span class="blog-category">${post.category}</span>
            ${postMeta}
            <h1>${post.title}</h1>
            <div class="blog-content">
                ${post.content}
            </div>
            ${renderJourneySection(post)}
        </div>
    `;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', displayBlogPost);