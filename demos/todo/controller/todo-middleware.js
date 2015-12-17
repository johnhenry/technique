import getUpdate from '../lib/get-update';
import getRenderer from '../lib/get-renderer';
export default state => {
  return function * (){
    try{
      const current = yield state.get(this);
      const render = yield getRenderer(this);
      if(!(this.request.body && this.request.body.type)){
        return render(current);
      }else{
        const update = yield getUpdate(this.request.body);
        return state.set(update(current)).then(render);
      }
    }catch(error){
      this.statusCode = 404;
      this.body = error;
    }
  };
}
