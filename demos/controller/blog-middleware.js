import getState from '../script/state-blog';
import getRenderer from '../script/get-renderer-blog';
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
