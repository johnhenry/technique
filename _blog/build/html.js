import fs from  'fs';
import path from 'path';
import getBlogData from './get-blog-data';
import renderIndex from './render-index';
import renderPost from './render-post';
import {BLOG, SERVER, CLIENT}   from '../../settings';
import {injectStyle} from '../../_client/build/inject-html';
var OUTPUTDIR = '../';
var INPUTDIR = '../';
var output = path.resolve(__dirname, OUTPUTDIR, SERVER.STATICDIR) + '/';
var input = path.resolve(__dirname, BLOG.DATADIR);
getBlogData(input).then(posts => {
  if(BLOG.REVERSE) posts = posts.reverse();
  var length = posts.length;
  //Index Pages
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
  posts.forEach((post, index, posts)=>{
    var file = renderPost({
                  index : index,
                  post : post,
                  prev : posts[index - 1],
                  next : posts[index + 1]
                });
    file = injectStyle.apply(undefined, CLIENT.STYLES)(file);
    var filePath = output + post.slug;
    try{
      fs.writeFileSync(
        filePath,
        file);
    }catch(e){
      console.log(error)
    }
  })
});
