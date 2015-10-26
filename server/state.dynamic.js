/*
schema:
  blog-state:
  {
    name: String,
    todos: List<String>
  }
*/
import getBlogData from '../../_blog/build/components/getBlogData.js';
import {BLOG} from '../settings.js';
var getBlogState = function(context){
  return getBlogData('../../_blog/data')
  .then(posts){
    if(context.type === 'index'){
      var length = posts.length;
      var size = BLOG.ITEMSPERINDEXPAGE;
      var index = context.index;

          var postArray = posts.slice(index, index + size);
          var file = renderIndex({
                    index : index,
                    posts : postArray,
                    last : (i >= length - size)
                  });

          fs.writeFileSync(
            filePath,
            file
            );


      return Promise.resolve({
        index: context.index,
        posts:
      })
    }

    if(context.type === 'post'){
      return Promise.resolve({
        post:
      })
    }











  }
}

/*
if(BLOG.REVERSE) posts = posts.reverse();

//Index Pages
var length = posts.length;
var size = BLOG.ITEMSPERINDEXPAGE;
var index = 0;
for (var i = 0; i < length; i += size) {
    var postArray = posts.slice(i, i + size);
    var file = renderIndex({
              index : index,
              posts : postArray,
              last : (i >= length - size)
            });
    file = injectStyle.apply(undefined, CLIENT.STYLES)(file);
    var filePath = output + (index === 0 ?  'index' : index + 1) + ".html";
    index++;
    fs.writeFileSync(
      filePath,
      file
      );
};
//Individual Pages
fs.mkdirSync(output + 'post');
posts.forEach((post, index, posts)=>{
  var file = renderPost({
                index : index,
                post : post,
                prev : posts[index - 1],
                next : posts[index + 1]
              });
  file = injectStyle.apply(undefined, CLIENT.STYLES.map(s=> '../' + s))(file);
  var filePath = output + '/post/' + post.slug + ".html";
  try{
    fs.writeFileSync(
      filePath,
      file);
  }catch(e){
    console.log(error)
  }
})
*/

export default getBlogState;
