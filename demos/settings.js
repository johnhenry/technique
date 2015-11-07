export const SERVER = {
      PORT            : process.env.PORT || 3000,
      STATICDIR       : './../client'
  };
export const CLIENT = {
      SCRIPTS : ['https://cdnjs.cloudflare.com/ajax/libs/fetch/0.10.0/fetch.min.js'],
      DEFEREDSCRIPTS         : ['./script.js'],
      STYLES          : ['./style.css'],
      INTERNALSCRIPTS   : [],
      INTERNALSTYLES    : []
  };
export const BLOG = {
    ITEMSPERINDEXPAGE : 3,
    REVERSE           : false
  };
