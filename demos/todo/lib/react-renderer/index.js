const React = require('react');
const ReactDOM = require('react-dom');
export default ({target, viewDefinition}) => {
  const subscribers     = [];
  const ElementFactory  = React.createFactory(React.createClass(viewDefinition({subscribers})));
  return {
    subscribers,
    send : state => ReactDOM.render(ElementFactory(state), target)
  }
};
