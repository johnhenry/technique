import fs from 'fs';
import path from 'path';
import parsePost from './parse-post';
var getBlogData = dirpath => {
  var posts = fs.readdirSync(dirpath)
  .map(filename => path.join(dirpath, filename))
  .filter(filepath => fs.statSync(filepath).isFile())
  .map(filepath=>fs.readFileSync(filepath, 'utf8').toString())
  .map(parsePost);
  return Promise.resolve(posts);
};
export default getBlogData;
