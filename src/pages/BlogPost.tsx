import React from 'react';
import { useParams } from '@tanstack/react-router';
import { blogPosts } from '../data/blog';

export function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="blog-post">
      <img src={post.image_url} alt={post.title} className="blog-post-image" />
      <div className="blog-post-content">
        <span className="blog-category">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="blog-meta">
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
}