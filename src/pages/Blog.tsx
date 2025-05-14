import React from 'react';
import { Link } from '@tanstack/react-router';
import { blogPosts } from '../data/blog';

export function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Introduction Section */}
      <section className="mb-16 bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Tech Insights & Expert Advice</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to the PZM Tech Blog, your trusted source for the latest insights, tips, and expert advice in the world of technology. 
            Our team of experienced technicians and tech enthusiasts brings you in-depth articles covering everything from device maintenance 
            to the latest industry trends.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">What We Cover</h3>
              <ul className="space-y-2">
                <li>• Latest smartphone and computer technology</li>
                <li>• Repair guides and maintenance tips</li>
                <li>• Gaming PC building tutorials</li>
                <li>• Device reviews and comparisons</li>
                <li>• Industry news and updates</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Why Read Our Blog?</h3>
              <ul className="space-y-2">
                <li>• Expert insights from certified technicians</li>
                <li>• Practical advice for device maintenance</li>
                <li>• Up-to-date technology news</li>
                <li>• Detailed tutorials and guides</li>
                <li>• Real-world testing and reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from(new Set(blogPosts.map(post => post.category))).map((category) => (
            <div key={category} className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow">
              <span className="font-medium text-primary">{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="blog-section">
        <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.slug} className="blog-card hover:shadow-xl transition-shadow">
              <img src={post.image_url} alt={post.title} className="blog-image" loading="lazy" />
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  to="/blog-post" 
                  params={{ slug: post.slug }} 
                  className="read-more inline-flex items-center"
                >
                  Read More
                  <svg 
                    className="w-4 h-4 ml-2" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <div className="blog-meta">
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-primary text-white rounded-lg p-8 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">
            Subscribe to our newsletter for the latest tech tips, guides, and industry news delivered directly to your inbox.
          </p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded text-gray-900"
            />
            <button
              type="submit"
              className="bg-white text-primary px-6 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}