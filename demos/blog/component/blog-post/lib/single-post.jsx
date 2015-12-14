import React from 'react';
import markdown from './markdown-to-jsx.jsx';
export default ({post, className}) => {
    return <article className={className}>
      <h1 title={post.title}>{post.title}</h1>
      <h2 title={post.author}>by {post.author}</h2>
      {markdown(post.markdown)}
    </article>
  };
