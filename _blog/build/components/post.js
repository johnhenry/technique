import React from 'react';
var Post = React.createClass({
  render : function(){
    var post = this.props.post;
    var key = 0;
    var markdown = post.markdown.map(function(element){
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
    return <article className={this.props.className}>
      {markdown}
    </article>
  }
})
export default Post;
