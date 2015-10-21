import React  from 'react';
import Post   from './post';
var PostPage = React.createClass({
  render : function(){
    var post = this.props.post;
    var prerender = [];
    if(this.props.next)
      prerender.push(<link key={linkIndex++} rel='prerender' href={ this.props.next.slug + '.html' } />)
    var foot = [];
    var linkIndex = 0;
    if(this.props.prev)
      foot.push(<a key={linkIndex++} className='Prev' href={ this.props.prev.slug + '.html' } title={this.props.prev.title}/>);
    if(this.props.next)
      foot.push(<a key={linkIndex++} className='Next' href={ this.props.next.slug + '.html' } title={this.props.next.title}/>);
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
        <footer><a href='/' className="Home" title="Home"></a>{foot}</footer>
      </body>
    </html>
  }
})
export default PostPage;
