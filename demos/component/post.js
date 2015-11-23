import React from 'react';
export default ({post, className}) => {
    var key = 0;
    const markdown = post.markdown.map(function(element){
      if(element === 'markdown') return undefined;
      switch(element[0]){
        case "header":
            return React.createElement("h" + element[1].level, {key:key++}, element[2]);
            break;
        case "para":
            return <p key={key++}>{element[1]}</p>;
            break;
        default:
            return undefined;
          break;
      }
    }).filter(_=>_);
    return <article className={className}>
      <h1 title={post.title}>{post.title}</h1>
      <h2 title={post.author}>by {post.author}</h2>
      {markdown}
    </article>
  };
