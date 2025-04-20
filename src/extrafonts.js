
const path = require('path');
const fs = require('fs');


function initComfortaaLocal(doc){
  const fontPath = path.join(__dirname, 'types', 'comfortaa.ttf');
  doc.registerFont('Comfortaa',fontPath)
}

function init(doc){
    initComfortaaLocal(doc)
}

module.exports = { init }