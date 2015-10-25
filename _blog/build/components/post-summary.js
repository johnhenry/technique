import React from 'react';
var PostSummary = React.createClass({
  render : function(){
    var post = this.props.post;
    return <li className={this.props.className}>
      <a href={'./post/' + post.slug + '.html'}><h1>{post.title}</h1></a>
      <div>{post.intro}</div>
    </li>;
  }
});
export default PostSummary;
