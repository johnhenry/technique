const React = require('react');
const ReactDOM = require('react-dom');
export default ({target, elementDefinition}) => {
  const subscribers     = [];
  const ElementFactory  = React.createFactory(React.createClass(elementDefinition({subscribers})));
  return {
    subscribers,
    send : state => ReactDOM.render(ElementFactory(state), target)
  }
};
