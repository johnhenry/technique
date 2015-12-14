import getState from '../lib/state-blog';
import getRenderer from '../lib/get-renderer-blog';
export default function * (){
  try{
    const state = yield getState(this);
    const render = yield getRenderer(this);
    return render(state);
  }catch(error){
    this.statusCode = 404;
    this.body = error;
  }
};
