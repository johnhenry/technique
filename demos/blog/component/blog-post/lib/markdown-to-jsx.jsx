import React from 'react';
export default array => {
  let key = 0;
  return array.map((element) => {
    if(element === 'markdown') return undefined;
    switch(element[0]){
      case "header":
          return React.createElement("h" + element[1].level, {key:key++}, element[2]);
          break;
      case "para":
          return <p key={key++}>{element[1]}</p>;
          break;
      default:
          return undefined;
        break;
    }
  }).filter(_=>_);
};
