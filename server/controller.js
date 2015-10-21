import getUpdate from '../_client/script/get-update';
import {getState, setState} from '../_client/script/state';
import getRenderer from './get-renderer';
var subscription = function * (){
  try{
    var state = yield getState(this);
    var render = yield getRenderer(this);
    if(!(this.request.body && this.request.body.type)){
      return render(state);
    }else{
      var update = yield getUpdate(this.request.body);
      return setState(update(state)).then(render);
    }
  }catch(error){
    this.statusCode = 404;
    this.body = error;
  }
};
getUpdate({type:'reset'}).then(update => setState(update()));//Initialize
export default subscription;
