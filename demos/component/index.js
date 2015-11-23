import React from 'react';
import Body from './body';
import Head from './head';
export default React.createClass({
  render: function(){
    return <html lang='en'>
      <Head />
      <Body />
    </html>;
  }
});
