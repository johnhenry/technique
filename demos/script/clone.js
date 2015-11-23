import JSON from './window/JSON';
export default state => {return JSON.parse(JSON.stringify(state))};
