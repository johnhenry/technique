import getUpdate from '../lib/get-update';
import {getState, setState} from '../lib/state-todo';
import getRenderer from '../lib/get-renderer';
getUpdate({type:'reset'}).then(update => setState(update()));//Initialize
export default function * (){
  try{
    const state = yield getState(this);
    const render = yield getRenderer(this);
    if(!(this.request.body && this.request.body.type)){
      return render(state);
    }else{
      const update = yield getUpdate(this.request.body);
      return setState(update(state)).then(render);
    }
  }catch(error){
    this.statusCode = 404;
    this.body = error;
  }
};
