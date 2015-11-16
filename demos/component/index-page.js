import React        from 'react';
import PostSummary  from './post-summary'
var IndexPage = ({index, posts, last}) => {
    posts = (posts || []).map((post, i) => <PostSummary key={i} post={post} className="PostSummary"/>);
    var foot = [];
    var linkIndex = 0;
    if(index !==0){
      foot.push(<a key={linkIndex++} className='Home' href='./'></a>);
      foot.push(<a key={linkIndex++} className='Prev' title={'Page ' + String(index)} href={ index === 1 ? './' : index + '.html' } />);
    }
    if(!last)
      foot.push(<a key={linkIndex++} className='Next' title={'Page ' + String(index + 2)} href={ './' + (index + 2) + '.html' } />);
    return <html >
      <head>
        <meta charSet='UTF-8' />
        <title>Page {index + 1}</title>
      </head>
      <body className='IndexPage'>
        <h1><a href='/'></a></h1>
        <ul>
          {posts}
        </ul>
        <footer>{foot}</footer>
      </body>
    </html>
  };
export default IndexPage;
