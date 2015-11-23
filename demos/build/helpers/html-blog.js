import fs from  'fs';
import path from 'path';
import getBlogData from '../../script/get-blog-data';
import renderIndex from '../../renderer/string/render-index-blog';
import renderPost from '../../renderer/string/render-post-blog';
import {BLOG, SERVER, CLIENT}   from '../../settings';
import ampify from '../../script/ampify-embeded-scripts';
const OUTPUTDIR = '../../demos/';
const output = path.resolve(__dirname, OUTPUTDIR, SERVER.STATICDIR) + '/';
getBlogData(path.resolve(__filename,'../../../data')).then(posts => {
  const EMBED = (BLOG.AMP && BLOG.AMP.length) ? BLOG.AMP.map(ampify).filter(_=>_) : BLOG.EMBED;
  if(BLOG.REVERSE) posts = posts.reverse();
  const length = posts.length;
  //Index Pages
  const size = BLOG.ITEMSPERINDEXPAGE;

  var index = 0;
  for (var i = 0; i < length; i += size) {
      const postArray = posts.slice(i, i + size);
      const file = renderIndex({
                index : index,
                posts : postArray,
                last : (i >= length - size)
              },
              BLOG.ATTACH,
              EMBED);
      const filePath = output + (index === 0 ?  'index' : index + 1) + ".html";
      index++;
      try{
        fs.writeFileSync(
          filePath,
          file
          );
      }catch(e){
        console.log(error);
      }
  };
  //Individual Pages

  if(!fs.existsSync(output + 'post')) fs.mkdirSync(output + 'post');
  posts.forEach((post, index, posts)=>{
    const file = renderPost({
                  index : index,
                  post : post,
                  prev : posts[index - 1],
                  next : posts[index + 1]
                },
                BLOG.ATTACH,
                EMBED);
    const filePath = output + '/post/' + post.slug + ".html";
    try{
      fs.writeFileSync(
        filePath,
        file);
    }catch(e){
      console.log(error);
    }
  })
}).catch(_=>console.log(_));
