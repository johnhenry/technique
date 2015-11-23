import React from 'react';
export default ({post, className}) => <li className={className}>
      <a href={'./post/' + post.slug + '.html'}><h1>{post.title}</h1></a>
      <div>{post.intro}</div>
    </li>;
