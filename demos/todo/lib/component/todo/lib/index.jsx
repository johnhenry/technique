import React from 'react';
import Body from './body';
import Head from './head';
module.exports = React.createClass({
  render: function(){
    return <html lang='en'>
    <Head/>
    <Body/>
    </html>;
  }
});
