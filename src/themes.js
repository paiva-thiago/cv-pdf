const theme = (headerFont,
               headerSize,
               headerAlign,
               headerDataAlign,
               textFont,
               textSize,
               textAlign,
               color)=>({
    'headerFont':headerFont,
    'headerSize':headerSize,
    'headerAlign':headerAlign,
    'headerDataAlign':headerDataAlign,
    'ndHeaderSize':headerSize-2,
    'rdHeaderSize':headerSize-3,
    'textFont':textFont,
    'textSize':textSize,
    'textAlign':textAlign,
    'color':color
})
const themes = {
    'default':theme('Comfortaa',12,'left','right','Helvetica', 7, 'left','black')
}
const load = (themeName)=>themes[themeName]

module.exports = {load}