export const SERVER = {
      PORT            : process.env.PORT || 3000,
      STATICDIR       : './../client'
  };
export const TODO = {
  ATTACH  : ['./style.css', {'script' : './script.js', defer:true }],
  EMBED : [],
  ATTACHBODY:[],
  EMBEDBODY: []
}
export const BLOG = {
    ATTACH  : ['./style.css'],
    EMBED : [],
    ATTACHBODY:[],
    EMBEDBODY: [],
    ITEMSPERINDEXPAGE : 3,
    REVERSE           : false
  };
