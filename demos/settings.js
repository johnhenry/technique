export const SERVER = {
      PORT            : process.env.PORT || 3000,
      STATICDIR       : './../client'
  };
export const TODO = {
  ATTACH  : ['./script.js',{'script' : './script.js', defer:true }],
  EMBED : ['./style.css'],
  ATTACHBODY:[],
  EMBEDBODY: ['./script.js']
}
export const BLOG = {
    ATTACH  : ['./style.css'],
    EMBED : [],
    ATTACHBODY:[],
    EMBEDBODY: [],
    ITEMSPERINDEXPAGE : 3,
    REVERSE           : false
  };
