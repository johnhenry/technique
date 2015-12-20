import React from 'react';
import Body from './body';
import Head from './head';
module.exports = (state) => <html lang='en'>
  <Head/>
  <Body {...state}/>
</html>;
