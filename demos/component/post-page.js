import React  from 'react';
import Post   from './post';
var PostPage = ({post, next, prev}) => {
    var prerender = [];
    var linkIndex = 0;
    if(next)
      prerender.push(<link key={linkIndex++} rel='prerender' href={ './' + next.slug + '.html' } />)
    var foot = [];
    if(prev)
      foot.push(<a key={linkIndex++} className='Prev' href={ './' + prev.slug + '.html' } title={prev.title}/>);
    if(next)
      foot.push(<a key={linkIndex++} className='Next' href={ './' + next.slug + '.html' } title={next.title}/>);
    return <html>
      <head>
        <meta charSet='UTF-8' />
        <title>{post.title}</title>
        {prerender}
      </head>
      <body>
        <h1><a href='/'>Blog</a></h1>
        <h2 title={post.title}>{post.title}</h2>
        <h3 title={post.author}>by {post.author}</h3>
        <Post post={post} className="Post"></Post>
        <footer><a href='../' className="Home" title="Home"></a>{foot}</footer>
      </body>
    </html>
  };
export default PostPage;
