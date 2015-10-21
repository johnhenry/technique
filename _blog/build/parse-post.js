import markdown from 'markdown';
import frontMatter from 'yaml-front-matter';
var getFrontMatter = frontMatter.loadFront;
var getIntro  = content => {
  for(var i = 0; i < content.markdown.length; i++) if(content.markdown[i][0] === 'para') return content.markdown[i][1];
  return '';
};
var parsePost = md => {
  var content = getFrontMatter(md);//Extract Front Matter
  Object.assign(content, {markdown : markdown.markdown.parse(content.__content)});//Parse Markdown
  Object.assign(content, {intro: getIntro(content)});//Generate Intro
  if(!content.slug && content.title) content.slug = content.title.toLowerCase().split(' ').join('-');//Ensure slug
  if(!content.slug) content.slug = '-' + String(Math.random()).substr(2) + '-';//Ensure slug
  content.slug = encodeURIComponent(content.slug) + '.html';//Encode Slug
  return content;
};
export default parsePost;
