export default{
  SERVER : {
      PORT      : process.env.PORT || 3000,
      STATICDIR : './../client'
  },
  CLIENT : {
      SCRIPTS : ['./script.js'],
      STYLES  : ['./style.css'],
      INLINESCRIPTS : [],
      INLINESTYLES  : []
  },
  BLOG : {
    ITEMSPERINDEXPAGE : 3,
    DATADIR : './data',
    REVERSE : false
  }
};
