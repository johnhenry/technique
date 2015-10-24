export default{
  SERVER : {
      PORT            : process.env.PORT || 3000,
      STATICDIR       : './../client'
  },
  CLIENT : {
      POLYFILLSCRIPTS : ['https://cdnjs.cloudflare.com/ajax/libs/fetch/0.10.0/fetch.min.js'],
      SCRIPTS         : ['./script.js'],
      STYLES          : ['./style.css'],
      INLINESCRIPTS   : [],
      INLINESTYLES    : []
  },
  BLOG : {
    ITEMSPERINDEXPAGE : 3,
    DATADIR           : './data',
    REVERSE           : false
  }
};
