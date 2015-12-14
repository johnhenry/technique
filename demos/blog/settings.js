export const SERVER = {
  PORT      : process.env.PORT || 3000,
  STATICDIR : '../www'
};
export const BLOG = {
  ITEMSPERINDEXPAGE      : 3,
  DATA : '../markdown',
  REVERSE: false,
  ATTACH:["./style.css"],
  EMBED:[],
  ATTACHBODY:[],
  EMBEDBODY:[],
  AMP:[]
};
