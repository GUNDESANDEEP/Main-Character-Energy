import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Date:</strong> {post.date}</p>
    </div>
  );
};

export default PostCard;