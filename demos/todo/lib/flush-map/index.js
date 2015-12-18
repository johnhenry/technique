import flush from './store-parts/flush';
import post from './store-parts/post';
export default (map = new Map()) => {
  return {
    __proto__ : map,
    get       : flush.bind(map),
    set       : post.bind(map),
    has       : () => true
  }
};
