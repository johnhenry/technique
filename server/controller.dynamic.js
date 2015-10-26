import getState from './state.dynamic';
import getRenderer from './get-renderer.dynamic';
var subscription = function * (){
  try{
    var state = yield getState(this);
    var render = yield getRenderer(this);
    return render(state);
  }catch(error){
    this.statusCode = 404;
    this.body = error;
  }
};
export default subscription;
