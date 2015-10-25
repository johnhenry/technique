import React        from 'react';
import PostSummary  from './post-summary'
var IndexPage = React.createClass({
  render : function(){
    var index = this.props.index;
    var posts = this.props.posts.map((post, i) => <PostSummary key={i} post={post} className="PostSummary"/>);
    var last = this.props.last;
    var foot = [];
    var linkIndex = 0;
    if(index !==0){
      foot.push(<a key={linkIndex++} className='Home' href='./'></a>);
      foot.push(<a key={linkIndex++} className='Prev' href={ index === 1 ? './' : index + '.html' } />);
    }
    if(!last)
      foot.push(<a key={linkIndex++} className='Next' href={ './' + (index + 2) + '.html' } />);
    return <html>
      <head>
        <meta charSet='UTF-8' />
        <title>Page {index + 1}</title>
      </head>
      <body>
        <h1><a href='/'>Blog</a></h1>
        <ul>
          {posts}
        </ul>
        <footer>{foot}</footer>
      </body>
    </html>
  }
})
export default IndexPage;
