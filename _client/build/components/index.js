import React from 'react';
import Body from './body';
import Head from './head';
var Index = React.createClass({
  render: function(){
    return <html lang='en'>
      <Head />
      <Body />
    </html>;
  }
});
export default Index;
