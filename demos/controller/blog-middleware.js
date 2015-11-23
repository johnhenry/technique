import getState from '../script/state-blog';
import getRenderer from '../script/get-renderer-blog';
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
